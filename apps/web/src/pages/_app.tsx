import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Quicksand } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });
const quicksand = Quicksand({ subsets: ["latin"] });
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={quicksand.className}>
      <GoogleOAuthProvider clientId="859866069949-gfjk74musi75pliovtt2ofcji1td5min.apps.googleusercontent.com">
        <Component {...pageProps} />
      </GoogleOAuthProvider>
    </div>
  );
}
