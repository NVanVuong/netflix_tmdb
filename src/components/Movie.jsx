import { useState } from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const Movie = ({ item, media }) => {
  const [like, setLike] = useState(false);

  return (
    <Link
      to={`/${media === "all" ? (media = item?.media_type) : media}/${
        item?.id
      }`}
      className="relative m-1 inline-block w-[180px] cursor-pointer snap-center first:ml-0 sm:w-[200px] md:w-[240px] lg:w-[272px]"
    >
      <img
        className="h-auto w-full select-none rounded-[4px] "
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item?.title || item?.name}
      />
      <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-white opacity-0 transition duration-500 ease-out hover:bg-black/70 hover:opacity-80 hover:delay-300">
        <p
          onClick={() => setLike(!like)}
          className={`absolute right-4 top-4 z-30 text-sm transition duration-500 ${
            like ? "scale-110" : "scale-100"
          }`}
        >
          {like ? (
            <FaHeart className="text-red-600" />
          ) : (
            <FaRegHeart className="transition-colors duration-500 hover:text-dark-gray" />
          )}
        </p>
        <div className="absolute bottom-0 left-0 w-full px-4 py-3 first:px-2">
          <p className="mb-1.5 line-clamp-2 max-w-[85%] select-none whitespace-normal text-xs font-semibold md:line-clamp-none md:text-sm">
            {item?.title || item?.name}
          </p>
          <div className="flex select-none items-center text-xs text-light-gray">
            <span>
              {(item?.release_date || item?.first_air_date)?.substring(0, 4)}
            </span>
            <span className="ml-2 flex items-center justify-center gap-[2px] rounded border px-1 py-[2px] text-[10px] font-light ">
              <FaStar />
              {(item?.vote_average).toString().substring(0, 3)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Movie;
