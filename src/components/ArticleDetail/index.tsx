"use client";

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
    bio: string;
    image: string;
    following: boolean;
  };
}

export default function ArticleDetail({
  user,
  token,
  article,
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
                  ></textarea>
                </div>
                <div className="card-footer">
                  <img
                    src="http://i.imgur.com/Qr71crq.jpg"
                    className="comment-author-img"
                  />
                  <button className="btn btn-sm btn-primary">
                    Post Comment
                  </button>
                </div>
              </form>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
                <div className="card-footer">
                  <a href="/profile/author" className="comment-author">
                    <img
                      src="http://i.imgur.com/Qr71crq.jpg"
                      className="comment-author-img"
                    />
                  </a>
                  &nbsp;
                  <a href="/profile/jacob-schmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                </div>
              </div>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
                <div className="card-footer">
                  <a href="/profile/author" className="comment-author">
                    <img
                      src="http://i.imgur.com/Qr71crq.jpg"
                      className="comment-author-img"
                    />
                  </a>
                  &nbsp;
                  <a href="/profile/jacob-schmidt" className="comment-author">
                    Jacob Schmidt
                  </a>
                  <span className="date-posted">Dec 29th</span>
                  <span className="mod-options">
                    <i className="ion-trash-a"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
