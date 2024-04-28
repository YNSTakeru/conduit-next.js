import Tag from "@/components/ArticlePreview/Article/PreviewLink/TagList/Tag";

export default function TagList({ tagList }: { tagList: string[] }) {
  return (
    <ul className="tag-list">
      {tagList.map((tag) => (
        <Tag key={tag} tag={tag} />
      ))}
    </ul>
  );
}
