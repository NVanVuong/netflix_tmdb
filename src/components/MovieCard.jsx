import { useEffect, useState, Fragment } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import apiConfig from "../api/apiConfig";
import tmdbApi, { mediaType } from "../api/tmdbApi";

const MovieCard = ({ item, media }) => {
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    Promise.all([
      tmdbApi.getGenres(mediaType.movie),
      tmdbApi.getGenres(mediaType.tv),
    ]).then(([movieResponse, tvResponse]) => {
      const genres = [...movieResponse.data.genres, ...tvResponse.data.genres];
      setGenres(genres);
    });
  }, []);

  return (
    <div className="overflow-hidden rounded-xl transition-transform duration-300 hover:scale-105">
      <Link
        to={`/${media === "all" ? (media = item?.media_type) : media}/${
          item?.id
        }`}
        className="block h-full w-full"
      >
        <div className="relative h-60 w-full from-black/90 to-black/10 after:absolute after:left-0 after:top-0 after:z-[5] after:h-full after:w-full after:bg-gradient-to-t after:content-[''] lg:h-[280px]">
          <img
            className="block h-full w-full object-cover"
            src={apiConfig.originalImage(item?.poster_path)}
            loading="lazy"
            alt={item?.title || item?.name}
          />
          <div className="absolute bottom-0  left-0 z-[6] w-full px-3  py-3">
            <div className="mb-1 line-clamp-2 max-w-[85%] select-none whitespace-normal text-sm font-medium text-white md:line-clamp-none">
              {item?.title || item?.name}
            </div>
            <div className="flex flex-col items-start text-xs text-[#bbb]">
              <div className="mb-1 flex items-center">
                <span>
                  {(item?.release_date || item?.first_air_date)?.substring(
                    0,
                    4
                  )}
                </span>
                <span className="ml-2 flex items-center justify-center gap-[2px] rounded border px-1 py-[2px] text-[10px] font-light">
                  <FaStar />
                  {item?.vote_average?.toString().substring(0, 3)}
                </span>
              </div>
              <div className="flex select-none items-center overflow-x-hidden text-xs font-light">
                {genres
                  .filter((genre) => item?.genre_ids.includes(genre?.id))
                  .filter(
                    (genre, index, self) =>
                      self.findIndex((g) => g.name === genre.name) === index
                  )
                  .slice(0, 3)
                  .map((genre, index) => (
                    <Fragment key={genre.id}>
                      {index > 0 && <span className="text-xs"> &bull; </span>}
                      <span className="mx-1 whitespace-nowrap text-xs first:ml-0">
                        {genre.name}
                      </span>
                    </Fragment>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
