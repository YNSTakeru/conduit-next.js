"use client";

import ArticleMeta from "@/components/ArticlePreview/Article/ArticleMeta";
import PreviewLink from "@/components/ArticlePreview/Article/PreviewLink";

import { ArticleProps } from "@/components/ArticlePreview";

export default function Article({
  article,
  token,
}: {
  article: ArticleProps;
  token?: string;
}) {
  const {
    author,
    title,
    description,
    tagList,
    createdAt,
    favorited,
    favoritesCount,
    slug,
  } = article;

  return (
    <div className="article-preview">
      <ArticleMeta
        slug={slug}
        author={author}
        created_at={createdAt}
        favorited={favorited}
        favoritesCount={favoritesCount}
        token={token}
      />
      <PreviewLink
        title={title}
        description={description}
        tagList={tagList}
        slug={slug}
      />
    </div>
  );
}
