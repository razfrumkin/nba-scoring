import { ChartData, ChartOptions } from 'chart.js'
import { Game, Team } from '../../models'
import { Bar } from 'react-chartjs-2'
import { GREEN, RED, formatDate, setOpacity } from '../../utilities'

interface PointDifferentialsChartProps {
    team: Team
    differentials: { differential: number, game: Game }[]
    foregroundColor?: string
    maintainAspectRatio?: boolean
    responsive?: boolean
}

const PointDifferentialsChart: React.FC<PointDifferentialsChartProps> = ({ team, differentials, foregroundColor, maintainAspectRatio, responsive }) => {
    const data: ChartData<'bar'> = {
        labels: differentials.map(differential => formatDate(new Date(differential.game.date))),
        datasets: [
            {
                data: differentials.map(differential => differential.differential),
                backgroundColor: differentials.map(differential => setOpacity(differential.differential > 0 ? GREEN : RED, 0.75))
            }
        ]
    }

    const options: ChartOptions<'bar'> = {
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
                        const data = differentials[context.dataIndex]
                        const game = data.game
                        const isWinner = team.id === game.winnerId
                        const leftPoints = isWinner ? game.winnerPoints : game.loserPoints
                        const rightPoints = isWinner ? game.loserPoints : game.winnerPoints
                        const matchup = isWinner ? game.winnerMatchup : game.loserMatchup
                        return `Point differential: ${data.differential} | ${leftPoints}-${rightPoints}, ${matchup}`
                    }
                }
            }
        },
        maintainAspectRatio: maintainAspectRatio,
        responsive: responsive
    }

    return (
        <Bar data={data} options={options}/>
    )
}

export default PointDifferentialsChart