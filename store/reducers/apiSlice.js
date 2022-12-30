import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllDiscovers, getAllTrendings, getAllUpcomings, getMovieDetails, getTvDetails, getAllPeoples, getPeopleDetails, getAllTvShows, getSearchResult} from "../services/apiService";

const initialState = {
  movies: [],
  movieDetail: [],
  tvShows: [],
  tvDetail: [],
  peoples: [],
  peopleDetail: [],
  searchResult: [],
  isLoading: false,
  error: null,
};

export const getMovies = createAsyncThunk("api/getMovies", async () => {
  const movies = await getAllDiscovers();
  return movies;
});

export const getUpcomings = createAsyncThunk("api/getUpcomings", async () => {
  const movies = await getAllUpcomings();
  return movies;
});

export const getTrendings = createAsyncThunk("api/getTrendings", async () => {
  const movies = await getAllTrendings();
  return movies;
});

export const getTvShows = createAsyncThunk("api/getTvShows", async () => {
  const tvShows = await getAllTvShows();
  return tvShows;
});
export const getPeoples = createAsyncThunk("api/getPeoples", async () => {
  const peoples = await getAllPeoples();
  return peoples;
});

export const getMovieDetail = createAsyncThunk("api/getMovieDetail", async (id) => {
    const movieDetail = await getMovieDetails(id);
    return movieDetail;
});

export const getTvDetail = createAsyncThunk("api/getTvDetail", async (id) => {
  const tvDetail = await getTvDetails(id);
  return tvDetail;
});

export const getPeopleDetail = createAsyncThunk("api/getPeopleDetail", async (id) => {
    const peopleDetail = await getPeopleDetails(id);
    return peopleDetail;
});

export const getSearch = createAsyncThunk("api/getSearch", async (keyword) => {
    const searchResult = await getSearchResult(keyword);
    return searchResult;
});

export const apiSlice = createSlice({
    name: "api",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getMovies.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getMovies.fulfilled, (state, action) => {
            state.isLoading = false;
            state.movies = action.payload;
        })
        builder.addCase(getMovies.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
        builder.addCase(getUpcomings.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getUpcomings.fulfilled, (state, action) => {
            state.isLoading = false;
            state.movies = action.payload;
        })
        builder.addCase(getUpcomings.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
        builder.addCase(getTrendings.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getTrendings.fulfilled, (state, action) => {
            state.isLoading = false;
            state.movies = action.payload;
        })
        builder.addCase(getTrendings.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
        builder.addCase(getTvShows.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getTvShows.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tvShows = action.payload;
        })
        builder.addCase(getTvShows.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
        builder.addCase(getPeoples.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getPeoples.fulfilled, (state, action) => {
            state.isLoading = false;
            state.peoples = action.payload;
        })
        builder.addCase(getPeoples.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
        builder.addCase(getMovieDetail.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getMovieDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.movieDetail = action.payload;
        })
        builder.addCase(getMovieDetail.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
        builder.addCase(getTvDetail.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getTvDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tvDetail = action.payload;
        })
        builder.addCase(getTvDetail.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
        builder.addCase(getPeopleDetail.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getPeopleDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.peopleDetail = action.payload;
        })
        builder.addCase(getPeopleDetail.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
        builder.addCase(getSearch.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(getSearch.fulfilled, (state, action) => {
            state.isLoading = false;
            state.searchResult = action.payload;
        })
        builder.addCase(getSearch.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        })
    }
});

export default apiSlice.reducer;
