import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();

  if (!username || !email || !password) {
    let response;
    const errorMessages = [];
    if (!username) {
      errorMessages.push("please type username");
    }
    if (!email) {
      errorMessages.push("please type email");
    }
    if (!password) {
      errorMessages.push("please type password");
    }

    response = new Response(errorMessages.join(", "), { status: 400 });
    return response;
  }

  const data = {
    user: { username, email, password },
  };

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_DATABASE_URL}/api/users`,
      data
    );

    const token = response.data.user.token;
    const cookie = `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=3600;`;

    response.headers["Set-Cookie"] = cookie;
    delete response.data.user.token;

    const headers = Object.entries(response.headers);

    const serverResponse = new Response(response.data, {
      status: response.status,
      headers,
    });

    return serverResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const errors = error.response.data.errors;
        const errorsString = JSON.stringify(errors);
        return new Response(errorsString, { status: 500 });
      }
    }
  }
}
