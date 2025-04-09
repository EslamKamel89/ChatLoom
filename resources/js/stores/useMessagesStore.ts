import { useAxios } from '@/composables/useAxios';
import { Message, Pagination, Room } from '@/types/app';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('messages', () => {
    const page = ref(0);
    const room = ref<Room | null>(null);
    const messages = ref<Message[]>([]);
    const hasNextPage = ref(true);
    const { data, error, loading, execute } = useAxios<Pagination<Message>>({
        baseURL: route('messages.index'),
    });
    const resetMessages = () => {
        messages.value = [];
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
    };
});
