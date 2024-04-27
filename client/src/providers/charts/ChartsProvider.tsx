import { CategoryScale, Chart, Filler, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js'

Chart.register(LineElement, Filler, CategoryScale, LinearScale, PointElement, Tooltip)

interface ChartsProviderProps {
    children?: React.ReactNode
}

const ChartsProvider: React.FC<ChartsProviderProps> = ({ children }) => {
    return children
}

export default ChartsProvider