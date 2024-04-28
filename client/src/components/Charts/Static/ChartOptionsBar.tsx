import './ChartOptionsBar.scss'
import { InformationButton } from '../../Information'

interface ChartOptionsBarProps {
    title: string
    information: string
    children?: React.ReactNode
    onExport?: () => void
}

const ChartOptionsBar: React.FC<ChartOptionsBarProps> = ({ title, information, children, onExport }) => {
    return (
        <div className="chart-options-bar">
            <span className="title">{title}</span>
            <InformationButton information={information}/>
            <div className="spacer"></div>
            {onExport !== undefined ? <button className="save-button" onClick={onExport}>Export</button> : <></>}
            {children}
        </div>
    )
}

export default ChartOptionsBar