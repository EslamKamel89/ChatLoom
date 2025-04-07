import type { User } from '@/types/index';
import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

export default function useAuth() {
    const user = computed(() => {
        return (usePage().props as any).auth.user as User;
    });
    return user;
}
