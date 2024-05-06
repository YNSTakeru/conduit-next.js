import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { getParams } from "../articles/route";

export async function POST(req: NextRequest) {
  const { comment } = await req.json();
  const url = req.url;
  const params = getParams(url);
  const slug = params.get("slug");

  if (!comment) {
    return new Response("Comment is required", { status: 400 });
  }

  const authorizationHeader = req.headers.get("authorization");

  if (!authorizationHeader) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = {
    comment: { body: comment },
  };

  try {
    const instance = axios.create({
      headers: {
        Accept: "application/json",
        Authorization: `${authorizationHeader}`,
      },
    });

    const response = await instance.post(
      `http://localhost/api/articles/${slug}/comments`,
      data
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    return new Response("Failed to add comment", { status: 500 });
  }
}
