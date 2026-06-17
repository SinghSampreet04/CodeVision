import {
    BrowserRouter,
    Routes,
    Route,
    Link
} from "react-router-dom";

import Problems from "./pages/Problems";
import ProblemDetails from "./pages/ProblemDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Submissions from "./pages/Submissions";
import SubmissionDetails from "./pages/SubmissionDetails";
import Leaderboard from "./pages/Leaderboard";

function App() {

    return (
        <BrowserRouter>

            <nav>

                <Link to="/">
                    Problems
                </Link>

                {" | "}

                <Link to="/submissions">
                    My Submissions
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
                    path="/problems/:id"
                    element={
                        <ProblemDetails />
                    }
                />

                <Route
                    path="/leaderboard/:problemId"
                    element={
                        <Leaderboard />
                    }
                />

                <Route
                    path="/submissions"
                    element={
                        <Submissions />
                    }
                />

                <Route
                    path="/submissions/:id"
                    element={
                        <SubmissionDetails />
                    }
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