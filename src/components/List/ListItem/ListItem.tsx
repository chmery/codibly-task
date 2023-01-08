import styles from "./ListItem.module.css";

type Props = {
    productData: ProductData;
};

const ListItem = ({ productData }: Props) => {
    const { id, name, year, color } = productData;

    return (
        <div style={{ background: color }} className={styles["list-item"]}>
            <div>
                ID: <span>{id}</span>
            </div>
            <div>
                Name: <span>{name}</span>
            </div>
            <div>
                Year: <span>{year}</span>
            </div>
        </div>
    );
};

export default ListItem;
