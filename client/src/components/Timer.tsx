import { useState } from 'react';
import useTimer from '../hooks/useTimer'

const timerClasses = {
    focus: 'bg-red-300 text-gray-800 p-4 text-center rounded',
    shortBreak: 'bg-blue-300 text-gray-800 p-4 text-center rounded',
    longBreak: 'bg-green-300 text-gray-800 p-4 text-center rounded'
};

function Timer () {
    const [isPaused, setIsPaused] = useState(true);
    const {minutes, seconds, timerState} = useTimer(1, isPaused)



    return ( 
        <section className={timerClasses[timerState]}>
            <p className="text-2xl font-bold">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>

            <button onClick={() => setIsPaused(!isPaused)} className="bg-gray-800 text-white p-2 rounded mt-4">
                {isPaused ? 'Start' : 'Pause'}
            </button>
        </section>
    )
}

export default Timer