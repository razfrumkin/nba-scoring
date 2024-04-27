import { ChartData, ChartOptions } from 'chart.js'
import { GamesCollection } from '../../models'
import { GREEN, setOpacity } from '../../utilities'
import { Bar } from 'react-chartjs-2'

interface TotalPointsOccurencesChartProps {
    occurences: { totalPoints: number, games: GamesCollection<'none'> }[]
    foregroundColor?: string
    maintainAspectRatio?: boolean
    responsive?: boolean
}

const TotalPointsOccurencesChart: React.FC<TotalPointsOccurencesChartProps> = ({ occurences, foregroundColor, maintainAspectRatio, responsive }) => {
    const data: ChartData<'bar'> = {
        labels: occurences.map(occurence => occurence.totalPoints),
        datasets: [
            {
                label: 'Total Points Occurences',
                data: occurences.map(occurence => occurence.games.length),
                backgroundColor: setOpacity(GREEN, 0.75)
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
                        const data = occurences[context.dataIndex]
                        return `${data.games.length} appearance${data.games.length > 1 ? 's' : ''}`
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

export default TotalPointsOccurencesChart