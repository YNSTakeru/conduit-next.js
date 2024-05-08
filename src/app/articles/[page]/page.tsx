import { getPage } from "@/app/page";
import ArticlePreviews from "@/components/ArticlePreview";
import { Banner } from "@/components/Banner";
import FeedToggle from "@/components/FeedToggle";
import Pagination from "@/components/Pagination";
import Sidebar from "@/components/Sidebar";
import { cookies } from "next/headers";
import { Suspense } from "react";

async function getTags() {
  const res = await fetch("http://localhost:3000/api/tags");

  if (!res.ok) {
    throw new Error("Failed to fetch tags");
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
  let url = `http://localhost:3000/api/articles?current_page=${currentPage}`;

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

export default async function ArticlePage({
  params,
}: {
  params: { page: number };
}) {
  const currentPage = params.page;

  const { articles } = await getArticles({ currentPage });
  const { tags } = await getTags();
  const page = await getPage({ currentPage });
  const data = await getUser();

  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggle user={data.user} />
            <Suspense fallback={<div>Loading Blogs...</div>}>
              <ArticlePreviews articles={articles} />
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
