import {TimerProvider} from './contexts/timer.tsx'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <TimerProvider>
    <App />
  </TimerProvider>,
)
