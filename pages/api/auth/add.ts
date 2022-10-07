import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { UserCreateResponse } from '@shared/types/device';
import { ApiResult } from '@shared/types/util';

const add = async (
  req: NextApiRequest,
  res: NextApiResponse<ApiResult<UserCreateResponse>>,
) => {
  const { email } = req.body;

  // TODO: flesh out error handling/schema
  if (!email) {
    res.status(400).send({ error: '<email> must be defined' });
    throw new Error('Email was not defined');
  }

  const prisma = new PrismaClient();

  try {
    const user = await prisma.user.create({
      data: {
        email
      },
    });

    res.json({
      user,
    });
  } catch (e) {
    res.status(400).send({ error: String(e) });
  }
};

export default add;
