import { useEffect, useState } from "react";

function Pagination({ items, totalPages, currentPage, setCurrentPage }) {
  const [itemsLength, setItemsLength] = useState(items.length);

  useEffect(() => {
    let newCurrentPage;
    if (items.length === itemsLength + 1) {
      setItemsLength(items.length);
      newCurrentPage = totalPages;
    } else if (items.length === itemsLength - 1) {
      setItemsLength(items.length);
      newCurrentPage =
        currentPage === totalPages ? Math.max(currentPage - 1, 1) : currentPage;
    } else if (items.length < itemsLength) {
      newCurrentPage = 1;
    } else {
      newCurrentPage = currentPage;
    }
    setCurrentPage(newCurrentPage);
    // eslint-disable-next-line
  }, [items.length]);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbers = 5;
    let startPage = 1;
    let endPage = totalPages;
    if (totalPages > maxPageNumbers) {
      if (currentPage <= Math.ceil(maxPageNumbers / 2)) {
        endPage = maxPageNumbers;
      } else if (currentPage >= totalPages - Math.floor(maxPageNumbers / 2)) {
        startPage = totalPages - maxPageNumbers + 1;
      } else {
        startPage = currentPage - Math.floor(maxPageNumbers / 2);
        endPage = currentPage + Math.floor(maxPageNumbers / 2);
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => {
      return (
        <li
          key={number}
          className={`${
            currentPage === number &&
            "rounded-md border-none bg-[#e50914] text-white hover:text-white"
          } mx-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-md  px-3 py-2 transition duration-300 hover:text-[#e50914] hover:ring-4 hover:ring-[#e50914c3] hover:ring-opacity-70`}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </li>
      );
    });
  };

  return (
    <ul className="flex h-10 w-fit font-medium text-white md:bottom-6">
      <li
        className={`${
          currentPage === 1 && "pointer-events-none text-gray-500"
        } mx-1 flex h-10 cursor-pointer rounded-md px-3 py-2 transition duration-300  hover:text-[#e50914] hover:ring-4 hover:ring-[#e50914c3] hover:ring-opacity-70`}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Prev
      </li>
      <>{renderPageNumbers()}</>
      <li
        className={`${
          currentPage === totalPages && "pointer-events-none text-gray-500"
        } mx-1 flex h-10 cursor-pointer rounded-md  px-3 py-2 transition duration-300 hover:text-[#e50914] hover:ring-4 hover:ring-[#e50914c3] hover:ring-opacity-70`}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Next
      </li>
    </ul>
  );
}

export default Pagination;
