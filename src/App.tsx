import styles from "./App.module.css";
import Input from "./components/Input/Input";
import List from "./components/List/List";
import Pagination from "./components/Pagination/Pagination";
import Wrapper from "./components/Wrapper/Wrapper";
import useFetchProductsData from "./hooks/useFetchProductsData";

const App = () => {
    const productsData = useFetchProductsData();

    return (
        <Wrapper>
            <Input />
            {productsData && <List productsData={productsData.data} />}
            {productsData && <Pagination totalPages={productsData.totalPages} />}
        </Wrapper>
    );
};

export default App;
