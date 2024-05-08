"use client";

import { getFormattedDate } from "@/components/ArticleDetail";
import { Author } from "@/components/ArticlePreview";
import Image from "next/image";
import { useState } from "react";

interface ArticleMetaProps {
  slug: string;
  author: Author;
  created_at: string;
  favorited: boolean;
  favoritesCount: number;
  token?: string;
}

export default function ArticleMeta({
  slug,
  author,
  created_at,
  favorited,
  favoritesCount,
  token,
}: ArticleMetaProps) {
  const { username } = author;

  const formattedDate = getFormattedDate(created_at);
  const [isFavorited, setIsFavorited] = useState(favorited);
  const [count, setCount] = useState(favoritesCount);

  const favoriteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!isFavorited) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/favorite?slug=${slug}`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setIsFavorited(true);
        setCount((prev) => prev + 1);
      }
    } else {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/unfavorite?slug=${slug}`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setIsFavorited(false);
        setCount((prev) => prev - 1);
      }
    }
  };

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
      <button
        className="btn btn-outline-primary btn-sm pull-xs-right"
        onClick={favoriteHandler}
      >
        <i className="ion-heart"></i> {count}
      </button>
    </div>
  );
}
