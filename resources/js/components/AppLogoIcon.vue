<script setup lang="ts">
import { MessagesSquareIcon } from 'lucide-vue-next';
import type { HTMLAttributes } from 'vue';

defineOptions({
    inheritAttrs: false,
});

interface Props {
    className?: HTMLAttributes['class'];
}

defineProps<Props>();
</script>

<template>
    <MessagesSquareIcon :size="34" class="p-1" />
</template>
