import styles from "./Button.module.css";

type Props = {
    onClick: () => void;
    children: React.ReactNode;
    nextBtn?: boolean;
    dataTestId?: string;
};

const Button = ({ onClick, children, nextBtn, dataTestId }: Props) => {
    return (
        <button
            className={`${styles.button} ${nextBtn ? styles["next-btn"] : ""}`}
            onClick={onClick}
            data-testid={dataTestId ? dataTestId : ""}
        >
            {children}
        </button>
    );
};

export default Button;
