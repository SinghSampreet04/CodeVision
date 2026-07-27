import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getMySubmissions } from "../services/api";
import { formatDateTime, formatStatus } from "../utils/format";

function Submissions() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getMySubmissions()
            .then(setSubmissions)
            .catch(requestError => setError(requestError.message))
            .finally(() => setLoading(false));
    }, []);

    function getStatusIcon(status) {
        const icons = {
            ACCEPTED: "🟢",
            WRONG_ANSWER: "🔴",
            COMPILATION_ERROR: "🟠",
            RUNTIME_ERROR: "💥",
            TIME_LIMIT_EXCEEDED: "⏱️",
            PENDING: "⚪"
        };

        return icons[status] || "❓";
    }

    return (
        <div>
            <div className="problems-header">
                <h1>My Submissions</h1>
                <p>Review your solutions, results, and automated feedback.</p>
            </div>

            <div className="section-card">
                <h2>Total Submissions: {submissions.length}</h2>
            </div>

            {loading ? (
                <div className="section-card page-state" role="status">
                    <p>Loading submissions...</p>
                </div>
            ) : error ? (
                <div className="section-card page-state" role="alert">
                    <p>{error}</p>
                </div>
            ) : submissions.length === 0 ? (
                <div className="section-card page-state">
                    <p>No submissions yet. Pick a problem and start coding.</p>
                    <Link className="primary-btn" to="/">
                        Browse problems
                    </Link>
                </div>
            ) : (
                submissions
                    .slice()
                    .reverse()
                    .map(submission => (
                        <div
                            key={submission.id}
                            className="submission-history-card"
                        >
                            <div className="submission-top">
                                <Link
                                    className="submission-link"
                                    to={`/submissions/${submission.id}`}
                                >
                                    Submission #{submission.id}
                                </Link>

                                <div
                                    className={`status-badge status-${submission.status.toLowerCase()}`}
                                >
                                    {getStatusIcon(submission.status)}{" "}
                                    {formatStatus(submission.status)}
                                </div>
                            </div>

                            <div className="submission-grid">
                                <div>
                                    <strong>Passed</strong>
                                    <p>
                                        {submission.passedTestCases} /{" "}
                                        {submission.totalTestCases}
                                    </p>
                                </div>
                                <div>
                                    <strong>Submitted</strong>
                                    <p>{formatDateTime(submission.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                    ))
            )}
        </div>
    );
}

export default Submissions;
