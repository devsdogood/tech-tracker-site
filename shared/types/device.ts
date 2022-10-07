import { Device, User } from '@prisma/client';

export type DeviceResponse = {
  devices: Device[];
  refresh: number;
};

export type UserCreateResponse = {
  user: User,
};

export type DeviceCreateResponse = {
  device: Device,
};
