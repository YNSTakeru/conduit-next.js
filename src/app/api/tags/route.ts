import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get("http://localhost/api/tags/popular");
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({});
  }
}
