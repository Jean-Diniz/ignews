import { AppProps } from "next/app";
import { SessionProvider as NextAuthProvider } from "next-auth/react";

import "../../styles/globals.scss";
import { Header } from "../components/Header";
import { Session } from "next-auth";

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{
  session: Session;
}>) {
  return (
    <NextAuthProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </NextAuthProvider>
  );
}

export default MyApp;
