import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function Layout() {

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

        <>

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

                    {

                        user && (

                            <Link to="/profile">
                                Profile
                            </Link>

                        )

                    }

                    {

                        user?.role === "ADMIN" && (

                            <>

                                <Link to="/admin">
                                    Dashboard
                                </Link>

                                <Link to="/create-problem">
                                    Create Problem
                                </Link>

                            </>

                        )

                    }

                    {

                        user && (

                            <Link to="/submissions">
                                Submissions
                            </Link>

                        )

                    }

                    {

                        !user && (

                            <>

                                <Link to="/login">
                                    Login
                                </Link>

                                <Link to="/register">
                                    Register
                                </Link>

                            </>

                        )

                    }

                    {

                        user && (

                            <button
                                onClick={
                                    handleLogout
                                }
                            >
                                Logout
                            </button>

                        )

                    }

                </div>

            </nav>

            <div className="app-container">

                <Outlet />

            </div>

        </>

    );

}

export default Layout;