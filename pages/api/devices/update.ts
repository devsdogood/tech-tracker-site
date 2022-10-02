import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { DeviceCreateResponse } from '@shared/types/device';
import { ApiResult } from '@shared/types/util';

const update = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResult<DeviceCreateResponse>>,
) => {
  const { id, name, ip } = req.body;

  // TODO: flesh out error handling/schema
  if (!id) {
    res.status(400).send({ error: '<id> must be defined' });
    throw new Error('ID was not defined');
  }

  if (!name) {
    res.status(400).send({ error: '<name> must be defined' });
    throw new Error('Name was not defined');
  }

  if (!ip) {
    res.status(400).send({ error: '<ip> must be defined' });
    throw new Error('IP address was not defined');
  }

  const prisma = new PrismaClient();

  try {
    const device = await prisma.device.update({
      where: {
        id,
      },
      data: {
        name,
        ip,
      },
    });

    res.json({
      device,
    });
  } catch (e) {
    res.status(400).send({ error: String(e) });
  }
};

export default update;
