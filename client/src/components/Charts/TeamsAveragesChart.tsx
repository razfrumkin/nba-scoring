import { Bar } from 'react-chartjs-2'
import { TeamsCollection } from '../../models'
import { ChartData, ChartOptions } from 'chart.js'
import { GRAY, setOpacity } from '../../utilities'

interface TeamsAveragesChartProps {
    teams: TeamsCollection
    averages: { teamId: number, average: number }[],
    maintainAspectRatio?: boolean
    responsive?: boolean
}

const TeamsAveragesChart: React.FC<TeamsAveragesChartProps> = ({ teams, averages, maintainAspectRatio, responsive }) => {
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
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    title: items => {
                        const data = averages[items[0].dataIndex]
                        return teams[data.teamId]?.fullName ?? 'Unknown'
                    },
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