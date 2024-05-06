import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getParams } from "../articles/route";

export async function POST(req: NextRequest) {
  const url = req.url;
  const params = getParams(url);
  const slug = params.get("slug");

  const authorizationHeader = req.headers.get("authorization");

  if (!authorizationHeader) {
    return new Response("認証エラー", { status: 401 });
  }

  try {
    const instance = axios.create({
      headers: {
        Authorization: `${authorizationHeader}`,
      },
    });
    await instance.delete(`http://localhost/api/articles/${slug}`);

    return NextResponse.json({});
  } catch (error) {
    return new Response("Articleを削除できませんでした", { status: 500 });
  }
}
