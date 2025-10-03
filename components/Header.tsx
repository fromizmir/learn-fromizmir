import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  const { userId } = auth();

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
      <div>
        <Link href="/">Ana Sayfa</Link>
      </div>
      <div>
        {userId ? (
          <UserButton afterSignOutUrl="/" />
        ) : (
          <>
            <Link href="/sign-in" style={{ marginRight: '10px' }}>Giriş Yap</Link>
            <Link href="/sign-up">Kayıt Ol</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;