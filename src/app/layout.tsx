import Footer from "@/components/Footer";
import type { Metadata } from "next";

import Header from "@/components/Header";
import { cookies } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conduit",
};

function getToken() {
  const cookieStore = cookies();
  let token;

  if (
    typeof cookieStore === "object" &&
    cookieStore !== null &&
    "_parsed" in cookieStore
  ) {
    const parsedCookies = cookieStore._parsed as Map<
      string,
      { name: string; value: string }
    >;
    const tokenObject = parsedCookies.get("token");
    if (tokenObject) {
      token = tokenObject.value;
    }
  }

  return token;
}

async function getUser() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/loggedIn`;
  const cookieStore = cookies();
  let token = getToken();

  const res = await fetch(url, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return res.json();
  }
  return res.json();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getUser();

  return (
    <html lang="en">
      <body>
        <Header user={data.user} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
