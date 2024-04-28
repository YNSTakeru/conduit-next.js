"use client";

import ArticlePreview from "../components/ArticlePreview";
import { Banner } from "../components/Banner";
import FeedToggle from "../components/FeedToggle";
import Pagination from "../components/Pagination";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggle />
            <ArticlePreview />
            <Pagination />
          </div>

          <div className="col-md-3">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
