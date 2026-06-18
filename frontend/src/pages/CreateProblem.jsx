import { useState } from "react";

import {
    createProblem
} from "../services/api";

function CreateProblem() {

    const [title, setTitle] =
        useState("");

    const [description, setDescription] =
        useState("");

    const [difficulty, setDifficulty] =
        useState("Easy");

    const [sampleInput, setSampleInput] =
        useState("");

    const [sampleOutput, setSampleOutput] =
        useState("");

    const [message, setMessage] =
        useState("");

    async function handleSubmit(
            event
    ) {

        event.preventDefault();

        try {

            const result =
                await createProblem(
                    {
                        title,
                        description,
                        difficulty,
                        sampleInput,
                        sampleOutput
                    }
                );

            setMessage(
                `Problem created with ID ${result.id}`
            );

            setTitle("");
            setDescription("");
            setDifficulty("Easy");
            setSampleInput("");
            setSampleOutput("");

        } catch {

            setMessage(
                "Failed to create problem"
            );
        }
    }

    return (
        <div>

            <h1>
                Create Problem
            </h1>

            <form
                onSubmit={
                    handleSubmit
                }
            >

                <div>

                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(
                                e.target.value
                            )
                        }
                        required
                    />

                </div>

                <br />

                <div>

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(
                                e.target.value
                            )
                        }
                        rows={8}
                        cols={60}
                        required
                    />

                </div>

                <br />

                <div>

                    <select
                        value={difficulty}
                        onChange={(e) =>
                            setDifficulty(
                                e.target.value
                            )
                        }
                    >

                        <option>
                            Easy
                        </option>

                        <option>
                            Medium
                        </option>

                        <option>
                            Hard
                        </option>

                    </select>

                </div>

                <br />

                <div>

                    <textarea
                        placeholder="Sample Input"
                        value={sampleInput}
                        onChange={(e) =>
                            setSampleInput(
                                e.target.value
                            )
                        }
                        rows={4}
                        cols={60}
                    />

                </div>

                <br />

                <div>

                    <textarea
                        placeholder="Sample Output"
                        value={sampleOutput}
                        onChange={(e) =>
                            setSampleOutput(
                                e.target.value
                            )
                        }
                        rows={4}
                        cols={60}
                    />

                </div>

                <br />

                <button
                    type="submit"
                >
                    Create Problem
                </button>

            </form>

            <p>
                {message}
            </p>

        </div>
    );
}

export default CreateProblem;