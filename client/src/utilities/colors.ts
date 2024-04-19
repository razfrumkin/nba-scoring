export function setOpacity(hexColor: string, opacity: number): string {
    const color = hexColor.slice(1)
    const rgb = parseInt(color, 16)

    const red = (rgb >> 16) & 255
    const green = (rgb >> 8) & 255
    const blue = rgb & 255

    return `rgba(${red}, ${green}, ${blue}, ${opacity})`
}