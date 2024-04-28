"use client";

import TagList from "@/components/ArticlePreview/Article/PreviewLink/TagList";

interface PreviewLinkProps {
  title: string;
  description: string;
  tagList: string[];
}

export default function PreviewLink({
  title,
  description,
  tagList,
}: PreviewLinkProps) {
  return (
    <a href="" className="preview-link">
      <h1>{title}</h1>
      <p>{description}</p>
      <span>Read more...</span>
      <TagList tagList={tagList} />
    </a>
  );
}
