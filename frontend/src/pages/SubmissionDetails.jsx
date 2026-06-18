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
                        "bold"
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
                Language:
                {" "}
                {submission.language}
            </p>

            <p>
                Runtime:
                {" "}
                {submission.runtime}
                {" ms"}
            </p>

            <p>
                Submitted:
                {" "}
                {submission.createdAt}
            </p>

            {
                submission.feedback && (
                    <>
                        <h3>
                            Feedback
                        </h3>

                        <pre>
                            {
                                submission.feedback
                            }
                        </pre>
                    </>
                )
            }

            <h3>
                Code
            </h3>

            <pre>
                {submission.code}
            </pre>

        </div>
    );
}

export default SubmissionDetails;