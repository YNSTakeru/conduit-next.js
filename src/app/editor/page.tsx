import CreateArticle from "@/components/CreateArticle";
import { getToken, getUser } from "../layout";

export default async function Editor() {
  const data = await getUser();
  const token = getToken();

  return <CreateArticle user={data.user} token={token} />;
}
