import './ChartOptionsBar.scss'
import { InformationButton } from '../../Information'

interface ChartOptionsBarProps {
    title: string
    information: string
    children?: React.ReactNode
}

const ChartOptionsBar: React.FC<ChartOptionsBarProps> = ({ title, information, children }) => {
    return (
        <div className="chart-options-bar">
            <span className="title">{title}</span>
            <InformationButton information={information}/>
            <div className="spacer"></div>
            {children}
        </div>
    )
}

export default ChartOptionsBar