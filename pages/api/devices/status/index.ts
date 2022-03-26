import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { DeviceResponse } from "@shared/types/device";

const status = async (_: NextApiRequest, res: NextApiResponse<DeviceResponse>) => {
    const prisma = new PrismaClient();
    const devices = await prisma.device.findMany();

    res.json({
        devices,
        refresh: Date.now(),
    });
};

export default status;
