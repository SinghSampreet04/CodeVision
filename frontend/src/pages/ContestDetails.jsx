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
import { formatDateTime, formatStatus } from "../utils/format";

function ContestDetails() {

    const { id } =
        useParams();

    const [contest, setContest] =
        useState(null);

    const [error, setError] =
        useState("");

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
                setError(error.message);
            }

        }

        loadContest();

    }, [id]);

    if (error) {
        return (
            <div className="section-card page-state" role="alert">
                <h1>Contest unavailable</h1>
                <p>{error}</p>
                <Link className="secondary-btn" to="/contests">
                    Back to contests
                </Link>
            </div>
        );
    }

    if (!contest) {
        return (
            <div className="section-card page-state" role="status">
                <p>Loading contest...</p>
            </div>
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

                            {formatStatus(contest.status)}

                        </span>

                    </div>

                    <div className="contest-stat">

                        <h3>

                            Starts

                        </h3>

                        <span>

                            {formatDateTime(contest.startTime)}

                        </span>

                    </div>

                    <div className="contest-stat">

                        <h3>

                            Ends

                        </h3>

                        <span>

                            {formatDateTime(contest.endTime)}

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
