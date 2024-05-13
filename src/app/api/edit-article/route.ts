import axios, { AxiosError } from "axios";
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
  const baseData = await req.json();

  if (Object.keys(baseData).length === 0) {
    return new Response("値が変更されていません", { status: 400 });
  }

  const data = { article: baseData };

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
        Accept: "application/json",
        Authorization: `${authorizationHeader}`,
      },
    });

    const response = await instance.put(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/api/articles/${slug}`,
      data
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (error && (error as AxiosError).response) {
      const errorResponse = (error as AxiosError).response!.data as {
        errors: Record<string, string[]>;
      };
      const errors = errorResponse.errors;
      const errorMessages = Object.keys(errors).map((key) => errors[key]);

      return new Response(errorMessages.join(", "), { status: 400 });
    }
  }
}
