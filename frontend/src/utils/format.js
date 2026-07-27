export function formatDateTime(value) {
    if (!value) {
        return "Not scheduled";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(date);
}

export function formatStatus(value) {
    return value
        ? value.toLowerCase().split("_").map(capitalize).join(" ")
        : "Unknown";
}

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}
