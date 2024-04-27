import { ScoresHeatMapChart } from '../components/Charts'
import { ChartContainer, ChartOptionsBar, ChartPageContainer, LoadingChartIndicator, NoChartData } from '../components/Charts/Static'
import { useGamesCollection, useTheme } from '../hooks'
import { sortByScores } from '../utilities'

const ScoresHeatMapPage = () => {
    const { properties } = useTheme()

    const { isLoading, games } = useGamesCollection('all', 'all', 'none')

    const scores = sortByScores(games ?? [])

    const renderChart = (): JSX.Element => {
        if (isLoading) return <LoadingChartIndicator/>
        if (scores.length === 0) return <NoChartData/>

        return (
            <ChartContainer>
                <ScoresHeatMapChart scores={scores} foregroundColor={properties.textColor} maintainAspectRatio={false} responsive/>
            </ChartContainer>
        )
    }

    return (
        <ChartPageContainer>
            <ChartOptionsBar title="Scores Heat Map Chart" information="Some info"/>

            {renderChart()}
        </ChartPageContainer>
    )
}

export default ScoresHeatMapPage