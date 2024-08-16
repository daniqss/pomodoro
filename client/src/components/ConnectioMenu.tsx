import { useContext, useState } from "react";
import { TimerContext, TimerContextType } from "../contexts/timer";
import { WsContext, WsContextType } from "../contexts/ws";

type ConnectionFormProps = {
    buttonText: string;
    placeholder: string;
    onClick: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function ConnectionForm({ buttonText, placeholder, onClick, onChange }: ConnectionFormProps) {
    const { timerState, timerClasses } = useContext(TimerContext) as TimerContextType;

    return (
        <form className={`${timerClasses.lightBg[timerState]} rounded flex flex-col mt-5`}>
            <button
                className="bg-white rounded-lg text-zinc-950 p-2 shadow-lg min-h-4 m-auto mt-5"
                onClick={(e) => {
                    e.preventDefault();
                    onClick();
                }}
            >   
                {buttonText}
            </button>
            <input 
                type="text"
                name="roomName"
                id="roomName"
                onChange={onChange}
                placeholder={placeholder}
                className="p-2 shadow-lg bg-white rounded-lg min-h-4 md:m-5 m-2"
            />
        </form>
    )
}

function ConnectionMenu() {
    const { socket, setRoom } = useContext(WsContext) as WsContextType;

    const [createRoomValue, setCreateRoomValue] = useState('');
    const [joinRoomValue, setJoinRoomValue] = useState('');

    return (
        <section className='flex lg:flex-row flex-col justify-between items-center mx-60 mt-12 text-gray-800 text-center rounded'>
            <ConnectionForm
                buttonText="Create Room"
                placeholder="Room Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCreateRoomValue(e.target.value)}
                onClick={() => {
                    console.log(`Creating room ${createRoomValue}`);
                    socket.emit('create-room');
                    socket.on('room-created', (room: string) => {
                        console.log(`Room created: ${room}`);
                        setRoom(room);
                    });
                }}
            />
            <ConnectionForm
                buttonText="Join Room"
                placeholder="Room Code"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setJoinRoomValue(e.target.value)}
                onClick={() => {
                    console.log(`Joining room ${joinRoomValue}`);
                    socket.emit('join-room', joinRoomValue);
                    socket.on('room-joined', (room: string) => {
                        console.log(`Room joined: ${room}`);
                        setRoom(room);
                    });
                }}
            />
        </section>
    )
}

export default ConnectionMenu;
