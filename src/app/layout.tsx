import type { Metadata } from "next";
import Head from "next/head";
import Header from "./components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conduit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
      </Head>
      <body>
        <Header />
        <main>{children}</main>
        <footer>
          <div className="container">
            <a href="/" className="logo-font">
              conduit
            </a>
            <span className="attribution">
              An interactive learning project from{" "}
              <a href="https://thinkster.io">Thinkster</a>. Code &amp; design
              licensed under MIT.
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
