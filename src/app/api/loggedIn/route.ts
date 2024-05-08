import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authorizationHeader = request.headers.get("authorization");

    if (authorizationHeader) {
      let token = authorizationHeader.replace("Bearer ", "");

      const instance = axios.create({
        headers: { Authorization: `${authorizationHeader}` },
      });

      const response = await instance.get("http://localhost/api/user");

      token = response.data.user.token;
      const cookie = `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600;`;

      response.headers["Set-Cookie"] = cookie;
      delete response.data.user.token;

      const headers = Object.entries(response.headers);

      return NextResponse.json(response.data, {
        status: response.status,
        headers,
      });
    }
  } catch (error) {
    return NextResponse.json({ message: "認証エラー" }, { status: 401 });
  }

  return NextResponse.json({});
}
