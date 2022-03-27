import ping from 'ping';
import cron from 'node-cron';
import { toStatus } from '@util/devices';
import PingState from './state';

const state = new PingState();

// Run every minute
cron.schedule('* * * * *', async () => {
  // Get new devices from database
  if (state.refresh === 0) await state.getDevices();
  else await state.refreshDevices();

  // Ping all devices, storing their id and whether their status changed
  const pinger = state.devices.map(async (device): Promise<[boolean, number]> => {
    const status = device.status === 'ONLINE';
    const { alive } = await ping.promise.probe(device.ip);
    return [alive !== status, device.id];
  });

  // Find all devices with a different status than stored
  const results = await Promise.all(pinger);
  const updated = results.filter((res) => res[0]);

  // Update devices with changed statuses
  updated.forEach((res) => state.updateDeviceStatus(res[1], toStatus(res[0])));
});
