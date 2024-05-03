export default function Page({
  page_num,
  currentPage,
  tag,
}: {
  page_num: number;
  currentPage: number;
  tag?: string;
}) {
  const url = tag ? `/tags/${tag}/${page_num}` : `/articles/${page_num}`;

  return (
    <li
      className={`page-item ${currentPage === page_num ? "active" : ""} `}
      key={page_num}
    >
      <a className="page-link" href={url}>
        {page_num}
      </a>
    </li>
  );
}
