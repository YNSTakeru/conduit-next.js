import axios from "axios";
import { NextResponse } from "next/server";
import { getOffset } from "../articles/route";

export async function GET({ url }: { url: string }) {
  try {
    const offset = getOffset(url);
    console.log(offset);
    const response = await axios.get(
      `http://localhost/api/articles/page?offset=${offset}`
    );
    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
