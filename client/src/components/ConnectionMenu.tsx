import { useContext, useState } from "react";
import { WsContext, WsContextType } from "../contexts/ws";

type ConnectionMenuProps = {
    setIsConnected: React.Dispatch<React.SetStateAction<boolean>>;
};

function ConnectionMenu({setIsConnected}: ConnectionMenuProps) {
    const { socket, setRoom } = useContext(WsContext) as WsContextType;
    const [joinValue, setJoinValue] = useState('');

    return (
        <section className='flex flex-col justify-between items-center mx-60 mt-12 text-gray-800 text-center rounded'>
            <h3 className="text-white text-lg">
                Join your friends' room
            </h3>
            <form className='rounded flex flex-row'>
                <button
                    className="bg-white rounded-lg text-zinc-950 p-2 shadow-lg min-h-4 m-auto mt-5"
                    onClick={(e) => {
                        e.preventDefault();
                        console.log(`Joining room ${joinValue}`);
                        socket.emit('join-room', joinValue);
                        socket.on('room-joined', (room: string) => {
                            console.log(`Room joined: ${room}`);
                            setRoom(room);
                        });
                        setIsConnected(true);
                    }}
                >   
                    Join Room
                </button>
                <input 
                    type="text"
                    name="roomName"
                    id="roomName"
                    onChange={(e) => {
                        e.preventDefault();
                        setJoinValue(e.target.value);
                    }}
                    placeholder="Room's code"
                    className="p-2 shadow-lg bg-white rounded-lg min-h-4 md:m-5 m-2"
                />
            </form>
            <h3 className="text-white text-lg">
                Or
            </h3>
            <button
                className="bg-white rounded-lg text-zinc-950 p-2 shadow-lg min-h-4 m-auto mt-5"
                onClick={() => {
                    console.log('Creating room');
                    socket.emit('create-room');
                    socket.on('room-created', (room: string) => {
                        console.log(`Room created: ${room}`);
                        setRoom(room);
                    });
                    setIsConnected(true);
                }}
            >
                Create Room
            </button>
        </section>
    )
}

export default ConnectionMenu;
