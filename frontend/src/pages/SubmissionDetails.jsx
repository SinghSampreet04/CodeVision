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

    function getStatusColor(
            status
    ) {

        if (
                status ===
                "ACCEPTED"
        ) {

            return "limegreen";
        }

        if (
                status ===
                "WRONG_ANSWER"
        ) {

            return "red";
        }

        if (
                status ===
                "COMPILATION_ERROR"
        ) {

            return "orange";
        }

        if (
                status ===
                "RUNTIME_ERROR"
        ) {

            return "darkred";
        }

        if (
                status ===
                "TIME_LIMIT_EXCEEDED"
        ) {

            return "gold";
        }

        if (
                status ===
                "PENDING"
        ) {

            return "gray";
        }

        return "white";
    }

    function getStatusIcon(
            status
    ) {

        if (
                status ===
                "ACCEPTED"
        ) {

            return "🟢";
        }

        if (
                status ===
                "WRONG_ANSWER"
        ) {

            return "🔴";
        }

        if (
                status ===
                "COMPILATION_ERROR"
        ) {

            return "🟠";
        }

        if (
                status ===
                "RUNTIME_ERROR"
        ) {

            return "💥";
        }

        if (
                status ===
                "TIME_LIMIT_EXCEEDED"
        ) {

            return "⏱️";
        }

        if (
                status ===
                "PENDING"
        ) {

            return "⚪";
        }

        return "❓";
    }

    if (!submission) {

        return (
            <p>
                Loading...
            </p>
        );
    }

    return (
        <div>

            <h1>
                Submission #
                {submission.id}
            </h1>

            <p
                style={{
                    color:
                        getStatusColor(
                            submission.status
                        ),
                    fontWeight:
                        "bold",
                    fontSize:
                        "20px"
                }}
            >
                Status:
                {" "}
                {
                    getStatusIcon(
                        submission.status
                    )
                }
                {" "}
                {submission.status}
            </p>

            <hr />

            <h2>
                Results
            </h2>

            <p>
                Passed:
                {" "}
                {
                    submission
                        .passedTestCases
                }
                {" / "}
                {
                    submission
                        .totalTestCases
                }
            </p>

            <p>
                Runtime:
                {" "}
                {
                    submission.runtime ??
                    0
                }
                {" ms"}
            </p>

            <p>
                Language:
                {" "}
                {submission.language}
            </p>

            <p>
                Submitted:
                {" "}
                {submission.createdAt}
            </p>

            {
                submission.feedback && (

                    <div>

                        <hr />

                        <h2>
                            AI Feedback
                        </h2>

                        <pre
                            style={{
                                whiteSpace:
                                    "pre-wrap"
                            }}
                        >
                            {
                                submission.feedback
                            }
                        </pre>

                    </div>
                )
            }

            <hr />

            <h2>
                Source Code
            </h2>

            <pre
                style={{
                    overflowX:
                        "auto",
                    background:
                        "#111",
                    padding:
                        "15px",
                    borderRadius:
                        "8px"
                }}
            >
                {submission.code}
            </pre>

        </div>
    );
}

export default SubmissionDetails;