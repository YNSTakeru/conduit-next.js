import { getToken, getUser } from "@/app/layout";
import EditArticle from "@/components/EditArticle";

async function getArticle(slug: string) {
  const url = `http://localhost:3000/api/article?slug=${slug}`;

  const res = await fetch(url);

  if (!res.ok) {
    return { message: "Articleが見つかりませんでした" };
  }

  return res.json();
}

export default async function Edit({ params }: { params: { slug: string } }) {
  const data = await getUser();
  const token = getToken();
  const { slug } = params;
  const { article } = await getArticle(slug);

  return <EditArticle user={data.user} token={token} article={article} />;
}
