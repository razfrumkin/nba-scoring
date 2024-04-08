import { Layout } from './components/Layout'
import { MainPage } from './pages'
import { ThemeProvider } from './providers/theme'

const App = () => {
    return (
        <ThemeProvider>
            <Layout>
                <MainPage/>
            </Layout>
        </ThemeProvider>
    )
}

export default App