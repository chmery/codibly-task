import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modalSlice/modalSlice";

export const createStore = () =>
    configureStore({
        reducer: { modal: modalReducer },
    });

const store = createStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
