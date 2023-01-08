import styles from "./App.module.css";
import Input from "./components/Input/Input";
import List from "./components/List/List";
import Pagination from "./components/Pagination/Pagination";
import Loader from "./components/UI/Loader/Loader";
import Wrapper from "./components/Wrapper/Wrapper";
import useFetchProductsData from "./hooks/useFetchProductsData";

const App = () => {
    const productsData = useFetchProductsData();

    return (
        <Wrapper>
            <div className={styles.app}>
                {!productsData && <Loader />}
                {productsData && (
                    <>
                        <Input />
                        <List productsData={productsData.data} />
                        <Pagination totalPages={productsData.totalPages} />
                    </>
                )}
            </div>
        </Wrapper>
    );
};

export default App;
