import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProblems } from "../services/api";

function Problems() {

    const [problems, setProblems] =
        useState([]);

    const [search, setSearch] =
        useState("");

    const [difficulty, setDifficulty] =
        useState("All");

    useEffect(() => {

        getProblems()
            .then(data => {
                setProblems(data);
            })
            .catch(error => {
                console.error(error);
            });

    }, []);

    const filteredProblems =
        problems.filter(
            problem => {

                const matchesSearch =
                    problem.title
                        .toLowerCase()
                        .includes(
                            search.toLowerCase()
                        );

                const matchesDifficulty =
                    difficulty === "All" ||
                    problem.difficulty === difficulty;

                return (
                    matchesSearch &&
                    matchesDifficulty
                );
            }
        );

    return (
        <div>

            <h1>
                CodeVision
            </h1>

            <h2>
                Problems
            </h2>

            <div>

                <input
                    type="text"
                    placeholder="Search problems..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

                {" "}

                <select
                    value={difficulty}
                    onChange={(e) =>
                        setDifficulty(
                            e.target.value
                        )
                    }
                >

                    <option>
                        All
                    </option>

                    <option>
                        Easy
                    </option>

                    <option>
                        Medium
                    </option>

                    <option>
                        Hard
                    </option>

                </select>

            </div>

            <br />

            {
                filteredProblems.map(
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

            {
                filteredProblems.length === 0 && (
                    <p>
                        No problems found.
                    </p>
                )
            }

        </div>
    );
}

export default Problems;