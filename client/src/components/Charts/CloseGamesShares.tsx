import { useState } from 'react'
import { Game, SeasonId, Team } from '../../models'
import SeasonsDropdown from '../Filter/SeasonsDropdown'
import { TeamsDropdown } from '../Filter'
import { useGamesCollection } from '../../hooks'
import { ArcElement, Chart, ChartData, ChartOptions, Legend, Tooltip } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { scoringDifference } from '../../utilities'

Chart.register(ArcElement, Tooltip, Legend)

function calculateLeads(games: Game[]): { onePossessionGames: number, moderateLeads: number, blowouts: number } {
    let small = 0
    let medium = 0
    let big = 0

    for (const game of games) {
        const difference = scoringDifference(game)
        if (difference <= 3) small += 1
        else if (difference <= 19) medium += 1
        else big += 1
    }

    return { onePossessionGames: small, moderateLeads: medium, blowouts: big }
}

const CloseGamesShares = () => {
    const [season, setSeason] = useState<SeasonId | 'all'>('all')
    const [team, setTeam] = useState<Team | 'all'>('all')

    const { isLoading, games } = useGamesCollection(team === 'all' ? 'all' : team.id, season, 'none')

    const leads = calculateLeads(games ?? [])

    const data: ChartData<'pie'> = {
        labels: ['One Possession Games', 'Moderate Leads', 'Blowouts'],
        datasets: [
            {
                data: [leads.onePossessionGames, leads.moderateLeads, leads.blowouts],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }
        ]
    }

    const options: ChartOptions<'pie'> = {

    }

    const selectSeason = (value: SeasonId | 'all' | null) => {
        if (value === null) return
        setSeason(value)
    }

    const selectTeam = (value: Team | 'all' | null) => {
        if (value === null) return
        setTeam(value)
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', maxHeight: '100%' }}>
                {isLoading ? <span>Loading...</span> : <Pie data={data} options={options}/>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '15px' }}>
                <SeasonsDropdown selectedSeason={season} onChange={selectSeason} resultsListMaxHeight="100px"/>
                <TeamsDropdown selectedTeam={team} onChange={selectTeam} resultsListMaxHeight="100px"/>
            </div>
        </>
    )
}

export default CloseGamesShares