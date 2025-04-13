import pr from '@/utils/pr';
import { defineStore } from 'pinia';
import { reactive } from 'vue';

type RoomStatusType = {
    roomId: number;
    users: { id: number; active: boolean }[];
};

export default defineStore('roomsStatus', () => {
    const roomsStatus = reactive<RoomStatusType[]>([]);
    const syncRoomStatus = (roomStatus: RoomStatusType) => {
        const index: number = roomsStatus.findIndex((onlineUser) => onlineUser.roomId == roomStatus.roomId);
        // pr(roomStatus, 'roomStatus store - syncRoomStatus');
        // pr(index, 'roomStatus store - syncRoomStatus');
        if (index != -1) {
            roomsStatus[index] = roomStatus;
        } else {
            roomsStatus.push(roomStatus);
        }
    };
    const changeRoomStatus = (roomId: number, userId: number, activeStatus: boolean) => {
        const index: number = roomsStatus.findIndex((onlineUser) => onlineUser.roomId == roomId);
        pr(index, 'changeRoomStatus - index');
        if (index != -1) {
            const userIndex = roomsStatus[index].users.findIndex((user) => user.id == userId);
            if (userIndex != -1) {
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
