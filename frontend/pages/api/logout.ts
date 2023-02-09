import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

const logout = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  res.setHeader(
    'Set-Cookie',
    cookie.serialize('currentUser', '', {
      httpOnly: true,
      maxAge: -1,
      sameSite: 'strict',
      path: '/',
    }),
  );

  res.status(200).json({ message: '成功!' });
};

export default logout;
