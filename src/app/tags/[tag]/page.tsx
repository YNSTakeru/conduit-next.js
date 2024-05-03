import { getArticles, getPage, getTags } from "@/app/page";
import ArticlePreviews from "@/components/ArticlePreview";
import { Banner } from "@/components/Banner";
import FeedToggle from "@/components/FeedToggle";
import Pagination from "@/components/Pagination";
import Sidebar from "@/components/Sidebar";

export default async function TagPage({ params }: { params: { tag: string } }) {
  const tag = params.tag;

  const { articles } = await getArticles({ tag });
  const { tags } = await getTags();
  const page = await getPage({ tag });

  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggle />
            <ArticlePreviews articles={articles} />
            <Pagination {...page} tag={tag} />
          </div>

          <div className="col-md-3">
            <Sidebar tags={tags} />
          </div>
        </div>
      </div>
    </div>
  );
}
