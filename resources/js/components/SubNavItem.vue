<script setup lang="ts">
import useRoomsStatusStore from '@/stores/useRoomsStatusStore';
import { User } from '@/types';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const props = defineProps<{
    user: User;
    roomId: number;
}>();
// onMounted(() => {
//     pr(props.user, 'user in SubNavItem');
//     pr(props.roomId, 'roomID in SubNavItem');
// });
const { roomsStatus } = storeToRefs(useRoomsStatusStore());
const active = computed(() => {
    for (const room of roomsStatus.value) {
        if (room.roomId == props.roomId) {
            for (const user of room.users) {
                if (user.id == props.user.id) {
                    return user.active;
                }
            }
        }
    }
    return false;
});
</script>
<template>
    <div class="mb-2 rounded-lg border px-2 py-1 text-xs font-thin">
        <div class="flex items-center space-x-2">
            <div
                class="h-3 w-3 rounded-full"
                :class="{
                    'bg-red-500': !active,
                    'bg-green-500': active,
                }"
            ></div>
            <div>{{ user.name }}</div>
        </div>
        <div>{{ user.email }}</div>
    </div>
</template>
