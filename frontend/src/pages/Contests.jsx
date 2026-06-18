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

function Contests() {

    const [contests, setContests] =
        useState([]);

    useEffect(() => {

        async function loadContests() {

            try {

                const data =
                    await getContests();

                setContests(
                    data
                );

            } catch (error) {

                console.error(
                    error
                );
            }
        }

        loadContests();

    }, []);

    return (
        <div>

            <h1>
                Contests
            </h1>

            {
                contests.map(
                    contest => (

                        <div
                            key={
                                contest.id
                            }
                        >

                            <h2>
                                {
                                    contest.title
                                }
                            </h2>

                            <p>
                                {
                                    contest.description
                                }
                            </p>

                            <p>
                                Start:
                                {" "}
                                {
                                    contest.startTime
                                }
                            </p>

                            <p>
                                End:
                                {" "}
                                {
                                    contest.endTime
                                }
                            </p>

                            <Link
                                to={`/contests/${contest.id}`}
                            >
                                View Contest
                            </Link>

                            {" | "}

                            <Link
                                to={`/contests/${contest.id}/leaderboard`}
                            >
                                Leaderboard
                            </Link>

                            <hr />

                        </div>
                    )
                )
            }

            {
                contests.length === 0 && (
                    <p>
                        No contests found.
                    </p>
                )
            }

        </div>
    );
}

export default Contests;