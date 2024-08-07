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
        <section className={`bg${timerClasses.light[timerState]} mx-60 text-gray-800 p-4 text-center rounded`}>
            <h2 className={`text-2xl font-bold bg${timerClasses.dark[timerState]} mb-6 inline-block px-2 py-1 rounded shadow-md`}>
                {timerState.charAt(0).toUpperCase() + timerState.slice(1)}
            </h2>
            <p className="text-8xl font-bold text-zinc-800">{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>

            <button 
                onClick={() => setIsPaused(!isPaused)} 
                className="bg-zinc-800 text-white p-2 rounded mt-4 shadow-lg hover:shadow-none"
            >
                <div className='flex flex-row justify-between p-2'>
                {isPaused ? (
                    <>
                    <PlayIcon 
                        className={`fill${timerClasses.dark[timerState]} w-6 h-6 mr-1`}
                    />
                    <p className="font-bold">Start</p>
                    </>
                ) : (
                    <>
                    <PauseIcon className={`fill${timerClasses.dark[timerState]} w-6 h-6 mr-1`} />
                    <p className="font-bold">Pause</p>
                    </>
                )}
                </div>
            </button>
        </section>
    )
}

export default Timer