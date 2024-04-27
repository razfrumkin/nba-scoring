import { useState } from 'react'
import { useGamesCollection, useTheme } from '../hooks'
import { SeasonId } from '../models'
import { calculateTotalPointsOccurences } from '../utilities'
import { ChartContainer, ChartOptionsBar, ChartPageContainer, LoadingChartIndicator, NoChartData } from '../components/Charts/Static'
import { TotalPointsOccurencesChart } from '../components/Charts'
import { SeasonsDropdown } from '../components/Dropdowns'

const TotalPointsOccurencesPage = () => {
    const { properties } = useTheme()

    const [season, setSeason] = useState<SeasonId | 'all'>('all')

    const { isLoading, games } = useGamesCollection('all', season, 'none')

    const occurences = calculateTotalPointsOccurences(games ?? [])

    const renderChart = (): JSX.Element => {
        if (isLoading) return <LoadingChartIndicator/>
        if (occurences.length === 0) return <NoChartData/>

        return (
            <ChartContainer>
                <TotalPointsOccurencesChart occurences={occurences} foregroundColor={properties.textColor} maintainAspectRatio={false} responsive/>
            </ChartContainer>
        )
    }

    return (
        <ChartPageContainer>
            <ChartOptionsBar title="Total Points Occurences" information="Some info">
                <SeasonsDropdown selectedSeason={season} onChange={value => setSeason(value ?? season)}/>
            </ChartOptionsBar>

            {renderChart()}
        </ChartPageContainer>

    )
}

export default TotalPointsOccurencesPage