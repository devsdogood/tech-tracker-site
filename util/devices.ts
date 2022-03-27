import { Status } from "@prisma/client";
import { DeviceResponse } from "@shared/types/device";

export const fetchDevices = async (
  refresh: string | number
): Promise<DeviceResponse> => {
  const response = await fetch(`/api/devices/status/${refresh}`);
  const data: DeviceResponse = await response.json();

  return data;
};

export const toStatus = (bool: boolean): Status => {
  if (bool) return "ONLINE";
  else return "OFFLINE";
}
