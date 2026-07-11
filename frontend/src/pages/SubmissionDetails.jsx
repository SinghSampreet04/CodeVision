import { useEffect, useState } from "react";

import {
    useParams
} from "react-router-dom";

import {
    getSubmissionById
} from "../services/api";

function SubmissionDetails() {

    const { id } =
        useParams();

    const [submission, setSubmission] =
        useState(null);

    useEffect(() => {

        getSubmissionById(id)

            .then(data => {

                setSubmission(
                    data
                );

            })

            .catch(error => {

                console.error(
                    error
                );

            });

    }, [id]);

    function getStatusIcon(status) {

        if (status === "ACCEPTED") {

            return "🟢";

        }

        if (status === "WRONG_ANSWER") {

            return "🔴";

        }

        if (status === "COMPILATION_ERROR") {

            return "🟠";

        }

        if (status === "RUNTIME_ERROR") {

            return "💥";

        }

        if (status === "TIME_LIMIT_EXCEEDED") {

            return "⏱️";

        }

        if (status === "PENDING") {

            return "⚪";

        }

        return "❓";

    }

    if (!submission) {

        return <p>Loading...</p>;

    }

    return (

        <div className="submission-details-page">

            <div className="section-card">

                <div className="submission-details-header">

                    <div>

                        <h1>

                            Submission #{submission.id}

                        </h1>

                        <p>

                            Submitted on {submission.createdAt}

                        </p>

                    </div>

                    <div
                        className={`status-badge status-${submission.status.toLowerCase()}`}
                    >

                        {

                            getStatusIcon(
                                submission.status
                            )

                        }

                        {" "}

                        {submission.status}

                    </div>

                </div>

                <div className="submission-details-grid">

                    <div className="stat-box">

                        <strong>

                            Passed

                        </strong>

                        <h3>

                            {submission.passedTestCases}

                            {" / "}

                            {submission.totalTestCases}

                        </h3>

                    </div>

                    <div className="stat-box">

                        <strong>

                            Runtime

                        </strong>

                        <h3>

                            {submission.runtime ?? 0} ms

                        </h3>

                    </div>

                    <div className="stat-box">

                        <strong>

                            Language

                        </strong>

                        <h3>

                            {submission.language}

                        </h3>

                    </div>

                </div>

            </div>

            {

                submission.feedback && (

                    <div className="section-card">

                        <h2>

                            🤖 AI Feedback

                        </h2>

                        <pre className="feedback-box">

                            {submission.feedback}

                        </pre>

                    </div>

                )

            }

            <div className="section-card">

                <h2>

                    💻 Source Code

                </h2>

                <pre className="code-box">

                    {submission.code}

                </pre>

            </div>

        </div>

    );

}

export default SubmissionDetails;