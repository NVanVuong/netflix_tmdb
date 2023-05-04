import { useEffect, useState, useRef } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import tmdbApi from "../api/tmdbApi";
import Movie from "./Movie";

const MovieList = ({ type, mediaType, id, title }) => {
  const [movies, setMovies] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    const getMovies = async () => {
      let response;
      switch (type) {
        case "similar":
          response = await tmdbApi.getSimilar(mediaType, id);
          break;
        case "trending":
          response = await tmdbApi.getTrendingList("week");
          break;
        default:
          response =
            mediaType === "movie"
              ? await tmdbApi.getMoviesList(type)
              : await tmdbApi.getTVsList(type);
      }
      setMovies(response.data.results);
    };
    getMovies();
  }, [type, mediaType, id]);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= window.innerWidth;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += window.innerWidth;
    }
  };

  return (
    <div id={`${mediaType}-${type}`} className="my-9">
      <h2 className="group relative mb-2 ml-4 flex select-none items-end bg-black font-semibold tracking-wide text-gray-200 md:ml-12 md:text-[22px] lg:ml-16">
        {title}
        <span className="ml-3 flex -translate-x-20 items-center text-2xl leading-none text-steel-blue opacity-0 transition-all duration-500 lg:group-hover:translate-x-0 lg:group-hover:opacity-100">
          <p className="mr-0.5 text-sm leading-none">Expand all </p>
          <span className="mb-0.5">&rsaquo;</span>
        </span>
      </h2>
      <div className="group relative flex items-center">
        <FaAngleLeft
          onClick={slideLeft}
          className="absolute left-3 z-10 hidden text-[32px] text-white transition-transform duration-300 hover:scale-125 hover:drop-shadow-xl group-hover:block"
        />
        <div
          id={`slider-${mediaType}-${type}`}
          ref={sliderRef}
          className="h-full w-full snap-x snap-mandatory overflow-x-scroll scroll-smooth whitespace-nowrap pl-4 scrollbar-hide md:pl-14 lg:pl-16"
        >
          {movies
            .filter((item) => item.backdrop_path !== null)
            .map((item) => (
              <Movie key={item.id} item={item} media={mediaType} />
            ))}
        </div>
        <FaAngleRight
          onClick={slideRight}
          className="absolute right-2 z-10 hidden text-[32px] text-white transition-transform duration-300 hover:scale-125 hover:drop-shadow-xl group-hover:block"
        />
      </div>
    </div>
  );
};

export default MovieList;
