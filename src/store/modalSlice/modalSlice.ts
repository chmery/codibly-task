import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
    productData: ProductData | null;
    isOpen: boolean;
};

const initialState: ModalState = {
    productData: null,
    isOpen: false,
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<ProductData>) => {
            state.productData = action.payload;
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.productData = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;
const modalReducer = modalSlice.reducer;
export default modalReducer;
