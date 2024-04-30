"use client";

import ArticleMeta from "@/components/ArticlePreview/Article/ArticleMeta";
import PreviewLink from "@/components/ArticlePreview/Article/PreviewLink";

import { ArticleProps } from "@/components/ArticlePreview";

export default function Article({ article }: { article: ArticleProps }) {
  const { author, title, description, tagList, createdAt, favoritesCount } =
    article;

  return (
    <div className="article-preview">
      <ArticleMeta
        author={author}
        created_at={createdAt}
        favoritesCount={favoritesCount}
      />
      <PreviewLink title={title} description={description} tagList={tagList} />
    </div>
  );
}
