import { useEffect, useState } from "react";
import tmdbApi from "../api/tmdbApi";
import { useParams } from "react-router-dom";

const Detail = ({ mediaType }) => {
  const { id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.getDetail(mediaType, id);
      setItem(response.data);
    };
    getDetail();
  }, [mediaType, id]);

  return <div className="bg-white text-9xl">{item?.id}</div>;
};

export default Detail;
