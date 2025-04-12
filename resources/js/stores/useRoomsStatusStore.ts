import { defineStore } from 'pinia';
import { reactive } from 'vue';

type RoomStatusType = {
    roomId: number;
    users: { id: number; active: boolean }[];
};

export default defineStore('roomsStatus', () => {
    const roomsStatus = reactive<RoomStatusType[]>([]);
    const syncRoomStatus = (roomStatus: RoomStatusType) => {
        const index: number | undefined = roomsStatus.findIndex((onlineUser) => onlineUser.roomId == roomStatus.roomId);
        if (index) {
            roomsStatus[index] = roomStatus;
        } else {
            roomsStatus.push(roomStatus);
        }
    };
    const changeRoomStatus = (roomId: number, userId: number, activeStatus: boolean) => {
        const index: number | undefined = roomsStatus.findIndex((onlineUser) => onlineUser.roomId == roomId);
        if (index) {
            const userIndex = roomsStatus[index].users.findIndex((user) => user.id == userId);
            if (userIndex) {
                roomsStatus[index].users[userIndex].active = activeStatus;
            } else {
                roomsStatus[index].users.push({ id: userId, active: activeStatus });
            }
        } else {
            roomsStatus.push({ roomId, users: [{ id: userId, active: activeStatus }] });
        }
    };
    return {
        roomsStatus,
        changeRoomStatus,
        syncRoomStatus,
    };
});
