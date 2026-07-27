const API_URL = (
    import.meta.env.VITE_API_URL || "http://localhost:8081"
).replace(/\/$/, "");

function getSession() {
    try {
        return JSON.parse(localStorage.getItem("user"));
    } catch {
        localStorage.removeItem("user");
        return null;
    }
}

async function request(path, { method = "GET", body, auth = false } = {}) {
    const headers = {};

    if (body !== undefined) {
        headers["Content-Type"] = "application/json";
    }

    if (auth) {
        const token = getSession()?.token;

        if (!token) {
            throw new Error("Please sign in to continue");
        }

        headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${path}`, {
        method,
        headers,
        body: body === undefined ? undefined : JSON.stringify(body)
    });

    if (!response.ok) {
        let message = `Request failed with status ${response.status}`;

        try {
            const contentType = response.headers.get("content-type") || "";
            const error = contentType.includes("application/json")
                ? await response.json()
                : await response.text();
            message = typeof error === "string" ? error || message : error.message || message;
        } catch {
            // Keep the status-based fallback when the server sends an unreadable body.
        }

        if (response.status === 401 && auth) {
            localStorage.removeItem("user");

            if (window.location.pathname !== "/login") {
                window.location.replace("/login");
            }
        }

        throw new Error(message);
    }

    if (response.status === 204 || response.headers.get("content-length") === "0") {
        return null;
    }

    return response.json();
}

export const getProblems = () => request("/problems");
export const getProblemById = (id) => request(`/problems/${id}`);
export const getProblemStats = (id) => request(`/submissions/stats/problem/${id}`);
export const getLeaderboard = (id) => request(`/submissions/leaderboard/problem/${id}`);

export const createProblem = (problem) =>
    request("/problems", { method: "POST", body: problem, auth: true });
export const updateProblem = (id, problem) =>
    request(`/problems/${id}`, { method: "PUT", body: problem, auth: true });
export const deleteProblem = (id) =>
    request(`/problems/${id}`, { method: "DELETE", auth: true });

export const getTestCases = (problemId) =>
    request(`/testcases/problem/${problemId}`, { auth: true });
export const createTestCase = (testCase) =>
    request("/testcases", { method: "POST", body: testCase, auth: true });
export const updateTestCase = (id, testCase) =>
    request(`/testcases/${id}`, { method: "PUT", body: testCase, auth: true });
export const deleteTestCase = (id) =>
    request(`/testcases/${id}`, { method: "DELETE", auth: true });

export const submitSolution = (submission) =>
    request("/submissions", { method: "POST", body: submission, auth: true });
export const getMySubmissions = () =>
    request("/submissions/me", { auth: true });
export const getMySubmissionsForProblem = (problemId) =>
    request(`/submissions/me/problem/${problemId}`, { auth: true });
export const getSubmissionById = (id) =>
    request(`/submissions/${id}`, { auth: true });

export const registerUser = (userData) =>
    request("/auth/register", { method: "POST", body: userData });
export const loginUser = (credentials) =>
    request("/auth/login", { method: "POST", body: credentials });
export const getProfile = () =>
    request("/users/profile", { auth: true });

export const getContests = () => request("/contests");
export const getContestById = (id) => request(`/contests/${id}`);
export const getContestLeaderboard = (id) =>
    request(`/contests/${id}/leaderboard`);

export const getDiscussions = (problemId) =>
    request(`/discussions/problem/${problemId}`);
export const createDiscussion = (discussion) =>
    request("/discussions", { method: "POST", body: discussion, auth: true });
