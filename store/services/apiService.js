import axios from "axios";

const API_BASE_URL = "https://api.themoviedb.org/3";
const key = "01aac884a84d0865fc0fe3927c6d7563";
//All Movies API
export const getAllDiscovers = async (page) => {
  const data = await axios.get(`${API_BASE_URL}/discover/movie?api_key=${key}&page=${page}`);
  return data;
};

//Upcomming Movies API
export const getAllUpcomings = async (page) => {
  const data = await axios.get(`${API_BASE_URL}/movie/upcoming?api_key=${key}&page=${page}`);
  return data;
};

//Trendings Movies API
export const getAllTrendings = async (page) => {
  const data = await axios.get(`${API_BASE_URL}/trending/all/day?api_key=${key}&page=${page}`);
  return data;
};

//TVShows API
export const getAllTvShows = async (page) => {
  const data = await axios.get(`${API_BASE_URL}/tv/popular?api_key=${key}&page=${page}`);
  return data;
};

//People API
export const getAllPeoples = async (page) => {
  const data = await axios.get(`${API_BASE_URL}/person/popular?api_key=${key}&page=${page}`);
  return data;
};

export const getMovieDetails = async (id) => {
  const movieDetail = `${API_BASE_URL}/movie/${id}?api_key=${key}&language=en-US`;

  const data = await axios.get(movieDetail);
  return data;
};

export const getTvDetails = (id) => {
  const movieDetail = `${API_BASE_URL}/tv/${id}?api_key=${key}`;

  const data = axios.get(movieDetail);
  return data;
};


export const getPeopleDetails = async (id) => {
  const peopleDetail = `${API_BASE_URL}/person/${id}?api_key=${key}&language=en-US`;

  const data = await axios.get(peopleDetail);
  return data;
};

export const getMovieReview = async (reviewId) => {
  const MovieReview = `${API_BASE_URL}/movie/${reviewId}/reviews?api_key=${key}`;

  const data = await axios.get(MovieReview);
  return data;
};

export const getTvReview = async (tvReviewId) => {
  const TvReview = `${API_BASE_URL}/tv/${tvReviewId}/reviews?api_key=${key}`;

  const data = await axios.get(TvReview);
  return data;
};

export const getSearchResult = async (query, page) => {
  const multiSearch = `${API_BASE_URL}/search/multi?api_key=${key}&language=en-US&query=${query}&page=${page}&include_adult=false`;

  const data = await axios.get(multiSearch);
  return data;
};