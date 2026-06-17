import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import Problems from "./pages/Problems";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

    return (
        <BrowserRouter>

            <nav>

                <Link to="/">
                    Problems
                </Link>

                {" | "}

                <Link to="/login">
                    Login
                </Link>

                {" | "}

                <Link to="/register">
                    Register
                </Link>

            </nav>

            <Routes>

                <Route
                    path="/"
                    element={<Problems />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;