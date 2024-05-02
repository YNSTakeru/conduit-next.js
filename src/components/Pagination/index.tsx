"use client";

import Page from "./Page";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <ul className="pagination">
      {pages.map((page_num) => (
        <Page key={page_num} page_num={page_num} currentPage={currentPage} />
      ))}
    </ul>
  );
}
