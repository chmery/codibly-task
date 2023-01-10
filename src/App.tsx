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
import { resetPage } from "./store/paginationSlice/paginationSlice";
import DataModal from "./components/UI/DataModal/DataModal";
import ErrorModal from "./components/UI/ErrorModal/ErrorModal";
import { openErrorModal } from "./store/modalSlice/modalSlice";

const App = () => {
    const [productData, setProductData] = useState<ProductData | null>(null);
    const [productsData, setProductsData] = useState<ProductsData | null>(null);
    const [enteredId, setEnteredId] = useState("");

    const searchHandler = (enteredId: string) => setEnteredId(enteredId);

    const currentPage = useSelector((state: RootState) => state.pagination.currentPage);
    const isDataModalOpen = useSelector((state: RootState) => state.modal.dataModal.isOpen);
    const isErrorModalOpen = useSelector((state: RootState) => state.modal.errorModal.isOpen);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
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
                dispatch(resetPage());
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

        fetchData();
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
