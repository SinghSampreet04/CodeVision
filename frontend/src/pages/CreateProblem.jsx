import { useState } from "react";
import {
    createProblem
} from "../services/api";

function CreateProblem() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [sampleInput, setSampleInput] = useState("");
    const [sampleOutput, setSampleOutput] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            const result = await createProblem({
                title,
                description,
                difficulty,
                sampleInput,
                sampleOutput
            });

            setMessage(
                `✅ Problem created successfully! (ID: ${result.id})`
            );

            setTitle("");
            setDescription("");
            setDifficulty("Easy");
            setSampleInput("");
            setSampleOutput("");

        } catch {

            setMessage(
                "❌ Failed to create problem."
            );

        }

    }

    return (

        <div className="create-problem-page">

            <div className="create-problem-card">

                <h1>Create Problem</h1>

                <p className="create-problem-subtitle">
                    Add a new coding challenge for users to solve.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="create-problem-form"
                >

                    <label>
                        Problem Title
                    </label>

                    <input
                        type="text"
                        placeholder="e.g. Two Sum"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label>
                        Description
                    </label>

                    <textarea
                        placeholder="Describe the problem..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={8}
                        required
                    />

                    <label>
                        Difficulty
                    </label>

                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>

                    <label>
                        Sample Input
                    </label>

                    <textarea
                        placeholder="Example input..."
                        value={sampleInput}
                        onChange={(e) => setSampleInput(e.target.value)}
                        rows={4}
                    />

                    <label>
                        Sample Output
                    </label>

                    <textarea
                        placeholder="Expected output..."
                        value={sampleOutput}
                        onChange={(e) => setSampleOutput(e.target.value)}
                        rows={4}
                    />

                    <button
                        type="submit"
                        className="submit-btn"
                    >
                        Create Problem
                    </button>

                </form>

                {

                    message && (

                        <p className="create-message">

                            {message}

                        </p>

                    )

                }

            </div>

        </div>

    );

}

export default CreateProblem;