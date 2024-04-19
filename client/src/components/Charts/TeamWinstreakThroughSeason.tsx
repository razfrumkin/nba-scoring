import { Chart, ChartData, ChartOptions, Filler, LineElement } from 'chart.js'
import { useState } from 'react'
import { Game, SeasonId, Team, TeamId } from '../../models'
import { DEFAULT_TEAM, currentSeason, formatDate } from '../../utilities'
import { useGamesCollection } from '../../hooks'
import { TeamsDropdown } from '../Filter'
import SeasonsDropdown from '../Filter/SeasonsDropdown'
import { Line } from 'react-chartjs-2'

Chart.register(LineElement, Filler)

function calculateWinstreaks(teamId: TeamId, games: Game[]): { streak: number, game: Game }[] {
    let streak = 0
    const winstreaks: { streak: number, game: Game }[] = []

    for (let index = 0; index < games.length; index += 1) {
        const game = games[index]

        if (teamId === game.winnerId) {
            if (streak < 0) streak = 1
            else streak += 1
        } else {
            if (streak > 0) streak = -1
            else streak -= 1
        }

        winstreaks.push({ streak: streak, game: game })
    }

    return winstreaks
}

const TeamWinstreakThroughSeason = () => {
    const [season, setSeason] = useState<SeasonId>(currentSeason())
    const [team, setTeam] = useState<Team>(DEFAULT_TEAM)

    const { isLoading, games } = useGamesCollection(team.id, season, 'none')

    const winstreaks = calculateWinstreaks(team.id, games ?? [])

    const GREEN = 'rgba(75, 192, 192, 0.8)'
    const RED = 'rgba(255, 99, 132, 0.8)'

    const data: ChartData<'line'> = {
        labels: winstreaks.map(value => {
            return formatDate(new Date(value.game.date))
        }),
        datasets: [
            {
                data: winstreaks.map(value => {
                    return value.streak
                }),
                pointBackgroundColor: winstreaks.map(value => {
                    return value.streak > 0 ? GREEN : RED
                }),
                tension: 0.5,
                fill: {
                    target: 'origin',
                    above: GREEN,
                    below: RED
                }
            }
        ]
    }

    const options: ChartOptions<'line'> = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: context => {
                        const index = context.dataIndex
                        const data = winstreaks[index]
                        if (data === undefined) return ''
                        const game = data.game
                        const isWinner = team.id === game.winnerId
                        const leftPoints = isWinner ? game.winnerPoints : game.loserPoints
                        const rightPoints = isWinner ? game.loserPoints : game.winnerPoints
                        const matchup = isWinner ? game.winnerMatchup : game.loserMatchup
                        return `${data.streak > 0 ? 'Winstreak' : 'Losing streak'}: ${Math.abs(data.streak)} | ${leftPoints}-${rightPoints}, ${matchup}`
                    }
                }
            }
        }
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', maxHeight: '100%' }}>
                {isLoading ? <span>Loading...</span> :
                    <Line data={data} options={options}/>
                }
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '15px' }}>
                <SeasonsDropdown selectedSeason={season} onChange={value => setSeason(value ?? season)} excludeOptionAll resultsListMaxHeight="100px"/>
                <TeamsDropdown selectedTeam={team} onChange={value => setTeam((value ?? team) as Team)} excludeOptionAll resultsListMaxHeight="100px"/>
            </div>
        </>
    )
}

export default TeamWinstreakThroughSeason