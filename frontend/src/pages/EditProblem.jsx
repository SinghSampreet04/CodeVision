import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    deleteProblem,
    getProblemById,
    updateProblem
} from "../services/api";

function EditProblem() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [sampleInput, setSampleInput] = useState("");
    const [sampleOutput, setSampleOutput] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        getProblemById(id)
            .then(problem => {
                setTitle(problem.title);
                setDescription(problem.description);
                setDifficulty(problem.difficulty);
                setSampleInput(problem.sampleInput || "");
                setSampleOutput(problem.sampleOutput || "");
            })
            .catch(error => setMessage(error.message))
            .finally(() => setLoading(false));
    }, [id]);

    async function handleUpdate(event) {
        event.preventDefault();
        setSubmitting(true);
        setMessage("");

        try {
            await updateProblem(id, {
                title,
                description,
                difficulty,
                sampleInput,
                sampleOutput
            });
            setMessage("Problem updated successfully.");
        } catch (error) {
            setMessage(error.message);
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDelete() {
        if (!window.confirm("Delete this problem? This cannot be undone.")) {
            return;
        }

        setSubmitting(true);
        setMessage("");

        try {
            await deleteProblem(id);
            navigate("/", { replace: true });
        } catch (error) {
            setMessage(error.message);
            setSubmitting(false);
        }
    }

    if (loading) {
        return (
            <div className="section-card page-state" role="status">
                <p>Loading problem...</p>
            </div>
        );
    }

    return (
        <div className="create-problem-page">
            <div className="create-problem-card">
                <h1>Edit Problem</h1>
                <p className="create-problem-subtitle">
                    Update the challenge content, examples, or difficulty.
                </p>

                <form
                    className="create-problem-form"
                    onSubmit={handleUpdate}
                >
                    <label htmlFor="problem-title">Problem Title</label>
                    <input
                        id="problem-title"
                        type="text"
                        value={title}
                        onChange={event => setTitle(event.target.value)}
                        maxLength={150}
                        required
                    />

                    <label htmlFor="problem-description">Description</label>
                    <textarea
                        id="problem-description"
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                        rows={8}
                        maxLength={20000}
                        required
                    />

                    <label htmlFor="problem-difficulty">Difficulty</label>
                    <select
                        id="problem-difficulty"
                        value={difficulty}
                        onChange={event => setDifficulty(event.target.value)}
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>

                    <label htmlFor="sample-input">Sample Input</label>
                    <textarea
                        id="sample-input"
                        value={sampleInput}
                        onChange={event => setSampleInput(event.target.value)}
                        rows={4}
                        maxLength={10000}
                    />

                    <label htmlFor="sample-output">Sample Output</label>
                    <textarea
                        id="sample-output"
                        value={sampleOutput}
                        onChange={event => setSampleOutput(event.target.value)}
                        rows={4}
                        maxLength={10000}
                    />

                    <div className="form-actions">
                        <button
                            className="submit-btn"
                            type="submit"
                            disabled={submitting}
                        >
                            {submitting ? "Saving..." : "Save Changes"}
                        </button>
                        <button
                            className="danger-btn"
                            type="button"
                            onClick={handleDelete}
                            disabled={submitting}
                        >
                            Delete Problem
                        </button>
                    </div>
                </form>

                {message && (
                    <p className="create-message" role="status">
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default EditProblem;
