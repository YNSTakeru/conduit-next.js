import type { Metadata } from "next";
import Head from "next/head";
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
        <header>
          <nav className="navbar navbar-light">
            <div className="container">
              <a className="navbar-brand" href="/">
                conduit
              </a>
              <ul className="nav navbar-nav pull-xs-right">
                <li className="nav-item">
                  <a className="nav-link active" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Sign in
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Sign up
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
