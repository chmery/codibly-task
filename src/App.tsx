import { useDispatch, useSelector } from "react-redux";
import styles from "./App.module.css";
import List from "./components/List/List";
import Pagination from "./components/Pagination/Pagination";
import SearchBar from "./components/SearchBar/SearchBar";
import Loader from "./components/UI/Loader/Loader";
import Wrapper from "./components/UI/Wrapper/Wrapper";
import { RootState } from "./store/store";
import { useEffect, useState } from "react";
import { fetchProductsData } from "./helpers/fetchProductsData";
import { fetchProductData } from "./helpers/fetchProductData";
import { setPage } from "./store/paginationSlice/paginationSlice";
import DataModal from "./components/UI/DataModal/DataModal";
import ErrorModal from "./components/UI/ErrorModal/ErrorModal";
import { openErrorModal } from "./store/modalSlice/modalSlice";
import { useSearchParams, useLocation } from "react-router-dom";

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();

    const [searchParams, setSearchParams] = useSearchParams();

    const [productData, setProductData] = useState<ProductData | null>(null);
    const [productsData, setProductsData] = useState<ProductsData | null>(null);
    const [enteredId, setEnteredId] = useState("");

    const searchHandler = (enteredId: string) => {
        setEnteredId(enteredId);
        if (!enteredId) return;
        setSearchParams({ id: enteredId });
    };

    const currentPage = useSelector((state: RootState) => state.pagination.currentPage);
    const isDataModalOpen = useSelector((state: RootState) => state.modal.dataModal.isOpen);
    const isErrorModalOpen = useSelector((state: RootState) => state.modal.errorModal.isOpen);

    useEffect(() => {
        const query = location.search;
        if (query === "?p=1") return; // First page

        const currentPage = searchParams.get("p");
        const enteredId = searchParams.get("id");

        if (enteredId) {
            setEnteredId(enteredId);
            return;
        }

        if (currentPage) {
            dispatch(setPage(Number(currentPage)));
            return;
        }
    }, []);

    useEffect(() => {
        if (location.search.startsWith("?id=")) return;
        setSearchParams({ p: currentPage.toString() });
    }, [currentPage]);

    useEffect(() => {
        const setData = async () => {
            if (enteredId) {
                const productData = await fetchProductData(enteredId);
                if (productData instanceof Error) {
                    dispatch(openErrorModal(productData.message));
                    return;
                }
                if (productData) {
                    setProductsData(null);
                    setProductData(productData);
                }
            }

            if (!enteredId) {
                const productsData = await fetchProductsData(currentPage);
                if (productsData instanceof Error) {
                    dispatch(openErrorModal(productsData.message));
                    return;
                }

                if (productsData) {
                    setProductData(null);
                    setProductsData(productsData);
                }
            }

            // After using search button and then search again but with an empty input return to the first page
            if (!enteredId && productData) {
                const productsData = await fetchProductsData(1);
                dispatch(setPage(1));
                setSearchParams({ p: currentPage.toString() });
                if (productsData instanceof Error) {
                    dispatch(openErrorModal(productsData.message));
                    return;
                }

                if (productsData) {
                    setProductData(null);
                    setProductsData(productsData);
                }
            }
        };

        setData();
    }, [currentPage, enteredId]);

    const isDataAvailiable = productsData || productData ? true : false;

    return (
        <Wrapper>
            <div className={styles.app}>
                {!isDataAvailiable && <Loader />}
                {isDataModalOpen && <DataModal />}
                {isErrorModalOpen && <ErrorModal />}
                {isDataAvailiable && <SearchBar onSearch={searchHandler} />}
                {productsData && <List productsData={productsData.data} />}
                {productData && <List productsData={[productData]} />}
                {productsData && <Pagination totalPages={productsData.totalPages} />}
            </div>
        </Wrapper>
    );
};

export default App;
