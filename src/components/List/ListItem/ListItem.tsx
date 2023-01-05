import styles from "./ListItem.module.css";

type Props = {
    itemData: ItemData;
};

const ListItem = ({ itemData }: Props) => {
    const { id, name, year } = itemData;

    return (
        <div className={styles.item}>
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
