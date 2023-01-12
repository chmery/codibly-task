import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";

describe("Not found component", () => {
    it("should redirect to main page on button click", () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        const homeBtn = screen.getByText("Home");
        fireEvent.click(homeBtn);

        const { pathname } = new URL(document.location.href);
        expect(pathname).toBe("/");
    });
});
