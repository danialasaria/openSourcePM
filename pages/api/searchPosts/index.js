import { getMongoDb } from '@/api-lib/mongodb';
import nc from 'next-connect';
import { ncOpts } from '@/api-lib/nc';
import { searchPosts } from '@/api-lib/db';

const handler = nc(ncOpts);

handler.get(async (req, res) => {
  const db = await getMongoDb();

  const posts = await searchPosts(
    db,
    req.query.body,
    req.query.limit ? parseInt(req.query.limit, 10) : undefined
  );
  console.log(posts);
  res.json({ posts });
});

export default handler;
