import { ChartData, ChartOptions } from 'chart.js'
import { GamesCollection, Team } from '../../models'
import { Line } from 'react-chartjs-2'
import { formatDate } from '../../utilities'

interface SeasonScoresChartProps {
    team: Team
    games: GamesCollection<'none'>
    foregroundColor?: string
    maintainAspectRatio?: boolean
    responsive?: boolean
}

const SeasonScoresChart: React.FC<SeasonScoresChartProps> = ({ team, games, foregroundColor, maintainAspectRatio, responsive }) => {
    const data: ChartData<'line'> = {
        labels: games.map(game => formatDate(new Date(game.date))),
        datasets: [
            {
                data: games.map(game => game.winnerId === team.id ? game.winnerPoints : game.loserPoints),
                backgroundColor: context => {
                    const gradient = context.chart.ctx.createLinearGradient(0, context.chart.chartArea?.top ?? 0, 0, context.chart.chartArea?.bottom ?? 0)
                    gradient.addColorStop(0, team.colors[0])
                    gradient.addColorStop(1, 'transparent')
                    return gradient
                },
                tension: 0.25,
                fill: true
            }
        ]
    }

    const options: ChartOptions<'line'> = {
        scales: {
            x: {
                ticks: {
                    maxTicksLimit: 10
                }
            },
            y: {
                ticks: {
                    color: foregroundColor,
                    maxTicksLimit: 10
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: context => {
                        const game = games[context.dataIndex]
                        const isWinner = team.id === game.winnerId
                        const leftPoints = isWinner ? game.winnerPoints : game.loserPoints
                        const rightPoints = isWinner ? game.loserPoints : game.winnerPoints
                        const matchup = isWinner ? game.winnerMatchup : game.loserMatchup
                        return `${leftPoints}-${rightPoints}, ${matchup}`
                    }
                }
            }
        },
        maintainAspectRatio: maintainAspectRatio,
        responsive: responsive
    }

    return (
        <Line data={data} options={options}/>
    )}

export default SeasonScoresChart