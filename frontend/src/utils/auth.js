export function getStoredUser() {
    try {
        return JSON.parse(localStorage.getItem("user"));
    } catch {
        localStorage.removeItem("user");
        return null;
    }
}
