import { getArticles, getPage, getTags } from "@/app/page";
import ArticlePreviews from "@/components/ArticlePreview";
import { Banner } from "@/components/Banner";
import FeedToggle from "@/components/FeedToggle";
import Pagination from "@/components/Pagination";
import Sidebar from "@/components/Sidebar";

export default async function ArticlePage({
  params,
}: {
  params: { page: number };
}) {
  const currentPage = params.page;

  const { articles } = await getArticles(currentPage);
  const { tags } = await getTags();
  console.log(currentPage);
  const page = await getPage(currentPage);

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
