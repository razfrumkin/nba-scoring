export function interpolate(value: number, scale: number = 1): number {
    const x = value * scale
    return 2 / (1 + 1 / Math.exp(x)) - 1
}