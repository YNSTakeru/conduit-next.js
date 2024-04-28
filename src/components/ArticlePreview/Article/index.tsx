"use client";

import ArticleMeta from "@/components/ArticlePreview/Article/ArticleMeta";
import PreviewLink from "@/components/ArticlePreview/Article/PreviewLink";

export interface Author {
  username: string;
  image: string;
  following: boolean;
}

export interface ArticleProps {
  article: {
    title: string;
    description: string;
    tagList: string[];
    created_at: string;
    favorited: boolean;
    favoritesCount: number;
    author: Author;
  };
}

export default function Article({ article }: ArticleProps) {
  const { author, title, description, tagList, created_at, favoritesCount } =
    article;

  return (
    <div className="article-preview">
      <ArticleMeta
        author={author}
        created_at={created_at}
        favoritesCount={favoritesCount}
      />
      <PreviewLink title={title} description={description} tagList={tagList} />
    </div>
  );
}
