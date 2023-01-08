declare module "*.module.css";

type ItemData = {
    id: number;
    name: string;
    year: number;
    color: string;
    pantone: string;
};

interface ProductsData {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: {
        id: number;
        name: string;
        year: number;
        color: string;
        pantoneValue: string;
    }[];
}

interface ProductsDataResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: {
        id: number;
        name: string;
        year: number;
        color: string;
        pantone_value: string;
    }[];
}
