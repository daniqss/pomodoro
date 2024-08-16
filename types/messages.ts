export type createRoomMessage = {};
export type joinRoomMessage = string;
export type roomCreatedMessage = string;
export type roomJoinedMessage = {
    currentUsers: string[];
};

