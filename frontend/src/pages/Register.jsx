import { useState } from "react";
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
                `Registered: ${result.username}`
            );

            setUsername("");
            setEmail("");
            setPassword("");

        } catch {

    setMessage(
        "Registration failed"
    );
}
    }

    return (
        <div>

            <h1>Register</h1>

            <form
                onSubmit={
                    handleSubmit
                }
            >

                <div>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) =>
                            setUsername(
                                e.target.value
                            )
                        }
                    />
                </div>

                <br />

                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) =>
                            setEmail(
                                e.target.value
                            )
                        }
                    />
                </div>

                <br />

                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                    />
                </div>

                <br />

                <button type="submit">
                    Register
                </button>

            </form>

            <p>{message}</p>

        </div>
    );
}

export default Register;