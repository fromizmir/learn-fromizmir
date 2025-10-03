"use client";

import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', borderBottom: '1px solid #eee' }}>
      <div>
        <Link href="/">
          <strong>Learn From Izmir</strong>
        </Link>
      </div>
      <div>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <>
            <Link href="/sign-in" style={{ marginRight: '10px' }}>
              Sign In
            </Link>
            <Link href="/sign-up">
              Sign Up
            </Link>
          </>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;