import './Layout.scss'
import NavigationBar from './NavigationBar'

interface LayoutProps {
    children?: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <NavigationBar/>
            <main>{children}</main>
        </div>
    )
}

export default Layout