import {useState, useEffect} from 'react';
import {TimerState} from '../types/TimerState';

function useTimer(initialMinutes: number, isPaused: boolean) {
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(0);
    const [timerState, setTimerState] = useState<TimerState>('focus')

    function setNextTimerState() {
        if (timerState === 'focus') {
            setTimerState('shortBreak');
        } else if (timerState === 'shortBreak') {
            setTimerState('longBreak');
        } else {
            setTimerState('focus');
        }

        setSeconds(0);
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
                    setNextTimerState()
                    clearInterval(interval);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [minutes, seconds, isPaused]);

    return {minutes, seconds, timerState};
}

export default useTimer;