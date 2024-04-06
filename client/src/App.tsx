import { useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import { fetchGames } from './api'

const App = () => {
    const [data, setData] = useState<any>(undefined)

    useEffect(() => {
        fetchGames('all', 'all', 'team').then(response => {
            setData(response)
        })
    }, [])

    console.log(data)

    return (
        <Layout>
            <h1>App</h1>
        </Layout>
    )
}

export default App