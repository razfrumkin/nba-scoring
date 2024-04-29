import { useState } from 'react'
import { useGamesCollection, useSeasons, useTeams } from '../hooks'
import { SeasonId } from '../models'
import { ChartContainer, ChartOptionsBar, ChartPageContainer, LoadingChartIndicator, NoChartData } from '../components/Charts/Static'
import { SeasonsDropdown } from '../components/Dropdowns'
import { OffenseDefenseChart } from '../components/Charts'
import { calculateOffenseDefenseAverages } from '../utilities'

const OffenseDefensePage = () => {
    const { teams } = useTeams()
    const { currentSeason } = useSeasons()

    const [exportImage, setExportImage] = useState<boolean>(false)

    const [season, setSeason] = useState<SeasonId | 'all'>(currentSeason)

    const { isLoading, games } = useGamesCollection('all', season, 'team')

    const averages = calculateOffenseDefenseAverages(games ?? {})

    const renderChart = (): JSX.Element => {
        if (isLoading) return <LoadingChartIndicator/>
        if (averages.length === 0) return <NoChartData/>

        return (
            <ChartContainer exportImage={exportImage} setExportImage={setExportImage}>
                <OffenseDefenseChart averages={averages} teams={teams} maintainAspectRatio={false} responsive/>
            </ChartContainer>
        )
    }

    return (
        <ChartPageContainer>
            <ChartOptionsBar title="Teams Offense Defense" information="Some info" onExport={() => setExportImage(true)}>
                <SeasonsDropdown selectedSeason={season} onChange={value => setSeason(value ?? season)}/>
            </ChartOptionsBar>

            {renderChart()}
        </ChartPageContainer>
    )
}

export default OffenseDefensePage