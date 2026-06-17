import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProblems } from "../services/api";

function Problems() {

    const [problems, setProblems] =
        useState([]);

    useEffect(() => {

        getProblems()
            .then(data => {
                setProblems(data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    return (
        <div>

            <h1>
                CodeVision
            </h1>

            <h2>
                Problems
            </h2>

            {
                problems.map(
                    problem => (

                        <div
                            key={
                                problem.id
                            }
                        >

                            <Link
                                to={`/problems/${problem.id}`}
                            >
                                <h3>
                                    {
                                        problem.title
                                    }
                                </h3>
                            </Link>

                            <p>
                                Difficulty:
                                {" "}
                                {
                                    problem.difficulty
                                }
                            </p>

                            <Link
                                to={`/leaderboard/${problem.id}`}
                            >
                                View Leaderboard
                            </Link>

                            <hr />

                        </div>
                    )
                )
            }

        </div>
    );
}

export default Problems;