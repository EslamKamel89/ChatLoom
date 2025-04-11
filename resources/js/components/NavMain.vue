<script setup lang="ts">
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { User, type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/vue3';

const props = defineProps<{
    items: NavItem<User>[];
}>();

const page = usePage<SharedData>();
const isActive = (item: NavItem<User>): boolean => {
    return item.href.includes(page.url);
};
</script>

<template>
    <SidebarGroup class="px-2 py-0">
        <SidebarGroupLabel>Platform</SidebarGroupLabel>
        <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton as-child :is-active="isActive(item)" :tooltip="item.title">
                    <Link :href="item.href">
                        <component :is="item.icon" />
                        <span>{{ item.title }}</span>
                    </Link>
                    <div class="ml-4" v-if="item.subItems && isActive(item)">
                        <div v-for="user in item.subItems" :key="user.id">
                            <div class="mb-2 rounded-lg border px-2 py-1 text-xs font-thin">
                                <div>{{ user.name }}</div>
                                <div>{{ user.email }}</div>
                            </div>
                        </div>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarGroup>
</template>
