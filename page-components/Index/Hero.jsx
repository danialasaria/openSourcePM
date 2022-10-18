import { ButtonLink } from '@/components/Button';
import { Container, Spacer, Wrapper } from '@/components/Layout';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <Wrapper>
      <div>
        <h1 className={styles.title}>
          <span className={styles.nextjs}>Open</span>
          <span className={styles.mongodb}>Source</span>
          <span>PMs</span>
        </h1>
        <Container justifyContent="center" className={styles.buttons}>
          <Container>
            <Link passHref href="/feed">
              <ButtonLink className={styles.button}>Explore Feed</ButtonLink>
            </Link>
          </Container>
          <Spacer axis="horizontal" size={1} />
          <Container>
            <ButtonLink
              href="mailto:dasaria@usc.edu"
              type="secondary"
              className={styles.button}
            >
              Contact Us
            </ButtonLink>
          </Container>
        </Container>
        <p className={styles.subtitle}>
          A platform to raise the next generation of PMs
        </p>
      </div>
    </Wrapper>
  );
};

export default Hero;
