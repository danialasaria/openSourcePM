import { ValidateProps } from '@/api-lib/constants';
import { findUserByUsername, updateUserById } from '@/api-lib/db';
import { auths, validateBody } from '@/api-lib/middlewares';
import { getMongoDb } from '@/api-lib/mongodb';
import { ncOpts } from '@/api-lib/nc';
import { slugUsername } from '@/lib/user';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import nc from 'next-connect';

//multer is a package to parse uploaded files
//initialize an instance of multer configured to save the file to our temp folder
const upload = multer({ dest: '/tmp' });
const handler = nc(ncOpts);

if (process.env.CLOUDINARY_URL) {
  const {
    hostname: cloud_name,
    username: api_key,
    password: api_secret,
  } = new URL(process.env.CLOUDINARY_URL);

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
  });
}

handler.use(...auths);

handler.get(async (req, res) => {
  if (!req.user) return res.json({ user: null });
  return res.json({ user: req.user });
});

//to update user profile you send a PATCH request to /api/user
handler.patch(
  upload.single('profilePicture'),
  validateBody({
    type: 'object',
    properties: {
      username: ValidateProps.user.username,
      name: ValidateProps.user.name,
      bio: ValidateProps.user.bio,
    },
    additionalProperties: true,
  }),
  //check if user is logged in
  async (req, res) => {
    if (!req.user) {
      req.status(401).end();
      return;
    }

    const db = await getMongoDb();

    //access the file via req.file
    let profilePicture;
    //upload an image by "cloudinary.uploader.upload(imagePath)"
    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path, {
        width: 512,
        height: 512,
        crop: 'fill',
      });
      profilePicture = image.secure_url;
    }
    const { name, bio } = req.body;

    let username;

    if (req.body.username) {
      username = slugUsername(req.body.username);
      if (
        username !== req.user.username &&
        (await findUserByUsername(db, username))
      ) {
        res
          .status(403)
          .json({ error: { message: 'The username has already been taken.' } });
        return;
      }
    }

    const user = await updateUserById(db, req.user._id, {
      ...(username && { username }),
      ...(name && { name }),
      ...(typeof bio === 'string' && { bio }),
      ...(profilePicture && { profilePicture }),
    });

    res.json({ user });
  }
);

//disable next.js 9 body-parser because form parsing is handled by 'Multer'
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
