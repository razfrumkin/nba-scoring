import { QueryClient, QueryClientProvider } from 'react-query'
import { Layout } from './components/Layout'
import { MainPage } from './pages'
import { ThemeProvider } from './providers/theme'

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
                <Layout>
                    <MainPage/>
                </Layout>
            </ThemeProvider>
        </QueryClientProvider>
    )
}

export default App