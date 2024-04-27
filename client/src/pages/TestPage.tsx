import { useState } from 'react'
import { TeamsDropdown } from '../components/Dropdowns'
import { Team } from '../models'

const TestPage = () => {
    const [team, setTeam] = useState<Team | 'all' | null>(null)

    return (
        <>
            <TeamsDropdown selectedTeam={team} onChange={value => setTeam(value)} width="500px" resultsListMaxHeight="500px"/>
        </>        
    )
}

export default TestPage