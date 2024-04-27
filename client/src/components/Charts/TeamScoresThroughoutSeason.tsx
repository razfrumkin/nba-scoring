import { Chart, ChartData, ChartOptions, Filler, LineElement } from 'chart.js'
import { useState } from 'react'
import { SeasonId, Team } from '../../models'
import { DEFAULT_TEAM, currentSeason, formatDate } from '../../utilities'
import { useGamesCollection } from '../../hooks'
import { Line } from 'react-chartjs-2'
import SeasonsDropdown from '../Dropdowns/SeasonsDropdown'
import { TeamsDropdown } from '../Dropdowns'

Chart.register(LineElement, Filler)

const TeamScoresThroughoutSeason = () => {
    const [season, setSeason] = useState<SeasonId>(currentSeason())
    const [team, setTeam] = useState<Team>(DEFAULT_TEAM)

    const { isLoading, games } = useGamesCollection(team.id, season, 'none')

    const data: ChartData<'line'> = {
        labels: games?.map(game => {
            return formatDate(new Date(game.date))
        }) ?? [],
        datasets: [
            {
                backgroundColor: context => {
                    const gradient = context.chart.ctx.createLinearGradient(0, context.chart.chartArea?.top ?? 0, 0, context.chart.chartArea?.bottom ?? 0)
                    gradient.addColorStop(0, team.colors[0])
                    //gradient.addColorStop(1, setOpacity(colors[1], 0))
                    gradient.addColorStop(1, 'transparent')
                    return gradient
                },
                borderColor: team.colors[0],
                fill: true,
                tension: 0.25,
                data: games?.map(game => {
                    const points = game.winnerId === team.id ? game.winnerPoints : game.loserPoints
                    return points
                }) ?? []
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
                        const game = games![index]
                        const isWinner = team.id === game.winnerId
                        const leftPoints = isWinner ? game.winnerPoints : game.loserPoints
                        const rightPoints = isWinner ? game.loserPoints : game.winnerPoints
                        const matchup = isWinner ? game.winnerMatchup : game.loserMatchup
                        return `${leftPoints}-${rightPoints}, ${matchup}`
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: true
                },
                ticks: {
                    maxTicksLimit: 10
                }
            },
            y: {
                grid: {
                    display: true
                },
                ticks: {
                    maxTicksLimit: 10
                }
                //beginAtZero: true
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

export default TeamScoresThroughoutSeason