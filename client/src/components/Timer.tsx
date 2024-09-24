import { useContext, useEffect, useState } from "react";
import useTimer from "../hooks/useTimer";
import { TimerContext, TimerContextType } from "../contexts/timer";
import PlayIcon from "./icons/playIcon";
import PauseIcon from "./icons/pauseIcon";
import { WsContext, WsContextType } from "../contexts/ws";
import { getTimerMessage, updatedTimer } from "../../../types/messages";

function Timer() {
  const { isPaused, setIsPaused, timerState, timerClasses, focusStrikes } =
    useContext(TimerContext) as TimerContextType;
  const { socket, room } = useContext(WsContext) as WsContextType;
  const { minutes, seconds, setMinutes, setSeconds, setTimerState } =
    useTimer();

  const [lastEmittedTime, setLastEmittedTime] = useState(0);

  // Listen for timer-updated events from the server
  useEffect(() => {
    socket.on(
      "timer-updated",
      ({ isPaused, newMinutes, newSeconds, timerState }: updatedTimer) => {
        const currentClientTimeInSeconds = minutes * 60 + seconds;
        const newTimeInSeconds = newMinutes * 60 + newSeconds;

        // Update client if the new time is greater than the current client time
        if (currentClientTimeInSeconds < newTimeInSeconds) {
          // Update other users in room if the new time is greater than the last emitted time
          if (currentClientTimeInSeconds > lastEmittedTime) {
            socket.emit("timer-updated", {
              isPaused: isPaused,
              newMinutes: minutes,
              newSeconds: seconds,
              timerState: timerState,
            });
            setLastEmittedTime(currentClientTimeInSeconds);
          }
        } else {
          // Update client if the new time is greater than the current client time
          setIsPaused(isPaused);
          setMinutes(newMinutes);
          setSeconds(newSeconds);
          setTimerState(timerState);
        }
      },
    );

    // Cleanup function to remove the event listener when the component is unmounted or socket changes
    return () => {
      socket.off("timer-updated");
    };
  }, [
    socket,
    minutes,
    seconds,
    lastEmittedTime,
    setIsPaused,
    setMinutes,
    setSeconds,
    setTimerState,
  ]);

  // Send the current timer state to new users when they join
  useEffect(() => {
    const handleGetTimer = (receiver: getTimerMessage) => {
      // Pause the timer if is not paused when new user joins
      setIsPaused(isPaused ? isPaused : !isPaused);

      const roomCurrentState: updatedTimer = {
        room: receiver,
        isPaused: !isPaused,
        newMinutes: minutes,
        newSeconds: seconds,
        timerState: timerState,
      };

      // Send the current timer state to the new user
      socket.emit("timer-updated", roomCurrentState);
    };

    socket.on("get-timer", handleGetTimer);

    return () => {
      socket.off("get-timer", handleGetTimer);
    };
  }, [isPaused, minutes, seconds, setIsPaused, socket, timerState]);

  return (
    <section
      className={`${timerClasses.lightBg[timerState]} mx-60 text-gray-800 p-4 text-center rounded`}
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
      <p className="text-8xl font-bold text-zinc-800 font-mono">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </p>

      <button
        onClick={() => {
          setIsPaused(!isPaused);
          setMinutes(minutes);
          setSeconds(seconds);
          setTimerState(timerState);
          socket.emit("timer-updated", {
            room: room,
            isPaused: !isPaused,
            newMinutes: minutes,
            newSeconds: seconds,
            timerState: timerState,
          });
        }}
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
