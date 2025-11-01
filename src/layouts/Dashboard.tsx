import { Outlet } from 'react-router'

function Dashboard() {
    return (
        <div>
            <div>Dashboard</div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard
