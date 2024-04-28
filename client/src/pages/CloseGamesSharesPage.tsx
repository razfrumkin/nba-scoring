import { useState } from 'react'
import { useGamesCollection } from '../hooks'
import { SeasonId, Team } from '../models'
import { calculateLeads } from '../utilities'
import { SeasonsDropdown, TeamsDropdown } from '../components/Dropdowns'
import { ChartContainer, ChartOptionsBar, ChartPageContainer, LoadingChartIndicator, NoChartData } from '../components/Charts/Static'
import { CloseGamesSharesChart } from '../components/Charts'

const CloseGamesSharesPage = () => {
    const [exportImage, setExportImage] = useState<boolean>(false)

    const [season, setSeason] = useState<SeasonId | 'all'>('all')
    const [team, setTeam] = useState<Team | 'all'>('all')

    const { isLoading, games } = useGamesCollection(team === 'all' ? 'all' : team.id, season, 'none')

    const leads = calculateLeads(games ?? [])

    const renderChart = (): JSX.Element => {
        if (isLoading) return <LoadingChartIndicator/>
        if (leads.onePossessionGames === 0 && leads.moderateLeads && leads.blowouts) return <NoChartData/>

        return (
            <ChartContainer exportImage={exportImage} setExportImage={setExportImage}>
                <CloseGamesSharesChart leads={leads} maintainAspectRatio={false} responsive/>
            </ChartContainer>
        )
    }

    return (
        <ChartPageContainer>
            <ChartOptionsBar title="Close Games Shares" information="Some info" onExport={() => setExportImage(true)}>
                <SeasonsDropdown selectedSeason={season} onChange={value => setSeason(value ?? season)}/>
                <TeamsDropdown selectedTeam={team} onChange={value => setTeam(value ?? team)}/>
            </ChartOptionsBar>

            {renderChart()}
        </ChartPageContainer>
    )
}

export default CloseGamesSharesPage