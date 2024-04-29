import { useState } from 'react'
import { useGamesCollection, useSeasons, useTeams } from '../hooks'
import { SeasonId, Team } from '../models'
import { calculateDifferentials } from '../utilities'
import { ChartContainer, ChartOptionsBar, ChartPageContainer, LoadingChartIndicator, NoChartData } from '../components/Charts/Static'
import { PointDifferentialChart } from '../components/Charts'
import { SeasonsDropdown, TeamsDropdown } from '../components/Dropdowns'

const PointDifferentialsPage = () => {
    const { defaultTeam } = useTeams()
    const { currentSeason } = useSeasons()

    const [exportImage, setExportImage] = useState<boolean>(false)

    const [team, setTeam] = useState<Team>(defaultTeam)
    const [season, setSeason] = useState<SeasonId>(currentSeason)

    const { isLoading, games } = useGamesCollection(team.id, season, 'none')

    const differentials = calculateDifferentials(team.id, games ?? [])

    const renderChart = (): JSX.Element => {
        if (isLoading) return <LoadingChartIndicator/>
        if (differentials.length === 0) return <NoChartData/>

        return (
            <ChartContainer exportImage={exportImage} setExportImage={setExportImage}>
                <PointDifferentialChart differentials={differentials} team={team} maintainAspectRatio={false} responsive/>
            </ChartContainer>
        )
    }

    return (
        <ChartPageContainer>
            <ChartOptionsBar title="Point Differentials Chart" information="Some info" onExport={() => setExportImage(true)}>
                <SeasonsDropdown selectedSeason={season} onChange={value => setSeason(value ?? season)} excludeOptionAll/>
                <TeamsDropdown selectedTeam={team} onChange={value => setTeam((value ?? team) as Team)} excludeOptionAll/>
            </ChartOptionsBar>

            {renderChart()}
        </ChartPageContainer>
    )
}

export default PointDifferentialsPage