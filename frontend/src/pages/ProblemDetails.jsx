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
import { getStoredUser } from "../utils/auth";

function ProblemDetails() {

    const { id } =
        useParams();

    const [problem, setProblem] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

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
`import sys

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

    const [submitting, setSubmitting] =
        useState(false);

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

    const [user] = useState(getStoredUser);


    useEffect(() => {
        let active = true;

        async function loadPage() {
            setLoading(true);
            setError("");

            try {
                const requests = [
                    getProblemById(id).then((data) => active && setProblem(data)),
                    getProblemStats(id).then((data) => active && setStats(data)),
                    getDiscussions(id).then((data) => active && setDiscussions(data))
                ];

                if (user) {
                    requests.push(
                        getMySubmissionsForProblem(id)
                            .then((data) => active && setSubmissions(data))
                    );
                }

                if (user?.role === "ADMIN") {
                    requests.push(
                        getTestCases(id).then((data) => active && setTestCases(data))
                    );
                }

                await Promise.all(requests);
            } catch (requestError) {
                if (active) {
                    setError(requestError.message);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadPage();

        return () => {
            active = false;
        };
    }, [id, user]);

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
        if (!user) {

            alert(
                "Please sign in before submitting a solution."
            );

            return;
        }

        setSubmitting(true);

    try {
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

    } catch (submissionError) {

        alert(
            submissionError.message
        );
    } finally {
        setSubmitting(false);
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

    } catch (discussionError) {

        alert(
            discussionError.message
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

        } catch (testCaseError) {

            alert(
                testCaseError.message
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

        } catch (testCaseError) {

            alert(
                testCaseError.message
            );
        }
    }

    async function handleDeleteTestCase(
            testCaseId
    ) {
        if (!window.confirm("Delete this test case?")) {
            return;
        }

        try {

            await deleteTestCase(
                testCaseId
            );

            await loadTestCases();

            alert(
                "Test case deleted"
            );

        } catch (testCaseError) {

            alert(
                testCaseError.message
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

    if (loading) {
        return (
            <div className="section-card page-state" role="status">
                <p>Loading problem workspace...</p>
            </div>
        );
    }

    if (error || !problem) {
        return (
            <div className="section-card page-state" role="alert">
                <h1>Problem unavailable</h1>
                <p>{error || "This problem could not be found."}</p>
                <Link className="secondary-btn" to="/">
                    Back to problems
                </Link>
            </div>
        );
    }

    return (
        <div className="problem-page">

<div className="problem-layout">

    <div className="problem-left">

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
    className="edit-problem-btn"
>

    ✏️ Edit Problem

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

    </div>

    <div className="problem-right">

        <CodeEditor

            language={language}

            setLanguage={setLanguage}

            code={code}

            setCode={setCode}

            templates={templates}

            handleSubmit={handleSubmit}

            submitting={submitting}

        />

        <SubmissionResult

            result={result}

        />

        <MyAttempts

            user={user}

            submissions={submissions}

        />

    </div>

</div>

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
