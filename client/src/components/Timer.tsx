import { useContext } from 'react';
import useTimer from '../hooks/useTimer'
import { TimerContext } from '../contexts/timer';
import PlayIcon from './icons/playIcon'
import PauseIcon from './icons/pauseIcon';

function Timer () {
    const context = useContext(TimerContext);

    if (!context) {
        throw new Error("useTimer must be used within a TimerProvider");
    }

    const { isPaused, setIsPaused, timerState, timerClasses } = context;
    const {minutes, seconds} = useTimer(0, 5)



    return ( 
        <section className={timerClasses[timerState]}>
            <p className="text-2xl font-bold">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>

            <button onClick={() => setIsPaused(!isPaused)} className="bg-zinc-800 text-white p-2 rounded mt-4">
                <div className='flex flex-row justify-between p-2'>
                {isPaused ? (
                    <>
                    <PlayIcon className={timerClasses.icons[timerState]} />
                    Start
                    </>
                ) : (
                    <>
                    <PauseIcon className={timerClasses.icons[timerState]} />
                    Pause
                    </>
                )}
                </div>
            </button>
        </section>
    )
}

export default Timer