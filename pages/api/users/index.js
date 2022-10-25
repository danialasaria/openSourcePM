import { auths, validateBody } from '@/api-lib/middlewares';
import { findUserByEmail, findUserByUsername, insertUser } from '@/api-lib/db';

import { ValidateProps } from '@/api-lib/constants';
import { getMongoDb } from '@/api-lib/mongodb';
import isEmail from 'validator/lib/isEmail';
import nc from 'next-connect';
import { ncOpts } from '@/api-lib/nc';
import normalizeEmail from 'validator/lib/normalizeEmail';
import { slugUsername } from '@/lib/user';

const handler = nc(ncOpts);

// POST /api/users
handler.post(
  validateBody({
    type: 'object',
    properties: {
      username: ValidateProps.user.username,
      name: ValidateProps.user.name,
      password: ValidateProps.user.password,
      email: ValidateProps.user.email,
    },
    required: ['username', 'name', 'password', 'email'],
    additionalProperties: false,
  }),
  ...auths,
  async (req, res) => {
    const db = await getMongoDb();

    let { username, name, email, password } = req.body;
    //don't want usernames to have unicode
    username = slugUsername(req.body.username);
    // this is to handle things like jane.doe@gmail.com and janedoe@gmail.com being the same
    email = normalizeEmail(req.body.email);
    //check if valid email
    if (!isEmail(email)) {
      res
        .status(400)
        .json({ error: { message: 'The email you entered is invalid.' } });
      return;
    }
    //check if email used
    if (await findUserByEmail(db, email)) {
      res
        .status(403)
        .json({ error: { message: 'The email has already been used.' } });
      return;
    }
    //check if username used
    if (await findUserByUsername(db, username)) {
      res
        .status(403)
        .json({ error: { message: 'The username has already been taken.' } });
      return;
    }
    const user = await insertUser(db, {
      email,
      originalPassword: password,
      bio: '',
      name,
      username,
      linkedin: '',
      personalSite: '',
    });
    req.logIn(user, (err) => {
      if (err) throw err;
      //after login, send back user data
      res.status(201).json({
        user,
      });
    });
  }
);

export default handler;
