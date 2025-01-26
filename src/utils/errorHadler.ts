export function handleError(error: unknown, cb?: Function): void {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error occurred with message: ", message);
    if (cb) {
        cb(message);
    }
}