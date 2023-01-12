import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "../../store/store";
import Pagination from "./Pagination";

describe("Pagination component", () => {
    const MockPagination = () => {
        return (
            <BrowserRouter>
                <Provider store={createStore()}>
                    <Pagination totalPages={3} />
                </Provider>
            </BrowserRouter>
        );
    };

    it("should render buttons accordingly to the page number", () => {
        render(<MockPagination />);

        const nextBtn = screen.getByTestId("next");
        const pageNumber = screen.getByTestId("page-number");

        expect(nextBtn).toBeVisible();
        expect(pageNumber).toHaveTextContent(/^1/);

        fireEvent.click(nextBtn);

        const prevBtn = screen.getByTestId("prev");
        expect(nextBtn && prevBtn).toBeVisible();
        expect(pageNumber).toHaveTextContent(/^2/);

        fireEvent.click(nextBtn);

        expect(prevBtn).toBeVisible();
        expect(nextBtn).not.toBeVisible();
        expect(pageNumber).toHaveTextContent(/^3/);
    });

    it("should change search params by clicking the appropriate button", () => {
        render(<MockPagination />);

        const nextBtn = screen.getByTestId("next");
        fireEvent.click(nextBtn);
        const searchParams = new URLSearchParams(document.location.search);
        const page = searchParams.get("p");

        expect(page).toBe("2");
    });
});
