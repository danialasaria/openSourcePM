import { CONFIG as MAIL_CONFIG, sendMail } from '@/api-lib/mail';

import COMPANY_NAME from '../../../../constants.js';
import { auths } from '@/api-lib/middlewares';
import { createToken } from '@/api-lib/db';
import { getMongoDb } from '@/api-lib/mongodb';
import nc from 'next-connect';
import { ncOpts } from '@/api-lib/nc';

const handler = nc(ncOpts);

handler.use(...auths);

handler.post(async (req, res) => {
  if (!req.user) {
    res.json(401).end();
    return;
  }

  const db = await getMongoDb();

  const token = await createToken(db, {
    creatorId: req.user._id,
    type: 'emailVerify',
    expireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });

  await sendMail({
    to: req.user.email,
    from: MAIL_CONFIG.from,
    subject: `Verification Email for ${COMPANY_NAME}`,
    html: `
      <div>
        <p>hi, ${req.user.name}</p>
        <p>smack <a href="${process.env.WEB_URI}/verify-email/${token._id}">this link</a> to confirm your email.</p>
      </div>
      `,
  });

  res.status(204).end();
});

export default handler;
