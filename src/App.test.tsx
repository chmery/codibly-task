import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import App from "./App";
import { createStore } from "./store/store";

const MockApp = ({ path }: { path: string }) => {
    return (
        <MemoryRouter initialEntries={[path]}>
            <Provider store={createStore()}>
                <App />
            </Provider>
        </MemoryRouter>
    );
};

beforeEach(() => {
    fetchMock.resetMocks();
});

describe("App component", () => {
    it("should render filtered product", async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({
                data: {
                    id: 2,
                    name: "fuchsia rose",
                    year: 2001,
                    color: "#C74375",
                    pantone_value: "17-2031",
                },
            }),
            { status: 200 }
        );
        render(<MockApp path={`/?id=2`} />);
        const product = await screen.findByText("fuchsia rose");
        expect(product).toBeVisible();
    });

    it("should render list with products data", async () => {
        fetchMock.mockResponseOnce(
            JSON.stringify({
                page: 1,
                per_page: 5,
                total: 12,
                total_pages: 3,
                data: [
                    {
                        id: 1,
                        name: "cerulean",
                        year: 2000,
                        color: "#98B2D1",
                        pantone_value: "15-4020",
                    },
                    {
                        id: 2,
                        name: "fuchsia rose",
                        year: 2001,
                        color: "#C74375",
                        pantone_value: "17-2031",
                    },
                ],
            }),
            { status: 200 }
        );
        render(<MockApp path={"/"} />);
        const product = await screen.findByText("fuchsia rose");
        expect(product).toBeVisible();
    });

    it("should render error modal", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({}), { status: 404 });
        render(<MockApp path={`/?id=100`} />);
        const errorModal = await screen.findByText("Error");
        expect(errorModal).toBeVisible();
    });
});
