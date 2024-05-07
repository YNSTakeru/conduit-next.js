"use client";

import { UserProps } from "../ArticleDetail";

export default function FeedToggle({
  user,
  tag,
}: {
  user: UserProps;
  tag?: string;
}) {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {user ? (
          <li className="nav-item">
            <a className="nav-link disabled" href="">
              Your Feed
            </a>
          </li>
        ) : (
          <></>
        )}
        <li className="nav-item">
          <a
            className={`nav-link ${tag ? "" : "active"}`}
            href="http://localhost:3000"
          >
            Global Feed
          </a>
        </li>
        {tag ? (
          <li className="nav-item">
            <a
              className={`nav-link active`}
              href={`http://localhost:3000/tags/${tag}`}
            >
              {tag}
            </a>
          </li>
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}
