import { useContext } from "react";
import { TimerContext, TimerContextType } from "../contexts/timer";

type ConnectionFormProps = {
    buttonText: string;
    placeholder: string;
    onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};

function ConnectionForm({ buttonText, placeholder, onClick }: ConnectionFormProps) {
    const { timerState, timerClasses } = useContext(TimerContext) as TimerContextType;

    return (
        <form className={`${timerClasses.lightBg[timerState]} rounded flex flex-col mt-5`}>
            <button
                className="bg-white rounded-lg text-zinc-950 p-2 shadow-lg min-h-4 m-auto mt-5"
                onClick={onClick}
            >
                {buttonText}
            </button>
            <input 
                type="text"
                name="roomName"
                id="roomName"
                placeholder={placeholder}
                className="p-2 shadow-lg bg-white rounded-lg min-h-4 md:m-5 m-2"
            />
        </form>
    )
}

function ConnectionMenu() {
    return (
        <section className='flex lg:flex-row flex-col justify-between items-center mx-60 mt-12 text-gray-800 text-center rounded'>
            <ConnectionForm
                buttonText="Create Room"
                placeholder="Room Name"
                onClick={e => e.preventDefault()}
            />
            <ConnectionForm
                buttonText="Join Room"
                placeholder="Room Code"
                onClick={e => e.preventDefault()}
            />
        </section>
    )
}

export default ConnectionMenu;
