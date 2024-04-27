import { QueryClient, QueryClientProvider } from 'react-query'
import { Layout } from './components/Layout'
import { ThemeProvider } from './providers/theme'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { ChartsProvider } from './providers/charts'
import { MainPage, StreaksPage } from './pages'
import ROUTES from './pages/routes'

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
            <ThemeProvider>
                <ChartRouter/>
            </ThemeProvider>
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