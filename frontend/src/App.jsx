import { useEffect, useState } from "react";
import { getProblems } from "./services/api";

function App() {

    const [problems, setProblems] =
        useState([]);

    useEffect(() => {

        getProblems()
            .then(data => {
                console.log("Received:", data);
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

            <p>Problems loaded: {problems.length}</p>

            {problems.map(problem => (
                <div key={problem.id}>
                    <h3>{problem.title}</h3>
                    <p>{problem.difficulty}</p>
                </div>
            ))}
        </div>
    );
}

export default App;