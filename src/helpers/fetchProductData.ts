export const fetchProductData = async (enteredId: string) => {
    const res = await fetch(`https://reqres.in/api/products/${enteredId}`);
    const data: ProductDataResponse = await res.json();

    const { id, name, year, color, pantone_value } = data.data;

    const formattedProductData = {
        id,
        name,
        year,
        color,
        pantoneValue: pantone_value,
    };

    return formattedProductData;
};
