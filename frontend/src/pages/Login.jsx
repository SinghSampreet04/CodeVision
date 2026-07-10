import { useState } from "react";
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

            window.location.href = "/";

            setMessage(
                `Welcome ${result.username}`
            );

        } catch {

            setMessage(
                "Login failed"
            );
        }
    }

    return (
        <div>

            <h1>Login</h1>

            <form
                onSubmit={
                    handleSubmit
                }
            >

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
                    Login
                </button>

            </form>

            <p>{message}</p>

        </div>
    );
}

export default Login;