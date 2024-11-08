import Header from './Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <main>
            {/* Layout component renders the Header on every page. */}
            <Header/>
            {/* dynamically renders either HomePage or AboutPage depending on the current route */}
            <Outlet/>
        </main>
    )
}
