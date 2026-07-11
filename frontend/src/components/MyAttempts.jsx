import { Link } from "react-router-dom";

function MyAttempts({

    user,

    submissions

}) {

    if (!user) {

        return null;

    }

    return (

        <div className="attempts-card">

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

                                <Link

                                    key={submission.id}

                                    to={`/submissions/${submission.id}`}

                                    className="attempt-card"

                                >

                                    <div>

                                        <strong>

                                            Submission #

                                            {submission.id}

                                        </strong>

                                    </div>

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

                                        {submission.passedTestCases}

                                        {" / "}

                                        {submission.totalTestCases}

                                    </p>

                                </Link>

                            )

                        )

                )

            }

        </div>

    );

}

export default MyAttempts;