import { Outlet } from 'react-router'

function Auth() {
    return (
        <div>
            <div>Auth</div>
            <div>
                <Outlet />
            </div>
        </div>
    )
}

export default Auth
