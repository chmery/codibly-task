import styles from "./Wrapper.module.css";

type Props = {
    children: React.ReactNode;
};

const Wrapper = ({ children }: Props) => {
    return <div className={styles.wrapper}>{children}</div>;
};

export default Wrapper;
