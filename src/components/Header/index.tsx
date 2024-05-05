"use client";

import { usePathname } from "next/navigation";

export default function Header({
  user,
}: {
  user?: {
    email: string;
    username: string;
    bio: string;
    image: string;
  };
} = {}) {
  const currentPath = usePathname();

  {
    !user && (
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="/">
            conduit
          </a>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Sign in
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/register">
                Sign up
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  const { username, image } = user!;

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="/">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <a
              className={`nav-link ${currentPath === "/" ? "active" : ""}`}
              href="/"
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                currentPath === "/editor" ? "active" : ""
              }`}
              href="/editor"
            >
              <i className="ion-compose"></i>&nbsp;New Article
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                currentPath === "/settings" ? "active" : ""
              }`}
              href="/settings"
            >
              <i className="ion-gear-a"></i>&nbsp;Settings
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                currentPath === `/profile/${username}` ? "active" : ""
              }`}
              href={`/profile/${username}`}
            >
              <img src={image} className="user-pic" />
              {username}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
