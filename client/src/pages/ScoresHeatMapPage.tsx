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
            <ChartOptionsBar title="Scores Heat Map Chart" information="Some info" onExport={() => setExportImage(true)}/>

            {renderChart()}
        </ChartPageContainer>
    )
}

export default ScoresHeatMapPage