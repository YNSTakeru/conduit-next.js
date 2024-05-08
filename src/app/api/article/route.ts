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

export async function GET(req: NextRequest) {
  try {
    const url = req.url;
    const params = getParams(url);
    const slug = params.get("slug");

    const response = await axios.get(`http://localhost/api/articles/${slug}`);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
