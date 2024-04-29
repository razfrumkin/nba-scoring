import { useState } from 'react'
import { useGamesCollection, useSeasons } from '../hooks'
import { SeasonId } from '../models'
import { calculateTotalPointsOccurences } from '../utilities'
import { ChartContainer, ChartOptionsBar, ChartPageContainer, LoadingChartIndicator, NoChartData } from '../components/Charts/Static'
import { TotalPointsOccurencesChart } from '../components/Charts'
import { SeasonsDropdown } from '../components/Dropdowns'

const TotalPointsOccurencesPage = () => {
    const [exportImage, setExportImage] = useState<boolean>(false)

    const { currentSeason } = useSeasons()
    
    const [season, setSeason] = useState<SeasonId | 'all'>(currentSeason)

    const { isLoading, games } = useGamesCollection('all', season, 'none')

    const occurences = calculateTotalPointsOccurences(games ?? [])

    const renderChart = (): JSX.Element => {
        if (isLoading) return <LoadingChartIndicator/>
        if (occurences.length === 0) return <NoChartData/>

        return (
            <ChartContainer exportImage={exportImage} setExportImage={setExportImage}>
                <TotalPointsOccurencesChart occurences={occurences} maintainAspectRatio={false} responsive/>
            </ChartContainer>
        )
    }

    return (
        <ChartPageContainer>
            <ChartOptionsBar title="Total Points Occurences" information="Counts the total occurrences of each score in NBA games for a selected season or all seasons. Each score is calculated by summing the points scored by the winning and losing teams in a game." onExport={() => setExportImage(true)}>
                <SeasonsDropdown selectedSeason={season} onChange={value => setSeason(value ?? season)}/>
            </ChartOptionsBar>

            {renderChart()}
        </ChartPageContainer>

    )
}

export default TotalPointsOccurencesPage