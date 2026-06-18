import { useEffect, useState } from "react";
import {
    useParams,
    Link
} from "react-router-dom";
import Editor from "@monaco-editor/react";

import {
    getProblemById,
    submitSolution,
    createTestCase,
    getTestCases,
    deleteTestCase,
    updateTestCase,
    getMySubmissionsForProblem,
    getProblemStats,
    getDiscussions,
    createDiscussion
} from "../services/api";


function ProblemDetails() {

    const { id } =
        useParams();

    const [problem, setProblem] =
        useState(null);

        const [language, setLanguage] =
    useState(
        "java"
    );

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

    const [submissions, setSubmissions] =
        useState([]);

   const [discussions, setDiscussions] =
    useState([]);

const [discussionText,
    setDiscussionText] =
    useState("");


        const [stats, setStats] =
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

    const [editingTestCaseId,
        setEditingTestCaseId] =
        useState(null);

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );
useEffect(() => {

    async function loadStats() {

        try {

            const data =
                await getProblemStats(
                    id
                );

            setStats(
                data
            );

        } catch (error) {

            console.error(
                error
            );
        }
    }

    loadProblem();

    loadTestCases();

    loadStats();

    loadDiscussions();

    if (user) {

        loadMySubmissions();
    }

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

    async function loadMySubmissions() {

        try {

            const data =
                await getMySubmissionsForProblem(
                    id
                );

            setSubmissions(
                data
            );

        } catch (error) {

            console.error(
                error
            );
        }
    }
    async function loadDiscussions() {

    try {

        const data =
            await getDiscussions(
                id
            );

        setDiscussions(
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

        const contestId =
            new URLSearchParams(
                window.location.search
            )
            .get(
                "contestId"
            );

        const response =
            await submitSolution(
                {
                    problemId:
                        Number(id),

                    contestId:
                        contestId
                            ? Number(
                                    contestId
                              )
                            : null,

                    language:
                     language,

                    code:
                        code
                }
            );

        setResult(
            response
        );

        await loadMySubmissions();

        const statsData =
            await getProblemStats(
                id
            );

        setStats(
            statsData
        );

    } catch {

        alert(
            "Submission failed"
        );
    }
}

async function handleDiscussionSubmit() {

    if (!user) {

        alert(
            "Please login first"
        );

        return;
    }

    if (
            !discussionText.trim()
    ) {

        return;
    }

    try {

        await createDiscussion(
            {
                problemId:
                    Number(id),

                content:
                    discussionText
            }
        );

        setDiscussionText(
            ""
        );

        await loadDiscussions();

    } catch {

        alert(
            "Failed to post discussion"
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

            resetForm();

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

    async function handleUpdateTestCase() {

        try {

            await updateTestCase(
                editingTestCaseId,
                {
                    input:
                        input,

                    expectedOutput:
                        expectedOutput,

                    hidden:
                        hidden
                }
            );

            resetForm();

            await loadTestCases();

            alert(
                "Test case updated"
            );

        } catch {

            alert(
                "Failed to update test case"
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

    function handleEditTestCase(
            testCase
    ) {

        setEditingTestCaseId(
            testCase.id
        );

        setInput(
            testCase.input
        );

        setExpectedOutput(
            testCase.expectedOutput
        );

        setHidden(
            testCase.hidden
        );
    }

    function resetForm() {

        setEditingTestCaseId(
            null
        );

        setInput("");

        setExpectedOutput("");

        setHidden(false);
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
{
    stats && (

        <div>

            <p>
                Total Submissions:
                {" "}
                {stats.totalSubmissions}
            </p>

            <p>
                Accepted Submissions:
                {" "}
                {stats.acceptedSubmissions}
            </p>

            <p>
                Accepted Users:
                {" "}
                {stats.acceptedUsers}
            </p>

            <p>
                Acceptance Rate:
                {" "}
                {stats.acceptanceRate}%
            </p>

        </div>
    )
}
            {
                user?.role ===
                "ADMIN" && (

                    <div>

                        <Link
                            to={`/edit-problem/${id}`}
                        >
                            <button>
                                Edit Problem
                            </button>
                        </Link>

                        <br />
                        <br />

                    </div>
                )
            }

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

                        {
                            editingTestCaseId ? (
                                <>
                                    <button
                                        onClick={
                                            handleUpdateTestCase
                                        }
                                    >
                                        Save Changes
                                    </button>

                                    {" "}

                                    <button
                                        onClick={
                                            resetForm
                                        }
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={
                                        handleCreateTestCase
                                    }
                                >
                                    Add Test Case
                                </button>
                            )
                        }

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
                                            {testCase.input}
                                        </pre>

                                        <pre>
                                            Expected:
                                            {"\n"}
                                            {testCase.expectedOutput}
                                        </pre>

                                        <button
                                            onClick={() =>
                                                handleEditTestCase(
                                                    testCase
                                                )
                                            }
                                        >
                                            Edit
                                        </button>

                                        {" "}

                                        <button
                                            onClick={() =>
                                                handleDeleteTestCase(
                                                    testCase.id
                                                )
                                            }
                                        >
                                            Delete
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

<select
    value={language}
    onChange={(e) =>
        setLanguage(
            e.target.value
        )
    }
>

    <option value="java">
        Java
    </option>

    <option value="python">
        Python
    </option>

    <option value="cpp">
        C++
    </option>

    <option value="javascript">
        JavaScript
    </option>

</select>

<br />
<br />

            <Editor
    height="500px"
    language={language}
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
    {result.passedTestCases}
    {" / "}
    {result.totalTestCases}
</p>

<p>
    Runtime:
    {" "}
    {result.runtime}
    {" ms"}
</p>

                        {
                            result.feedback && (

                                <div>

                                    <h4>
                                        AI Feedback
                                    </h4>

                                    <pre>
                                        {result.feedback}
                                    </pre>

                                </div>
                            )
                        }

                    </div>
                )
            }

            {
                user && (

                    <div>

                        <hr />

                        <h2>
                            My Attempts
                        </h2>

                        {
                            submissions.length === 0 ? (

                                <p>
                                    No submissions yet.
                                </p>

                            ) : (

                                submissions
                                    .slice()
                                    .reverse()
                                    .map(
                                        submission => (

                                            <div
                                                key={
                                                    submission.id
                                                }
                                            >

                                                <Link
                                                    to={`/submissions/${submission.id}`}
                                                >
                                                    Submission #
                                                    {
                                                        submission.id
                                                    }
                                                </Link>

                                                <p>
                                                    Status:
                                                    {" "}
                                                    {
                                                        submission.status
                                                    }
                                                </p>

                                                <p>
                                                    Passed:
                                                    {" "}
                                                    {
                                                        submission.passedTestCases
                                                    }
                                                    {" / "}
                                                    {
                                                        submission.totalTestCases
                                                    }
                                                </p>

                                                <hr />

                                            </div>
                                        )
                                    )
                            )
                        }

                    </div>
                )
            }

<hr />

<h2>
    Discussions
</h2>

{
    user && (

        <>

            <textarea
                rows={4}
                cols={80}
                value={discussionText}
                onChange={(e) =>
                    setDiscussionText(
                        e.target.value
                    )
                }
                placeholder="Write a comment..."
            />

            <br />
            <br />

            <button
                onClick={
                    handleDiscussionSubmit
                }
            >
                Post Comment
            </button>

            <br />
            <br />

        </>

    )
}

{
    discussions.length === 0 ? (

        <p>
            No discussions yet.
        </p>

    ) : (

        discussions.map(
            discussion => (

                <div
                    key={
                        discussion.id
                    }
                >

                    <strong>
                        {
                            discussion.username
                        }
                    </strong>

                    <p>
                        {
                            discussion.content
                        }
                    </p>

                    <small>
                        {
                            discussion.createdAt
                        }
                    </small>

                    <hr />

                </div>
            )
        )
    )
}
        </div>
    );
}

export default ProblemDetails;