import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SearchBar from "./SearchBar";

describe("Search bar component", () => {
    const onSearch = jest.fn();

    const MockSearchBar = () => {
        return (
            <BrowserRouter>
                <SearchBar onSearch={onSearch} />
            </BrowserRouter>
        );
    };

    it("should accept only numbers", () => {
        render(<MockSearchBar />);

        const input: HTMLInputElement = screen.getByPlaceholderText("search", {
            exact: false,
        });

        fireEvent.change(input, { target: { value: "test" } });
        expect(input.value).toBe("");

        fireEvent.change(input, { target: { value: "444" } });
        expect(input.value).toBe("444");
    });
});
