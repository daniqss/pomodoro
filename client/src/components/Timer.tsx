import { useContext, useEffect, useState } from "react";
import useTimer from "../hooks/useTimer";
import { TimerContext, TimerContextType } from "../contexts/timer";
import PlayIcon from "./icons/playIcon";
import PauseIcon from "./icons/pauseIcon";
import { IS_DEV } from "../utils/config";
import { WsContext, WsContextType } from "../contexts/ws";
import { updatedTimerMessage } from "../../../types/messages";

function Timer() {
  const { isPaused, setIsPaused, timerState, timerClasses, initialTimes } =
    useContext(TimerContext) as TimerContextType;
  const { socket, room } = useContext(WsContext) as WsContextType;
  const { minutes, seconds, setMinutes, setSeconds, setTimerState } = useTimer(
    IS_DEV ? 0 : initialTimes[timerState].minutes,
    IS_DEV ? 20 : initialTimes[timerState].seconds,
  );

  const [lastEmittedTime, setLastEmittedTime] = useState(0);

  useEffect(() => {
    socket.on(
      "timer-updated",
      ({
        isPaused,
        newMinutes,
        newSeconds,
        timerState,
      }: updatedTimerMessage) => {
        // Convertir tiempos a segundos para comparar
        const currentClientTimeInSeconds = minutes * 60 + seconds;
        const newTimeInSeconds = newMinutes * 60 + newSeconds;

        // Si el tiempo actual del cliente es mayor que el nuevo tiempo recibido
        if (currentClientTimeInSeconds < newTimeInSeconds) {
          // Emitir el tiempo actual del cliente solo si es mayor que el último tiempo emitido
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
          // Actualizar el estado del cliente con el tiempo nuevo recibido
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
  }, [socket, minutes, seconds, lastEmittedTime]);

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
      <p className="text-8xl font-bold text-zinc-800">
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
    </section>
  );
}

export default Timer;
