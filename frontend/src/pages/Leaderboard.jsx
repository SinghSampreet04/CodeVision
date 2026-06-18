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

                console.error(
                    error
                );

                setLoading(
                    false
                );
            });

    }, [problemId]);

    if (loading) {

        return (
            <div>

                <h1>
                    Leaderboard
                </h1>

                <p>
                    Loading...
                </p>

            </div>
        );
    }

    return (
        <div>

            <h1>
                Leaderboard
            </h1>

            {entries.length === 0 && (

                <p>
                    No accepted submissions yet.
                </p>

            )}

            {entries.length > 0 && (

                <table
                    border="1"
                    cellPadding="10"
                    style={{
                        borderCollapse:
                            "collapse",
                        width: "100%"
                    }}
                >

                    <thead>

                        <tr>

                            <th>
                                Rank
                            </th>

                            <th>
                                Username
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
                                            entry
                                                .submissionId
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
                                                    : index + 1
                                            }

                                        </td>

                                        <td>

                                            {
                                                entry
                                                    .username
                                            }

                                        </td>

                                        <td>

                                            {
                                                entry
                                                    .runtime
                                            }
                                            {" ms"}

                                        </td>

                                    </tr>
                                )
                            )
                        }

                    </tbody>

                </table>

            )}

        </div>
    );
}

export default Leaderboard;