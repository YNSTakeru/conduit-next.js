"use client";

import React, { useState } from "react";
import { ArticleDetailProps } from "../ArticleDetail";

export default function EditArticle({
  user,
  token,
  article,
}: {
  user?: { email: string; username: string; bio: string; image: string };
  token?: string;
  article: ArticleDetailProps;
}) {
  if (!user) {
    window.location.href = "/";
  }

  const { slug } = article;

  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);
  const [body, setBody] = useState(article.body);
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState<string[]>(article.tagList);
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await fetch(
      `http://localhost:3000/api/edit-article?slug=${slug}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, body, tagList }),
      }
    );

    if (response.status === 400) {
      const data = await response.text();

      const dataList = data.split(", ");
      setErrors(() => dataList);
    }

    if (response.status === 500) {
      const data = await response.text();
      const obj = JSON.parse(data);
      const dataList = Object.keys(obj).map((key) => obj[key]);
      setErrors(() => dataList);
    }

    if (response.ok) {
      const data = await response.json();
      window.location.href = `http://localhost:3000/article/${data.article.slug}`;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setTagList((prev) => [...prev, tag]);
      setTag("");
    }
  };

  const handleDelete = (index: number) => {
    setTagList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ul className="error-messages">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>

            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    value={title}
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    value={description}
                    className="form-control"
                    placeholder="What's this article about?"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    value={body}
                    placeholder="Write your article (in markdown)"
                    onChange={(e) => setBody(e.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    value={tag}
                    className="form-control"
                    placeholder="Enter tags"
                    onChange={(e) => setTag(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <div className="tag-list">
                    {tagList.map((tag, index) => (
                      <span key={index} className="tag-default tag-pill">
                        <i
                          className="ion-close-round"
                          onClick={() => handleDelete(index)}
                        ></i>
                        {tag}
                      </span>
                    ))}
                  </div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="submit"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
