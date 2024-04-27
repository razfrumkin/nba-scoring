import { ArcElement, BarElement, CategoryScale, Chart, Filler, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js'

Chart.register(LineElement, BarElement, PointElement, ArcElement, Filler, CategoryScale, LinearScale, Tooltip, Title, Legend)

interface ChartsProviderProps {
    children?: React.ReactNode
}

const ChartsProvider: React.FC<ChartsProviderProps> = ({ children }) => {
    return children
}

export default ChartsProvider