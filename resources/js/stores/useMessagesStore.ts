import { useAxios } from '@/composables/useAxios';
import echo from '@/echo';
import useRoomStatusStore from '@/stores/useRoomsStatusStore';
import { Message, Pagination, Room } from '@/types/app';
import useAuth from '@/types/useAuth';
import pr from '@/utils/pr';
import { defineStore } from 'pinia';
import { nextTick, ref } from 'vue';
// import {PusherPresenceChannel} from 'laravel-echo';
export default defineStore('messages', () => {
    const page = ref(0);
    const room = ref<Room | null>(null);
    const messages = ref<Message[]>([]);
    const hasNextPage = ref(true);
    const roomStatus = useRoomStatusStore();
    const { data, error, loading, execute } = useAxios<Pagination<Message>>({
        baseURL: route('messages.index'),
    });
    const resetMessages = () => {
        messages.value = [];
        page.value = 0;
        hasNextPage.value = true;
    };
    const fetchMessages = async (choosenRoom: Room) => {
        if (!hasNextPage.value) return;
        room.value = choosenRoom;
        await execute({ params: { room: room.value.slug, page: page.value + 1 } });
        if (!error.value) {
            messages.value = [...messages.value, ...(data.value?.data ?? [])];
            page.value = data.value?.meta?.current_page ?? page.value;
            if (page.value == data.value?.meta?.last_page) {
                hasNextPage.value = false;
            }
        }
    };
    const storeMessage = async (content: string) => {
        const { data, execute } = useAxios<Message>({
            baseURL: route('messages.store'),
            method: 'POST',
            data: {
                slug: room.value?.slug,
                content,
            },
        });
        await execute();
        if (data.value) messages.value = [data.value, ...messages.value];
        messages.value.pop();
    };
    const addMessageFromWebSocket = (message: Message) => {
        const user = useAuth();

        if (user.value.id == message.user_id || message.room_id != room.value?.id) return;
        messages.value = [message, ...messages.value];
        messages.value.pop();
    };
    const joinChannel = (room: Room) => {
        const channel = echo.join(`room.${room.id}`);
        channel
            .listen('MessageCreatedEvent', async (message: Message) => {
                addMessageFromWebSocket(message);
                await nextTick();
                window.scrollTo(0, document.body.scrollHeight);
            })

            .here((users: { id: number; name: string }[]) => {
                pr(users, `here callback room.${room.id}`);
                roomStatus.syncRoomStatus({
                    roomId: room.id,
                    users: users.map((u) => ({ id: u.id, active: true })),
                });
            })
            .joining((user: { id: number; name: string }) => {
                pr(user, `joining callback room.${room.id}`);
                roomStatus.changeRoomStatus(room.id, user.id, true);
            })
            .leaving((user: { id: number; name: string }) => {
                pr(user, `leaving callback room.${room.id}`);
                roomStatus.changeRoomStatus(room.id, user.id, false);
            })
            .error((error: unknown) => {
                pr(error, `error callback room.${room.id}`);
            });
    };

    return {
        page,
        messages,
        room,
        error,
        loading,
        fetchMessages,
        resetMessages,
        hasNextPage,
        storeMessage,
        addMessageFromWebSocket,
        joinChannel,
    };
});
