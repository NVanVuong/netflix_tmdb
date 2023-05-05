import { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Play, Star } from "@phosphor-icons/react";
import { BiMoviePlay } from "react-icons/bi";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import tmdbApi from "../api/tmdbApi";
import apiConfig from "../api/apiConfig";
import { mediaType } from "../api/tmdbApi";

SwiperCore.use([Autoplay]);

const HeroSlide = ({ onClickTrailer }) => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  const getMovies = async () => {
    try {
      const response = await tmdbApi.getTrendingList("day");
      const movies = response.data.results.slice(0, 10);
      const video = movies.map((movie) => {
        return tmdbApi.getVideos(movie.media_type, movie.id);
      });
      const videos = await Promise.all(video);
      const updatedMovies = movies.map((movie, index) => ({
        ...movie,
        video: videos[index].data.results[0],
      }));
      setMovies(updatedMovies);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Promise.all([
      tmdbApi.getGenres(mediaType.movie),
      tmdbApi.getGenres(mediaType.tv),
    ])
      .then(([movieResponse, tvResponse]) => {
        const genres = [
          ...movieResponse.data.genres,
          ...tvResponse.data.genres,
        ];
        setGenres(genres);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleTrailerClick = (video) => {
    onClickTrailer(video);
    console.log(video);
  };

  const truncateString = (str, num) =>
    str?.length > num ? `${str.slice(0, str.lastIndexOf(" ", num))}...` : str;

  return (
    <Fragment>
      <Swiper
        modules={[Pagination]}
        slidesPerView={1}
        grabCursor={true}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
      >
        {movies.map((item) => (
          <SwiperSlide key={`${item.id}-${item.name}`}>
            <div
              className={`hero-slide bg-[image:var(--bg-small-url)] md:bg-[image:var(--bg-large-url)]`}
              style={{
                "--bg-small-url": `url(${apiConfig.originalImage(
                  item?.poster_path
                )})`,
                "--bg-large-url": `url(${apiConfig.originalImage(
                  item?.backdrop_path
                )})`,
              }}
            >
              <div className="relative z-10 h-full">
                <div className="slide-content">
                  <h1 className="text-3xl font-bold text-white drop-shadow-2xl md:text-5xl">
                    {item?.title || item?.name}
                  </h1>
                  <div className="mt-4 flex items-center gap-5">
                    <span className="flex w-fit items-center rounded-md border-2 p-1 text-xs font-semibold text-white">
                      <Star className="mr-1" size={15} weight="fill" />{" "}
                      {(item?.vote_average).toString().substring(0, 3)}
                    </span>
                    <span>
                      {genres
                        .filter((genre) => item?.genre_ids.includes(genre.id))
                        .filter(
                          (genre, index, self) =>
                            self.findIndex((g) => g.name === genre.name) ===
                            index
                        )
                        .map((genre) => (
                          <span
                            key={genre.id}
                            className="mx-1.5 cursor-pointer text-sm font-medium text-gray-300 duration-300 first:ml-0 hover:text-white"
                          >
                            {genre.name}
                          </span>
                        ))}
                    </span>
                  </div>
                  <p className="mt-4 line-clamp-3 w-full text-justify font-light text-gray-400 drop-shadow-md sm:max-w-[70%] lg:max-w-[50%] xl:max-w-[40%]">
                    {truncateString(item?.overview, 200)}
                  </p>
                  <p className="mt-4 font-light italic text-gray-400 drop-shadow-md">
                    {item?.release_date || item?.first_air_date}
                  </p>
                  <div className="mt-5 flex transform flex-row transition duration-500 ease-out">
                    <Link
                      to={`/${item?.media_type}/${item?.id}`}
                      className="mr-3 flex items-center justify-center rounded-[4px] bg-white px-6 py-2.5 text-base font-semibold text-black drop-shadow-md duration-300 hover:bg-opacity-80"
                    >
                      <Play size={24} weight="fill" className="mr-3" />
                      Play
                    </Link>
                    <button
                      onClick={() => handleTrailerClick(item?.video)}
                      className="flex items-center justify-center rounded-[4px] bg-dim-gray px-6 py-2.5 text-base font-semibold text-white drop-shadow-md duration-300 hover:bg-dim-gray-hover"
                    >
                      <BiMoviePlay size={24} className="mr-3" />
                      Trailer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Fragment>
  );
};

export default HeroSlide;
