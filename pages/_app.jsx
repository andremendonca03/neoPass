import { Baloo_2 } from "@next/font/google";
import "@/styles/globals.scss";
import { GlobalStorage } from "@/GlobalContext";
import ContextWrapper from "@/contexts/ContextWrapper";
import Header from "@/components/Header";

const baloo_2 = Baloo_2({
  subsets: ["latin"],
  weight: ["400", "700"],
  fallback: ["Arial", "sans-serif"],
  variable: "--font-baloo",
});

export default function App({ Component, pageProps }) {
  return (
    <GlobalStorage>
      <div className={baloo_2.variable}>
        <Header />
        <ContextWrapper>
          <Component {...pageProps} />
        </ContextWrapper>
      </div>
    </GlobalStorage>
  );
}
