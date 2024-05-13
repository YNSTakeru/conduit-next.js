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

export async function GET(req: NextRequest) {
  try {
    const url = req.url;
    const params = getParams(url);
    const slug = params.get("slug");

    const authorizationHeader = req.headers.get("authorization");

    const apiURL = `${process.env.NEXT_PUBLIC_DATABASE_URL}/api/articles/${slug}`;

    if (!authorizationHeader) {
      const response = await axios.get(apiURL);
      return NextResponse.json(response.data);
    }

    const instance = axios.create({
      headers: {
        Authorization: `${authorizationHeader}`,
      },
    });

    const response = await instance.get(apiURL);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
