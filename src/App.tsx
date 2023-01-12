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
import DataModal from "./components/UI/DataModal/DataModal";
import ErrorModal from "./components/UI/ErrorModal/ErrorModal";
import { openErrorModal } from "./store/modalSlice/modalSlice";
import { useSearchParams, useNavigate } from "react-router-dom";
import { isNumber } from "./helpers/isNumber";
import { setPage } from "./store/paginationSlice/paginationSlice";

const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [productData, setProductData] = useState<ProductData | null>(null);
    const [productsData, setProductsData] = useState<ProductsData | null>(null);
    const [enteredId, setEnteredId] = useState("");

    const isDataModalOpen = useSelector((state: RootState) => state.modal.dataModal.isOpen);
    const isErrorModalOpen = useSelector((state: RootState) => state.modal.errorModal.isOpen);

    const isProductsDataAvailiable = productsData && productsData.data.length > 0 ? true : false;
    const isDataAvailiable = isProductsDataAvailiable || productData ? true : false;

    const searchHandler = (enteredId: string) => {
        setEnteredId(enteredId);
        if (!enteredId) {
            navigate("/");
            dispatch(setPage(1));
            setProductData(null);
            return;
        }
        setSearchParams({ id: enteredId });
    };

    useEffect(() => {
        const setInitialState = async () => {
            const pageParam = searchParams.get("p");
            const idParam = searchParams.get("id");

            if (idParam) {
                if (!isNumber(idParam)) {
                    navigate("/");
                    return;
                }
                const productData = await fetchProductData(idParam);

                // Open error modal only if there was some rendered data before
                if (productData instanceof Error && (productsData || enteredId)) {
                    dispatch(openErrorModal(productData.message));
                    return;
                }

                if (!(productData instanceof Error) && productData) {
                    setProductsData(null);
                    setProductData(productData);
                    return;
                }

                navigate("/");
                return;
            }

            if (pageParam) {
                if (!isNumber(pageParam)) {
                    navigate("/");
                    return;
                }

                const productsData = await fetchProductsData(Number(pageParam));

                if (productsData instanceof Error) {
                    dispatch(openErrorModal(productsData.message));
                    return;
                }

                if (productsData && productsData.data.length) {
                    setProductData(null);
                    setProductsData(productsData);
                    return;
                }

                navigate("/");
                return;
            }

            // Initial render
            if (!pageParam && !idParam) {
                const productsData = await fetchProductsData(1);

                if (productsData instanceof Error) {
                    dispatch(openErrorModal(productsData.message));
                    return;
                }

                if (productsData && productsData.data.length) {
                    setProductsData(productsData);
                }
            }
        };
        setInitialState();
    }, [searchParams]);

    return (
        <Wrapper>
            <div className={styles.app}>
                {!isDataAvailiable && <Loader />}
                {isDataModalOpen && <DataModal />}
                {isErrorModalOpen && <ErrorModal />}
                {isDataAvailiable && <SearchBar onSearch={searchHandler} />}
                {isProductsDataAvailiable && <List productsData={productsData!.data} />}
                {productData && <List productsData={[productData]} />}
                {isProductsDataAvailiable && <Pagination totalPages={productsData!.totalPages} />}
            </div>
        </Wrapper>
    );
};

export default App;
