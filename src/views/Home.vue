<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Cabecera from '@/components/Cabecera.vue'
import MenuP from '@/components/MenuP.vue'

const router = useRouter()
const userStore = useUserStore()
const user = computed(() => ({
    email: userStore.email,
    username: userStore.username,
}))

const collapsed = ref(false)
const toggleSidebar = () => {
    collapsed.value = !collapsed.value
}
</script>npm run dev

<template>
    <div class="home-container"
        :style="{ gridTemplateColumns: collapsed ? '78px 1fr' : '240px 1fr' }">
        <div class="losmenus">
            <MenuP :collapsed="collapsed" @toggle-sidebar="toggleSidebar" />
        </div>
        <div class="cabecera">
            <Cabecera :user="user" />
        </div>
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<style scoped>
.home-container {
    display: grid;
    grid-template-rows: auto 1fr;
    grid-template-columns: 240px 1fr;
    grid-template-areas:
        "menu cabecera"
        "menu content";
    height: 100vh;
    overflow: hidden;
    transition: grid-template-columns 0.25s ease;
}
.losmenus {
    grid-area: menu;
}
.cabecera {
    grid-area: cabecera;
}
.content {
    grid-area: content;
    overflow-y: auto;
    /*height: 100vh;*/
    border-left: 1px solid var(--color1);
    /*padding: 1rem;*/
}
</style>

