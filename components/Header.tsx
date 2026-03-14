"use client";
import Link from "next/link";
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.leftSection}>
        <Link href="/" className={styles.logo}>
          <strong>Learn From Izmir</strong>
        </Link>
        <Link href="/quizzes" className={styles.navLink}>
          Quizzes
        </Link>
      </div>
      <div className={styles.rightSection}>
        <a href="https://fromizmir.com" target="_blank" className={styles.navLink}>
          Blog
        </a>
        <a href="https://openvideo.fromizmir.com/" target="_blank" className={styles.navLink}>
          Videos
        </a>
      </div>
    </header>
  );
}
