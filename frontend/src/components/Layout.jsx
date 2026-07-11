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

        <div className="nav-links">

            <Link to="/">
                Problems
            </Link>

            <Link to="/contests">
                Contests
            </Link>

            {

                user && (

                    <Link to="/submissions">
                        Submissions
                    </Link>

                )

            }

            {

                user?.role === "ADMIN" && (

                    <Link to="/admin">
                        Dashboard
                    </Link>

                )

            }

        </div>

    </div>

    <div className="nav-right">

        {

            user ? (

                <>

                    <Link
                        className="profile-link"
                        to="/profile"
                    >
                        👤 {user.username}
                    </Link>

                    {

                        user.role === "ADMIN" && (

                            <Link
                                className="create-btn"
                                to="/create-problem"
                            >
                                + Create Problem
                            </Link>

                        )

                    }

                    <button
                        onClick={
                            handleLogout
                        }
                    >
                        Logout
                    </button>

                </>

            ) : (

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

    </div>

</nav>

            <div className="app-container">

                <Outlet />

            </div>

        </>

    );

}

export default Layout;