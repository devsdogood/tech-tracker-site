import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { DeviceCreateResponse } from '@shared/types/device';
import { ApiResult } from '@shared/types/util';

const create = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResult<DeviceCreateResponse>>,
) => {
  const { name, ip } = req.query;

  // TODO: flesh out error handling/schema
  if (!name || Array.isArray(name)) {
    res.status(400).send({ error: '<name> must be defined' });
    throw new Error('Name was not defined');
  }

  if (!ip || Array.isArray(ip)) {
    res.status(400).send({ error: '<ip> must be defined' });
    throw new Error('IP address was not defined');
  }

  const prisma = new PrismaClient();
  const device = await prisma.device.create({
    data: {
      name,
      ip,
    },
  });

  res.json({
    device,
  });
};

export default create;
