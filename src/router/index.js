import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

const routes = [
    { path: '/login', name: 'login', component: Login },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true },
        redirect: { name: 'informacs' },
        children: [
            { path: 'informacs',   name: 'informacs',   component: () => import('../views/Informacs.vue') },
            { path: 'ventas',      name: 'ventas',      component: () => import('../views/Ventas.vue') },
            { path: 'clientes',    name: 'clientes',    component: () => import('../views/Clientes.vue') },
            { path: 'productos',   name: 'productos',   component: () => import('../views/Productos.vue') },
            { path: 'configuracs', name: 'configuracs', component: () => import('../views/Configuracs.vue') },
            { path: 'reportes',    name: 'reportes',    component: () => import('../views/Reportes.vue') },
        ],
    },
    { path: '/:catchAll(.*)', redirect: '/login' },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

// Guardia de navegación para proteger el Home
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true'
    if (to.meta.requiresAuth && !isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

export default router
