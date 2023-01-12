import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { openErrorModal } from "../../../store/modalSlice/modalSlice";
import { createStore } from "../../../store/store";
import ErrorModal from "./ErrorModal";

describe("Error modal", () => {
    const store = createStore();
    store.dispatch(openErrorModal("message"));

    it("should render given error message", () => {
        render(
            <Provider store={store}>
                <ErrorModal />
            </Provider>
        );

        const modalTitle = screen.getByText("Error");
        const errorMessage = screen.getByText("message");
        expect(modalTitle && errorMessage).toBeVisible();
    });
});
