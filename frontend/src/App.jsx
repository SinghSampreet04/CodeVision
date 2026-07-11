import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Layout from "./components/Layout";

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

    return (

        <BrowserRouter>

            <Routes>

                <Route element={<Layout />}>

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
                        element={<ContestDetails />}
                    />

                    <Route
                        path="/contests/:id/leaderboard"
                        element={<ContestLeaderboard />}
                    />

                    <Route
                        path="/profile"
                        element={<Profile />}
                    />

                    <Route
                        path="/admin"
                        element={
                            user?.role === "ADMIN"
                                ? <AdminDashboard />
                                : <Navigate to="/" replace />
                        }
                    />

                    <Route
                        path="/problems/:id"
                        element={<ProblemDetails />}
                    />

                    <Route
                        path="/edit-problem/:id"
                        element={
                            user?.role === "ADMIN"
                                ? <EditProblem />
                                : <Navigate to="/" replace />
                        }
                    />

                    <Route
                        path="/leaderboard/:problemId"
                        element={<Leaderboard />}
                    />

                    <Route
                        path="/submissions"
                        element={<Submissions />}
                    />

                    <Route
                        path="/submissions/:id"
                        element={<SubmissionDetails />}
                    />

                    <Route
                        path="/create-problem"
                        element={
                            user?.role === "ADMIN"
                                ? <CreateProblem />
                                : <Navigate to="/" replace />
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

                </Route>

            </Routes>

        </BrowserRouter>

    );

}

export default App;