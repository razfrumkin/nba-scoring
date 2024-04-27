import { useState } from 'react'
import { useGamesCollection, useTeams, useTheme } from '../hooks'
import { SeasonId } from '../models'
import { ChartContainer, ChartOptionsBar, ChartPageContainer, LoadingChartIndicator, NoChartData } from '../components/Charts/Static'
import { TeamsAveragesChart } from '../components/Charts'
import { SeasonsDropdown } from '../components/Dropdowns'
import { calculateAverages } from '../utilities'

const TeamsAveragesPage = () => {
    const { properties } = useTheme()
    const { teams } = useTeams()

    const [season, setSeason] = useState<SeasonId | 'all'>('all')

    const { isLoading, games } = useGamesCollection('all', season, 'team')

    const averages = calculateAverages(games ?? {})

    const renderChart = (): JSX.Element => {
        if (isLoading) return <LoadingChartIndicator/>
        if (averages.length === 0) return <NoChartData/>

        return (
            <ChartContainer>
                <TeamsAveragesChart averages={averages} teams={teams} foregroundColor={properties.textColor} maintainAspectRatio={false} responsive/>
            </ChartContainer>
        )
    }

    return (
        <ChartPageContainer>
            <ChartOptionsBar title="Teams Average Points" information="Some info">
                <SeasonsDropdown selectedSeason={season} onChange={value => setSeason(value ?? season)}/>
            </ChartOptionsBar>

            {renderChart()}
        </ChartPageContainer>
    )
}

export default TeamsAveragesPage