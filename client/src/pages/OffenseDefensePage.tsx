import { useState } from 'react'
import { useGamesCollection, useTeams, useTheme } from '../hooks'
import { SeasonId } from '../models'
import { ChartContainer, ChartOptionsBar, ChartPageContainer, LoadingChartIndicator, NoChartData } from '../components/Charts/Static'
import { SeasonsDropdown } from '../components/Dropdowns'
import { OffenseDefenseChart } from '../components/Charts'
import { calculateOffenseDefenseAverages } from '../utilities'

const OffenseDefensePage = () => {
    const { properties } = useTheme()
    const { teams } = useTeams()

    const [season, setSeason] = useState<SeasonId | 'all'>('all')

    const { isLoading, games } = useGamesCollection('all', season, 'team')

    const averages = calculateOffenseDefenseAverages(games ?? {})

    const renderChart = (): JSX.Element => {
        if (isLoading) return <LoadingChartIndicator/>
        if (averages.length === 0) return <NoChartData/>

        return (
            <ChartContainer>
                <OffenseDefenseChart averages={averages} teams={teams} foregroundColor={properties.textColor} maintainAspectRatio={false} responsive/>
            </ChartContainer>
        )
    }

    return (
        <ChartPageContainer>
            <ChartOptionsBar title="Teams Offense Defense" information="Some info">
                <SeasonsDropdown selectedSeason={season} onChange={value => setSeason(value ?? season)}/>
            </ChartOptionsBar>

            {renderChart()}
        </ChartPageContainer>
    )
}

export default OffenseDefensePage