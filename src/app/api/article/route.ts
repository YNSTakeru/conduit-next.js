import axios from "axios";
import { NextResponse } from "next/server";
import { getParams } from "../articles/route";

export async function GET({ url }: { url: string }) {
  try {
    const params = getParams(url);
    const slug = params.get("slug");

    const response = await axios.get(`http://localhost/api/articles/${slug}`);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
