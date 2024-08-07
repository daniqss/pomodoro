import { useContext } from 'react';
import useTimer from '../hooks/useTimer'
import { TimerContext } from '../contexts/timer';
import PlayIcon from './icons/playIcon'
import PauseIcon from './icons/pauseIcon';
import { IS_DEV } from '../utils/config';

function Timer () {
    const context = useContext(TimerContext);

    if (!context) {
        throw new Error("useTimer must be used within a TimerProvider");
    }

    const { isPaused, setIsPaused, timerState, timerClasses, initialTimes } = context;
    const {minutes, seconds} = useTimer(
        IS_DEV ? 0 : initialTimes[timerState].minutes, 
        IS_DEV ? 5 : initialTimes[timerState].seconds
    );



    return ( 
        <section className={`${timerClasses[timerState]} mx-60`}>
            <p className="text-8xl font-bold text-zinc-800">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>

            <button onClick={() => setIsPaused(!isPaused)} className="bg-zinc-800 text-white p-2 rounded mt-4">
                <div className='flex flex-row justify-between p-2'>
                {isPaused ? (
                    <>
                    <PlayIcon className={timerClasses.icons[timerState]} />
                    <p>Start</p>
                    </>
                ) : (
                    <>
                    <PauseIcon className={timerClasses.icons[timerState]} />
                    <p>Pause</p>
                    </>
                )}
                </div>
            </button>
        </section>
    )
}

export default Timer