import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsClockHistory } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { SlArrowRight } from "react-icons/sl";
import tmdbApi from "../api/tmdbApi";
import apiConfig from "../api/apiConfig";
import TrailerModal from "../components/TrailerModal";
import MovieList from "../components/MovieList";
import TrailerList from "../components/TrailerList";

const Detail = ({ mediaType }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [credits, setCredits] = useState([]);
  const [trailer, setTrailer] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    Promise.all([getDetail(), getVideos(), getCredits()]).then((results) => {
      setItem(results[0].data);
      setTrailer(results[1].data.results[0]);
      setCredits(results[2].data.cast);
    });
    // eslint-disable-next-line
  }, [mediaType, id]);

  const getDetail = () => tmdbApi.getDetail(mediaType, id);
  const getVideos = () => tmdbApi.getVideos(mediaType, id);
  const getCredits = () => tmdbApi.getCredits(mediaType, id);

  return (
    <>
      <div
        className="detail"
        style={{
          backgroundImage: `url(${apiConfig.originalImage(
            item?.backdrop_path
          )})`,
        }}
      >
        <div className="relative z-[1] mx-auto flex flex-col gap-8 px-4 py-5 sm:px-6 md:flex-row md:gap-16 md:px-4 lg:px-8">
          <div className="detail-card w-60 self-center overflow-hidden rounded-2xl">
            <img
              src={apiConfig.originalImage(item?.poster_path)}
              alt={item?.title || item?.name}
            />
          </div>
          <div className="detail-content text-white md:flex-1">
            <div className="name text-4xl font-extrabold tracking-widest text-white">
              {item?.title || item?.name}
            </div>
            <div className="info mt-4 flex items-center gap-2 text-sm md:gap-4">
              <span className=" tracking-widest">
                {item?.release_date || item?.first_air_date}
              </span>
              <span className="flex items-center gap-2">
                <BsClockHistory className="text-xl" />
                {item?.runtime || item?.episode_run_time[0] || "N/A"}
              </span>
              <span className="flex items-center text-sm">
                <AiFillStar className="mr-1 text-xl" />{" "}
                {item?.vote_average.toFixed(2)}
                <span className="font-sans text-xs italic opacity-70">/10</span>
              </span>
              <button
                onClick={() => setShowModal(true)}
                className="group flex items-center gap-4 uppercase tracking-[4px]"
              >
                Trailer{" "}
                <SlArrowRight className="text-xl transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-6">
              {item?.genres.map((genre, index) => {
                return (
                  <span
                    key={genre.id.toString() + index.toString()}
                    className="genre-items rounded-3xl border border-white px-2 py-1 text-xs"
                  >
                    {genre.name}
                  </span>
                );
              })}
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-4">
              {credits &&
                credits.slice(0, 4).map((cast) => {
                  // eslint-disable-next-line array-callback-return
                  if (!cast.profile_path) return;
                  return (
                    <div
                      key={cast.id.toString()}
                      className="flex items-center gap-4"
                    >
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={apiConfig.originalImage(cast.profile_path)}
                        alt={cast.name}
                      />
                      <span className="text-sm text-white opacity-70">
                        {cast.name}
                      </span>
                    </div>
                  );
                })}
            </div>
            <div className="mt-6 text-sm font-light text-gray-400 drop-shadow-md lg:w-[80%]">
              {item?.overview}
            </div>
          </div>
        </div>
      </div>
      <TrailerList mediaType={mediaType} id={id} />
      <MovieList
        type={"similar"}
        mediaType={mediaType}
        id={id}
        title={"Similar"}
      />
      <TrailerModal
        showModal={showModal}
        setShowModal={setShowModal}
        trailer={trailer}
      />
    </>
  );
};

export default Detail;
