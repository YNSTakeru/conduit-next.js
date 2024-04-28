import ArticlePreview from "@/components/ArticlePreview";
import Pagination from "@/components/Pagination";
import ArticleToggle from "@/components/Profile/ArticleToggle";
import UserInfo from "@/components/Profile/UserInfo";

export default function Profile() {
  return (
    <div className="profile-page">
      <UserInfo />

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <ArticleToggle />
            <ArticlePreview />
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}
