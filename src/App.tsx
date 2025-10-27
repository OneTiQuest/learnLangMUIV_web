import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'

function App() {
    const handler = async () => {
            const data = (await fetch('/api/')).json()
            data.then((res) => {
                alert(res)
            })
        }
    return <div onClick={handler}>dadad</div>
}

export default App
