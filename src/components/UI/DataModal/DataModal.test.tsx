import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { openDataModal } from "../../../store/modalSlice/modalSlice";
import { createStore } from "../../../store/store";
import DataModal from "./DataModal";

describe("Data modal", () => {
    const productData = {
        id: 1,
        name: "cerulean",
        year: 2000,
        color: "#98B2D1",
        pantoneValue: "15-4020",
    };

    const store = createStore();
    store.dispatch(openDataModal(productData));

    it("should render given product data", () => {
        render(
            <Provider store={store}>
                <DataModal />
            </Provider>
        );

        const modalTitle = screen.getByText("Product Data");
        const pantoneValue = screen.getByText(productData.pantoneValue);
        expect(modalTitle && pantoneValue).toBeVisible();
    });
});
