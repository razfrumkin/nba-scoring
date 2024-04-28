import { Link, useLocation } from 'react-router-dom'
import './NavigationBar.scss'
import ROUTES from '../../pages/routes'

const NavigationBar = () => {
    const location = useLocation()

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

                <li className="spacer"/>

                <li className="credit">
                    <span className="credit">Data provided by <Link to="https://www.nba.com/stats" target="_blank" rel="noopener noreferrer">stats.nba.com</Link></span>
                </li>
            </ul>
        </nav>
    )
}

export default NavigationBar