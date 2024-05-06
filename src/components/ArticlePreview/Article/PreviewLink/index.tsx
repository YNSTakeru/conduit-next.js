"use client";

import TagList from "@/components/ArticlePreview/Article/PreviewLink/TagList";

interface PreviewLinkProps {
  title: string;
  description: string;
  tagList: string[];
  slug: string;
}

export default function PreviewLink({
  title,
  description,
  tagList,
  slug,
}: PreviewLinkProps) {
  return (
    <a href={`http://localhost:3000/article/${slug}`} className="preview-link">
      <h1>{title}</h1>
      <p>{description}</p>
      <span>Read more...</span>
      <TagList tagList={tagList} isArticle />
    </a>
  );
}
