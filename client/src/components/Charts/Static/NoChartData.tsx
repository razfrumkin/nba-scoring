import './NoChartData.scss'

const NoChartData = () => {
    return (
        <div className="no-chart-data">
            <span className="title">Insufficient chart data</span>
            <span className="subtitle">Try to select a different season or team if there's an option</span>
        </div>
    )
}

export default NoChartData