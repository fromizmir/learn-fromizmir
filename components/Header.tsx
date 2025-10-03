"use client"; // Bu satır önemlidir, bileşenin tarayıcıda çalışacağını belirtir.

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
          {/* Bu kısım sadece kullanıcı giriş yaptığında görünür */}
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          {/* Bu kısım sadece misafirler için görünür */}
          <>
            <Link href="/sign-in" style={{ marginRight: '10px' }}>
              Giriş Yap
            </Link>
            <Link href="/sign-up">
              Kayıt Ol
            </Link>
          </>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;