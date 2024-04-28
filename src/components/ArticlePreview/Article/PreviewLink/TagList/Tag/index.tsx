"use client";

interface TagProps {
  tag: string;
}

export default function Tag({ tag }: TagProps) {
  return (
    <li key={tag} className="tag-default tag-pill tag-outline">
      {tag}
    </li>
  );
}
