import { Message } from '@/types/app';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export default defineStore('messages', () => {
    const page = ref(1);
    const messages = ref<Message[]>([]);
    return {
        page,
        messages,
    };
});
