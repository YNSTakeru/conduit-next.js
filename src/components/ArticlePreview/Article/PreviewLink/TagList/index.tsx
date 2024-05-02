"use client";

import Tag from "@/components/ArticlePreview/Article/PreviewLink/TagList/Tag";

export default function TagList({
  tagList,
  isArticle = false,
}: {
  tagList: string[];
  isArticle?: boolean;
}) {
  return (
    <ul className="tag-list">
      {tagList.map((tag, index) => (
        <Tag key={index} name={tag} isArticle={isArticle} />
      ))}
    </ul>
  );
}
