import styles from "./List.module.css";
import ListItem from "./ListItem/ListItem";

type Props = {
    itemsData: ItemData[];
};

const List = ({ itemsData }: Props) => {
    return (
        <div className={styles.list}>
            {itemsData.map((itemData) => (
                <ListItem itemData={itemData} />
            ))}
        </div>
    );
};

export default List;
