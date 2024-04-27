export function setOpacity(hexColor: string, opacity: number): string {
    const color = hexColor.slice(1)
    const rgb = parseInt(color, 16)

    const red = (rgb >> 16) & 255
    const green = (rgb >> 8) & 255
    const blue = rgb & 255

    return `rgba(${red}, ${green}, ${blue}, ${opacity})`
}

export const GREEN = '#4bc0c0'
export const YELLOW = '#ffce56'
export const RED = '#ff6384'
export const GRAY = '#c8c8c8'