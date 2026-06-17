const API_URL = "http://localhost:8081";

export async function getProblems() {

    const response =
        await fetch(
            `${API_URL}/problems`
        );

    console.log("Status:", response.status);

    const data =
        await response.json();

    console.log("Data:", data);

    return data;
}