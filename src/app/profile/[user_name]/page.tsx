import ArticlePreviews from "@/components/ArticlePreview";
import Pagination from "@/components/Pagination";
import ArticleToggle from "@/components/Profile/ArticleToggle";
import UserInfo from "@/components/Profile/UserInfo";
import { Suspense } from "react";
import { getArticles, getPage } from "../../page";

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