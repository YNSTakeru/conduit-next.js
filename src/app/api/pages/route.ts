import axios from "axios";
import { NextResponse } from "next/server";
import { getOffset, getParams, getTag } from "../articles/route";

export async function GET({ url }: { url: string }) {
  try {
    const params = getParams(url);
    const offset = getOffset(params);

    let apiURL = `http://localhost/api/articles/page?offset=${offset}`;

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
