import React from 'react';
import { GlobalContext } from "@/GlobalContext";
import styles from "@/styles/Footer.module.scss";

const Footer = () => {
  const global = React.useContext(GlobalContext);

  return (
    <footer className={styles.footerBg}>
      <div className={styles.footer}>
        <global.Link href="/" className={styles.footerLogo}>
          <global.Image src="/logo-alt.png" alt="NeoPass Logo" width={197} height={42} />
        </global.Link>

        <nav className={styles.footerSocials}>
          <p>Follow us on our socials:</p>
          <div className={styles.socialsWrapper}>
            <global.Link href="https://facebook.com">
              <global.Image src="/facebook-icon.svg" alt="Facebook logo" width={20} height={20} />
            </global.Link>
            <global.Link href="https://instagram.com">
              <global.Image src="/instagram-icon.svg" alt="Instagram logo" width={20} height={20} />
            </global.Link>
            <global.Link href="https://linkedin.com">
              <global.Image src="/linkedin-icon.svg" alt="Linkedin logo" width={20} height={20} />
            </global.Link>
          </div>
        </nav>
      </div>
      <p className={styles.footerCopy}>
        Project Built by <global.Link href="https://andremendonca.me" target="_blank" rel="author" >Andre Mendonca</global.Link>.
      </p>
    </footer>
  )
}

export default Footer;