import { passport } from '@/api-lib/auth';
import { auths } from '@/api-lib/middlewares';
import { ncOpts } from '@/api-lib/nc';
import nc from 'next-connect';

const handler = nc(ncOpts);

handler.use(...auths);

//POST request made to /api/auth and we call passport.authenticate to sign in user based on email/password
//on success 200 and otherwise 401
handler.post(passport.authenticate('local'), (req, res) => {
  res.json({ user: req.user });
});

handler.delete(async (req, res) => {
  await req.session.destroy();
  res.status(204).end();
});

export default handler;
