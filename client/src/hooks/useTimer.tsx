import { useState, useEffect, useContext } from 'react';
import { TimerContext, TimerContextType } from '../contexts/timer';

function useTimer(initialMinutes: number, initialSeconds: number ) {
    const { isPaused, setIsPaused, timerState, setTimerState } = useContext(TimerContext) as TimerContextType;
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(initialSeconds);

    function setNextTimerState() {
        if (timerState === 'focus') {
            setTimerState('shortBreak');
        } else if (timerState === 'shortBreak') {
            setTimerState('longBreak');
        } else {
            setTimerState('focus');
        }

        setSeconds(initialSeconds);
        setMinutes(initialMinutes);
        setIsPaused(true);
    }

    useEffect(() => {
        if (isPaused) {
            return;
        }

        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    setNextTimerState();
                    clearInterval(interval);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [minutes, seconds, isPaused]);

    return { minutes, seconds, timerState };
}

export default useTimer;