import { Avatar } from '@/components/Avatar';
import { Container } from '@/components/Layout';
import styles from './UserHeader.module.css';

const UserHeader = ({ user }) => {
  return (
    <Container className={styles.root} column alignItems="center">
      <div className={styles.avatar}>
        <Avatar size={168} username={user.username} url={user.profilePicture} />
      </div>
      <h1>
        <div className={styles.name}>{user.name}</div>
        <div className={styles.username}>@{user.username}</div>
      </h1>
      <p className={styles.bio}>{user.bio}</p>
      {user.linkedin && (
        <div style={{textDecoration: 'underline'}}>
          <a href={user.linkedin} className={styles.bio}>
            LinkedIn
          </a>
        </div>
      )}
      {user.personalSite && (
        <div style={{textDecoration: 'underline'}}>
          <a href={user.personalSite} className={styles.bio}>
            Personal Website
          </a>
        </div>
      )}
    </Container>
  );
};

export default UserHeader;
