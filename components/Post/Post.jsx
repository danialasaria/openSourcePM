import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Layout';
import clsx from 'clsx';
import Link from 'next/link';
import Linkify from 'react-linkify';
import { CustomLink } from '../CustomLink';
import { useMemo } from 'react';
import { useCommentPages } from '@/lib/comment';
import styles from './Post.module.css';

const Post = ({ post, className }) => {
  const { data } = useCommentPages(
    { postId: post._id }
  );
  const comments = data
    ? data.reduce((acc, val) => [...acc, ...val.comments], [])
    : [];
  const numberOfReplies = comments.length;
  const timestampTxt = useMemo(() => {
    const now = new Date();
    const createdAt = new Date(post.createdAt);
    const diffInSeconds = (now - createdAt) / 1000;

    if (diffInSeconds < 60) return 'Just now'; // Less than 1 minute
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`; // Less than 1 hour
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`; // Less than 1 day
    if (diffInSeconds < 2592000) return `${createdAt.toLocaleString('default', { month: 'short' })} ${createdAt.getDate()}`; // Less than 1 year

    return `${createdAt.toLocaleString('default', { month: 'short' })} ${createdAt.getDate()}, ${createdAt.getFullYear()}`; // More than 1 year
  }, [post.createdAt]);
  return (
    <div className={clsx(styles.root, className)}>
      <Link href={`/user/${post.creator.username}`}>
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
      </Link>
      <div className={styles.wrap}>
        <p className={styles.content}>
          <Linkify componentDecorator={(decoratedHref, decoratedText, key) => (
              <CustomLink href={decoratedHref} key={key}>
                {decoratedText}
              </CustomLink>
            )}>
              {post.content}
          </Linkify>
        </p>
      </div>
      <div className={styles.wrap}>
        <time dateTime={String(post.createdAt)} className={styles.timestamp}>
          {timestampTxt}
        </time>
        <div style={{display: 'flex', paddingLeft: '4px', paddingTop: '1px'}}>
          <img src="/images/replyIcon.png" alt='replies icon' height={'16px'} color='grey'/>
        </div>
        <div style={{display: 'flex', color: '#666', paddingLeft: '2px'}}>
          {numberOfReplies}
        </div>
      </div>
    </div>
  );
};

export default Post;
