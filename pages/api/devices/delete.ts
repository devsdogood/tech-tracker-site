import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { DeviceDeleteResponse } from '@shared/types/device';
import { ApiResult } from '@shared/types/util';

const del = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResult<DeviceDeleteResponse>>,
) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).send({ error: '<id> must be defined' });
    throw new Error('Device ID was not defined');
  }

  const prisma = new PrismaClient();

  try {
    await prisma.device.delete({
      where: {
        id,
      },
    });

    res.json({
      success: true,
    });
  } catch (e) {
    res.status(400).send({ error: String(e) });
  }
};

export default del;
