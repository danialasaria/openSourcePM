import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Layout';
import Link from 'next/link';
import clsx from 'clsx';
import { format } from '@lukeed/ms';
import styles from './Post.module.css';
import { useCommentPages } from '@/lib/comment';
import { useMemo } from 'react';

const Post = ({ post, className }) => {
  const { data } = useCommentPages({ postId: post._id });

  const replies = data
    ? data.reduce((acc, val) => [...acc, ...val.comments], [])
    : [];
  const replyCount = replies.length;
  const timestampTxt = useMemo(() => {
    const diff = Date.now() - new Date(post.createdAt).getTime();
    if (diff < 1 * 60 * 1000) return 'Just now';
    return `${format(diff, true)} ago`;
  }, [post.createdAt]);
  return (
    <div className={clsx(styles.root, className)}>
      <Link href={`/user/${post.creator.username}`}>
        <a>
          <Container className={styles.creator}>
            <Avatar
              size={36}
              url={post.creator.profilePicture}
              username={post.creator.username}
            />
            <Container column className={styles.meta}>
              <p className={styles.name}>{post.creator.name}</p>
              <p className={styles.username}>{post.creator.username}</p>
            </Container>
          </Container>
        </a>
      </Link>
      <div className={styles.wrap}>
        <p className={styles.content}>{post.content}</p>
      </div>
      <div className={styles.wrap}>
        <time dateTime={String(post.createdAt)} className={styles.timestamp}>
          {timestampTxt}
        </time>
        <p className={styles.name}>{replyCount} replies</p>
      </div>
    </div>
  );
};

export default Post;
