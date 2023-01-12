import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "../../store/store";
import SearchBar from "./SearchBar";

describe("Search bar component", () => {
    const MockSearchBar = () => {
        return (
            <BrowserRouter>
                <Provider store={createStore()}>
                    <SearchBar />
                </Provider>
            </BrowserRouter>
        );
    };

    const customRender = () => {
        render(<MockSearchBar />);

        const input: HTMLInputElement = screen.getByPlaceholderText("search", {
            exact: false,
        });
        const searchBtn = screen.getByTestId("search");

        return { input, searchBtn };
    };

    it("should accept only numbers", () => {
        const { input } = customRender();

        fireEvent.change(input, { target: { value: "test" } });
        expect(input.value).toBe("");

        fireEvent.change(input, { target: { value: "444" } });
        expect(input.value).toBe("444");
    });

    it("should change url and clear input after clicking search button", () => {
        const { searchBtn, input } = customRender();

        fireEvent.change(input, { target: { value: "2" } });
        fireEvent.click(searchBtn);

        const searchParams = new URLSearchParams(document.location.search);
        const id = searchParams.get("id");

        expect(id).toBe("2");
        expect(input.value).toBe("");
    });
});
