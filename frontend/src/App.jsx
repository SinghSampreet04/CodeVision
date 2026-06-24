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
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import Contests from "./pages/Contests";
import ContestDetails from "./pages/ContestDetails";
import ContestLeaderboard from "./pages/ContestLeaderboard";

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

            <nav className="navbar">

    <div className="nav-left">

        <Link
            className="logo"
            to="/"
        >
            CodeVision
        </Link>

    </div>

    <div className="nav-right">

        <Link to="/">
            Problems
        </Link>

        <Link to="/contests">
            Contests
        </Link>

        {user && (

            <Link to="/profile">
                Profile
            </Link>

        )}

        {user?.role === "ADMIN" && (

            <>
                <Link to="/admin">
                    Dashboard
                </Link>

                <Link to="/create-problem">
                    Create Problem
                </Link>
            </>

        )}

        {user && (

            <Link to="/submissions">
                Submissions
            </Link>

        )}

        {!user && (

            <>
                <Link to="/login">
                    Login
                </Link>

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
            >
                Logout
            </button>

        )}

    </div>

</nav>

            <Routes>

                <Route
                    path="/"
                    element={<Problems />}
                />

                <Route
                    path="/contests"
                    element={<Contests />}
                />

                <Route
                    path="/contests/:id"
                    element={
                        <ContestDetails />
                    }
                />

                <Route
                    path="/contests/:id/leaderboard"
                    element={
                        <ContestLeaderboard />
                    }
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/admin"
                    element={
                        <AdminDashboard />
                    }
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