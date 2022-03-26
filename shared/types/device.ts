import { Device } from "@prisma/client";

export type DeviceResponse = {
  devices: Device[];
  refresh: number;
};
