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
import CreateProblem from "./pages/CreateProblem";
import EditProblem from "./pages/EditProblem";

function App() {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    function handleLogout() {

        localStorage.removeItem(
            "user"
        );

        window.location.href =
            "/login";
    }

    return (
        <BrowserRouter>

            <nav>

                <Link to="/">
                    Problems
                </Link>

                {" | "}

                {
                    user?.role ===
                    "ADMIN" && (
                        <>
                            <Link
                                to="/create-problem"
                            >
                                Create Problem
                            </Link>

                            {" | "}
                        </>
                    )
                }

                {user && (
                    <>
                        <Link to="/submissions">
                            My Submissions
                        </Link>

                        {" | "}
                    </>
                )}

                {!user && (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        {" | "}

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                )}

                {user && (
                    <button
                        onClick={
                            handleLogout
                        }
                        style={{
                            marginLeft: "10px"
                        }}
                    >
                        Logout
                    </button>
                )}

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
                    path="/edit-problem/:id"
                    element={
                        <EditProblem />
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
                    path="/create-problem"
                    element={
                        <CreateProblem />
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