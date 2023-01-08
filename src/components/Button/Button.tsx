import styles from "./Button.module.css";

type Props = {
    onClick: () => void;
    children: React.ReactNode;
    nextBtn?: boolean;
};

const Button = ({ onClick, children, nextBtn }: Props) => {
    return (
        <button
            className={`${styles.button} ${nextBtn ? styles["next-btn"] : ""}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
