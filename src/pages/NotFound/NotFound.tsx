import Wrapper from "../../components/UI/Wrapper/Wrapper";
import { MdNavigateNext } from "react-icons/md";
import styles from "./NotFound.module.css";
import Button from "../../components/UI/Button/Button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    const clickHandler = () => navigate("/");

    return (
        <Wrapper>
            <div className={styles["not-found"]}>
                <h1>Oops!</h1>
                <p>It looks like the site you are looking for does not exist.</p>
                <Button onClick={clickHandler}>Home</Button>
            </div>
        </Wrapper>
    );
};

export default NotFound;
