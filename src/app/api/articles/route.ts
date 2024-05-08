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

export async function GET(req: NextRequest) {
  try {
    const params = getParams(req.url);
    const offset = getOffset(params);

    let apiURL = `http://localhost/api/articles?offset=${offset}`;

    if (params.has("tag")) {
      apiURL += `&tag=${getTag(params)}`;
    }

    const authorizationHeader = req.headers.get("authorization");

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
