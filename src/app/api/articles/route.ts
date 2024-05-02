import axios from "axios";
import { NextResponse } from "next/server";

export function getOffset(url: string) {
  const queryString = url.split("?")[1];
  const params = new Map(
    queryString.split("&").map((param) => {
      const [key, value] = param.split("=");
      return [key, value || ""];
    })
  );
  return (Number(params.get("current_page")) - 1) * 20;
}

export async function GET({ url }: { url: string }) {
  try {
    const offset = getOffset(url);

    const response = await axios.get(
      `http://localhost/api/articles?offset=${offset}`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
