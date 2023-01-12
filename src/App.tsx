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

const App = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [productData, setProductData] = useState<ProductData | null>(null);
    const [productsData, setProductsData] = useState<ProductsData | null>(null);

    const isDataModalOpen = useSelector((state: RootState) => state.modal.dataModal.isOpen);
    const isErrorModalOpen = useSelector((state: RootState) => state.modal.errorModal.isOpen);

    const isProductsDataAvailiable = productsData && productsData.data.length > 0 ? true : false;
    const isDataAvailiable = isProductsDataAvailiable || productData ? true : false;

    useEffect(() => {
        const setData = async () => {
            const pageParam = searchParams.get("p");
            const idParam = searchParams.get("id");

            if (idParam) {
                if (!isNumber(idParam)) {
                    navigate("/");
                    return;
                }
                const productDataRes = await fetchProductData(idParam);

                // Open error modal only if there was rendered data before
                if (productDataRes instanceof Error && (productData || productsData)) {
                    dispatch(openErrorModal(productDataRes.message));
                    return;
                }

                if (!(productDataRes instanceof Error) && productDataRes) {
                    setProductsData(null);
                    setProductData(productDataRes);
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

                const productsDataRes = await fetchProductsData(Number(pageParam));

                if (productsDataRes instanceof Error) {
                    dispatch(openErrorModal(productsDataRes.message));
                    return;
                }

                if (productsDataRes && productsDataRes.data.length) {
                    setProductData(null);
                    setProductsData(productsDataRes);
                    return;
                }

                navigate("/");
                return;
            }

            // Default render
            if (!pageParam && !idParam) {
                const productsDataRes = await fetchProductsData(1);

                if (productsDataRes instanceof Error) {
                    dispatch(openErrorModal(productsDataRes.message));
                    return;
                }

                if (productsDataRes && productsDataRes.data.length) {
                    setProductsData(productsDataRes);
                    setProductData(null);
                    return;
                }
            }
        };
        setData();
    }, [searchParams]);

    return (
        <Wrapper>
            <div className={styles.app}>
                {!isDataAvailiable && <Loader />}
                {isDataModalOpen && <DataModal />}
                {isErrorModalOpen && <ErrorModal />}
                {isDataAvailiable && <SearchBar />}
                {isProductsDataAvailiable && <List productsData={productsData!.data} />}
                {productData && <List productsData={[productData]} />}
                {isProductsDataAvailiable && <Pagination totalPages={productsData!.totalPages} />}
            </div>
        </Wrapper>
    );
};

export default App;
