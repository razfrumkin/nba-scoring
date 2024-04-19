import { Game } from '../../models'
import { Scatter } from 'react-chartjs-2'
import { Chart, ChartData, ChartOptions, LinearScale, Point, PointElement, Tooltip } from 'chart.js'
import { formatDate, interpolate } from '../../utilities'
import { useGamesCollection } from '../../hooks'

Chart.register(LinearScale, PointElement, Tooltip)

function sortByScores(games: Game[]): { [score: string]: Game[] } {
    const scores: { [score: string]: Game[] } = {}

    games.forEach(game => {
        const score = `${game.winnerPoints}-${game.loserPoints}`
        if (score in scores) scores[score].push(game)
        else scores[score] = [game]
    })

    return scores
}

function tooltipLabel(game: Game): string {
    return `${game.winnerMatchup} | ${game.winnerPoints}-${game.loserPoints} at ${formatDate(new Date(game.date))}`
}

const ScoresHeatMapChart = () => {
    const { isLoading, games } = useGamesCollection('all', 'all', 'none')

    if (isLoading) return <span>Loading...</span>

    const scores = sortByScores(games!)

    const values: { x: number, y: number }[] = Object.values(scores).map(score => {
        const first = score[0]

        return {
            x: first.winnerPoints,
            y: first.winnerPoints - first.loserPoints
        }
    })

    const getColorForPoint = (point: { x: number, y: number }): string => {
        const score = `${point.x}-${point.x - point.y}`
        const elements = scores[score]
        const total = elements.length

        const interpolation = interpolate(total, 0.05)

        return `hsl(${-interpolation * 45 + 45}, 100%, 50%)`
    }

    const data: ChartData<'scatter'> = {
        datasets: [
            {
                label: 'Frequency of every NBA game score since 1946',
                data: values,
                pointBackgroundColor: values.map(getColorForPoint),
                pointStyle: 'rect',
            }
        ]
    }

    const options: ChartOptions<'scatter'> = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: context => {
                        const point = context.dataset.data[context.dataIndex] as Point
                        const score = `${point.x}-${point.x - point.y}`
                        const games = scores[score]
                        return games.map(tooltipLabel)
                    }
                }
            }
        }
    }

    return (
        <div style={{ display: 'block' }}>
            <Scatter data={data} options={options}/>
        </div>
    )
}

export default ScoresHeatMapChart