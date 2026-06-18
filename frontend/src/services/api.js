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

export async function getUserSubmissions(
    userId
) {

    const user =
        JSON.parse(
            localStorage.getItem(
                "user"
            )
        );

    const response =
        await fetch(
            `${API_URL}/submissions/user/${userId}`,
            {
                headers: {
                    Authorization:
                        `Bearer ${user.token}`
                }
            }
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