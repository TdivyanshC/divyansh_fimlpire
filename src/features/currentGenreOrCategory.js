import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    genreIdOrCategoryName: null,
    page: 1,
    searchQuery: '',
};

const currentGenreOrCategorySlice = createSlice({
    name: "currentGenreOrCategory",
    initialState,
    reducers: {
        selectGenreOrCategory: (state, action) => {
            state.genreIdOrCategoryName = action.payload;
            state.searchQuery = '';
        },
        searchMovie: (state, action) => {
            state.searchQuery = action.payload;
            state.genreIdOrCategoryName = null;

        },
        resetGenreOrCategory: () => initialState,
    },
});

export const { selectGenreOrCategory, resetGenreOrCategory, searchMovie } =
    currentGenreOrCategorySlice.actions;

export default currentGenreOrCategorySlice.reducer;
