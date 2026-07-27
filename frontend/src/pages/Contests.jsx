import {
    useEffect,
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import {
    getContests
} from "../services/api";
import { formatDateTime, formatStatus } from "../utils/format";

function Contests() {

    const [contests, setContests] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        async function loadContests() {

            try {

                const data =
                    await getContests();

                setContests(
                    data
                );

            } catch (requestError) {

                setError(requestError.message);
            } finally {

                setLoading(false);
            }
        }

        loadContests();

    }, []);

    return (
        <div>
            <div className="problems-header">
                <h1>Contests</h1>
                <p>Join timed challenges and compare your best solutions.</p>
            </div>

            {
                contests.map(
                    contest => (

                        <div
                            key={
                                contest.id
                            }
                            className="problem-card"
                        >

                            <div className="problem-card-top">
                                <Link
                                    className="problem-title"
                                    to={`/contests/${contest.id}`}
                                >
                                    {contest.title}
                                </Link>
                                <span className={`contest-status contest-status-${contest.status.toLowerCase()}`}>
                                    {formatStatus(contest.status)}
                                </span>
                            </div>

                            <p>
                                {
                                    contest.description
                                }
                            </p>

                            <p>
                                Starts:
                                {" "}
                                {
                                    formatDateTime(contest.startTime)
                                }
                            </p>

                            <p>
                                Ends:
                                {" "}
                                {
                                    formatDateTime(contest.endTime)
                                }
                            </p>

                            <div className="problem-card-bottom">

                                <Link
                                    to={`/contests/${contest.id}`}
                                    className="card-link"
                                >
                                    View Contest →
                                </Link>

                                <Link
                                    to={`/contests/${contest.id}/leaderboard`}
                                    className="card-link"
                                >
                                    Leaderboard →
                                </Link>

                            </div>

                        </div>
                    )
                )
            }

            {
                loading && (

                    <div className="section-card">
                        <p>Loading contests...</p>
                    </div>

                )
            }

            {
                !loading && error && (

                    <div className="section-card" role="alert">
                        <p>
                            Contests are temporarily unavailable. {error}
                        </p>
                    </div>

                )
            }

            {
                !loading && !error && contests.length === 0 && (

                    <p>
                        No contests found.
                    </p>

                )
            }

        </div>
    );
}

export default Contests;
