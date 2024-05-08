"use client";

import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/register`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.status === 400) {
      const data = await response.text();

      const dataList = data.split(", ");
      setErrorMessages(() => dataList);
    }

    if (response.status === 500) {
      const data = await response.text();

      const obj = JSON.parse(data);

      const dataList = Object.keys(obj).map((key) => obj[key]);
      setErrorMessages(() => dataList);
    }

    if (response.ok) {
      window.location.href = "/";
    }
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <a href="/login">Have an account?</a>
            </p>

            <ul className="error-messages">
              {errorMessages.map((message, index) => (
                <li key={index}>{message}</li>
              ))}
            </ul>

            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </fieldset>
              <button className="btn btn-lg btn-primary pull-xs-right">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
