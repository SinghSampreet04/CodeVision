import { formatStatus } from "../utils/format";

function SubmissionResult({

    result

}) {

    if (!result) {

        return null;

    }

    return (

        <div className="submission-card">

            <h2>

                Submission Result

            </h2>

            <div

                className={
                    `status-badge status-${result.status.toLowerCase()}`
                }

            >

                {formatStatus(result.status)}

            </div>

            <p>

                <strong>

                    Passed:

                </strong>

                {" "}

                {result.passedTestCases}

                {" / "}

                {result.totalTestCases}

            </p>

            <p>

                <strong>

                    Runtime:

                </strong>

                {" "}

                {result.runtime}

                {" ms"}

            </p>

            {

                result.feedback && (

                    <>

                        <h3>

                            Automated Feedback

                        </h3>

                        <pre>

                            {result.feedback}

                        </pre>

                    </>

                )

            }

        </div>

    );

}

export default SubmissionResult;
