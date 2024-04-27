import { useState } from 'react'
import { SeasonId, Team } from '../models'
import { DEFAULT_TEAM, calculateStreaks, currentSeason } from '../utilities'
import { useGamesCollection, useTheme } from '../hooks'
import SeasonsDropdown from '../components/Dropdowns/SeasonsDropdown'
import { TeamsDropdown } from '../components/Dropdowns'
import { ChartContainer, ChartOptionsBar, ChartPageContainer, LoadingChartIndicator, NoChartData } from '../components/Charts/Static'
import { StreaksChart } from '../components/Charts'

const StreaksPage = () => {
    const { properties } = useTheme()

    const [season, setSeason] = useState<SeasonId>(currentSeason())
    const [team, setTeam] = useState<Team>(DEFAULT_TEAM)

    const { isLoading, games } = useGamesCollection(team.id, season, 'none')

    const streaks = games === undefined ? [] : calculateStreaks(team.id, games)

    const renderChart = (): JSX.Element => {
        if (isLoading) return <LoadingChartIndicator/>
        if (streaks.length === 0) return <NoChartData/>

        return (
            <ChartContainer>
                <StreaksChart streaks={streaks} team={team} foregroundColor={properties.textColor} maintainAspectRatio={false}/>
            </ChartContainer>
        )
    }

    return (
        <ChartPageContainer>
            <ChartOptionsBar title="Streaks Chart" information="Some info">
                <SeasonsDropdown selectedSeason={season} onChange={value => setSeason(value ?? season)} excludeOptionAll/>
                <TeamsDropdown selectedTeam={team} onChange={value => setTeam((value ?? team) as Team)} excludeOptionAll/>
            </ChartOptionsBar>

            {renderChart()}
        </ChartPageContainer>
    )
}

export default StreaksPage