import { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../services/api";

function Login() {

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [message, setMessage] =
        useState("");

    async function handleSubmit(
        event
    ) {

        event.preventDefault();

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

            setMessage(
                `Welcome ${result.username}`
            );

            window.location.href =
                "/";

        } catch {

            setMessage(
                "Invalid email or password."
            );

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

                    <label>

                        Email

                    </label>

                    <input
                        className="auth-input"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                        required
                    />

                    <label>

                        Password

                    </label>

                    <input
                        className="auth-input"
                        type="password"
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
                    >

                        Login

                    </button>

                </form>

                {

                    message && (

                        <p className="auth-message">

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