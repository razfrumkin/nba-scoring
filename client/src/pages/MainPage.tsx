import { Filter } from '../components/Filter'
import { useTheme } from '../hooks'

const MainPage = () => {
    const { toggleTheme } = useTheme()

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <div style={{ display: 'block', width: '70%', height: '70%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '15px' }}>
                        <span style={{ fontSize: '45px', fontWeight: 'bold', color: 'var(--secondary-text-color)' }}>Chart Type</span>
                        <div style={{ flexGrow: 1 }}></div>
                        <button style={{ padding: '15px', backgroundColor: 'var(--secondary-background-color)', color: 'var(--secondary-text-color)' }} onClick={toggleTheme}>Toggle Theme</button>
                    </div>
                    <div style={{ display: 'block', background: 'blue', flexGrow: 1 }}>
                        Main
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '15px' }}>
                        <Filter width="500px" padding="15px" maxResultsHeight="150px"/>
                        <div style={{ flexGrow: 1 }}></div>
                        <button style={{ padding: '15px', backgroundColor: 'var(--secondary-background-color)', color: 'var(--secondary-text-color)' }}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MainPage