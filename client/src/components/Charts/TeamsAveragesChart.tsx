import { Bar } from 'react-chartjs-2'
import { TeamsCollection } from '../../models'
import { ChartData, ChartOptions } from 'chart.js'
import { GRAY, setOpacity } from '../../utilities/colors'

interface TeamsAveragesChartProps {
    teams: TeamsCollection
    averages: { teamId: number, average: number }[],
    foregroundColor?: string
    maintainAspectRatio?: boolean
    responsive?: boolean
}

const TeamsAveragesChart: React.FC<TeamsAveragesChartProps> = ({ teams, averages, foregroundColor, maintainAspectRatio, responsive }) => {
    const data: ChartData<'bar'> = {
        labels: averages.map(average => {
            const team = teams[average.teamId]
            if (team === undefined) return 'Unknown'
            return team.abbreviation
        }),
        datasets: [
            {
                label: 'Average Points For Every Team',
                data: averages.map(average => average.average),
                backgroundColor: averages.map(average => {
                    const team = teams[average.teamId]
                    if (team === undefined) return setOpacity(GRAY, 0.75)
                    return setOpacity(team.colors[0], 0.75)
                })
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
                        const data = averages[context.dataIndex]
                        return `Average points: ${data.average.toFixed(1)}`
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

export default TeamsAveragesChart