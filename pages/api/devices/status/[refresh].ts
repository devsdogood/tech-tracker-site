import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { DeviceResponse } from '@shared/types/device';
import { ApiResult } from '@shared/types/util';

const status = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResult<DeviceResponse>>,
) => {
  const { refresh } = req.query;

  if (Array.isArray(refresh) || Number.isNaN(+refresh)) {
    res.status(400).send({ error: '<refresh> must be a number' });
    throw new Error('Refresh was not a number');
  }

  const prisma = new PrismaClient();
  const devices = await prisma.device.findMany({
    where: {
      lastUpdated: { gte: new Date(Number.parseInt(refresh, 10)) },
    },
  });

  res.json({
    devices,
    refresh: Date.now(),
  });
};

export default status;
