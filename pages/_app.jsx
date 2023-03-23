import '@/styles/globals.css';
import { Baloo_2 } from "@next/font/google";

import { GlobalStorage } from '@/GlobalContext';


const baloo_2 = Baloo_2({
  subsets: ["latin"],
  weight: ['400', '700'],
});

export default function App({ Component, pageProps }) {
  return (
    <GlobalStorage>
      <div className={baloo_2.className}>
        <Component {...pageProps} />
      </div>
    </GlobalStorage>
  )
}
