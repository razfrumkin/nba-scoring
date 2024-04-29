import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { ChartsProvider } from '../providers/charts'
import ROUTES from './routes'

const Routing = () => {
    return (
        <BrowserRouter>
            <Layout>
                <ChartsProvider>
                    <Routes>
                        {ROUTES.map(route => <Route path={route.location} element={route.element}/>)}
                    </Routes>
                </ChartsProvider>
            </Layout>
        </BrowserRouter>
    )
}

export default Routing