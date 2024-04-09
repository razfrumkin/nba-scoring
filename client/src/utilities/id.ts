export function randomId64(length: number = 16): string {
    const bytes = new Uint8Array(length).map(() => Math.floor(Math.random() * 256))
    return btoa(String.fromCharCode(...bytes))
}