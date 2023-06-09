import React from "react";
import { GlobalContext } from "@/GlobalContext";
import styles from "@/styles/Header.module.scss";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const global = React.useContext(GlobalContext);

  const pathname = global.useRouter().pathname;
  const isHome = pathname === "/";

  return (
    <>
      <header className={styles.headerBg}>
        <div className={`${styles.header}`} data-home={isHome}>
          <Link href="/" className={styles.headerLogo}>
            <Image src="/logo.png" width={197} height={42} alt="neoPass Logo" />
          </Link>

          {isHome && (
            <>
              <nav className={styles.headerNav}>
                <Link href="/login">Login</Link>
                <Link href="/signup">Sign Up</Link>
              </nav>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
