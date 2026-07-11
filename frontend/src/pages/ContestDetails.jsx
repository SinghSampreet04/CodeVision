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

        <div className="contest-page">

            <div className="section-card">

                <h1>

                    🏁 {contest.title}

                </h1>

                <p className="contest-description">

                    {contest.description}

                </p>

                <div className="contest-stats">

                    <div className="contest-stat">

                        <h3>

                            Status

                        </h3>

                        <span>

                            {contest.status}

                        </span>

                    </div>

                    <div className="contest-stat">

                        <h3>

                            Starts

                        </h3>

                        <span>

                            {contest.startTime}

                        </span>

                    </div>

                    <div className="contest-stat">

                        <h3>

                            Ends

                        </h3>

                        <span>

                            {contest.endTime}

                        </span>

                    </div>

                </div>

            </div>

            <div className="section-card">

                <h2>

                    Contest Problems

                </h2>

                {

                    contest.problems?.length > 0

                        ? (

                            contest.problems.map(

                                problem => (

                                    <div

                                        key={problem.id}

                                        className="contest-problem-card"

                                    >

                                        <div>

                                            <Link

                                                className="problem-title"

                                                to={`/problems/${problem.id}`}

                                            >

                                                #{problem.id} — {problem.title}

                                            </Link>

                                            <div
                                                className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}
                                                style={{
                                                    marginTop: "12px",
                                                    display: "inline-block"
                                                }}
                                            >

                                                {problem.difficulty}

                                            </div>

                                        </div>

                                        <Link

                                            className="primary-btn"

                                            to={`/problems/${problem.id}?contestId=${contest.id}`}

                                        >

                                            Solve →

                                        </Link>

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

        </div>

    );

}

export default ContestDetails;