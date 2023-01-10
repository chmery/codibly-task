import { useDispatch, useSelector } from "react-redux";
import styles from "./App.module.css";
import List from "./components/List/List";
import Pagination from "./components/Pagination/Pagination";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/UI/Loader/Loader";
import Wrapper from "./components/Wrapper/Wrapper";
import { RootState } from "./store/store";
import { useEffect, useState } from "react";
import { fetchProductsData } from "./helpers/fetchProductsData";
import { fetchProductData } from "./helpers/fetchProductData";
import { resetPage } from "./store/paginationSlice/paginationSlice";
import DataModal from "./components/UI/DataModal/DataModal";

const App = () => {
    const [productData, setProductData] = useState<ProductData | null>(null);
    const [productsData, setProductsData] = useState<ProductsData | null>(null);
    const [enteredId, setEnteredId] = useState("");

    const searchHandler = (enteredId: string) => setEnteredId(enteredId);

    const currentPage = useSelector((state: RootState) => state.pagination.currentPage);
    const isDataModalOpen = useSelector((state: RootState) => state.modal.isOpen);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            if (enteredId) {
                const productData = await fetchProductData(enteredId);
                setProductsData(null);
                setProductData(productData);
            }

            if (!enteredId) {
                const productsData = await fetchProductsData(currentPage);
                setProductData(null);
                setProductsData(productsData);
            }

            // After using search button and then search again but with an empty input return to the first page
            if (!enteredId && productData) {
                const productsData = await fetchProductsData(1);
                dispatch(resetPage());
                setProductData(null);
                setProductsData(productsData);
            }
        };

        fetchData();
    }, [currentPage, enteredId]);

    const isDataAvailiable = productsData || productData ? true : false;

    return (
        <Wrapper>
            <div className={styles.app}>
                {!isDataAvailiable && <Loader />}
                {isDataModalOpen && <DataModal />}
                {isDataAvailiable && <SearchBar onSearch={searchHandler} />}
                {productsData && <List productsData={productsData.data} />}
                {productData && <List productsData={[productData]} />}
                {productsData && <Pagination totalPages={productsData.totalPages} />}
            </div>
        </Wrapper>
    );
};

export default App;
