import { getToken, getUser } from "@/app/layout";
import ArticleDetail from "@/components/ArticleDetail";

async function getArticle(slug: string) {
  const url = `http://localhost:3000/api/article?slug=${slug}`;

  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch article");

  return res.json();
}

export default async function Detail({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const data = await getUser();
  const token = getToken();
  const { article } = await getArticle(slug);

  return <ArticleDetail user={data.user} token={token} article={article} />;
}
