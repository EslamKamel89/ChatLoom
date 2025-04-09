<script setup lang="ts">
import useMessagesStore from '@/stores/useMessagesStore';
import { ref } from 'vue';
import { useSidebar } from '../ui/sidebar';

const message = ref('');
const shift = ref(false);
const { open } = useSidebar();
const { storeMessage } = useMessagesStore();
const handleEnter = async () => {
    if (message.value.trim() == '') return;
    if (shift.value) {
        message.value = `${message.value}\n`;
        return;
    }
    await storeMessage(message.value);
    message.value = '';
    window.scrollTo(0, document.body.scrollHeight);
};
</script>
<template>
    <!-- Page Footer -->
    <footer class="fixed bottom-0 w-full border-t border-slate-200/75">
        <div
            class="container mx-auto mb-2 flex flex-col px-4 xl:max-w-7xl"
            :class="{
                '!mx-4 !max-w-[500px]': open,
            }"
        >
            <textarea
                type="text"
                v-model="message"
                v-on:keydown.enter.prevent="handleEnter"
                v-on:keydown.shift.prevent.exact="shift = true"
                v-on:keyup="shift = false"
                class="-mx-5 block w-full rounded-lg border-0 px-5 py-4 leading-6 focus:border-indigo-500 focus:ring focus:ring-indigo-500/75"
                placeholder="Type a new message and hit enter.."
            ></textarea>
        </div>
    </footer>
    <!-- END Page Footer -->
</template>
