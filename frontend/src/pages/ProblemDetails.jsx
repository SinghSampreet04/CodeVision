import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";

import {
    getProblemById,
    submitSolution
} from "../services/api";

function ProblemDetails() {

    const { id } =
        useParams();

    const [problem, setProblem] =
        useState(null);

    const [code, setCode] =
        useState(
`import java.util.*;

public class Main {

    public static void main(
            String[] args
    ) {

    }
}`
        );

    const [result, setResult] =
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

    async function handleSubmit() {

        try {

            const user =
                JSON.parse(
                    localStorage.getItem(
                        "user"
                    )
                );

            if (!user) {

                alert(
                    "Please login first"
                );

                return;
            }

            const response =
                await submitSolution(
                    {
                        userId:
                            user.userId,

                        problemId:
                            Number(id),

                        language:
                            "java",

                        code:
                            code
                    }
                );

            setResult(
                response
            );

        } catch {

            alert(
                "Submission failed"
            );
        }
    }

    if (!problem) {

        return (
            <p>
                Loading...
            </p>
        );
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

            <h3>
                Description
            </h3>

            <p>
                {problem.description}
            </p>

            <h3>
                Sample Input
            </h3>

            <pre>
                {problem.sampleInput}
            </pre>

            <h3>
                Sample Output
            </h3>

            <pre>
                {problem.sampleOutput}
            </pre>

            <h3>
                Code Editor
            </h3>

            <Editor
                height="500px"
                defaultLanguage="java"
                value={code}
                onChange={(value) =>
                    setCode(
                        value || ""
                    )
                }
                theme="vs-dark"
            />

            <br />

            <button
                onClick={
                    handleSubmit
                }
            >
                Submit Solution
            </button>

            {result && (

                <div>

                    <h3>
                        Result
                    </h3>

                    <p>
                        Status:
                        {" "}
                        {result.status}
                    </p>

                    <p>
                        Passed:
                        {" "}
                        {result.passedTestCases}
                        {" / "}
                        {result.totalTestCases}
                    </p>

                </div>
            )}

        </div>
    );
}

export default ProblemDetails;