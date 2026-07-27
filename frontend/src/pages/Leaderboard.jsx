import {
    useEffect,
    useState
} from "react";

import {
    useParams
} from "react-router-dom";

import {
    getLeaderboard
} from "../services/api";

function Leaderboard() {

    const { problemId } =
        useParams();

    const [entries, setEntries] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        getLeaderboard(
            problemId
        )
            .then(data => {

                setEntries(
                    data
                );

                setLoading(
                    false
                );

            })
            .catch(error => {
                setError(error.message);

                setLoading(
                    false
                );

            });

    }, [problemId]);

    if (loading) {

        return (

            <div className="leaderboard-page">

                <h1>

                    🏆 Leaderboard

                </h1>

                <p>

                    Loading...

                </p>

            </div>

        );

    }

    if (error) {
        return (
            <div className="leaderboard-page">
                <div className="section-card page-state" role="alert">
                    <h1>Leaderboard unavailable</h1>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (

        <div className="leaderboard-page">

            <div className="section-card">

                <h1 className="leaderboard-title">

                    🏆 Problem Leaderboard

                </h1>

                <p className="leaderboard-subtitle">

                    Fastest accepted submissions for this problem.

                </p>

                {

                    entries.length === 0 ? (

                        <p>

                            No accepted submissions yet.

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

                                                key={
                                                    entry.submissionId
                                                }

                                            >

                                                <td>

                                                    {

                                                        index === 0
                                                            ? "🥇"

                                                        : index === 1
                                                            ? "🥈"

                                                        : index === 2
                                                            ? "🥉"

                                                        : `#${index + 1}`

                                                    }

                                                </td>

                                                <td>

                                                    {entry.username}

                                                </td>

                                                <td>

                                                    <span className="runtime-pill">

                                                        {entry.runtime} ms

                                                    </span>

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

        </div>

    );

}

export default Leaderboard;
