import { useState } from 'react'
import { ChartsDropdown } from '../components/Charts'
import { Filter } from '../components/Filter'
import { useTheme } from '../hooks'
import { ChartType, SeasonId, Team } from '../models'

const MainPage = () => {
    const { toggleTheme } = useTheme()

    const [chart, setChart] = useState<ChartType | null>(null)

    const [season, setSeason] = useState<SeasonId | null>(null)
    const [team, setTeam] = useState<Team | null>(null)

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ display: 'block', width: '70%', height: '70%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '15px' }}>
                        <span style={{ fontSize: '45px', fontWeight: 'bold', color: 'var(--secondary-text-color)' }}>Chart Type</span>
                        <ChartsDropdown selectedChart={chart} setSelectedChart={setChart}/>
                        <div style={{ flexGrow: 1 }}></div>
                        <button style={{ padding: '15px', backgroundColor: 'var(--secondary-background-color)', color: 'var(--secondary-text-color)' }} onClick={toggleTheme}>Toggle Theme</button>
                    </div>
                    <div style={{ display: 'block', background: 'blue', flexGrow: 1 }}>
                        Main
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '15px' }}>
                        <Filter season={season} setSeason={setSeason} team={team} setTeam={setTeam} width="500px" padding="15px" maxResultsHeight="150px"/>
                        <div style={{ flexGrow: 1 }}></div>
                        <button style={{ padding: '15px', backgroundColor: 'var(--secondary-background-color)', color: 'var(--secondary-text-color)' }}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage