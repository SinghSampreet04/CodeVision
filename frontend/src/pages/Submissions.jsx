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

        console.log(
            "USER:",
            user
        );

        if (!user) {

            console.log(
                "NO USER FOUND"
            );

            return;
        }

        getMySubmissions()
            .then(data => {

                console.log(
                    "SUBMISSIONS:",
                    data
                );

                setSubmissions(
                    data
                );
            })
            .catch(error => {

                console.error(
                    "SUBMISSIONS ERROR:",
                    error
                );
            });

    }, []);

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

                        <p>
                            Status:
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