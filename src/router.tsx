import { createBrowserRouter } from 'react-router'
import Auth from './layouts/Auth'
import Error from './layouts/Error'
import Dashboard from './layouts/Dashboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Main from './pages/dashboard/Main'

const router = createBrowserRouter([
    {
        path: '*',
        Component: Error,
    },
    {
        path: '/',
        children: [
            {
                path: 'dashboard',
                Component: Dashboard,
                children: [
                    {
                        index: true,
                        Component: Main,
                    },
                    {
                        path: 'users',
                        Component: Main,
                    },
                ],
            },
        ],
    },
    {
        path: '/auth',
        Component: Auth,
        children: [
            {
                index: true,
                Component: Login,
            },
            {
                path: 'register',
                Component: Register,
            },
        ],
    },
])

export default router
