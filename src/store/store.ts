import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice/modalSlice";
import paginationReducer from "./paginationSlice/paginationSlice";

const store = configureStore({
    reducer: { pagination: paginationReducer, modal: modalReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
