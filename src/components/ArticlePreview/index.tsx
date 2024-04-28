"use client";

import Article from "@/components/ArticlePreview/Article";

const articles = [
  {
    title: "How to build webapps that scale",
    description: "This is the description for the post.",
    tagList: ["Web Development", "JavaScript"],
    created_at: "January 20th",
    favorited: false,
    favoritesCount: 29,
    author: {
      username: "Eric Simons",
      image: "http://i.imgur.com/Qr71crq.jpg",
      following: false,
    },
  },
  {
    title: "The song you won't ever stop singing. No matter how hard you try.",
    description: "This is the description for the post.",
    tagList: ["realworld", "implementations"],
    created_at: "January 20th",
    favorited: false,
    favoritesCount: 32,
    author: {
      username: "Albert Pai",
      image: "http://i.imgur.com/N4VcUeJ.jpg",
      following: false,
    },
  },
];

export default function ArticlePreview() {
  return (
    <>
      {articles.map((article, index) => (
        <Article key={index} article={article} />
      ))}
    </>
  );
}
