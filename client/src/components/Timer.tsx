import { useContext, useEffect } from "react";
import useTimer from "../hooks/useTimer";
import { TimerContext, TimerContextType } from "../contexts/timer";
import PlayIcon from "./icons/playIcon";
import PauseIcon from "./icons/pauseIcon";
import { WsContext, WsContextType } from "../contexts/ws";
import { getTimerMessage, updatedTimerMessage } from "../../../types/messages";

function Timer() {
  const { isPaused, setIsPaused, timerState, timerClasses, focusStrikes } =
    useContext(TimerContext) as TimerContextType;
  const { socket, room } = useContext(WsContext) as WsContextType;
  const { minutes, seconds, setMinutes, setSeconds, setTimerState } =
    useTimer();

  // Listen for timer-updated events from the server
  useEffect(() => {
    const handleTimerUpdate = ({
      isPaused: newIsPaused,
      newMinutes,
      newSeconds,
      timerState: newTimerState,
    }: updatedTimerMessage) => {
      // update timer state
      setIsPaused(newIsPaused);
      setMinutes(newMinutes);
      setSeconds(newSeconds);
      setTimerState(newTimerState);
    };

    socket.on("timer-updated", handleTimerUpdate);

    return () => {
      socket.off("timer-updated", handleTimerUpdate);
    };
  }, [socket, setIsPaused, setMinutes, setSeconds, setTimerState]);

  // Handle new users joining and requesting timer state
  useEffect(() => {
    const handleGetTimer = (receiver: getTimerMessage) => {
      // pause when new user joins
      setIsPaused(true);

      const roomCurrentState: updatedTimerMessage = {
        room: receiver,
        isPaused: true,
        newMinutes: minutes,
        newSeconds: seconds,
        timerState: timerState,
      };

      // send current timer state to new user
      socket.emit("timer-updated", roomCurrentState);
    };

    socket.on("get-timer", handleGetTimer);

    return () => {
      socket.off("get-timer", handleGetTimer);
    };
  }, [socket, minutes, seconds, timerState, setIsPaused]);

  // update timer and send to server
  const handleTimerToggle = () => {
    const newPausedState = !isPaused;
    setIsPaused(newPausedState);

    const timerUpdate: updatedTimerMessage = {
      room: room as string,
      isPaused: newPausedState,
      newMinutes: minutes,
      newSeconds: seconds,
      timerState: timerState,
    };

    console.log("Emitting timer update:", timerUpdate);
    socket.emit("timer-updated", timerUpdate);
  };

  return (
    <section
      className={`${timerClasses.lightBg[timerState]} text-gray-800 p-4 text-center rounded-lg shadow-lg overflow-hidden`}
    >
      <h2
        className={`text-2xl font-bold ${timerClasses.darkBg[timerState]} mb-6 inline-block px-2 py-1 rounded shadow-md`}
      >
        {timerState === "focus"
          ? "Focus"
          : timerState === "shortBreak"
            ? "Short Break"
            : "Long Break"}
      </h2>

      <p className="text-6xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-zinc-800 font-mono">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </p>

      <button
        onClick={handleTimerToggle}
        className="bg-zinc-800 text-white p-2 rounded mt-4 shadow-lg hover:shadow-none"
      >
        <div className="flex flex-row justify-between p-2">
          {isPaused ? (
            <>
              <PlayIcon
                className={`${timerClasses.darkFill[timerState]} w-6 h-6 mr-1`}
              />
              <p className="font-bold">Start</p>
            </>
          ) : (
            <>
              <PauseIcon
                className={`${timerClasses.darkFill[timerState]} w-6 h-6 mr-1`}
              />
              <p className="font-bold">Pause</p>
            </>
          )}
        </div>
      </button>
      <p className="mt-3 font-semibold font-mono">{`#${focusStrikes}`}</p>
    </section>
  );
}

export default Timer;
