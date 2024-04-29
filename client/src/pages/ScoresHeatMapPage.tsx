import { useState } from 'react'
import { ScoresHeatMapChart } from '../components/Charts'
import { ChartContainer, ChartOptionsBar, ChartPageContainer, LoadingChartIndicator, NoChartData } from '../components/Charts/Static'
import { useGamesCollection } from '../hooks'
import { sortByScores } from '../utilities'

const ScoresHeatMapPage = () => {
    const { isLoading, games } = useGamesCollection('all', 'all', 'none')

    const [exportImage, setExportImage] = useState<boolean>(false)

    const scores = sortByScores(games ?? [])

    const renderChart = (): JSX.Element => {
        if (isLoading) return <LoadingChartIndicator/>
        if (scores.length === 0) return <NoChartData/>

        return (
            <ChartContainer exportImage={exportImage} setExportImage={setExportImage}>
                <ScoresHeatMapChart scores={scores} maintainAspectRatio={false} responsive/>
            </ChartContainer>
        )
    }

    return (
        <ChartPageContainer>
            <ChartOptionsBar title="Scores Heat Map" information="Displays a heat map of every NBA game score in history, where the x-axis represents the winning team's score and the y-axis represents the point differential between the winning and losing teams." onExport={() => setExportImage(true)}/>

            {renderChart()}
        </ChartPageContainer>
    )
}

export default ScoresHeatMapPage