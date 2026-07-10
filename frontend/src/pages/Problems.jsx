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

                setProblems(
                    data
                );

            })
            .catch(error => {

                console.error(
                    error
                );

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
<div className="problems-header">

    <h1>
        Problems
    </h1>

    <p>
        Solve coding challenges, improve your skills,
        and climb the leaderboard.
    </p>

    <div className="problem-filters">

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

        <select
            value={difficulty}
            onChange={(e) =>
                setDifficulty(
                    e.target.value
                )
            }
        >

            <option>All</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>

        </select>

    </div>

</div>

            {
                filteredProblems.map(
                    problem => (

                        <div
    key={problem.id}
    className="problem-card"
>

    <div className="problem-card-top">

        <Link
            className="problem-title"
            to={`/problems/${problem.id}`}
        >
            {problem.title}
        </Link>

        <span
            className={`difficulty-badge ${problem.difficulty.toLowerCase()}`}
        >
            {problem.difficulty}
        </span>

    </div>

    <div className="problem-card-bottom">

        <Link
            className="card-link"
            to={`/problems/${problem.id}`}
        >
            Solve Problem →
        </Link>

        <Link
            className="card-link"
            to={`/leaderboard/${problem.id}`}
        >
            Leaderboard →
        </Link>

    </div>

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