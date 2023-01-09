declare module "*.module.css";

type ProductData = {
    id: number;
    name: string;
    year: number;
    color: string;
    pantoneValue: string;
};

type ProductsData = {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: ProductData[];
};

type ProductsDataResponse = {
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
};

type ProductDataResponse = {
    data: {
        id: number;
        name: string;
        year: number;
        color: string;
        pantone_value: string;
    };
};
