export function formatDate(dateString: string) {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return formattedDate;
}