import { useState, useEffect, useContext } from 'react';
import { TimerContext } from '../contexts/timer';

function useTimer(initialMinutes: number, initialSeconds: number  = 0) {
    const context = useContext(TimerContext);

    if (!context) {
        throw new Error("useTimer must be used within a TimerProvider");
    }

    const { isPaused, timerState, setTimerState } = context;
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