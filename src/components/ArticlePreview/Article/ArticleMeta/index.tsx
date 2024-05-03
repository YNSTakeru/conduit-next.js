"use client";

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
  const { username, image } = author;

  return (
    <div className="article-meta">
      <a href={`profile/${username}`}>
        <Image src={image} alt="" width={32} height={32} />
      </a>
      <div className="info">
        <a href={`profile/${username}`} className="author">
          {username}
        </a>
        <span className="date">{created_at}</span>
      </div>
      <button className="btn btn-outline-primary btn-sm pull-xs-right">
        <i className="ion-heart"></i> {favoritesCount}
      </button>
    </div>
  );
}
