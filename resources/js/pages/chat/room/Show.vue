<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Room } from '@/types/app';
import { Head } from '@inertiajs/vue3';

const breadcrumbs: BreadcrumbItem[] = [];
const props = defineProps<{
    room: Room;
}>();
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

                <!-- Page Footer -->
                <footer class="fixed bottom-0 mb-3 w-full items-center border-t border-slate-200/75 bg-white px-3 lg:w-[75%]">
                    <form class="container mx-auto flex h-20 items-center gap-2 px-4" onsubmit="return false;">
                        <textarea
                            type="text"
                            class="-mx-5 block w-full rounded-lg border-0 px-5 py-4 leading-6 focus:border-indigo-500 focus:ring focus:ring-indigo-500/75"
                            placeholder="Type a new message and hit enter.."
                        ></textarea>
                    </form>
                </footer>
                <!-- END Page Footer -->
            </div>
            <!-- END Page Container -->
        </div>
    </AppLayout>
</template>
