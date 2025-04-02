<script setup lang="ts">
import AppLayout from '@/layouts/AppLayout.vue';
import { type BreadcrumbItem } from '@/types';
import { Room } from '@/types/app';
import { Head } from '@inertiajs/vue3';

const breadcrumbs: BreadcrumbItem[] = [];
defineProps<{
    room: Room;
}>();
</script>

<template>
    <Head title="Show" />

    <AppLayout :breadcrumbs="breadcrumbs">
        <div>{{ room.title }}</div>
    </AppLayout>
</template>
