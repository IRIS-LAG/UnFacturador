<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const form = reactive({
    email: '',
    username: '',
    password: '',
})

const showPassword = ref(false)
const message = ref('')
const messageType = ref('info')

const login = () => {
    //para entrada directa sin validacion de usuario y contraseña
    form.email= "carlitos205@gmail.com"
    form.username = "admin"
    form.password = "Gabc1234"
    //----------------------------------------------
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if (!form.email || !form.username || !form.password) {
        message.value = 'Por favor complete todos los campos'
        messageType.value = 'error'
        return
    }
    if (!emailRegex.test(form.email)) {
        message.value = 'Ingrese un correo electrónico válido'
        messageType.value = 'error'
        return
    }
    if (form.username === 'admin' && form.password === 'Gabc1234') {
        userStore.setUser({
            email: form.email,
            username: form.username,
        })
        localStorage.setItem('isLoggedIn', 'true')
        /*
        message.value = 'Acceso correcto. Redirigiendo...'
        messageType.value = 'success'
        setTimeout(() => router.push('/home'), 800)
        */
        router.push('/home')
        return
    }
    message.value = 'Usuario o contraseña incorrectos'
    messageType.value = 'error'
}
</script>

<template>
    <section class="login-page">
        
        <div class="bg-layer">
            <h3>Soluciones TAGLE</h3>
            <a href="https://solucstagle.com/" target="_blank">www.SolucsTagle.com</a>
            <hr>
            <h4 class="nombreApp">Sistema Facturador</h4>
            <h4 class="version">Versión 1.0 18.08.2026</h4>
        </div>
        
        <div class="login-card">
            <h1>Bienvenido</h1>
            <p>Ingrese sus datos para continuar</p>

            <form @submit.prevent="login">
                <label>Correo electrónico
                <input v-model="form.email" type="email" placeholder="Ingrese su correo electrónico" />
                </label>

                <label>Usuario
                <input v-model="form.username" type="text" placeholder="Ingrese su usuario" />
                </label>

                <!--<div class="password-field">-->

                <label for="password">Contraseña
                <input id="password" v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="Ingrese su contraseña" />
                </label>
                
                <button class="toggle-eye" type="button"
                    @click="showPassword = !showPassword"
                    :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'">
                    
                    <span v-show="showPassword"><i class="fa-solid fa-eye-slash"></i></span>
                    <span v-show="!showPassword"><i class="fa-solid fa-eye"></i></span>
                    
                    <!--estas opciones son para mostrar y ocultar el icono de ojo, pero no funcionan correctamente, uso span y funciona bien
                    
                    <i :key="showPassword" class="fa-solid" :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"></i>        
                    
                    <i :class="['fa-solid fa-eye-slash', showPassword ? '' : 'hidden']"></i>
                    <i :class="['fa-solid fa-gear', showPassword ? 'hidden' : '']"></i>
                    
                    <i class='fa-solid fa-eye' v-show="!showPassword"></i>
                    <i class='fa-solid fa-eye-slash' v-show="!showPassword"></i>
                    
                    <i v-if="!showPassword" class="fa-solid fa-eye"></i>
                    <i v-else class="fa-solid fa-eye-slash"></i>
                    -->
                </button>
                
                <p v-if="message" :class="['message', messageType]">{{ message }}</p>

                <button type="submit">Entrar</button>
            </form>
        </div>
    </section>
</template>

<style scoped>
.login-page {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    /*
    padding: 2rem;
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    */
    background: linear-gradient(135deg, var(--color4) 0%, var(--color3) 100%);
}
.bg-layer {
    position: absolute;
    inset: 0;
    padding: 1.5rem;
    color: var(--color0);
}
.bg-layer a {
    font-size: 1.3rem;
    text-decoration: none;
    font-weight: 600;
    color: var(--color3);
}
.bg-layer a:hover {
    color: rgba(177, 28, 127, 0.726);
}
.bg-layer hr {
    border: 1.8px solid var(--color3);
    margin-top: 0.5rem;
}
.nombreApp {
    font-size: 2.5rem;
    color: var(--color0);
    margin-top: 0.3rem;
    margin-left: 1.5rem;
}
.version {
    font-size: 1.0rem;
    font-weight: 400;
    margin-left: 1.5rem;
}
/*----------------------------------------------------------------*/
.login-card {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 480px;
    /*filter: blur(0);*/
    background: var(--color0);
    border-radius: 16px;
    padding: 3rem;
    box-shadow: 7px 7px 10px rgba(0, 0, 0, 0.8);
}
h1, p {
    text-align: center;
    color:var(--color1);
    margin-bottom: 20px;
}
.message {
    padding: 0.7rem;
    border-radius: 10px;
    font-weight: 600;
    margin: 0;
}
.message.error {
    background: #ebb6b6;
    color: #db0b0b;
}
.message.success {
    background: #92d8aa;
    color: #0a4d23;
}
/*----------------------------------------------------------------*/
form {
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
}
label {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    font-weight: 600;
    color:var(--color1);
}
input {
    padding: 0.8rem;
    border: 1px solid #cbd5e1;
    border-radius: 10px;
    font-size: 1rem;
    background-color: #fff;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}
input:focus {
    outline: none;
    border-color: transparent;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.18);
}
input[type="email"]:-webkit-autofill {
    /* Cambia el color de fondo del autofill, especifico para email */
    background-color: white !important; /* tu color */
    box-shadow: 0 0 0px 1000px white inset; /* truco para sobrescribir el fondo */
}
/*------------------------------------------------------------*/
.password-field {
    position: relative;
}
.password-field input {
    width: 100%;
    padding-right: 3rem; /* deja espacio para el botón */
}
.toggle-eye {
    position: absolute;
    width: 50px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    transform: translateX(338px) translateY(172px);
    background: transparent;
    color: var(--color1);
}
    
.toggle-eye:hover {
    color: var(--color3);
    background: transparent;
}
button {
    margin-top: 0.8rem;
    padding: 0.9rem;
    border: none;
    border-radius: 10px;
    background: var(--color1);
    color: white;
    font-size: 1.1rem;
    font-weight: 700;
    cursor: pointer;
}
button:hover {
    background: var(--color4);
    /*color: var(--color1);*/
}
</style>
