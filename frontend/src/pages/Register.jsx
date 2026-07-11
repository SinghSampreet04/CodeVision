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

    async function handleSubmit(
        event
    ) {

        event.preventDefault();

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

        } catch {

            setMessage(

                "Registration failed."

            );

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

                    <label>

                        Username

                    </label>

                    <input
                        className="auth-input"
                        type="text"
                        placeholder="Choose a username"
                        value={username}
                        onChange={(e) =>
                            setUsername(
                                e.target.value
                            )
                        }
                        required
                    />

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
                    >

                        Create Account

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