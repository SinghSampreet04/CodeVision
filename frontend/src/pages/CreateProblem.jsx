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
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {

        event.preventDefault();

        setSubmitting(true);
        setMessage("");

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

        } catch (error) {

            setMessage(
                `❌ ${error.message}`
            );
        } finally {
            setSubmitting(false);
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

                    <label htmlFor="create-problem-title">
                        Problem Title
                    </label>

                    <input
                        id="create-problem-title"
                        type="text"
                        placeholder="e.g. Two Sum"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={150}
                        required
                    />

                    <label htmlFor="create-problem-description">
                        Description
                    </label>

                    <textarea
                        id="create-problem-description"
                        placeholder="Describe the problem..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={8}
                        maxLength={20000}
                        required
                    />

                    <label htmlFor="create-problem-difficulty">
                        Difficulty
                    </label>

                    <select
                        id="create-problem-difficulty"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>

                    <label htmlFor="create-sample-input">
                        Sample Input
                    </label>

                    <textarea
                        id="create-sample-input"
                        placeholder="Example input..."
                        value={sampleInput}
                        onChange={(e) => setSampleInput(e.target.value)}
                        rows={4}
                        maxLength={10000}
                    />

                    <label htmlFor="create-sample-output">
                        Sample Output
                    </label>

                    <textarea
                        id="create-sample-output"
                        placeholder="Expected output..."
                        value={sampleOutput}
                        onChange={(e) => setSampleOutput(e.target.value)}
                        rows={4}
                        maxLength={10000}
                    />

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={submitting}
                    >
                        {submitting ? "Creating..." : "Create Problem"}
                    </button>

                </form>

                {

                    message && (

                        <p className="create-message" role="status">

                            {message}

                        </p>

                    )

                }

            </div>

        </div>

    );

}

export default CreateProblem;
