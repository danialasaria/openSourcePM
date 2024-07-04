import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Layout';
import clsx from 'clsx';
import Link from 'next/link';
import { useMemo } from 'react';
import styles from './Comment.module.css';

const Comment = ({ comment, className }) => {
  const timestampTxt = useMemo(() => {
    const now = new Date();
    const createdAt = new Date(comment.createdAt);
    const diffInSeconds = (now - createdAt) / 1000;

    if (diffInSeconds < 60) return 'Just now'; // Less than 1 minute
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`; // Less than 1 hour
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`; // Less than 1 day
    if (diffInSeconds < 2592000) return `${createdAt.toLocaleString('default', { month: 'short' })} ${createdAt.getDate()}`; // Less than 1 year

    return `${createdAt.toLocaleString('default', { month: 'short' })} ${createdAt.getDate()}, ${createdAt.getFullYear()}`; // More than 1 year
  }, [comment.createdAt]);
  return (
    <div className={clsx(styles.root, className)}>
      <Link href={`/user/${comment.creator.username}`}>
          <Container className={styles.creator}>
            <Avatar
              size={36}
              url={comment.creator.profilePicture}
              username={comment.creator.username}
            />
            <Container column className={styles.meta}>
              <p className={styles.name}>{comment.creator.name}</p>
              <p className={styles.username}>{comment.creator.username}</p>
            </Container>
          </Container>
      </Link>
      <div className={styles.wrap}>
        <p className={styles.content}>{comment.content}</p>
      </div>
      <div className={styles.wrap}>
        <time dateTime={String(comment.createdAt)} className={styles.timestamp}>
          {timestampTxt}
        </time>
      </div>
    </div>
  );
};

export default Comment;
