import './ChartPageContainer.scss'

interface ChartPageContainerProps {
    children?: React.ReactNode
}

const ChartPageContainer: React.FC<ChartPageContainerProps> = ({ children }) => {
    return (
        <div className="chart-page-container">
            {children}
        </div>
    )
}

export default ChartPageContainer