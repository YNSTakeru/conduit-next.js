import EditArticle from "@/components/EditArticle";
import { cookies } from "next/headers";

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

async function getArticle(slug: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/article?slug=${slug}`;

  const res = await fetch(url);

  if (!res.ok) {
    return { message: "Articleが見つかりませんでした" };
  }

  return res.json();
}

export default async function Edit({ params }: { params: { slug: string } }) {
  const data = await getUser();
  const token = getToken();
  const { slug } = params;
  const { article } = await getArticle(slug);

  return <EditArticle user={data.user} token={token} article={article} />;
}
