import { Scatter } from 'react-chartjs-2'
import { GamesCollection } from '../../models'
import { formatDate, interpolate } from '../../utilities'
import { ChartData, ChartOptions } from 'chart.js'

interface ScoresHeatMapChartProps {
    scores: { score: string, games: GamesCollection<'none'> }[]
    maintainAspectRatio?: boolean
    responsive?: boolean
}

const ScoresHeatMapChart: React.FC<ScoresHeatMapChartProps> = ({ scores, maintainAspectRatio, responsive }) => {
    const data: ChartData<'scatter'> = {
        datasets: [
            {
                label: `Frequency of every score ever`,
                data: scores.map(score => {
                    const first = score.games[0]
                    return { x: first.winnerPoints, y: first.winnerPoints - first.loserPoints }
                }),
                pointBackgroundColor: scores.map(score => {
                    const interpolation = interpolate(score.games.length, 0.05)
                    return `hsl(${-interpolation * 45 + 45}, 100%, 50%)`
                }),
                pointStyle: 'rect',
                pointRadius: 5
            }
        ]
    }

    const options: ChartOptions<'scatter'> = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: context => {
                        const data = scores[context.dataIndex]
                        return data.games.map(game => `${game.winnerMatchup} | ${game.winnerPoints}-${game.loserPoints} at ${formatDate(new Date(game.date))}`)
                    }
                }
            }
        },
        maintainAspectRatio: maintainAspectRatio,
        responsive: responsive
    }

    return (
        <Scatter data={data} options={options}/>
    )
}

export default ScoresHeatMapChart