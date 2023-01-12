import { render, screen, fireEvent } from "@testing-library/react";
import ListItem from "./ListItem";
import { Provider } from "react-redux";
import store from "../../../store/store";

describe("List item component", () => {
    const productData = {
        id: 1,
        name: "cerulean",
        year: 2000,
        color: "#98B2D1",
        pantoneValue: "15-4020",
    };

    const { id, name, year } = productData;

    const MockListItem = () => {
        return (
            <Provider store={store}>
                <ListItem productData={productData} />
            </Provider>
        );
    };

    it("should render the product data", () => {
        render(<MockListItem />);

        const productId = screen.getByText(id);
        const productName = screen.getByText(name);
        const productYear = screen.getByText(year);

        expect(productId && productName && productYear).toBeVisible();
    });

    it("should pass product data to modal when clicked on", () => {
        render(<MockListItem />);

        fireEvent.click(screen.getByText(name));
        const { modal } = store.getState();

        expect(modal.dataModal.productData?.name).toBe(name);
    });
});
