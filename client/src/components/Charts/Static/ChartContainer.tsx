import { useEffect, useRef } from 'react'
import './ChartContainer.scss'

interface ChartContainerProps {
    children?: React.ReactNode
    exportImage?: boolean
    setExportImage?: React.Dispatch<React.SetStateAction<boolean>>
}

const ChartContainer: React.FC<ChartContainerProps> = ({ children, exportImage, setExportImage }) => {
    const ref = useRef<HTMLDivElement>(null)

    const save = () => {
        const imageLink = document.createElement('a')
        const canvas = ref.current?.firstChild as HTMLCanvasElement
        if (!canvas) return

        const context = canvas.getContext('2d')
        if (!context) return
        context.save()
        context.globalCompositeOperation = 'destination-over'
        context.fillStyle = window.getComputedStyle(document.documentElement).getPropertyValue('--background-color')
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.restore()
        
        imageLink.href = canvas.toDataURL('image/png', 1)
        imageLink.download = 'chart.png'
        imageLink.click()
    }

    useEffect(() => {
        if (exportImage && setExportImage) {
            save()
            setExportImage(false)
        }
    }, [exportImage])

    return (
        <div className="chart-container" ref={ref}>
            {children}
        </div>
    )
}

export default ChartContainer