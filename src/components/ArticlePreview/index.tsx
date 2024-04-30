"use client";

import Article from "@/components/ArticlePreview/Article";

export interface Author {
  username: string;
  image: string;
  following: boolean;
}

export interface ArticleProps {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

export default function ArticlePreviews({
  articles,
}: {
  articles: ArticleProps[];
}) {
  return (
    <>
      {articles.map((article, index) => (
        <Article key={index} article={article} />
      ))}
    </>
  );
}
