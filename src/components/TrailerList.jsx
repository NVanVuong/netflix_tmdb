import { useState, useEffect, useRef } from "react";
import tmdbApi from "../api/tmdbApi";

const TrailerList = ({ mediaType, id }) => {
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    const getTrailers = async () => {
      const response = await tmdbApi.getVideos(mediaType, id);
      setTrailers(response.data.results.slice(0, 5));
    };
    getTrailers();
  }, [mediaType, id]);

  return (
    <div className="mt-4 px-4 md:px-12 lg:px-16">
      <h1 className="mb-4 text-2xl font-bold text-white">Top Trailers</h1>
      {trailers.map((item, i) => (
        <Trailer key={i} item={item} />
      ))}
    </div>
  );
};

const Trailer = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  useEffect(() => {
    const height = (iframeRef.current.offsetWidth * 9) / 16 + "px";
    iframeRef.current.setAttribute("height", height);
  }, []);

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
      ></iframe>
    </div>
  );
};

export default TrailerList;
