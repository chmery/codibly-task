import { render, screen } from "@testing-library/react";
import List from "./List";
import { Provider } from "react-redux";
import store from "../../store/store";

describe("List component", () => {
    const productsData = [
        {
            id: 1,
            name: "cerulean",
            year: 2000,
            color: "#98B2D1",
            pantoneValue: "15-4020",
        },

        {
            id: 2,
            name: "turquoise",
            year: 2011,
            color: "#D94F70",
            pantoneValue: "18-2120",
        },
    ];

    it("should render items", () => {
        render(
            <Provider store={store}>
                <List productsData={productsData} />
            </Provider>
        );
        const firstItem = screen.getByText(productsData[0].name);
        const secondItem = screen.getByText(productsData[1].name);
        expect(firstItem && secondItem).toBeVisible();
    });
});
