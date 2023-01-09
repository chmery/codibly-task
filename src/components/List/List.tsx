import styles from "./List.module.css";
import ListItem from "./ListItem/ListItem";

type Props = {
    productsData: ProductData[];
};

const List = ({ productsData }: Props) => {
    return (
        <div className={styles.list}>
            {productsData.map((productData) => (
                <ListItem productData={productData} key={productData.id} />
            ))}
        </div>
    );
};

export default List;
