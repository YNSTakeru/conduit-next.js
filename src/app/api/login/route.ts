import axios from "axios";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    const errorMessages = [];
    if (!email) {
      errorMessages.push("please type email");
    }
    if (!password) {
      errorMessages.push("please type password");
    }

    return new Response(errorMessages.join(", "), { status: 400 });
  }

  const data = {
    user: { email, password },
  };

  try {
    const response = await axios.post("http://localhost/api/users/login", data);

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
        if (error.response.data.errors) {
          const errors = error.response.data.errors;
          const errorsString = JSON.stringify(errors);
          return new Response(errorsString, { status: 500 });
        }
        return new Response(error.response.data.message, { status: 500 });
      }
    }
  }
}
