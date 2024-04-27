import { ChartData, ChartOptions } from "chart.js"
import { Pie } from "react-chartjs-2"
import { GREEN, RED, YELLOW, setOpacity } from "../../utilities"

interface CloseGamesSharesChartProps {
    leads: { onePossessionGames: number, moderateLeads: number, blowouts: number }
    foregroundColor?: string
    maintainAspectRatio?: boolean
    responsive?: boolean
}

const CloseGamesSharesChart: React.FC<CloseGamesSharesChartProps> = ({ leads, foregroundColor, maintainAspectRatio, responsive }) => {
    const data: ChartData<'pie'> = {
        labels: ['One Possesion Games', 'Moderate Leads', 'Blowouts'],
        datasets: [
            {
                data: [leads.onePossessionGames, leads.moderateLeads, leads.blowouts],
                backgroundColor: [setOpacity(RED, 0.25), setOpacity(YELLOW, 0.25), setOpacity(GREEN, 0.25)],
                borderColor: [RED, YELLOW, GREEN],
                borderWidth: 1
            }
        ]
    }

    const options: ChartOptions<'pie'> = {
        plugins: {
            legend: {
                labels: {
                    color: foregroundColor
                }
            }
        },
        maintainAspectRatio: maintainAspectRatio,
        responsive: responsive
    }

    return (
        <Pie data={data} options={options}/>
    )
}

export default CloseGamesSharesChart