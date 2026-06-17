import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProblemById } from "../services/api";

function ProblemDetails() {

    const { id } =
        useParams();

    const [problem, setProblem] =
        useState(null);

    useEffect(() => {

        getProblemById(id)
            .then(data => {
                setProblem(data);
            })
            .catch(error => {
                console.error(error);
            });

    }, [id]);

    if (!problem) {

        return <p>Loading...</p>;
    }

    return (
        <div>

            <h1>
                {problem.title}
            </h1>

            <p>
                Difficulty:
                {" "}
                {problem.difficulty}
            </p>

            <h3>Description</h3>

            <p>
                {problem.description}
            </p>

            <h3>Sample Input</h3>

            <pre>
                {problem.sampleInput}
            </pre>

            <h3>Sample Output</h3>

            <pre>
                {problem.sampleOutput}
            </pre>

        </div>
    );
}

export default ProblemDetails;