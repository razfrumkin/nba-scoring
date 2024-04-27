import { ChartData, ChartOptions } from 'chart.js'
import { TeamsCollection } from '../../models'
import { Scatter } from 'react-chartjs-2'
import { setOpacity } from '../../utilities'
import { GRAY } from '../../utilities/colors'

interface OffenseDefenseChartProps {
    teams: TeamsCollection
    averages: { teamId: number, offense: number, defense: number }[],
    foregroundColor?: string
    maintainAspectRatio?: boolean
    responsive?: boolean
}

const OffenseDefenseChart: React.FC<OffenseDefenseChartProps> = ({ teams, averages, foregroundColor, maintainAspectRatio, responsive }) => {
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
                ticks: {
                    color: foregroundColor
                },
                reverse: true
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
                        const team = teams[data.teamId]
                        return `${team?.fullName ?? 'Unknown'} | Offense: ${data.offense.toFixed(1)}, defense: ${data.defense.toFixed(1)}`
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