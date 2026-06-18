import { useEffect, useState } from "react";

import {
    useParams,
    useNavigate
} from "react-router-dom";

import {
    getProblemById,
    updateProblem,
    deleteProblem
} from "../services/api";

function EditProblem() {

    const { id } =
        useParams();

    const navigate =
        useNavigate();

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

    useEffect(() => {

        async function loadProblem() {

            try {

                const problem =
                    await getProblemById(
                        id
                    );

                setTitle(
                    problem.title
                );

                setDescription(
                    problem.description
                );

                setDifficulty(
                    problem.difficulty
                );

                setSampleInput(
                    problem.sampleInput || ""
                );

                setSampleOutput(
                    problem.sampleOutput || ""
                );

            } catch {

                setMessage(
                    "Failed to load problem"
                );
            }
        }

        loadProblem();

    }, [id]);

    async function handleUpdate(
            event
    ) {

        event.preventDefault();

        try {

            await updateProblem(
                id,
                {
                    title,
                    description,
                    difficulty,
                    sampleInput,
                    sampleOutput
                }
            );

            setMessage(
                "Problem updated successfully"
            );

        } catch {

            setMessage(
                "Failed to update problem"
            );
        }
    }

    async function handleDelete() {

        const confirmed =
            window.confirm(
                "Delete this problem?"
            );

        if (!confirmed) {

            return;
        }

        try {

            await deleteProblem(
                id
            );

            navigate("/");

        } catch {

            alert(
                "Failed to delete problem"
            );
        }
    }

    return (
        <div>

            <h1>
                Edit Problem
            </h1>

            <form
                onSubmit={
                    handleUpdate
                }
            >

                <div>

                    <input
                        type="text"
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
                    Save Changes
                </button>

                {" "}

                <button
                    type="button"
                    onClick={
                        handleDelete
                    }
                >
                    Delete Problem
                </button>

            </form>

            <p>
                {message}
            </p>

        </div>
    );
}

export default EditProblem;