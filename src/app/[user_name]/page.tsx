import ArticlePreviews from "@/components/ArticlePreview";
import Pagination from "@/components/Pagination";
import ArticleToggle from "@/components/Profile/ArticleToggle";
import UserInfo from "@/components/Profile/UserInfo";
import { getArticles } from "../page";

export default async function Profile() {
  const { articles } = await getArticles();

  return (
    <div className="profile-page">
      <UserInfo />

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <ArticleToggle />
            <ArticlePreviews articles={articles} />
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
