import { useEffect, useState } from "react";
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
            <h1>CodeVision</h1>

            <h2>Problems</h2>

            {problems.map(problem => (
                <div key={problem.id}>
                    <h3>{problem.title}</h3>

                    <p>
                        Difficulty: {problem.difficulty}
                    </p>

                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Problems;