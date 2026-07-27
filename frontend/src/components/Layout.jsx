import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { getStoredUser } from "../utils/auth";

function Layout() {
    const user = getStoredUser();
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    }

    return (
        <>
            <nav className="navbar">
                <div className="nav-left">
                    <Link className="logo" to="/" aria-label="CodeVision home">
                        <img
                            className="logo-mark"
                            src="/brand/codevision-logo-v2.png"
                            alt=""
                        />
                        <span>CodeVision</span>
                    </Link>

                    <div className="nav-links" aria-label="Primary navigation">
                        <NavLink to="/" end>
                            Problems
                        </NavLink>
                        <NavLink to="/contests">
                            Contests
                        </NavLink>
                        {user && (
                            <NavLink to="/submissions">
                                Submissions
                            </NavLink>
                        )}
                        {user?.role === "ADMIN" && (
                            <NavLink to="/admin">
                                Dashboard
                            </NavLink>
                        )}
                    </div>
                </div>

                <div className="nav-right">
                    {user ? (
                        <>
                            <Link className="profile-link" to="/profile">
                                <span aria-hidden="true">👤</span> {user.username}
                            </Link>
                            {user.role === "ADMIN" && (
                                <Link className="create-btn" to="/create-problem">
                                    + Create Problem
                                </Link>
                            )}
                            <button type="button" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </nav>

            <div className="app-container">
                <Outlet />
            </div>
        </>
    );
}

export default Layout;
