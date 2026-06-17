import { useEffect, useState } from "react";
import { getUserSubmissions } from "../services/api";

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

        getUserSubmissions(
            user.userId
        )
            .then(data => {
                setSubmissions(data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    return (
        <div>

            <h1>
                My Submissions
            </h1>

            {submissions.map(
                submission => (

                    <div
                        key={
                            submission.id
                        }
                    >

                        <h3>
                            Submission #
                            {submission.id}
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