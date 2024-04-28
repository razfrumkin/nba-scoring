import { ChartData, ChartOptions } from 'chart.js'
import { TeamsCollection } from '../../models'
import { Scatter } from 'react-chartjs-2'
import { GRAY, setOpacity } from '../../utilities'

interface OffenseDefenseChartProps {
    teams: TeamsCollection
    averages: { teamId: number, offense: number, defense: number }[],
    maintainAspectRatio?: boolean
    responsive?: boolean
}

const OffenseDefenseChart: React.FC<OffenseDefenseChartProps> = ({ teams, averages, maintainAspectRatio, responsive }) => {
    const data: ChartData<'scatter'> = {
        datasets: [
            {
                label: 'Teams average offense and defense',
                data: averages.map(average => ({ x: average.offense, y: average.defense })),
                pointBackgroundColor: averages.map(average => {
                    const team = teams[average.teamId]
                    if (team === undefined) return setOpacity(GRAY, 0.75)
                    return setOpacity(team.colors[0], 0.75)
                }),
                pointRadius: 10
            }
        ]
    }
    
    const options: ChartOptions<'scatter'> = {
        scales: {
            y: {
                reverse: true
            }
        },
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
                        return [`Offense: ${data.offense.toFixed(1)}`, `Defense: ${data.defense.toFixed(1)}`]
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

export default OffenseDefenseChart