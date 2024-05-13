import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, description, body, tagList } = await req.json();

  if (!title || !description || !body || !(tagList.length > 0)) {
    let response;
    const errorMessages = [];
    if (!title) {
      errorMessages.push("please type title");
    }
    if (!description) {
      errorMessages.push("please type description");
    }
    if (!body) {
      errorMessages.push("please type body");
    }
    if (!(tagList.length > 0)) {
      errorMessages.push("please type tagList");
    }

    response = new Response(errorMessages.join(", "), { status: 400 });
    return response;
  }

  const authorizationHeader = req.headers.get("authorization");

  if (!authorizationHeader) {
    return new Response("認証エラー", { status: 401 });
  }

  const data = {
    article: { title, description, body, tagList },
  };

  try {
    const instance = axios.create({
      headers: {
        Accept: "application/json",
        Authorization: `${authorizationHeader}`,
      },
    });

    const response = await instance.post(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/api/articles`,
      data
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    return new Response("Articleを追加できませんでした", { status: 500 });
  }
}
