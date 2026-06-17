import { useEffect, useState } from "react";

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

    useEffect(() => {

        getLeaderboard(
            problemId
        )
            .then(data => {

                setEntries(
                    data
                );
            })
            .catch(error => {

                console.error(
                    error
                );
            });

    }, [problemId]);

    return (
        <div>

            <h1>
                Leaderboard
            </h1>

            <table>

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
                                        entry
                                            .submissionId
                                    }
                                >

                                    <td>
                                        {
                                            index + 1
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

        </div>
    );
}

export default Leaderboard;