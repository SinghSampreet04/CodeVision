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
                            className="problem-card"
                        >

                            <Link
                                to={`/contests/${contest.id}`}
                                style={{
                                    textDecoration:
                                        "none",
                                    color:
                                        "inherit"
                                }}
                            >

                                <h2>
                                    {
                                        contest.title
                                    }
                                </h2>

                            </Link>

                            <p>
                                {
                                    contest.description
                                }
                            </p>

                            <p>
                                Starts:
                                {" "}
                                {
                                    new Date(
                                        contest.startTime
                                    ).toLocaleString()
                                }
                            </p>

                            <p>
                                Ends:
                                {" "}
                                {
                                    new Date(
                                        contest.endTime
                                    ).toLocaleString()
                                }
                            </p>

                            <div
                                style={{
                                    marginTop:
                                        "15px"
                                }}
                            >

                                <Link
                                    to={`/contests/${contest.id}`}
                                    className="card-link"
                                >
                                    View Contest →
                                </Link>

                                {"  |  "}

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