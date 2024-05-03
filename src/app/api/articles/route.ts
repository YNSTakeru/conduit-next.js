import axios from "axios";
import { NextResponse } from "next/server";

export function getParams(url: string) {
  const queryString = url.split("?")[1];
  const params = new Map(
    queryString.split("&").map((param) => {
      const [key, value] = param.split("=");
      return [key, value || ""];
    })
  );

  return params;
}

export function getOffset(params: Map<string, string>) {
  return (Number(params.get("current_page")) - 1) * 20;
}

export function getTag(params: Map<string, string>) {
  return params.get("tag");
}

export async function GET({ url }: { url: string }) {
  try {
    const params = getParams(url);
    const offset = getOffset(params);

    let apiURL = `http://localhost/api/articles?offset=${offset}`;

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
