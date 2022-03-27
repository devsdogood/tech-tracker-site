import { unionBy } from 'lodash';
import { Device, PrismaClient } from '@shared/types/generated';

export default class PingState {
  devices: Device[] = [];

  refresh = 0;

  prisma = new PrismaClient();

  getDevices = async () => {
    const devices = await this.prisma.device.findMany();
    this.devices = devices;
    this.refresh = Date.now();
  };

  refreshDevices = async () => {
    const devices = await this.prisma.device.findMany({
      where: { lastUpdated: { gt: new Date(this.refresh) } },
    });

    this.devices = unionBy(this.devices, devices, 'id');
    this.refresh = Date.now();
  };

  updateDeviceStatus = async (id: number, status: Device['status']) => {
    const lastUpdatedNum = Date.now();
    const lastUpdated = new Date(lastUpdatedNum);

    await this.prisma.device.update({
      where: { id },
      data: { status, lastUpdated },
    });

    this.refresh = lastUpdatedNum;

    // Update local device state
    const device = this.devices.find((d) => d.id === id);

    if (!device) {
      // eslint-disable-next-line no-console
      console.warn(`Could not find device with id ${id}`);
      return;
    }

    device.status = status;
    device.lastUpdated = lastUpdated;
  };
}
