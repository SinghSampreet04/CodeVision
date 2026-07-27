import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import {
    getContestLeaderboard
} from "../services/api";

function ContestLeaderboard() {

    const { id } =
        useParams();

    const [entries, setEntries] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        async function loadLeaderboard() {

            try {

                const data =
                    await getContestLeaderboard(
                        id
                    );

                setEntries(
                    data
                );

            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        loadLeaderboard();

    }, [id]);

    if (loading) {
        return (
            <div className="section-card page-state" role="status">
                <p>Loading leaderboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="section-card page-state" role="alert">
                <h1>Leaderboard unavailable</h1>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div>

            <h1>
                Contest Leaderboard
            </h1>

            {
                entries.length === 0 ? (

                    <p>
                        No rankings yet.
                    </p>

                ) : (

                    <table className="leaderboard-table">

                        <thead>

                            <tr>

                                <th>
                                    Rank
                                </th>

                                <th>
                                    User
                                </th>

                                <th>
                                    Solved
                                </th>

                                <th>
                                    Runtime
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                entries.map(
                                    (
                                        entry,
                                        index
                                    ) => (

                                        <tr
                                            key={entry.username}
                                        >

                                            <td>
                                                {
                                                    index + 1
                                                }
                                            </td>

                                            <td>
                                                {
                                                    entry.username
                                                }
                                            </td>

                                            <td>
                                                {
                                                    entry.solvedProblems
                                                }
                                            </td>

                                            <td>
                                                {
                                                    entry.totalRuntime
                                                }
                                                {" ms"}
                                            </td>

                                        </tr>
                                    )
                                )
                            }

                        </tbody>

                    </table>
                )
            }

        </div>
    );
}

export default ContestLeaderboard;
