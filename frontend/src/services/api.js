const API_URL = "http://localhost:8081";

export async function getProblems() {

    const response =
        await fetch(
            `${API_URL}/problems`
        );

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