import PostList from './PostList';
import Poster from './Poster';
// import SearchBar from './searchBar';
import { Spacer } from '@/components/Layout';
import styles from './Feed.module.css';

export const Feed = () => {
  return (
    <div className={styles.root}>
      <Spacer size={1} axis="vertical" />
      <Poster />
      <Spacer size={1} axis="vertical" />
      {/* <SearchBar /> */}
      <PostList />
    </div>
  );
};
