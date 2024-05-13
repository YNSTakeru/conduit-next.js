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

function getOffset(params: Map<string, string>) {
  return (Number(params.get("current_page")) - 1) * 20;
}

function getTag(params: Map<string, string>) {
  return params.get("tag");
}

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const url = req.url;
    const params = getParams(url);
    const offset = getOffset(params);

    let apiURL = `${process.env.NEXT_PUBLIC_DATABASE_URL}/api/articles/page?offset=${offset}`;

    if (params.has("tag")) {
      apiURL += `&tag=${getTag(params)}`;
    }

    const response = await axios.get(apiURL);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
