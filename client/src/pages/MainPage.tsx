import { ChartsDropdown, OffenseDefense } from '../components/Charts'
import { useTheme } from '../hooks'
import { ChartType } from '../models'
import { useState } from 'react'

const MainPage = () => {
    const { toggleTheme } = useTheme()

    const [chart, setChart] = useState<ChartType | null>(null)

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ display: 'block', width: '70%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '15px' }}>
                        <span style={{ fontSize: '45px', fontWeight: 'bold', color: 'var(--secondary-text-color)' }}>Chart Type</span>
                        <ChartsDropdown selectedChart={chart} setSelectedChart={setChart}/>
                        <div style={{ flexGrow: 1 }}></div>
                        <button style={{ padding: '15px', backgroundColor: 'var(--secondary-background-color)', color: 'var(--secondary-text-color)' }} onClick={toggleTheme}>Toggle Theme</button>
                    </div>
                    <OffenseDefense/>
                </div>
            </div>
        </div>
    )
}

export default MainPage