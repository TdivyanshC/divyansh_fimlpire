import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmbdApiKey = import.meta.env.VITE_TMDB_KEY;

export const tmbdApi = createApi({
    reducerPath: "tmbdApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
    endpoints: (builder) => ({
        //* Get movies by genres
        getGenres: builder.query({
            query: () => `genre/movie/list?api_key=${tmbdApiKey}`,
        }),

        //* Get movies by types
        getMovies: builder.query({
            query: ({ genreIdOrCategoryName, page, searchQuery }) => {
                // Get movies by search
                if (searchQuery) {
                    return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmbdApiKey}`;
                    
                }


                // Get movies by category
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "string") {
                    return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmbdApiKey}`;
                }

                // Get movies by genre
                if (genreIdOrCategoryName && typeof genreIdOrCategoryName === "number") {
                    return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmbdApiKey}`;
                }

                // Default to popular movies
                return `movie/popular?page=${page}&api_key=${tmbdApiKey}`;
            },
        }),

        //Get user specific list
        getList: builder.query({
            query: ({ listName, accountId, sessionId, page}) => `/account/${accountId}/${listName}?api_key=${tmbdApiKey}&session_id=${sessionId}&page=${page}`
        }),

        // Get Movie
        getMovie: builder.query({
            query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmbdApiKey}`
        }),

        //Get User Specific Lists
        getRecommendations: builder.query({
            query: ({movie_id, list}) => `/movie/${movie_id}/${list}?api_key=${tmbdApiKey}`
        }) 
    }),
});

export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieQuery, useGetRecommendationsQuery, useGetListQuery } = tmbdApi;
