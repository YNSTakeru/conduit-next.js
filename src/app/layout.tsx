import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";

import { cookies } from "next/headers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conduit",
};

export async function getUser() {
  const url = "http://localhost:3000/api/loggedIn";
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

  const res = await fetch(url, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return;
  }
  return res.json();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getUser();
  console.log(user);

  return (
    <html lang="en">
      <body>
        <Header user={user} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
