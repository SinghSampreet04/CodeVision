import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [message, setMessage] =
        useState("");

    const [submitting, setSubmitting] =
        useState(false);

    async function handleSubmit(
        event
    ) {

        event.preventDefault();

        setSubmitting(true);
        setMessage("");

        try {
            const result =
                await loginUser({
                    email,
                    password
                });

            localStorage.setItem(
                "user",
                JSON.stringify(result)
            );

            navigate("/", { replace: true });

        } catch (error) {
            setMessage(
                error.message
            );
        } finally {
            setSubmitting(false);
        }

    }

    return (

        <div className="auth-page">

            <div className="auth-card">

                <h1>

                    Welcome Back 👋

                </h1>

                <p>

                    Sign in to continue coding on CodeVision.

                </p>

                <form
                    onSubmit={handleSubmit}
                >

                    <label htmlFor="login-email">

                        Email

                    </label>

                    <input
                        id="login-email"
                        className="auth-input"
                        type="email"
                        autoComplete="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        required
                    />

                    <label htmlFor="login-password">

                        Password

                    </label>

                    <input
                        id="login-password"
                        className="auth-input"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        required
                    />

                    <button
                        className="submit-btn"
                        type="submit"
                        disabled={submitting}
                    >
                        {submitting ? "Signing in..." : "Login"}

                    </button>

                </form>

                {

                    message && (

                        <p className="auth-message" role="alert">

                            {message}

                        </p>

                    )

                }

                <p className="auth-footer">

                    Don't have an account?{" "}

                    <Link to="/register">

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;
