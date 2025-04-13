<script setup lang="ts">
import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import useRoomsIndex from '@/composables/useRoomsIndex';
import { User, type NavItem } from '@/types';
import { Link } from '@inertiajs/vue3';
import { computed, onMounted } from 'vue';
import AppLogo from './AppLogo.vue';
const { rooms, execute, loading } = useRoomsIndex();
onMounted(() => {
    if (rooms?.value?.length && rooms?.value?.length > 0) return;
    execute();
});
const mainNavItems = computed<(NavItem<User> & { roomId: number })[]>(() => [
    // {
    //     title: 'Dashboard',
    //     href: '/dashboard',
    //     icon: LayoutGrid,
    // },
    ...(rooms.value?.map((room) => {
        return {
            title: room.title,
            href: route('rooms.show', room.slug),
            subItems: room.users,
            roomId: room.id,
            // icon: LayoutGrid,
        };
    }) || []),
]);

const footerNavItems: NavItem<null>[] = [
    // {
    //     title: 'Github Repo',
    //     href: 'https://github.com/laravel/vue-starter-kit',
    //     icon: Folder,
    // },
    // {
    //     title: 'Documentation',
    //     href: 'https://laravel.com/docs/starter-kits',
    //     icon: BookOpen,
    // },
];
</script>

<template>
    <Sidebar collapsible="offcanvas" variant="sidebar">
        <SidebarHeader>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton size="lg" as-child>
                        <Link :href="route('dashboard')">
                            <AppLogo />
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
            <div v-if="loading">
                <ul>
                    <li v-for="i in 10" :key="i">
                        <div class="mx-4 my-3 flex animate-pulse">
                            <div class="shrink-0">
                                <span class="block size-5 rounded-full bg-gray-200 dark:bg-neutral-700"></span>
                            </div>
                            <div class="ms-4 mt-2 w-full">
                                <li class="h-4 w-full rounded-full bg-gray-200 dark:bg-neutral-700"></li>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <NavMain v-else :items="mainNavItems" />
        </SidebarContent>

        <SidebarFooter>
            <NavFooter :items="footerNavItems" />
            <NavUser />
        </SidebarFooter>
    </Sidebar>
    <slot />
</template>
