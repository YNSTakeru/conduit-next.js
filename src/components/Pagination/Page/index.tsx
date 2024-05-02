export default function Page({
  page_num,
  currentPage,
}: {
  page_num: number;
  currentPage: number;
}) {
  return (
    <li
      className={`page-item ${currentPage === page_num ? "active" : ""} `}
      key={page_num}
    >
      <a className="page-link" href="">
        {page_num}
      </a>
    </li>
  );
}
