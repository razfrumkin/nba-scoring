import { useState } from 'react'
import { useGamesCollection, useTeams, useTheme } from '../hooks'
import { SeasonId, Team } from '../models'
import { currentSeason } from '../utilities'
import { SeasonsDropdown, TeamsDropdown } from '../components/Dropdowns'
import { ChartContainer, ChartOptionsBar, ChartPageContainer, LoadingChartIndicator, NoChartData } from '../components/Charts/Static'
import { SeasonScoresChart } from '../components/Charts'

const SeasonScoresPage = () => {
    const { properties } = useTheme()
    const { defaultTeam } = useTeams()

    const [season, setSeason] = useState<SeasonId>(currentSeason())
    const [team, setTeam] = useState<Team>(defaultTeam)

    const { isLoading, games } = useGamesCollection(team.id, season, 'none')

    const renderChart = (): JSX.Element => {
        if (isLoading) return <LoadingChartIndicator/>
        if ((games ?? []).length === 0) return <NoChartData/>

        return (
            <ChartContainer>
                <SeasonScoresChart games={games!} team={team} foregroundColor={properties.textColor} maintainAspectRatio={false} responsive/>
            </ChartContainer>
        )
    }

    return (
        <ChartPageContainer>
            <ChartOptionsBar title="Season Scores Chart" information="Some info">
                <SeasonsDropdown selectedSeason={season} onChange={value => setSeason(value ?? season)} excludeOptionAll/>
                <TeamsDropdown selectedTeam={team} onChange={value => setTeam((value ?? team) as Team)} excludeOptionAll/>
            </ChartOptionsBar>

            {renderChart()}
        </ChartPageContainer>
    )
}

export default SeasonScoresPage