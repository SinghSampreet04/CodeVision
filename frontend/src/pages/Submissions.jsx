import {
    useEffect,
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import {
    getMySubmissions
} from "../services/api";

function Submissions() {

    const [submissions, setSubmissions] =
        useState([]);

    useEffect(() => {

        const user =
            JSON.parse(
                localStorage.getItem(
                    "user"
                )
            );

        if (!user) {

            return;
        }

        getMySubmissions()
            .then(data => {

                setSubmissions(
                    data
                );
            })
            .catch(error => {

                console.error(
                    error
                );
            });

    }, []);

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

    return (
        <div>

            <h1>
                My Submissions
            </h1>

            <p>
                Total submissions:
                {" "}
                {submissions.length}
            </p>

            {submissions.map(
                submission => (

                    <div
                        key={
                            submission.id
                        }
                    >

                        <h3>

                            <Link
                                to={
                                    `/submissions/${submission.id}`
                                }
                            >
                                Submission #
                                {submission.id}
                            </Link>

                        </h3>

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
                            {
                                submission
                                    .createdAt
                            }
                        </p>

                        <hr />

                    </div>
                )
            )}

        </div>
    );
}

export default Submissions;