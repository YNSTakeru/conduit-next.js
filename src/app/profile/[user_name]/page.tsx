import ArticlePreviews from "@/components/ArticlePreview";
import Pagination from "@/components/Pagination";
import ArticleToggle from "@/components/Profile/ArticleToggle";
import UserInfo from "@/components/Profile/UserInfo";
import { cookies } from "next/headers";
import { Suspense } from "react";

async function getPage(
  {
    currentPage = 1,
    tag = "",
  }: {
    currentPage?: Number;
    tag?: string;
  } = { currentPage: 1, tag: "" }
) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/pages?current_page=${currentPage}`;

  if (tag) {
    url += `&tag=${tag}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch page");
  }

  return res.json();
}

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

async function getArticles(
  {
    currentPage = 1,
    tag = "",
  }: {
    currentPage?: Number;
    tag?: string;
  } = { currentPage: 1, tag: "" }
) {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/api/articles?current_page=${currentPage}`;

  if (tag) {
    url += `&tag=${tag}`;
  }

  const token = getToken();

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  return res.json();
}

export default async function Profile({
  searchParams,
  params,
}: {
  searchParams: { currentPage: number | undefined };
  params: { user_name: string };
}) {
  const currentPage = searchParams.currentPage ? searchParams.currentPage : 1;

  const { user_name } = params;
  const userName = decodeURIComponent(user_name);

  const { articles } = await getArticles({ currentPage });
  const page = await getPage();

  return (
    <div className="profile-page">
      <UserInfo username={userName} />

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <ArticleToggle />
            <Suspense fallback={<div>Loading Blogs...</div>}>
              <ArticlePreviews articles={articles} />
            </Suspense>
            <Pagination {...page} />
          </div>
        </div>
      </div>
    </div>
  );
}
