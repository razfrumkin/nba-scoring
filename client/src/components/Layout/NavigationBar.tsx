import { Link, useLocation } from 'react-router-dom'
import './NavigationBar.scss'
import { useTheme } from '../../hooks'
import ROUTES from '../../pages/routes'

const NavigationBar = () => {
    const location = useLocation()
    const { theme, toggleTheme } = useTheme()

    return (
        <nav className="navigation-bar">
            <ul>
                {ROUTES.map(route => {
                    return route.label ?
                        <li key={route.location}>
                            <Link className={`link ${location.pathname === route.location ? 'active' : ''}`} to={route.location}>
                                {route.label}
                            </Link>
                        </li>
                    : <></>
                })}

                <li><button onClick={toggleTheme}>{theme}</button></li>
            </ul>
        </nav>
    )
}

export default NavigationBar