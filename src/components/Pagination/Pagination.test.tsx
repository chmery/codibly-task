import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Pagination from "./Pagination";

describe("Pagination component", () => {
    const MockPagination = ({ currentPage }: { currentPage: number }) => {
        return (
            <BrowserRouter>
                <Pagination totalPages={3} currentPage={currentPage} />
            </BrowserRouter>
        );
    };

    it("should decrease page number by clicking prev button", () => {
        render(<MockPagination currentPage={2} />);

        const prevBtn = screen.getByTestId("prev");
        fireEvent.click(prevBtn);
        const searchParams = new URLSearchParams(document.location.search);
        const page = searchParams.get("p");

        expect(prevBtn).toBeVisible();
        expect(page).toBe("1");
    });

    it("should increase page number by clicking next button", () => {
        render(<MockPagination currentPage={1} />);

        const nextBtn = screen.getByTestId("next");
        fireEvent.click(nextBtn);
        const searchParams = new URLSearchParams(document.location.search);
        const page = searchParams.get("p");

        expect(page).toBe("2");
        expect(nextBtn).toBeVisible();
    });

    it("should not display next button on the last page", () => {
        render(<MockPagination currentPage={3} />);
        const nextBtn = screen.queryByTestId("next");
        expect(nextBtn).toBeNull();
    });

    it("should not display prev button on the first page", () => {
        render(<MockPagination currentPage={1} />);
        const prevBtn = screen.queryByTestId("prev");
        expect(prevBtn).toBeNull();
    });
});
