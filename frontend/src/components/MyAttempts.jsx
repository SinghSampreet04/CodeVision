import { Link } from "react-router-dom";

function MyAttempts({

    user,

    submissions

}) {

    if (!user) {

        return null;

    }

    return (

        <div>

            <hr />

            <h2>

                My Attempts

            </h2>

            {

                submissions.length === 0 ? (

                    <p>

                        No submissions yet.

                    </p>

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
                                >

                                    <Link
                                        to={`/submissions/${submission.id}`}
                                    >

                                        Submission #

                                        {
                                            submission.id
                                        }

                                    </Link>

                                    <div
                                        className={
                                            `status-badge status-${submission.status.toLowerCase()}`
                                        }
                                    >

                                        {submission.status}

                                    </div>

                                    <p>

                                        Passed

                                        {" "}

                                        {
                                            submission.passedTestCases
                                        }

                                        {" / "}

                                        {
                                            submission.totalTestCases
                                        }

                                    </p>

                                    <hr />

                                </div>

                            )

                        )

                )

            }

        </div>

    );

}

export default MyAttempts;