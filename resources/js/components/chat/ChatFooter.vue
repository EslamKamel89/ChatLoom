<script setup lang="ts">
import { ref } from 'vue';

const message = ref('');
const handleEnter = () => {
    emit('valid', message.value);
};
const emit = defineEmits<{
    valid: [message: string];
}>();
</script>
<template>
    <!-- Page Footer -->
    <footer class="fixed bottom-0 mb-3 w-full items-center border-t border-slate-200/75 bg-white px-3 lg:w-[75%]">
        <div class="container mx-auto flex h-20 items-center gap-2 px-4">
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
