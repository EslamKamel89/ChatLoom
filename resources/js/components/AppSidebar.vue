<script setup lang="ts">
import NavFooter from '@/components/NavFooter.vue';
import NavMain from '@/components/NavMain.vue';
import NavUser from '@/components/NavUser.vue';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import useRoomsIndex from '@/composables/useRoomsIndex';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/vue3';
import { LayoutGrid } from 'lucide-vue-next';
import { computed, onMounted } from 'vue';
import AppLogo from './AppLogo.vue';
const { rooms, execute, loading } = useRoomsIndex();
onMounted(() => {
    if (rooms?.value?.length && rooms?.value?.length > 0) return;
    execute();
});
const mainNavItems = computed(() => [
    // {
    //     title: 'Dashboard',
    //     href: '/dashboard',
    //     icon: LayoutGrid,
    // },
    ...(rooms.value?.map((room) => {
        return {
            title: room.title,
            href: route('rooms.show', room.slug),
            icon: LayoutGrid,
        };
    }) || []),
]);

const footerNavItems: NavItem[] = [
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
    <Sidebar collapsible="icon" variant="floating">
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
                <!--
             <ul>
                    <li v-for="i in 10" :key="i">
                        <Skeleton class="h-4 w-52" />
                    </li>
                </ul>
            -->
                <div class="mt-10 flex h-full w-full items-center justify-center">
                    <div class="text-center text-lg font-bold uppercase">Loading</div>
                </div>
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
