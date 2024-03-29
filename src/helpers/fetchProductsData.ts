import { checkResStatus } from "./checkResStatus";

export const fetchProductsData = async (currentPage: number) => {
    try {
        const res = await fetch(`https://reqres.in/api/products?page=${currentPage}&per_page=5`);

        checkResStatus(res);

        const data: ProductsDataResponse = await res.json();

        const { page, per_page, total, total_pages } = data;

        const formattedProductsData: ProductsData = {
            page,
            perPage: per_page,
            total,
            totalPages: total_pages,
            data: [],
        };

        data.data.forEach((item, i) => {
            const { id, name, year, color } = item;
            formattedProductsData.data.push({
                id,
                name,
                year,
                color,
                pantoneValue: data.data[i].pantone_value,
            });
        });

        return formattedProductsData;
    } catch (error) {
        if (error instanceof Error) {
            return error;
        }
    }
};
