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

                console.error(
                    error
                );
            }
        }

        loadLeaderboard();

    }, [id]);

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

                    <table
                        border="1"
                        cellPadding="10"
                    >

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
                                            key={
                                                index
                                            }
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