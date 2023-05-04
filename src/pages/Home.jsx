import { Fragment, useState } from "react";
import HeroSilde from "../components/HeroSlide";
import MovieList from "../components/MovieList";
import VideoModal from "../components/VideoModal";
import { mediaType, movieType, tvType } from "../api/tmdbApi";

const Home = () => {
  const [trailer, setTrailer] = useState();
  const [showModal, setShowModal] = useState(false);

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
      <HeroSilde onClickTrailer={handleClickTrailer} />
      <Fragment>
        <MovieList title="Trending Now" mediaType="all" type="trending" />
        <MovieList
          title="Upcomming"
          mediaType={mediaType.movie}
          type={movieType.upcoming}
        />
        <MovieList
          title="Popular"
          mediaType={mediaType.movie}
          type={movieType.popular}
        />
        <MovieList
          title="Top Rating"
          mediaType={mediaType.movie}
          type={movieType.top_rated}
        />
        <MovieList
          title="Popular TV"
          mediaType={mediaType.tv}
          type={tvType.popular}
        />
        <MovieList
          title="Top Rating TV"
          mediaType={mediaType.tv}
          type={tvType.top_rated}
        />
        <MovieList
          title="On The Air TV"
          mediaType={mediaType.tv}
          type={tvType.on_the_air}
        />
      </Fragment>
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
    </>
  );
};

export default Home;
