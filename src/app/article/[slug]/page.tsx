import ArticleDetail from "@/components/ArticleDetail";
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
  const url = "http://localhost:3000/api/loggedIn";
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

async function getArticle({ slug, token }: { slug: string; token?: string }) {
  const url = `http://localhost:3000/api/article?slug=${slug}`;

  const res = await fetch(url, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return { message: "Articleが見つかりませんでした" };
  }

  return res.json();
}

async function getComments({ slug, token }: { slug: string; token?: string }) {
  const url = `http://localhost:3000/api/comment?slug=${slug}`;

  const res = await fetch(url, {
    credentials: "include",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    return { message: "コメントが見つかりませんでした" };
  }

  return res.json();
}

export default async function Detail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = await getUser();
  const token = getToken();
  const { article } = await getArticle({ slug, token });

  const { comments } = await getComments({ slug, token });

  return (
    <ArticleDetail
      user={data.user}
      token={token}
      article={article}
      fromComments={comments}
    />
  );
}
