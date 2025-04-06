<script setup lang="ts">
import ChatFooter from '@/components/chat/ChatFooter.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import useMessagesStore from '@/stores/useMessagesStore';
import { type BreadcrumbItem } from '@/types';
import { Room } from '@/types/app';
import pr from '@/utils/pr';
import { Head } from '@inertiajs/vue3';
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';

const breadcrumbs: BreadcrumbItem[] = [];
const props = defineProps<{
    room: Room;
}>();
const { messages, page } = storeToRefs(useMessagesStore());
const { fetchMessages, resetMessages } = useMessagesStore();
onMounted(async () => {
    resetMessages();
    await fetchMessages(props.room);
});
</script>

<template>
    <Head :title="props.room.title" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="relative flex h-screen w-full flex-col">
            <!-- Page Container -->
            <div i class="h-screen w-full">
                <!-- Page Content -->
                <main id="page-content" class="w-full">
                    <div class="container mx-auto flex h-full flex-col space-y-6 overflow-y-auto px-4 py-24 lg:p-8 lg:pb-28 xl:max-w-7xl">
                        <!-- Messages Received -->
                        <div class="flex w-5/6 flex-col items-start gap-2 lg:w-2/3 xl:w-1/3">
                            <p class="text-sm font-medium text-slate-500">Sender's Name</p>
                            <div class="rounded-2xl rounded-br-none bg-gray-100 px-5 py-3">
                                <p class="font-semibold text-slate-600">Message Content</p>
                            </div>
                            <p class="text-xs font-medium text-slate-500">16:25 am</p>
                        </div>
                        <!-- END  Messages Received -->

                        <!-- Messages Sent -->
                        <div class="ms-auto flex w-5/6 flex-col items-end gap-2 lg:w-2/3 xl:w-1/3">
                            <div class="rounded-2xl rounded-tl-none bg-indigo-600 px-5 py-3">
                                <p class="font-semibold text-white">Message Content</p>
                            </div>
                            <p class="text-right text-xs font-medium text-slate-500">16:25 am</p>
                        </div>
                        <!-- END Messages Sent -->
                    </div>
                </main>
                <!-- END Page Content -->

                <ChatFooter v-on:valid="(message) => pr(message, 'Message recieved in Show.vue')" />
            </div>
            <!-- END Page Container -->
        </div>
    </AppLayout>
</template>
