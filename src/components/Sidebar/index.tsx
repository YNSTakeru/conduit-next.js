"use client";

import TagList from "../ArticlePreview/Article/PreviewLink/TagList";
import { TagProps } from "../ArticlePreview/Article/PreviewLink/TagList/Tag";

export default function Sidebar({ tags }: { tags: TagProps[] }) {
  const tagList: string[] = tags.map((tag) => tag.name);

  console.log(tags);
  return (
    <div className="sidebar">
      <p>Popular Tags</p>

      <TagList tagList={tagList} />
    </div>
  );
}
