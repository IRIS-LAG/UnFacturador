<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { defineProps, defineEmits } from 'vue'

const router = useRouter()
const userStore = useUserStore()
const sidebarVisible = ref(true)
const toggleSidebar = () => {
    sidebarVisible.value = !sidebarVisible.value
}
const logout = () => {
    localStorage.removeItem('isLoggedIn')
    userStore.logout()
    router.push('/login')
}
const props = defineProps({
    collapsed: Boolean
})
const emit = defineEmits(['toggle-sidebar'])

</script>

<template>
    <aside :class="['sidebar', { collapsed: !sidebarVisible }]">
        
        <div class="brand">
            <button class="menu-toggle" 
                @click="$emit('toggle-sidebar'); toggleSidebar()" 
                aria-label="Ocultar menú">☰</button>
            <div v-if="sidebarVisible">
                <strong>Facturador</strong>
                <span>Panel de gestión</span>
            </div>
        </div>

        <router-link to="/home/informacs" class="nav-link" :title="sidebarVisible ? '' : 'Inicio'">
            <span class="nav-icon"><i class="fa-solid fa-circle-info"></i></span>
            <span v-if="sidebarVisible">Inicio</span>
        </router-link>

        <router-link to="/home/ventas" class="nav-link" :title="sidebarVisible ? '' : 'Ventas'">
            <span class="nav-icon"><i class="fa-solid fa-cash-register"></i></span>
            <span v-if="sidebarVisible">Ventas</span>
        </router-link>
        <hr>
        <router-link to="/home/clientes" class="nav-link" :title="sidebarVisible ? '' : 'Clientes'">
            <span class="nav-icon"><i class="fa-solid fa-people-group"></i></span>
            <span v-if="sidebarVisible">Clientes</span>
        </router-link>
        <router-link to="/home/productos" class="nav-link" :title="sidebarVisible ? '' : 'Productos'">
            <span class="nav-icon"><i class="fa-solid fa-box-open"></i></span>
            <span v-if="sidebarVisible">Productos</span>
        </router-link>
        <hr>

        <router-link to="/home/reportes" class="nav-link" :title="sidebarVisible ? '' : 'Reportes'">
            <span class="nav-icon"><i class="fa-solid fa-file-pdf"></i></span>
            <span v-if="sidebarVisible">Reportes</span>
        </router-link>

        <div class="footer-actions">
            <hr v-if="sidebarVisible">

            <router-link to="/home/configuracs" class="nav-link confi" :title="sidebarVisible ? '' : 'Configuración'">
                <span class="nav-icon"><i class="fa-solid fa-gear"></i></span>
                <span v-if="sidebarVisible">Configuración</span>
            </router-link>
            
            <button class="nav-link logout" type="button" @click="logout" :title="sidebarVisible ? '' : 'Salir'">
                <span class="nav-icon"><i class="fa-solid fa-person-walking-arrow-right"></i></span>
                <span v-if="sidebarVisible">SALIR</span>
            </button>
        </div>
    </aside>
</template>

<style scoped>
.sidebar {
    width: 240px;
    background: linear-gradient(180deg,var(--color3) 0%, var(--color1) 60%);
    color: black;
    padding: 1rem 1rem;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    gap: 0.5rem;
    transition: width 0.2s ease;
}
.sidebar.collapsed {
    width: 78px;
    gap: 0.8rem;
}
.sidebar.collapsed .brand > div {
    display: none;
}
.brand {
    min-width: 0;
    display: flex;
    align-items: center;
    border-bottom: 2px solid var(--color3);
    gap: 0.8rem;
    margin-bottom: 0.8rem;
    padding: 0.4rem 0.5rem 0.9rem;
}
.brand > div {
    overflow: hidden;
    white-space: nowrap;
}
.menu-toggle {
    flex-shrink: 0;
    border: none;
    background: rgba(255,255,255,0.2);
    color: white;
    width: 42px;
    height: 42px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1.4rem;
}
.menu-toggle:hover {
    background: rgba(255,255,255,0.4);
    color: var(--color1);
}
.brand strong {
    font-size: 1.2rem;
    display: block;
}
.brand span {
    font-size: 0.9rem;
    color:white;
}
/*-----------------------------------------------------------*/
.nav-link {
    text-decoration: none;
    color: white;
    padding: 0.45rem 0.9rem;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition: all 0.2s ease;
    white-space: nowrap;
    font-size: 1.1rem;
}
.sidebar.collapsed .nav-link {
    justify-content: center;
    padding: 0.55rem 0.40rem;
}
.nav-link:hover {
    background: rgba(255,255,255,0.15);
    transform: translateX(2px);
    /*color: var(--color5);*/
    color: black;
}
.nav-link:hover .nav-icon {
    transform: scale(1.4);
    /*color: var(--color1);*/
}
.nav-link.router-link-active {
    background: rgba(255, 255, 255, 0.24);
    font-weight: 700;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.18);
    color: var(--color5);
}
.nav-link.router-link-active .nav-icon {
    transform: scale(1.4);
    color:var(--color5);
}
/*-----------------------------------------------------------*/
.footer-actions {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}
hr {
    border: none;
    height: 2px;
    background: rgba(255,255,255,0.2);
    margin: 0.5rem 0;
}
.logout {
    color: var(--color3);
    border: none;
    background: rgba(255,255,255,0.1);
    width: 100%;
    justify-content: center;
    cursor: pointer;
    padding: 0.95rem 0.9rem;
    margin-top: 0.5rem;
}
.confi.router-link-active {
    color: var(--color3);
}
.confi.router-link-active .nav-icon {
    color:var(--color3);
}
</style>
