import { useState } from "react";
import { Link } from "react-router-dom";
import { registerUser } from "../services/api";

function Register() {

    const [username, setUsername] =
        useState("");

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
                await registerUser({

                    username,

                    email,

                    password

                });

            setMessage(

                `Account created successfully for ${result.username}!`

            );

            setUsername("");

            setEmail("");

            setPassword("");

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

                    Create Account 🚀

                </h1>

                <p>

                    Join CodeVision and start solving coding challenges.

                </p>

                <form
                    onSubmit={handleSubmit}
                >

                    <label htmlFor="register-username">

                        Username

                    </label>

                    <input
                        id="register-username"
                        className="auth-input"
                        type="text"
                        autoComplete="username"
                        minLength={2}
                        maxLength={50}
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) =>
                            setUsername(
                                e.target.value
                            )
                        }
                        required
                    />

                    <label htmlFor="register-email">

                        Email

                    </label>

                    <input
                        id="register-email"
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

                    <label htmlFor="register-password">

                        Password

                    </label>

                    <input
                        id="register-password"
                        className="auth-input"
                        type="password"
                        autoComplete="new-password"
                        minLength={8}
                        maxLength={100}
                        placeholder="Create a password"
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
                        {submitting ? "Creating account..." : "Create Account"}

                    </button>

                </form>

                {

                    message && (

                        <p className="auth-message" role="status">

                            {message}

                        </p>

                    )

                }

                <p className="auth-footer">

                    Already have an account?{" "}

                    <Link to="/login">

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Register;
