import React, { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import tmdbApi from "../api/tmdbApi";
import MovieCard from "../components/MovieCard";
import { FaSearch, FaTimes } from "react-icons/fa";

const MediaList = ({ mediaType }) => {
  const [currentFilms, setCurrentFilms] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (isSearching) {
      search();
    } else {
      getFilms();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
    // eslint-disable-next-line
  }, [currentPage, mediaType, isSearching]);

  const getFilms = async () => {
    const response = await tmdbApi.getDiscover(mediaType, currentPage);
    setCurrentFilms(response.data.results);
    setTotalPages(response.data.total_pages);
    setIsSearching(false);
  };

  const search = async () => {
    const response = await tmdbApi.search(
      mediaType,
      searchKeyword,
      currentPage
    );
    setCurrentFilms(response.data.results);
    setTotalPages(response.data.total_pages);
    setIsSearching(true);
  };

  const handleChange = (e) => {
    if (e.target.value === "") {
      setSearchKeyword("");
      setIsSearching(false);
    } else {
      setSearchKeyword(e.target.value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchKeyword !== "") {
      setCurrentPage(1);
      setIsSearching(true);
    }
  };

  const handleInputClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleIconClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else if (isExpanded && searchKeyword === "") {
      setIsExpanded(false);
    } else {
      search();
    }
  };

  const handleClearClick = () => {
    document.getElementById("search-input").value = "";
    setSearchKeyword("");
    setIsSearching(false);
  };

  return (
    <div className="bg-black pb-2 pt-20">
      <div className="bg-black px-4 py-6 md:px-12 lg:px-16">
        <div className="flex justify-between">
          <h2 className='relative py-1 text-2xl capitalize text-light-gray after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-16 after:bg-white/40 after:content-[""]'>
            {mediaType === "movie" ? "Movies" : "TV Shows"}
          </h2>
          <div className="group relative h-full drop-shadow-lg">
            <input
              id="search-input"
              onClick={handleInputClick}
              className={`${
                isExpanded
                  ? "w-60 text-gray-900 placeholder:visible"
                  : "w-12 text-transparent placeholder:invisible"
              } h-12 cursor-pointer rounded-full pl-4 shadow-[0px_0px_7px_8px_#ff00004d] transition-all duration-300 ease-[ease]  focus:outline-none md:group-hover:shadow-[0px_0px_7px_13px_#ff00004d]`}
              placeholder="Search.."
              type="text"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <FaTimes
              onClick={handleClearClick}
              className={`${
                searchKeyword === "" ? "hidden" : "block"
              } absolute right-10 top-4 cursor-pointer text-gray-400 transition duration-300 hover:scale-110 hover:text-red-main`}
            />
            <FaSearch
              onClick={handleIconClick}
              className="absolute right-4 top-4 cursor-pointer transition duration-300 hover:scale-110 hover:text-red-main"
            />
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {currentFilms &&
            currentFilms.map((item, index) => {
              return <MovieCard item={item} key={index} media={mediaType} />;
            })}
        </div>
        <div className="mt-8 flex w-full justify-center">
          <Pagination
            items={currentFilms}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default MediaList;
