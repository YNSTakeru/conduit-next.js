import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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

export async function GET(req: NextRequest) {
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
        Accept: "application/json",
        Authorization: `${authorizationHeader}`,
      },
    });

    const response = await instance.get(
      `http://localhost/api/articles/${slug}/comments`
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
