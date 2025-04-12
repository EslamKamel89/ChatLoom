<script setup lang="ts">
import ChatFooter from '@/components/chat/ChatFooter.vue';
import Spinner from '@/components/common/Spinner.vue';
import useIntersection from '@/composables/useIntersection';
import AppLayout from '@/layouts/AppLayout.vue';
import useMessagesStore from '@/stores/useMessagesStore';
import { type BreadcrumbItem } from '@/types';
import { Room } from '@/types/app';
import useAuth from '@/types/useAuth';
import { Head, usePage } from '@inertiajs/vue3';
import { onMounted, onUnmounted, ref, watch } from 'vue';

const breadcrumbs: BreadcrumbItem[] = [];
const props = defineProps<{
    room: Room;
}>();
const messageStore = useMessagesStore();
const page = usePage();
const user = useAuth();

const { target, targetIsVisible } = useIntersection();
const listContainer = ref<HTMLElement | null>(null);
watch(targetIsVisible, async () => {
    if (targetIsVisible.value) {
        await messageStore.fetchMessages(props.room);
        window.scrollTo(0, 1200);
    }
});

onMounted(async () => {
    messageStore.resetMessages();
    await messageStore.fetchMessages(props.room);
    window.scrollTo(0, document.body.scrollHeight);
    messageStore.joinChannel(props.room);
});
onUnmounted(() => {
    messageStore.resetMessages();
});
</script>

<template>
    <Head :title="props.room.title" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div class="relative flex h-screen w-full flex-col" ref="listContainer">
            <!-- Page Container -->
            <div i class="h-screen w-full">
                <!-- Page Content -->
                <main id="page-content" class="w-full">
                    <div
                        class="container mx-auto flex h-full flex-col-reverse space-y-6 space-y-reverse overflow-y-auto px-4 py-24 lg:p-8 lg:pb-28 xl:max-w-7xl"
                    >
                        <!-- Messages Received -->

                        <div
                            v-for="message in messageStore.messages"
                            :key="message.id"
                            class="flex w-5/6 flex-col gap-2 lg:w-2/3 xl:w-1/3"
                            :class="{
                                'me-auto items-start': user.id != message.user_id,
                                'ms-auto items-end': user.id == message.user_id,
                            }"
                        >
                            <p class="text-sm font-medium text-slate-500" v-if="user.id != message.user_id">{{ message.user.name }}</p>
                            <div
                                class="rounded-2xl rounded-br-none px-5 py-3"
                                :class="{
                                    'bg-indigo-600': user.id == message.user_id,
                                    'bg-gray-100': user.id != message.user_id,
                                }"
                            >
                                <p
                                    class="font-semibold"
                                    :class="{
                                        'text-white': user.id == message.user_id,
                                        'text-slate-600': user.id != message.user_id,
                                    }"
                                >
                                    {{ message.content }}
                                </p>
                            </div>
                            <p class="text-xs font-medium text-slate-500">{{ message.created_at.friendly }}</p>
                        </div>
                        <div v-if="messageStore.loading" class="flex w-full items-center justify-center">
                            <Spinner />
                        </div>
                        <!-- END  Messages Received -->
                        <div v-if="messageStore.messages.length">
                            <div class="h-8 w-3 translate-y-20" ref="target"></div>
                        </div>
                        <!-- Messages Sent -->
                        <!--
                     <div class="flex flex-col items-end w-5/6 gap-2 ms-auto lg:w-2/3 xl:w-1/3">
                            <div class="px-5 py-3 bg-indigo-600 rounded-tl-none rounded-2xl">
                                <p class="font-semibold text-white">Message Content</p>
                            </div>
                            <p class="text-xs font-medium text-right text-slate-500">16:25 am</p>
                        </div>
                    -->
                        <!-- END Messages Sent -->
                    </div>
                </main>
                <!-- END Page Content -->

                <ChatFooter />
            </div>
            <!-- END Page Container -->
        </div>
    </AppLayout>
</template>
