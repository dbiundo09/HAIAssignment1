export function sortMessagesByTimestamp(messages) {
    return messages.sort((a, b) => {
        const timestampA = new Date(a.timestamp).getTime(); // Convert to milliseconds
        const timestampB = new Date(b.timestamp).getTime(); // Convert to milliseconds

        return timestampA - timestampB; // Sort in ascending order
    });
}
