import { createBrowserRouter } from 'react-router'
import App from './App.tsx'

const routes = [
    {
        path: '/',
        element: <App />,
    },
]

export default createBrowserRouter(routes)
