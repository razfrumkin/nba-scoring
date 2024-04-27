import '../../providers/theme/ThemeProvider.scss'
import { Line } from 'react-chartjs-2'
import { Game, Team } from '../../models'
import { ChartData, ChartOptions } from 'chart.js'
import { GREEN, RED, formatDate, setOpacity } from '../../utilities'

interface StreaksChartProps {
    team: Team
    streaks: { streak: number, game: Game }[]
    foregroundColor?: string
    maintainAspectRatio?: boolean
}

const StreaksChart: React.FC<StreaksChartProps> = ({ team, streaks, foregroundColor, maintainAspectRatio }) => {
    const data: ChartData<'line'> = {
        labels: streaks.map(streak => {
            return formatDate(new Date(streak.game.date))
        }),
        datasets: [
            {
                data: streaks.map(streak => streak.streak),
                pointBackgroundColor: streaks.map(streak => setOpacity(streak.streak > 0 ? GREEN : RED, 0.75)),
                tension: 0.5,
                fill: {
                    target: 'origin',
                    above: setOpacity(GREEN, 0.75),
                    below: setOpacity(RED, 0.75)
                }
            }
        ]
    }

    const options: ChartOptions<'line'> = {
        scales: {
            y: {
                ticks: {
                    color: foregroundColor
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
                        const data = streaks[context.dataIndex]
                        const game = data.game
                        const isWinner = team.id === game.winnerId
                        const leftPoints = isWinner ? game.winnerPoints : game.loserPoints
                        const rightPoints = isWinner ? game.loserPoints : game.winnerPoints
                        const matchup = isWinner ? game.winnerMatchup : game.loserMatchup
                        return `${data.streak > 0 ? 'Winstreak' : 'Losing streak'}: ${Math.abs(data.streak)} | ${leftPoints}-${rightPoints}, ${matchup}`
                    }
                }
            }
        },
        maintainAspectRatio: maintainAspectRatio,
        responsive: true
    }

    return (
        <Line data={data} options={options}/>
    )
}

export default StreaksChart