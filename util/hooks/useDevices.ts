import { Device } from "@prisma/client";
import { REFRESH_INTERVAL } from "@util/constants";
import { fetchDevices } from "@util/devices";
import { unionBy } from "lodash";
import { useEffect, useState } from "react";

const useDevices = () => {
  const [refresh, setRefresh] = useState<number | string>("");
  const [devices, setDevices] = useState<Device[]>();

  // Update `refresh` and `devices`, merging device arrays
  const update = async () => {
    const data = await fetchDevices(refresh);
    const updated = unionBy(devices, data.devices, "id");

    setRefresh(data.refresh);
    setDevices(updated);
  };

  // Call update immediately and every <REFRESH_INTERVAL> seconds
  useEffect(() => {
    update();
    setInterval(update, REFRESH_INTERVAL * 1000);
  }, []);

  return devices;
};

export default useDevices;
