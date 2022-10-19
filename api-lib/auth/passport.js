import { findUserForAuth, findUserWithEmailAndPassword } from '@/api-lib/db';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { getMongoDb } from '../mongodb';

//passport.js for authentication

//serialize user id into our session -> use same id in deserializer to find user object
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((req, id, done) => {
  getMongoDb().then((db) => {
    findUserForAuth(db, id).then(
      (user) => done(null, user),
      (err) => done(err)
    );
  });
});

//passport-local for email/password authentication
//after using bcrypt to compare password, if everything matches we resolve user via done
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passReqToCallback: true },
    async (req, email, password, done) => {
      const db = await getMongoDb();
      const user = await findUserWithEmailAndPassword(db, email, password);
      if (user) done(null, user);
      else done(null, false, { message: 'Email or password is incorrect' });
    }
  )
);

export default passport;
