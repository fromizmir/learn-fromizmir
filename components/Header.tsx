// Dosya: components/Header.tsx

"use client";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import styles from './Header.module.css'; // Yeni stil dosyasını import et

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
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in" className={styles.navLink}>Sign In</Link>
          <Link href="/sign-up" className={styles.navLink}>Sign Up</Link>
        </SignedOut>
      </div>
    </header>
  );
}