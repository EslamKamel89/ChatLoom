<script setup lang="ts">
import { ref } from 'vue';
import { useSidebar } from '../ui/sidebar';

const message = ref('');
const handleEnter = () => {
    if (message.value.trim() == '') return;
    emit('valid', message.value);
    message.value = '';
};
const emit = defineEmits<{
    valid: [message: string];
}>();

const { open } = useSidebar();
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
                class="-mx-5 block w-full rounded-lg border-0 px-5 py-4 leading-6 focus:border-indigo-500 focus:ring focus:ring-indigo-500/75"
                placeholder="Type a new message and hit enter.."
            ></textarea>
        </div>
    </footer>
    <!-- END Page Footer -->
</template>
