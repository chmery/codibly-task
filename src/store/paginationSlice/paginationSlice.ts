import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
        setPage: (state, { payload }: PayloadAction<number>) => {
            state.currentPage = payload;
        },
    },
});

export const { nextPage, prevPage, setPage } = paginationSlice.actions;
const paginationReducer = paginationSlice.reducer;
export default paginationReducer;
