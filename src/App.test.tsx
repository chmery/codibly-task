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

const mockFetch = (ok: boolean, status: number, data: any) => {
    jest.spyOn(global, "fetch").mockImplementation(
        jest.fn(() =>
            Promise.resolve({
                ok,
                status,
                json: () => Promise.resolve(data),
            })
        ) as jest.Mock
    );
};

const productData = {
    data: {
        id: 2,
        name: "fuchsia rose",
        year: 2001,
        color: "#C74375",
        pantone_value: "17-2031",
    },
};

const productsData = {
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
};

beforeEach(() => {
    jest.restoreAllMocks();
});

describe("App component", () => {
    it("should render error modal", async () => {
        mockFetch(false, 404, {});
        render(<MockApp path={`/?id=100`} />);
        const errorModal = await screen.findByText("Error");
        expect(errorModal).toBeVisible();
    });

    it("should render filtered product", async () => {
        mockFetch(true, 200, productData);
        render(<MockApp path={`/?id=2`} />);
        const product = await screen.findByText("fuchsia rose");
        expect(product).toBeVisible();
    });

    it("should render list with products data", async () => {
        mockFetch(true, 200, productsData);
        render(<MockApp path={"/"} />);
        const product = await screen.findByText("fuchsia rose");
        expect(product).toBeVisible();
    });
});
