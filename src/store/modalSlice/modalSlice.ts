import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalState = {
    dataModal: {
        productData: ProductData | null;
        isOpen: boolean;
    };
    errorModal: {
        errorMessage: string;
        isOpen: boolean;
    };
};

const initialState: ModalState = {
    dataModal: {
        productData: null,
        isOpen: false,
    },
    errorModal: {
        errorMessage: "",
        isOpen: false,
    },
};

export const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openDataModal: ({ dataModal }, { payload }: PayloadAction<ProductData>) => {
            dataModal.productData = payload;
            dataModal.isOpen = true;
        },
        closeDataModal: ({ dataModal }) => {
            dataModal.isOpen = false;
            dataModal.productData = null;
        },
        openErrorModal: ({ errorModal }, { payload }: PayloadAction<string>) => {
            errorModal.errorMessage = payload;
            errorModal.isOpen = true;
        },
        closeErrorModal: ({ errorModal }) => {
            errorModal.isOpen = false;
            errorModal.errorMessage = "";
        },
    },
});

export const { openDataModal, closeDataModal, openErrorModal, closeErrorModal } =
    modalSlice.actions;
const modalReducer = modalSlice.reducer;
export default modalReducer;
