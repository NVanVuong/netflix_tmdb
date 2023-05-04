const apiConfig = {
  baseUrl: 'https://api.themoviedb.org/3/',
  apiKey: '3366f8235f49d628156d214d537abd48',
  originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
  w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`
}

export default apiConfig;