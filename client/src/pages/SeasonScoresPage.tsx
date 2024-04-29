import { useState } from 'react'
import { useGamesCollection, useSeasons, useTeams } from '../hooks'
import { SeasonId, Team } from '../models'
import { SeasonsDropdown, TeamsDropdown } from '../components/Dropdowns'
import { ChartContainer, ChartOptionsBar, ChartPageContainer, LoadingChartIndicator, NoChartData } from '../components/Charts/Static'
import { SeasonScoresChart } from '../components/Charts'

const SeasonScoresPage = () => {
    const { defaultTeam } = useTeams()
    const { currentSeason } = useSeasons()

    const [exportImage, setExportImage] = useState<boolean>(false)

    const [team, setTeam] = useState<Team>(defaultTeam)
    const [season, setSeason] = useState<SeasonId>(currentSeason)

    const { isLoading, games } = useGamesCollection(team.id, season, 'none')

    const renderChart = (): JSX.Element => {
        if (isLoading) return <LoadingChartIndicator/>
        if ((games ?? []).length === 0) return <NoChartData/>

        return (
            <ChartContainer exportImage={exportImage} setExportImage={setExportImage}>
                <SeasonScoresChart games={games!} team={team} maintainAspectRatio={false} responsive/>
            </ChartContainer>
        )
    }

    return (
        <ChartPageContainer>
            <ChartOptionsBar title="Season Scores" information="Plots every score of a selected NBA team in a season." onExport={() => setExportImage(true)}>
                <SeasonsDropdown selectedSeason={season} onChange={value => setSeason(value ?? season)} excludeOptionAll/>
                <TeamsDropdown selectedTeam={team} onChange={value => setTeam((value ?? team) as Team)} excludeOptionAll/>
            </ChartOptionsBar>

            {renderChart()}
        </ChartPageContainer>
    )
}

export default SeasonScoresPage