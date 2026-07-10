import { useEffect, useState } from "react";
import {
    useParams,
    Link
} from "react-router-dom";

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
import ProblemHeader from "../components/ProblemHeader";
import ProblemDescription from "../components/ProblemDescription";
import CodeEditor from "../components/CodeEditor";
import SubmissionResult from "../components/SubmissionResult";
import MyAttempts from "../components/MyAttempts";
import DiscussionSection from "../components/DiscussionSection";
import TestCaseManager from "../components/TestCaseManager";

function ProblemDetails() {

    const { id } =
        useParams();

    const [problem, setProblem] =
        useState(null);

const templates = {

    java:
`import java.util.*;

public class Main {

    public static void main(
            String[] args
    ) {

    }
}`,

    python:
`# Write your solution here
`,

    javascript:
`const fs =
    require("fs");

const input =
    fs.readFileSync(
        0,
        "utf8"
    );

`,

    cpp:
`#include <iostream>

using namespace std;

int main() {

    return 0;
}`
};

const [language, setLanguage] =
    useState(
        "java"
    );

const [code, setCode] =
    useState(
        templates.java
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

<ProblemHeader

    problem={problem}

    stats={stats}

/>

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

<ProblemDescription

    problem={problem}

/>

{
    user?.role === "ADMIN" && (

        <TestCaseManager

            input={input}
            setInput={setInput}

            expectedOutput={expectedOutput}
            setExpectedOutput={setExpectedOutput}

            hidden={hidden}
            setHidden={setHidden}

            editingTestCaseId={editingTestCaseId}

            handleCreateTestCase={handleCreateTestCase}
            handleUpdateTestCase={handleUpdateTestCase}
            resetForm={resetForm}

            testCases={testCases}

            handleEditTestCase={handleEditTestCase}
            handleDeleteTestCase={handleDeleteTestCase}

        />

    )
}

<CodeEditor

    language={language}

    setLanguage={setLanguage}

    code={code}

    setCode={setCode}

    templates={templates}

    handleSubmit={handleSubmit}

/>

<SubmissionResult

    result={result}

/>

<MyAttempts

    user={user}

    submissions={submissions}

/>

<DiscussionSection

    user={user}

    discussions={discussions}

    discussionText={discussionText}

    setDiscussionText={setDiscussionText}

    handleDiscussionSubmit={handleDiscussionSubmit}

/>

        </div>
    );
}

export default ProblemDetails;