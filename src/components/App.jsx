import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";

function App(props) {



    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;