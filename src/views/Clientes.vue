<script setup>
import { computed, ref } from 'vue'
import { clientesIniciales } from '../data/clientes'

const clientes = ref([...clientesIniciales])
const busqueda = ref('')
const mostrarFormulario = ref(false)
const clienteEditando = ref(null)
const formulario = ref(crearClienteVacio())

function crearClienteVacio() {
    return {
        nroDocumento: '',
        complemento: '',
        tipoDocumento: 'CI',
        nombre: ''
    }
}

const clientesFiltrados = computed(() => {
    const termino = busqueda.value.trim().toLowerCase()

    if (!termino) {
        return clientes.value
    }

    return clientes.value.filter((cliente) => (
        cliente.nroDocumento.toLowerCase().includes(termino)
        || cliente.complemento.toLowerCase().includes(termino)
        || cliente.tipoDocumento.toLowerCase().includes(termino)
        || cliente.nombre.toLowerCase().includes(termino)
    ))
})

function abrirNuevoCliente() {
    clienteEditando.value = null
    formulario.value = crearClienteVacio()
    mostrarFormulario.value = true
}

function editarCliente(cliente) {
    clienteEditando.value = cliente.id
    formulario.value = { ...cliente }
    mostrarFormulario.value = true
}

function guardarCliente() {
    const datos = {
        nroDocumento: formulario.value.nroDocumento.trim(),
        complemento: formulario.value.complemento.trim(),
        tipoDocumento: formulario.value.tipoDocumento,
        nombre: formulario.value.nombre.trim()
    }

    if (!datos.nroDocumento || !datos.nombre) {
        return
    }

    if (clienteEditando.value) {
        const indice = clientes.value.findIndex((cliente) => cliente.id === clienteEditando.value)
        clientes.value[indice] = { id: clienteEditando.value, ...datos }
    } else {
        clientes.value.push({ id: Date.now(), ...datos })
    }

    cerrarFormulario()
}

function eliminarCliente(cliente) {
    if (window.confirm(`¿Eliminar a ${cliente.nombre}?`)) {
        clientes.value = clientes.value.filter((item) => item.id !== cliente.id)
    }
}

function cerrarFormulario() {
    mostrarFormulario.value = false
    clienteEditando.value = null
}
</script>

<template>
    <section class="contenedor">
        <div class="encabezado-vista">
            <div>
                <h2>Clientes</h2>
                <p>Administra los datos de tus clientes</p>
            </div>

            <div class="acciones-superiores">
                <label class="buscador">
                    <span class="sr-only">Buscar cliente</span>
                    <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                    <input v-model="busqueda" type="search" placeholder="Buscar cliente...">
                </label>
                <button class="btn-principal" type="button" @click="abrirNuevoCliente">
                    <i class="fa-solid fa-plus" aria-hidden="true"></i>
                    Nuevo Cliente
                </button>
            </div>
        </div>

        <form v-if="mostrarFormulario" class="formulario-cliente" @submit.prevent="guardarCliente">
            <div class="formulario-titulo">
                <h3>{{ clienteEditando ? 'Editar cliente' : 'Nuevo cliente' }}</h3>
                <button class="btn-cerrar" type="button" aria-label="Cerrar formulario" title="Cerrar" @click="cerrarFormulario">&times;</button>
            </div>
            <div class="campos-formulario">
                <label>Nro. documento<input v-model="formulario.nroDocumento" required></label>
                <label>Complemento<input v-model="formulario.complemento"></label>
                <label>Tipo documento
                    <select v-model="formulario.tipoDocumento">
                        <option>CI</option>
                        <option>NIT</option>
                        <option>Pasaporte</option>
                    </select>
                </label>
                <label class="campo-nombre">Nombre completo<input v-model="formulario.nombre" required></label>
            </div>
            <div class="acciones-formulario">
                <button class="btn-secundario" type="button" @click="cerrarFormulario">Cancelar</button>
                <button class="btn-principal" type="submit">Guardar cliente</button>
            </div>
        </form>

        <div class="tabla-contenedor">
            <table class="tabla-clientes">
                <thead>
                    <tr>
                        <th>Nro. documento</th>
                        <th>Complemento</th>
                        <th>Tipo documento</th>
                        <th>Nombre</th>
                        <th><span class="sr-only">Acciones</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="cliente in clientesFiltrados" :key="cliente.id">
                        <td>{{ cliente.nroDocumento }}</td>
                        <td>{{ cliente.complemento || '-' }}</td>
                        <td>{{ cliente.tipoDocumento }}</td>
                        <td class="nombre-cliente">{{ cliente.nombre }}</td>
                        <td class="acciones-fila">
                            <button type="button" aria-label="Editar cliente" title="Editar" @click="editarCliente(cliente)">
                                <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>
                            </button>
                            <button type="button" aria-label="Eliminar cliente" title="Eliminar" @click="eliminarCliente(cliente)">
                                <i class="fa-solid fa-trash" aria-hidden="true"></i>
                            </button>
                        </td>
                    </tr>
                    <tr v-if="clientesFiltrados.length === 0">
                        <td class="sin-resultados" colspan="5">No se encontraron clientes.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<style scoped>
.contenedor {
    padding: 2.2rem;
}
.encabezado-vista,
.formulario-titulo,
.acciones-superiores,
.acciones-formulario {
    display: flex;
    align-items: center;
}
.encabezado-vista {
    justify-content: space-between;
    gap: 1.5rem;
}
h2 {
    color: var(--color1);
}
p {
    margin-top: 0.35rem;
    color: var(--color2);
}
.acciones-superiores {
    justify-content: flex-end;
    gap: 0.75rem;
}
.buscador {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    min-width: 260px;
    padding: 0.55rem 0.75rem;
    border: 1px solid #cbd2d9;
    border-radius: 5px;
    color: var(--color2);
    background: #fff;
}
.buscador input {
    width: 100%;
    border: 0;
    outline: 0;
    font: inherit;
}
button {
    font: inherit;
    cursor: pointer;
}
.btn-principal,
.btn-secundario {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.62rem 1rem;
    border-radius: 5px;
    font-weight: 600;
}
.btn-principal {
    border: 1px solid var(--color4);
    background: var(--color4);
    color: #fff;
}
.btn-principal:hover {
    background: var(--color3);
    border-color: var(--color3);
    color: var(--color1);
}
.formulario-cliente {
    margin-top: 1.5rem;
    padding: 1.25rem;
    border: 1px solid #d7dce2;
    border-left: 4px solid var(--color4);
    background: #fafcf9;
}
.formulario-titulo {
    justify-content: space-between;
    margin-bottom: 1rem;
}
.formulario-titulo h3 {
    color: var(--color4);
}
.btn-cerrar {
    border: 0;
    background: transparent;
    color: var(--color1);
    font-size: 1.5rem;
    line-height: 1;
}
.campos-formulario {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
}
.campos-formulario label {
    display: grid;
    gap: 0.35rem;
    color: var(--color1);
    font-weight: 600;
}
.campos-formulario input,
.campos-formulario select {
    width: 100%;
    padding: 0.6rem 0.7rem;
    border: 1px solid #cbd2d9;
    border-radius: 4px;
    background: #fff;
    font: inherit;
}
.campo-nombre {
    grid-column: span 2;
}
.acciones-formulario {
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1rem;
}
.btn-secundario {
    border: 1px solid #cbd2d9;
    background: #fff;
    color: var(--color1);
}
.tabla-contenedor {
    margin-top: 1.5rem;
    overflow-x: auto;
}
.tabla-clientes {
    width: 100%;
    border-collapse: collapse;
    color: var(--color1);
}
.tabla-clientes th,
.tabla-clientes td {
    padding: 0.40rem 1rem;
    border-bottom: 1px solid #d7dce2;
    text-align: left;
}
.tabla-clientes th {
    background: #eef3eb;
    color: var(--color4);
    font-weight: 700;
}
.nombre-cliente {
    font-weight: 600;
}
.acciones-fila {
    width: 105px;
    white-space: nowrap;
    text-align: right !important;
}
.acciones-fila button {
    width: 30px;
    height: 30px;
    margin-left: 0.3rem;
    border: 0;
    background: transparent;
    color: var(--color2);
}
.acciones-fila button:hover:first-child {
    color: var(--color4);
}
.acciones-fila button:hover:last-child {
    color: var(--color5);
}
.sin-resultados {
    padding: 2rem !important;
    color: var(--color2);
    text-align: center !important;
}
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
@media (max-width: 800px) {
    .encabezado-vista {
        align-items: stretch;
        flex-direction: column;
    }
    .acciones-superiores {
        justify-content: stretch;
    }
    .buscador {
        flex: 1;
    }
    .campos-formulario {
        grid-template-columns: 1fr 1fr;
    }
    .campo-nombre {
        grid-column: span 2;
    }
}
@media (max-width: 520px) {
    .contenedor {
        padding: 1.25rem;
    }
    .acciones-superiores,
    .acciones-formulario {
        align-items: stretch;
        flex-direction: column;
    }
    .campos-formulario {
        grid-template-columns: 1fr;
    }
    .campo-nombre {
        grid-column: auto;
    }
}
</style>