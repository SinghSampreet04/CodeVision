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

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        getProblems()
            .then(data => {

                setProblems(
                    data
                );

            })
            .catch(requestError => {

                setError(requestError.message);

            })
            .finally(() => setLoading(false));

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

    function summarize(description) {
        if (!description) {
            return "No description available.";
        }

        return description.length > 120
            ? `${description.slice(0, 120)}...`
            : description;
    }

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

    <div className="problem-stats">

    <div className="problem-stat">

        <h3>

            {problems.length}

        </h3>

        <span>

            Total

        </span>

    </div>

    <div className="problem-stat">

        <h3>

            {
                problems.filter(
                    p => p.difficulty === "Easy"
                ).length
            }

        </h3>

        <span>

            Easy

        </span>

    </div>

    <div className="problem-stat">

        <h3>

            {
                problems.filter(
                    p => p.difficulty === "Medium"
                ).length
            }

        </h3>

        <span>

            Medium

        </span>

    </div>

    <div className="problem-stat">

        <h3>

            {
                problems.filter(
                    p => p.difficulty === "Hard"
                ).length
            }

        </h3>

        <span>

            Hard

        </span>

    </div>

</div>

    <div className="problem-filters">

        <input
            aria-label="Search problems"
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
            aria-label="Filter by difficulty"
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

<div className="problem-card-description">

    <p>

        {
            summarize(problem.description)
        }

    </p>

</div>

<div className="problem-card-bottom">

    <Link
        className="primary-btn"
        to={`/problems/${problem.id}`}
    >
        Solve Problem
    </Link>

    <Link
        className="secondary-btn"
        to={`/leaderboard/${problem.id}`}
    >
        Leaderboard
    </Link>

</div>

</div>
                    )
                )
            }

            {
                loading && (

                    <div className="section-card">
                        <p>Loading problems...</p>
                    </div>

                )
            }

            {
                !loading && error && (

                    <div className="section-card" role="alert">
                        <p>
                            Problems are temporarily unavailable. {error}
                        </p>
                    </div>

                )
            }

            {
                !loading && !error && filteredProblems.length === 0 && (

                    <p>
                        No problems found.
                    </p>

                )
            }

        </div>
    );
}

export default Problems;
