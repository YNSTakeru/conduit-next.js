import ArticlePreviews from "@/components/ArticlePreview";
import { Banner } from "@/components/Banner";
import FeedToggle from "@/components/FeedToggle";
import Pagination from "@/components/Pagination";
import Sidebar from "@/components/Sidebar";
import { cookies } from "next/headers";
import { Suspense } from "react";

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

  console.log(url);
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

async function getTags() {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/tags`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch tags");
  }

  return res.json();
}

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

export const revalidate = 2;

export default async function Home({
  searchParams,
}: {
  searchParams: { currentPage: number | undefined };
}) {
  const currentPage = searchParams.currentPage ? searchParams.currentPage : 1;

  const { articles } = await getArticles({ currentPage });
  const { tags } = await getTags();
  const page = await getPage();
  const data = await getUser();
  const token = getToken();

  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggle user={data.user} />
            <Suspense fallback={<div>Loading Articles...</div>}>
              <ArticlePreviews articles={articles} token={token} />
            </Suspense>
            <Pagination {...page} />
          </div>

          <div className="col-md-3">
            <Sidebar tags={tags} />
          </div>
        </div>
      </div>
    </div>
  );
}
