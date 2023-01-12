import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice/modalSlice";
import paginationReducer from "./paginationSlice/paginationSlice";

export const createStore = () =>
    configureStore({
        reducer: { pagination: paginationReducer, modal: modalReducer },
    });

const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
