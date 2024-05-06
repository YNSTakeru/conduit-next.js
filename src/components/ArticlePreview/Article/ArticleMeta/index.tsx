"use client";

import { getFormattedDate } from "@/components/ArticleDetail";
import { Author } from "@/components/ArticlePreview";
import Image from "next/image";

interface ArticleMetaProps {
  author: Author;
  created_at: string;
  favoritesCount: number;
}

export default function ArticleMeta({
  author,
  created_at,
  favoritesCount,
}: ArticleMetaProps) {
  const { username } = author;

  const formattedDate = getFormattedDate(created_at);

  return (
    <div className="article-meta">
      <a href={`profile/${username}`}>
        <Image
          src={
            author.image
              ? author.image
              : "https://via.placeholder.com/640x480.png/0066cc?text=qui"
          }
          alt=""
          width={32}
          height={32}
        />
      </a>
      <div className="info">
        <a href={`profile/${username}`} className="author">
          {username}
        </a>
        <span className="date">{formattedDate}</span>
      </div>
      <button className="btn btn-outline-primary btn-sm pull-xs-right">
        <i className="ion-heart"></i> {favoritesCount}
      </button>
    </div>
  );
}
