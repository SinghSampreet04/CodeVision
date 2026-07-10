function SubmissionResult({

    result

}) {

    if (!result) {

        return null;

    }

    return (

        <div>

            <h3>
                Result
            </h3>

            <div
                className={
                    `status-badge status-${result.status.toLowerCase()}`
                }
            >
                {result.status}
            </div>

            <p>

                Passed:

                {" "}

                {result.passedTestCases}

                {" / "}

                {result.totalTestCases}

            </p>

            <p>

                Runtime:

                {" "}

                {result.runtime}

                {" ms"}

            </p>

            {

                result.feedback && (

                    <div>

                        <h4>

                            AI Feedback

                        </h4>

                        <pre>

                            {result.feedback}

                        </pre>

                    </div>

                )

            }

        </div>

    );

}

export default SubmissionResult;