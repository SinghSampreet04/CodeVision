import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";

import {
    getProblemById,
    submitSolution,
    createTestCase,
    getTestCases,
    deleteTestCase
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

    const [testCases, setTestCases] =
        useState([]);

    const [input, setInput] =
        useState("");

    const [expectedOutput,
        setExpectedOutput] =
        useState("");

    const [hidden, setHidden] =
        useState(false);

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    useEffect(() => {

        loadProblem();

        loadTestCases();

    }, [id]);

    async function loadProblem() {

        try {

            const data =
                await getProblemById(
                    id
                );

            setProblem(
                data
            );

        } catch (error) {

            console.error(
                error
            );
        }
    }

    async function loadTestCases() {

        try {

            const data =
                await getTestCases(
                    id
                );

            setTestCases(
                data
            );

        } catch (error) {

            console.error(
                error
            );
        }
    }

    async function handleSubmit() {

        try {

            if (!user) {

                alert(
                    "Please login first"
                );

                return;
            }

            const response =
                await submitSolution(
                    {
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

    async function handleCreateTestCase() {

        try {

            await createTestCase(
                {
                    problem: {
                        id:
                            Number(id)
                    },

                    input:
                        input,

                    expectedOutput:
                        expectedOutput,

                    hidden:
                        hidden
                }
            );

            setInput("");
            setExpectedOutput("");
            setHidden(false);

            await loadTestCases();

            alert(
                "Test case created"
            );

        } catch {

            alert(
                "Failed to create test case"
            );
        }
    }

    async function handleDeleteTestCase(
            testCaseId
    ) {

        try {

            await deleteTestCase(
                testCaseId
            );

            await loadTestCases();

            alert(
                "Test case deleted"
            );

        } catch {

            alert(
                "Failed to delete test case"
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

            {
                user?.role ===
                "ADMIN" && (

                    <div>

                        <hr />

                        <h2>
                            Manage Test Cases
                        </h2>

                        <textarea
                            placeholder="Input"
                            value={input}
                            onChange={(e) =>
                                setInput(
                                    e.target.value
                                )
                            }
                            rows={4}
                            cols={60}
                        />

                        <br />
                        <br />

                        <textarea
                            placeholder="Expected Output"
                            value={expectedOutput}
                            onChange={(e) =>
                                setExpectedOutput(
                                    e.target.value
                                )
                            }
                            rows={4}
                            cols={60}
                        />

                        <br />
                        <br />

                        <label>

                            <input
                                type="checkbox"
                                checked={
                                    hidden
                                }
                                onChange={(e) =>
                                    setHidden(
                                        e.target.checked
                                    )
                                }
                            />

                            {" "}
                            Hidden Test Case

                        </label>

                        <br />
                        <br />

                        <button
                            onClick={
                                handleCreateTestCase
                            }
                        >
                            Add Test Case
                        </button>

                        <h3>
                            Visible Test Cases
                        </h3>

                        {
                            testCases.map(
                                testCase => (

                                    <div
                                        key={
                                            testCase.id
                                        }
                                    >

                                        <pre>
                                            Input:
                                            {"\n"}
                                            {
                                                testCase.input
                                            }
                                        </pre>

                                        <pre>
                                            Expected:
                                            {"\n"}
                                            {
                                                testCase.expectedOutput
                                            }
                                        </pre>

                                        <button
                                            onClick={() =>
                                                handleDeleteTestCase(
                                                    testCase.id
                                                )
                                            }
                                        >
                                            Delete Test Case
                                        </button>

                                        <hr />

                                    </div>
                                )
                            )
                        }

                    </div>
                )
            }

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

            {
                result && (

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
                            {
                                result.passedTestCases
                            }
                            {" / "}
                            {
                                result.totalTestCases
                            }
                        </p>

                    </div>
                )
            }

        </div>
    );
}

export default ProblemDetails;