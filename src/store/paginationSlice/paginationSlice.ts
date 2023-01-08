import { createSlice } from "@reduxjs/toolkit";

type PaginationState = {
    currentPage: number;
};

const initialState: PaginationState = {
    currentPage: 1,
};

export const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        nextPage: (state) => {
            state.currentPage += 1;
        },
        prevPage: (state) => {
            state.currentPage -= 1;
        },
    },
});

export const { nextPage, prevPage } = paginationSlice.actions;
const paginationReducer = paginationSlice.reducer;
export default paginationReducer;
