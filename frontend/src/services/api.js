const API_URL = "http://localhost:8081";

export async function getProblems() {

    const response =
        await fetch(
            `${API_URL}/problems`
        );

    return response.json();
}

export async function getProblemById(
    id
) {

    const response =
        await fetch(
            `${API_URL}/problems/${id}`
        );

    return response.json();
}

export async function createProblem(
    problem
) {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const response =
        await fetch(
            `${API_URL}/problems`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    Authorization:
                        `Bearer ${user.token}`
                },

                body: JSON.stringify(
                    problem
                )
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to create problem"
        );
    }

    return response.json();
}

export async function updateProblem(
    id,
    problem
) {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const response =
        await fetch(
            `${API_URL}/problems/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json",

                    Authorization:
                        `Bearer ${user.token}`
                },

                body: JSON.stringify(
                    problem
                )
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to update problem"
        );
    }

    return response.json();
}

export async function deleteProblem(
    id
) {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const response =
        await fetch(
            `${API_URL}/problems/${id}`,
            {
                method: "DELETE",

                headers: {
                    Authorization:
                        `Bearer ${user.token}`
                }
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to delete problem"
        );
    }
}

export async function createTestCase(
    testCase
) {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const response =
        await fetch(
            `${API_URL}/testcases`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    Authorization:
                        `Bearer ${user.token}`
                },

                body: JSON.stringify(
                    testCase
                )
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to create test case"
        );
    }

    return response.json();
}

export async function updateTestCase(
    id,
    testCase
) {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const response =
        await fetch(
            `${API_URL}/testcases/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json",

                    Authorization:
                        `Bearer ${user.token}`
                },

                body: JSON.stringify(
                    testCase
                )
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to update test case"
        );
    }

    return response.json();
}

export async function deleteTestCase(
    id
) {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const response =
        await fetch(
            `${API_URL}/testcases/${id}`,
            {
                method: "DELETE",

                headers: {
                    Authorization:
                        `Bearer ${user.token}`
                }
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to delete test case"
        );
    }
}

export async function getTestCases(
    problemId
) {

    const response =
        await fetch(
            `${API_URL}/testcases/problem/${problemId}`
        );

    return response.json();
}

export async function getMySubmissions() {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const response =
        await fetch(
            `${API_URL}/submissions/me`,
            {
                headers: {
                    Authorization:
                        `Bearer ${user.token}`
                }
            }
        );

    return response.json();
}

export async function getMySubmissionsForProblem(
    problemId
) {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const response =
        await fetch(
            `${API_URL}/submissions/me/problem/${problemId}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${user.token}`
                }
            }
        );

    return response.json();
}

export async function getProblemStats(
    problemId
) {

    const response =
        await fetch(
            `${API_URL}/submissions/stats/problem/${problemId}`
        );

    return response.json();
}

export async function getSubmissionById(
    id
) {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const response =
        await fetch(
            `${API_URL}/submissions/${id}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${user.token}`
                }
            }
        );

    return response.json();
}

export async function getLeaderboard(
    problemId
) {

    const response =
        await fetch(
            `${API_URL}/submissions/leaderboard/problem/${problemId}`
        );

    return response.json();
}

export async function submitSolution(
    submission
) {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const response =
        await fetch(
            `${API_URL}/submissions`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    Authorization:
                        `Bearer ${user.token}`
                },

                body: JSON.stringify(
                    submission
                )
            }
        );

    if (!response.ok) {

        throw new Error(
            "Submission failed"
        );
    }

    return response.json();
}

export async function registerUser(
    userData
) {

    const response =
        await fetch(
            `${API_URL}/auth/register`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(
                    userData
                )
            }
        );

    if (!response.ok) {

        throw new Error(
            "Registration failed"
        );
    }

    return response.json();
}
export async function getProfile() {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const response =
        await fetch(
            `${API_URL}/users/profile`,
            {
                headers: {
                    Authorization:
                        `Bearer ${user.token}`
                }
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to load profile"
        );
    }

    return response.json();
}

export async function getContests() {

    const response =
        await fetch(
            `${API_URL}/contests`
        );

    return response.json();
}

export async function getContestById(
    id
) {

    const response =
        await fetch(
            `${API_URL}/contests/${id}`
        );

    return response.json();
}

export async function createContest(
    contest
) {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const response =
        await fetch(
            `${API_URL}/contests`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    Authorization:
                        `Bearer ${user.token}`
                },

                body: JSON.stringify(
                    contest
                )
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to create contest"
        );
    }

    return response.json();
}

export async function updateContest(
    id,
    contest
) {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const response =
        await fetch(
            `${API_URL}/contests/${id}`,
            {
                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json",

                    Authorization:
                        `Bearer ${user.token}`
                },

                body: JSON.stringify(
                    contest
                )
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to update contest"
        );
    }

    return response.json();
}

export async function deleteContest(
    id
) {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const response =
        await fetch(
            `${API_URL}/contests/${id}`,
            {
                method: "DELETE",

                headers: {
                    Authorization:
                        `Bearer ${user.token}`
                }
            }
        );

    if (!response.ok) {

        throw new Error(
            "Failed to delete contest"
        );
    }
}
export async function getContestLeaderboard(
    contestId
) {

    const response =
        await fetch(
            `${API_URL}/contests/${contestId}/leaderboard`
        );

    return response.json();
}

export async function loginUser(
    credentials
) {

    const response =
        await fetch(
            `${API_URL}/auth/login`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(
                    credentials
                )
            }
        );

    if (!response.ok) {

        throw new Error(
            "Login failed"
        );
    }

    return response.json();
}