import ArticlePreviews from "@/components/ArticlePreview";
import { Banner } from "@/components/Banner";
import FeedToggle from "@/components/FeedToggle";
import Pagination from "@/components/Pagination";
import Sidebar from "@/components/Sidebar";

export async function getArticles(
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

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }

  return res.json();
}

export async function getTags() {
  const res = await fetch("http://localhost:3000/api/tags");

  if (!res.ok) {
    throw new Error("Failed to fetch tags");
  }

  return res.json();
}

export async function getPage(
  {
    currentPage = 1,
    tag = "",
  }: {
    currentPage?: Number;
    tag?: string;
  } = { currentPage: 1, tag: "" }
) {
  let url = `http://localhost:3000/api/pages?current_page=${currentPage}`;

  if (tag) {
    url += `&tag=${tag}`;
  }

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch page");
  }

  return res.json();
}

export default async function Home({
  searchParams,
}: {
  searchParams: { currentPage: number | undefined };
}) {
  const currentPage = searchParams.currentPage ? searchParams.currentPage : 1;

  const { articles } = await getArticles({ currentPage });
  const { tags } = await getTags();

  const page = await getPage();

  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggle />
            <ArticlePreviews articles={articles} />
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
