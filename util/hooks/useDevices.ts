import { Device } from '@prisma/client';
import { REFRESH_INTERVAL } from '@util/constants';
import { fetchDevices } from '@util/devices';
import { sortBy, unionBy } from 'lodash';
import { useEffect, useState } from 'react';

const useDevices = () => {
  const [refresh, setRefresh] = useState<number | string>('');
  const [devices, setDevices] = useState<Device[]>();

  // Update `refresh` and `devices`, merging device arrays
  const update = async () => {
    const data = await fetchDevices(refresh);
    const updated = unionBy(devices, data.devices, 'id');
    const sorted = sortBy(updated, ['status']);

    setRefresh(data.refresh);
    setDevices(sorted);
  };

  // Call update immediately and every <REFRESH_INTERVAL> seconds
  useEffect(() => {
    update();
    setInterval(update, REFRESH_INTERVAL * 1000);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return devices;
};

export default useDevices;
