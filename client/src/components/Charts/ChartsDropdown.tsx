import './ChartsDropdown.scss'
import { ChartType } from '../../models'
import { SearchableDropdown } from '../Filter'

interface ChartsDropdownProps {
    selectedChart: ChartType | null
    setSelectedChart: React.Dispatch<React.SetStateAction<ChartType | null>>
    width?: string | number
    resultsListMaxHeight?: string | number
}

const ChartsDropdown: React.FC<ChartsDropdownProps> = ({ selectedChart, setSelectedChart, width, resultsListMaxHeight }) => {
    const queryCharts = async(prompt: string): Promise<ChartType[]> => {
        return Object.keys(ChartType).map(chart => ChartType[chart as keyof typeof ChartType]).filter(chart => {
            return chart.toLocaleLowerCase().includes(prompt.toLocaleLowerCase())
        })
    }
    
    const chartElement = (chart: ChartType): JSX.Element => {
        return (
            <div className="chart-option">
                <span>{chart}</span>
            </div>
        )
    }
    
    return (
        <SearchableDropdown onChange={chart => setSelectedChart(chart)} selected={selectedChart} queryCallback={queryCharts} getKeyCallback={chart => chart} getLabelCallback={chart => chart} getElementCallback={chartElement} loadingElement={<span>Loading...</span>} width={width} resultsListMaxHeight={resultsListMaxHeight} placeholder="Select a chart..."/>
    )
}

export default ChartsDropdown