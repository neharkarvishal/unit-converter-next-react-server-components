import styles from './header.module.css';
import Link from 'next/link';

const navItems = [{ title: 'Converter' }];

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Link href="/">
          <span className={styles.logo}>
            <span className={styles.n}>UC</span>
          </span>

          <span className={styles['site-title']}>Unit Converter</span>
        </Link>
      </div>
    </header>
  );
}
