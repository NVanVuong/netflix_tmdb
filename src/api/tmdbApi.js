import axiosClient from "./axiosClient";

export const mediaType = {
  movie: 'movie',
  tv: 'tv'
}

export const movieType = {
  trending: 'trending',
  popular: 'popular',
  upcoming: 'upcoming',
  top_rated: 'top_rated'
}

export const tvType = {
  popular: 'popular',
  top_rated: 'top_rated',
  on_the_air: 'on_the_air'
}

const tmdbApi = {
  getMoviesList: (type, params = {}) => {
    const url = `movie/${movieType[type]}`
    return axiosClient.get(url, { params })
  },
  getTVsList: (type, params = {}) => {
    const url = `tv/${tvType[type]}`
    return axiosClient.get(url, { params })
  },
  getTrendingList: (time, params = {}) => {
    const url = `trending/all/${time}`
    return axiosClient.get(url, { params })
  },
  getGenres: (media, params = {}) => {
    const url = `genre/${mediaType[media]}/list`
    return axiosClient.get(url, { params })
  },
  getVideos: (media, id, params = {}) => {
    const url = `${mediaType[media]}/${id}/videos`
    return axiosClient.get(url, { params })
  },
  getDetail: (media, id, params = {}) => {
    const url = `${mediaType[media]}/${id}`
    return axiosClient.get(url, { params });
  },
  getCredits: (media, id, params = {}) => {
    const url = `${mediaType[media]}/${id}/credits`
    return axiosClient.get(url, { params });
  },
  getSimilar: (media, id, params = {}) => {
    const url = `${mediaType[media]}/${id}/similar`
    return axiosClient.get(url, { params });
  },
  getDiscover: (media, page, params = {}) => {
    const url = `discover/${mediaType[media]}?&page=${page}`
    return axiosClient.get(url, { params });
  },
  search: (media, keyword, page, params = {}) => {
    const url = `search/${mediaType[media]}?&query=${keyword}&page=${page}`
    return axiosClient.get(url, { params });
  }
}
export default tmdbApi;