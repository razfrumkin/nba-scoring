import { QueryClient, QueryClientProvider } from 'react-query'
import { NBAProvider } from './providers/nba'
import { Routing } from './routes'

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
                <Routing/>
            </NBAProvider>
        </QueryClientProvider>
    )
}

export default App