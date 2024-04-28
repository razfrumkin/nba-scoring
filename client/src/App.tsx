import { QueryClient, QueryClientProvider } from 'react-query'
import { Layout } from './components/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChartsProvider } from './providers/charts'
import ROUTES from './pages/routes'
import { NBAProvider } from './providers/nba'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            cacheTime: 0,
            staleTime: 0
        }
    }
})

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <NBAProvider>
                <ChartRouter/>
            </NBAProvider>
        </QueryClientProvider>
    )
}

const ChartRouter = () => {
    return (
        <BrowserRouter>
            <Layout>
                <ChartsProvider>
                    <Routes>
                        {ROUTES.map(route => {
                            return (
                                <Route path={route.location} element={route.element}/>
                            )
                        })}
                    </Routes>
                </ChartsProvider>
            </Layout>
        </BrowserRouter>
    )
}

export default App