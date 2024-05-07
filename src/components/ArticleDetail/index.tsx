"use client";

import { useState } from "react";

export function getFormattedDate(dateString: string) {
  const date = new Date(dateString);
  const month = date.toLocaleString("default", { month: "long" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}

export interface ArticleDetailProps {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio?: string;
    image?: string;
    following: boolean;
  };
}

interface CommentProps {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: {
    username: string;
    bio?: string;
    image?: string;
    following: boolean;
  };
}

export default function ArticleDetail({
  user,
  token,
  article,
  fromComments,
}: {
  user?: {
    username: string;
    image: string;
    bio: string;
    following: boolean;
    email: string;
    password: string;
  };
  token?: string;
  article: ArticleDetailProps;
  fromComments?: CommentProps[];
}) {
  const {
    title,
    description,
    body,
    tagList,
    createdAt,
    favoritesCount,
    author,
  } = article;

  const formattedDate = getFormattedDate(createdAt);

  const handleTagClick = (tag: string) => {
    window.location.href = `http://localhost:3000/tags/${tag}`;
  };

  const handleEditClick = () => {
    window.location.href = `http://localhost:3000/editor/${article.slug}`;
  };

  const handleDelete = () => {
    fetch(`http://localhost:3000/api/delete-article?slug=${article.slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      window.location.href = "http://localhost:3000";
    });
  };

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentProps[]>(
    fromComments ? fromComments : []
  );

  const postComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const url = `http://localhost:3000/api/comment?slug=${article.slug}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment }),
    });

    if (response.ok) {
      setComment("");
      const data = await response.json();
      const newComment: CommentProps = data.comment;

      setComments([newComment, ...comments]);
    }
  };

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{title}</h1>

          <div className="article-meta">
            <a href="/profile/eric-simons">
              <img src="http://i.imgur.com/Qr71crq.jpg" />
            </a>
            <div className="info">
              <a href="/profile/eric-simons" className="author">
                {author.username}
              </a>
              <span className="date">{formattedDate}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow {author.username}
              <span className="counter">(10)</span>
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Post{" "}
              <span className="counter">({favoritesCount})</span>
            </button>
            {user?.username === author.username && (
              <>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handleEditClick}
                >
                  <i className="ion-edit"></i> Edit Article
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={handleDelete}
                >
                  <i className="ion-trash-a"></i> Delete Article
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{description}</p>
            <ul className="tag-list">
              {tagList.map((tag, index) => (
                <li
                  className="tag-default tag-pill tag-outline"
                  key={index}
                  onClick={handleTagClick.bind(null, tag)}
                >
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <a href={`profile/${author.username}`}>
              <img
                src={
                  author.image ? author.image : "http://i.imgur.com/Qr71crq.jpg"
                }
              />
            </a>
            <div className="info">
              <a href={`profile/${author.username}`} className="author">
                {author.username}
              </a>
              <span className="date">{formattedDate}</span>
            </div>
            <button className="btn btn-sm btn-outline-secondary">
              <i className="ion-plus-round"></i>
              &nbsp; Follow {author.username}
            </button>
            &nbsp;
            <button className="btn btn-sm btn-outline-primary">
              <i className="ion-heart"></i>
              &nbsp; Favorite Article{" "}
              <span className="counter">({favoritesCount})</span>
            </button>
            {user?.username === author.username && (
              <>
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handleEditClick}
                >
                  <i className="ion-edit"></i> Edit Article
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={handleDelete}
                >
                  <i className="ion-trash-a"></i> Delete Article
                </button>
              </>
            )}
          </div>
        </div>
        {user && (
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form className="card comment-form">
                <div className="card-block">
                  <textarea
                    className="form-control"
                    placeholder="Write a comment..."
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <div className="card-footer">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                  />
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={postComment}
                  >
                    Post Comment
                  </button>
                </div>
              </form>

              {comments.map((comment, index) => (
                <div key={index} className="card">
                  <div className="card-block">
                    <p className="card-text">{comment.body}</p>
                  </div>
                  <div className="card-footer">
                    <a href="/profile/author" className="comment-author">
                      <img
                        src={
                          comment.author.image
                            ? comment.author.image
                            : "http://i.imgur.com/Qr71crq.jpg"
                        }
                        className="comment-author-img"
                      />
                    </a>
                    &nbsp;
                    <a href="/profile/jacob-schmidt" className="comment-author">
                      {comment.author.username}
                    </a>
                    <span className="date-posted">
                      {getFormattedDate(comment.createdAt)}
                    </span>
                    {user.username === comment.author.username && (
                      <span className="mod-options">
                        <i className="ion-trash-a"></i>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
