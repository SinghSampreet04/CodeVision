import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/Layout";
import AdminDashboard from "./pages/AdminDashboard";
import ContestDetails from "./pages/ContestDetails";
import ContestLeaderboard from "./pages/ContestLeaderboard";
import Contests from "./pages/Contests";
import CreateProblem from "./pages/CreateProblem";
import EditProblem from "./pages/EditProblem";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import ProblemDetails from "./pages/ProblemDetails";
import Problems from "./pages/Problems";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import SubmissionDetails from "./pages/SubmissionDetails";
import Submissions from "./pages/Submissions";
import { getStoredUser } from "./utils/auth";

function RequireAuth({ children }) {
    return getStoredUser() ? children : <Navigate to="/login" replace />;
}

function RequireAdmin({ children }) {
    return getStoredUser()?.role === "ADMIN"
        ? children
        : <Navigate to="/" replace />;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Problems />} />
                    <Route path="/problems/:id" element={<ProblemDetails />} />
                    <Route path="/leaderboard/:problemId" element={<Leaderboard />} />
                    <Route path="/contests" element={<Contests />} />
                    <Route path="/contests/:id" element={<ContestDetails />} />
                    <Route
                        path="/contests/:id/leaderboard"
                        element={<ContestLeaderboard />}
                    />

                    <Route
                        path="/profile"
                        element={
                            <RequireAuth>
                                <Profile />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/submissions"
                        element={
                            <RequireAuth>
                                <Submissions />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/submissions/:id"
                        element={
                            <RequireAuth>
                                <SubmissionDetails />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path="/admin"
                        element={
                            <RequireAdmin>
                                <AdminDashboard />
                            </RequireAdmin>
                        }
                    />
                    <Route
                        path="/create-problem"
                        element={
                            <RequireAdmin>
                                <CreateProblem />
                            </RequireAdmin>
                        }
                    />
                    <Route
                        path="/edit-problem/:id"
                        element={
                            <RequireAdmin>
                                <EditProblem />
                            </RequireAdmin>
                        }
                    />

                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
