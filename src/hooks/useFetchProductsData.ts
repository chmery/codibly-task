import { useState } from "react";
import { useSelector } from "react-redux/es/exports";
import { RootState } from "../store/store";
import { useEffect } from "react";

const useFetchProductsData = () => {
    const [productsData, setProductsData] = useState<ProductsData | null>(null);

    const currentPage = useSelector((state: RootState) => state.pagination.currentPage);

    useEffect(() => {
        fetchData();
    }, [currentPage]);

    const fetchData = async () => {
        const res = await fetch(`https://reqres.in/api/products?page=${currentPage}&per_page=5`);
        const data: ProductsDataResponse = await res.json();

        const formattedProductsData: ProductsData = {
            page: data.page,
            perPage: data.per_page,
            total: data.total,
            totalPages: data.total_pages,
            data: [],
        };

        data.data.forEach((item, i) => {
            formattedProductsData.data.push({
                id: item.id,
                name: item.name,
                year: item.year,
                color: item.color,
                pantoneValue: data.data[i].pantone_value,
            });
        });

        setProductsData(formattedProductsData);
    };

    return productsData;
};

export default useFetchProductsData;
