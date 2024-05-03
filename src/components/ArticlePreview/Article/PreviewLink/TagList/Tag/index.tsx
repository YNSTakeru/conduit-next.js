"use client";

export interface TagProps {
  id: number;
  name: string;
  favorite_count: number;
  created_at: string;
  updated_at: string;
}

export default function Tag({
  name,
  isArticle = false,
}: {
  name: string;
  isArticle?: boolean;
}) {
  const handleClick = () => {
    window.location.href = `/tags/${name}`;
  };

  return (
    <li
      className={`tag-default tag-pill ${isArticle ? "tag-outline" : ""}`}
      onClick={handleClick}
    >
      {name}
    </li>
  );
}
