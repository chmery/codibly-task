import styles from "./App.module.css";
import Wrapper from "./components/Wrapper/Wrapper";

const App = () => {
    return (
        <Wrapper>
            <div className={styles.app}>Test</div>;
        </Wrapper>
    );
};

export default App;
