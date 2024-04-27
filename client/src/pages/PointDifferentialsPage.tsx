import { useState } from 'react'
import { useGamesCollection, useTheme } from '../hooks'
import { SeasonId, Team } from '../models'
import { DEFAULT_TEAM, currentSeason } from '../utilities'
import { calculateDifferentials } from '../utilities/graphData'
import { ChartContainer, ChartOptionsBar, ChartPageContainer, LoadingChartIndicator, NoChartData } from '../components/Charts/Static'
import { PointDifferentialChart } from '../components/Charts'
import { SeasonsDropdown, TeamsDropdown } from '../components/Dropdowns'

const PointDifferentialsPage = () => {
    const { properties } = useTheme()

    const [season, setSeason] = useState<SeasonId>(currentSeason())
    const [team, setTeam] = useState<Team>(DEFAULT_TEAM)

    const { isLoading, games } = useGamesCollection(team.id, season, 'none')

    const differentials = calculateDifferentials(team.id, games ?? [])

    const renderChart = (): JSX.Element => {
        if (isLoading) return <LoadingChartIndicator/>
        if (differentials.length === 0) return <NoChartData/>

        return (
            <ChartContainer>
                <PointDifferentialChart differentials={differentials} team={team} foregroundColor={properties.textColor} maintainAspectRatio={false} responsive/>
            </ChartContainer>
        )
    }

    return (
        <ChartPageContainer>
            <ChartOptionsBar title="Point Differentials Chart" information="Some info">
                <SeasonsDropdown selectedSeason={season} onChange={value => setSeason(value ?? season)} excludeOptionAll/>
                <TeamsDropdown selectedTeam={team} onChange={value => setTeam((value ?? team) as Team)} excludeOptionAll/>
            </ChartOptionsBar>

            {renderChart()}
        </ChartPageContainer>
    )
}

export default PointDifferentialsPage