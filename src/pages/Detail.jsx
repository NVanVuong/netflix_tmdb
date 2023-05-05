import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsClockHistory } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { SlArrowRight } from "react-icons/sl";
import tmdbApi from "../api/tmdbApi";
import apiConfig from "../api/apiConfig";
import VideoModal from "../components/VideoModal";

const Detail = ({ mediaType }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [trailer, setTrailer] = useState();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.getDetail(mediaType, id);
      setItem(response.data);
      console.log(response.data);
    };
    getDetail();
  }, [mediaType, id]);

  const handleClickTrailer = (video) => {
    setTrailer(video);
    setShowModal(true);
  };

  const handleRequestCloseModal = () => {
    setTrailer(undefined);
    setShowModal(false);
  };

  return (
    <>
      <div className="bg-white text-9xl">
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
                <span className="tracking-widest">
                  {(() => {
                    const year = item?.release_date || item?.first_air_date;
                    const date = year ? new Date(year) : null;
                    return date ? date.getFullYear() : "N/A";
                  })()}
                </span>
                <span className="flex items-center gap-2">
                  <BsClockHistory className="text-xl" />
                  {item?.runtime || item?.episode_run_time[0] || "N/A"}
                </span>
                <span className="flex items-center text-sm">
                  <AiFillStar className="mr-1 text-xl" />{" "}
                  {item?.vote_average.toFixed(2)}
                  <span className="font-sans text-xs italic opacity-70">
                    /10
                  </span>
                </span>
                <button
                  onClick={() => handleClickTrailer(item?.video)}
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
                      className="genre-items rounded-3xl border border-white px-2 py-1 text-sm"
                    >
                      {genre.name}
                    </span>
                  );
                })}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-4">
                {/* {queryCast.data &&
                queryCast.data?.data.cast.slice(0, 4).map((cast) => {
                  if (!cast.profile_path) return;
                  return (
                    <div
                      key={cast.id.toString()}
                      className="flex items-center gap-4"
                    >
                      <img
                        className="w-10 h-10 rounded-full object-cover"
                        src={originalImage(cast.profile_path)}
                        alt={cast.name}
                      />
                      <span className="text-sm opacity-70 text-white">
                        {cast.name}
                      </span>
                    </div>
                  );
                })} */}
              </div>
              <div className="mt-6 text-xs text-white lg:w-[80%]">
                {item?.overview}
              </div>
            </div>
          </div>
        </div>
        <VideoModal
          requestCloseModal={handleRequestCloseModal}
          show={showModal}
          embed={
            trailer?.site === "YouTube"
              ? `https://www.youtube.com/embed/${trailer.key}`
              : trailer?.site === "Vimeo"
              ? `https://vimeo.com/${trailer.key}`
              : "#"
          }
        />
      </div>
    </>
  );
};

export default Detail;
