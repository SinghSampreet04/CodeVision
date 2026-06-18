import {
    useEffect,
    useState
} from "react";

import {
    useParams,
    Link
} from "react-router-dom";

import {
    getContestById
} from "../services/api";

function ContestDetails() {

    const { id } =
        useParams();

    const [contest, setContest] =
        useState(null);

    useEffect(() => {

        async function loadContest() {

            try {

                const data =
                    await getContestById(
                        id
                    );

                setContest(
                    data
                );

            } catch (error) {

                console.error(
                    error
                );
            }
        }

        loadContest();

    }, [id]);

    if (!contest) {

        return (
            <p>
                Loading...
            </p>
        );
    }

    return (
        <div>

            <h1>
                {contest.title}
            </h1>

            <p>
                {contest.description}
            </p>

            <p>
                <strong>
                    Status:
                </strong>
                {" "}
                {contest.status}
            </p>

            <p>
                <strong>
                    Start:
                </strong>
                {" "}
                {contest.startTime}
            </p>

            <p>
                <strong>
                    End:
                </strong>
                {" "}
                {contest.endTime}
            </p>

            <hr />

            <h2>
                Contest Problems
            </h2>

            {
                contest.problems?.length > 0
                ? (
                    contest.problems.map(
                        problem => (
                            <div
                                key={
                                    problem.id
                                }
                            >

                                <Link
                                    to={`/problems/${problem.id}`}
                                >
                                    <h3>
                                        #{problem.id}
                                        {" - "}
                                        {problem.title}
                                    </h3>
                                </Link>

                                <p>
                                    Difficulty:
                                    {" "}
                                    {problem.difficulty}
                                </p>

                                <hr />

                            </div>
                        )
                    )
                )
                : (
                    <p>
                        No problems assigned.
                    </p>
                )
            }

        </div>
    );
}

export default ContestDetails;