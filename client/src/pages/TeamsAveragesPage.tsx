import { useState } from 'react'
import { useGamesCollection, useSeasons, useTeams } from '../hooks'
import { SeasonId } from '../models'
import { ChartContainer, ChartOptionsBar, ChartPageContainer, LoadingChartIndicator, NoChartData } from '../components/Charts/Static'
import { TeamsAveragesChart } from '../components/Charts'
import { SeasonsDropdown } from '../components/Dropdowns'
import { calculateAverages } from '../utilities'

const TeamsAveragesPage = () => {
    const { teams } = useTeams()
    const { currentSeason } = useSeasons()

    const [exportImage, setExportImage] = useState<boolean>(false)

    const [season, setSeason] = useState<SeasonId | 'all'>(currentSeason)

    const { isLoading, games } = useGamesCollection('all', season, 'team')

    const averages = calculateAverages(games ?? {})

    const renderChart = (): JSX.Element => {
        if (isLoading) return <LoadingChartIndicator/>
        if (averages.length === 0) return <NoChartData/>

        return (
            <ChartContainer exportImage={exportImage} setExportImage={setExportImage}>
                <TeamsAveragesChart averages={averages} teams={teams} maintainAspectRatio={false} responsive/>
            </ChartContainer>
        )
    }

    return (
        <ChartPageContainer>
            <ChartOptionsBar title="Teams Average Points" information="Displays the average points scored by each NBA team for a selected season or all seasons." onExport={() => setExportImage(true)}>
                <SeasonsDropdown selectedSeason={season} onChange={value => setSeason(value ?? season)}/>
            </ChartOptionsBar>

            {renderChart()}
        </ChartPageContainer>
    )
}

export default TeamsAveragesPage