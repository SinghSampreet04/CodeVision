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

    function getStatusIcon(
        status
    ) {

        if (status === "ACCEPTED") {

            return "🟢";

        }

        if (status === "WRONG_ANSWER") {

            return "🔴";

        }

        if (status === "COMPILATION_ERROR") {

            return "🟠";

        }

        if (status === "PENDING") {

            return "⚪";

        }

        return "❓";

    }

    return (

        <div>

            <div className="problems-header">

                <h1>

                    My Submissions

                </h1>

                <p>

                    View all of your previous submissions.

                </p>

            </div>

            <div className="section-card">

                <h2>

                    Total Submissions: {submissions.length}

                </h2>

            </div>

            {

                submissions.length === 0 ? (

                    <div className="section-card">

                        <p>

                            No submissions yet.

                        </p>

                    </div>

                ) : (

                    submissions
                        .slice()
                        .reverse()
                        .map(

                            submission => (

                                <div

                                    key={
                                        submission.id
                                    }

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

                                            {

                                                getStatusIcon(
                                                    submission.status
                                                )

                                            }

                                            {" "}

                                            {submission.status}

                                        </div>

                                    </div>

                                    <div className="submission-grid">

                                        <div>

                                            <strong>

                                                Passed

                                            </strong>

                                            <p>

                                                {

                                                    submission.passedTestCases

                                                }

                                                {" / "}

                                                {

                                                    submission.totalTestCases

                                                }

                                            </p>

                                        </div>

                                        <div>

                                            <strong>

                                                Submitted

                                            </strong>

                                            <p>

                                                {

                                                    submission.createdAt

                                                }

                                            </p>

                                        </div>

                                    </div>

                                </div>

                            )

                        )

                )

            }

        </div>

    );

}

export default Submissions;