import { ArcElement, BarElement, CategoryScale, Chart, ChartData, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { Game, SeasonId, Team } from '../../models'
import { useState } from 'react'
import { useGamesCollection } from '../../hooks'
import { Bar, Pie } from 'react-chartjs-2'
import SeasonsDropdown from '../Filter/SeasonsDropdown'
import { TeamsDropdown } from '../Filter'
import { DEFAULT_TEAM } from '../../utilities'

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

function calculateOutcomes(games: Game[], team: Team): { wins: number, losses: number } {
    let wins = 0
    let losses = 0

    for (const game of games) {
        if (game.winnerId === team.id) wins += 1
        else losses += 1
    }

    return { wins: wins, losses: losses }
}

const WinLoseRecord = () => {
    const [season, setSeason] = useState<SeasonId | 'all'>('all')
    const [team, setTeam] = useState<Team>(DEFAULT_TEAM)

    const { isLoading, games } = useGamesCollection(team.id, season, 'none')

    const outcomes = calculateOutcomes(games ?? [], team)

    const barData: ChartData<'bar'> = {
        labels: [''],
        datasets: [
            {
                label: 'W',
                data: [outcomes.wins],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'L',
                data: [outcomes.losses],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    }

    const pieData: ChartData<'pie'> = {
        labels: ['W', 'L'],
        datasets: [
            {
                data: [outcomes.wins, outcomes.losses],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            },
        ]
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', maxHeight: '80%' }}>
                {isLoading ? <span>Loading...</span> : 
                    <>
                        <Bar data={barData}/>
                        <Pie data={pieData}/>
                    </>
                }
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '15px' }}>
                <SeasonsDropdown selectedSeason={season} onChange={value => setSeason(value ?? season)} resultsListMaxHeight="100px"/>
                <TeamsDropdown selectedTeam={team} onChange={value => setTeam((value ?? team) as Team)} excludeOptionAll resultsListMaxHeight="100px"/>
            </div>
        </>
    )
}

export default WinLoseRecord