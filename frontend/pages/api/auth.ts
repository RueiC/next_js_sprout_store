import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';
import { client } from '../../utils/client';

const auth = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const user = req.body;

  await client.createIfNotExists(user);

  res.setHeader(
    'Set-Cookie',
    cookie.serialize('currentUser', JSON.stringify(user), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // a week
      sameSite: 'strict',
      path: '/',
    }),
  );

  res.status(200).json({ message: '成功!' });
};

export default auth;
