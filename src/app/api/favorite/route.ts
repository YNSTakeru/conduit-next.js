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
    await instance.post(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/api/articles/${slug}/favorite`
    );
    return NextResponse.json({});
  } catch (error) {
    return NextResponse.json({});
  }
}
