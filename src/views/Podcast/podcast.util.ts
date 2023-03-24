export function formatDuration(durationInMillis: number) {
    const durationInSeconds = Math.floor(durationInMillis / 1000);
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
