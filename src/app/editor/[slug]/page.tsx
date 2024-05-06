import { getArticle } from "@/app/article/[slug]/page";
import { getToken, getUser } from "@/app/layout";
import EditArticle from "@/components/EditArticle";

export default async function Edit({ params }: { params: { slug: string } }) {
  const data = await getUser();
  const token = getToken();
  const { slug } = params;
  const { article } = await getArticle(slug);

  return <EditArticle user={data.user} token={token} article={article} />;
}
