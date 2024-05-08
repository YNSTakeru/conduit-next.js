import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

function getParams(url: string) {
  const queryString = url.split("?")[1];
  const params = new Map(
    queryString.split("&").map((param) => {
      const [key, value] = param.split("=");
      return [key, value || ""];
    })
  );

  return params;
}

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const url = req.url;
  const params = getParams(url);
  const slug = params.get("slug");
  const id = params.get("id");

  const authorizationHeader = req.headers.get("authorization");

  if (!authorizationHeader) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const instance = axios.create({
      headers: {
        Authorization: `${authorizationHeader}`,
      },
    });
    await instance.delete(
      `http://localhost/api/articles/${slug}/comments/${id}`
    );

    return NextResponse.json({});
  } catch (error) {
    return new Response("Failed to delete article", { status: 500 });
  }
}
