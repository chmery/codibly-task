import styles from "./App.module.css";
import Input from "./components/Input/Input";
import List from "./components/List/List";
import Wrapper from "./components/Wrapper/Wrapper";

const TEST_DATA = [
    {
        id: 1,
        name: "cerulean",
        year: 2000,
        color: "#98B2D1",
        pantone: "15-4020",
    },
    {
        id: 2,
        name: "fuchsia rose",
        year: 2001,
        color: "#C74375",
        pantone: "17-2031",
    },
    {
        id: 3,
        name: "true red",
        year: 2002,
        color: "#BF1932",
        pantone: "19-1664",
    },
];

const App = () => {
    return (
        <Wrapper>
            <Input />
            <List itemsData={TEST_DATA} />
        </Wrapper>
    );
};

export default App;
