<script setup>
import { computed, ref } from 'vue'
import { productosIniciales } from '../data/productos'

const productos = ref([...productosIniciales])
const busqueda = ref('')
const mostrarFormulario = ref(false)
const productoEditando = ref(null)
const formulario = ref(crearProductoVacio())

function crearProductoVacio() {
    return {
        codigo: '',
        descripcion: '',
        precioUnitario: ''
    }
}

const productosFiltrados = computed(() => {
    const termino = busqueda.value.trim().toLowerCase()

    if (!termino) {
        return productos.value
    }

    return productos.value.filter((producto) => (
        producto.codigo.toLowerCase().includes(termino)
        || producto.descripcion.toLowerCase().includes(termino)
        || String(producto.precioUnitario).includes(termino)
    ))
})

function abrirNuevoProducto() {
    productoEditando.value = null
    formulario.value = crearProductoVacio()
    mostrarFormulario.value = true
}

function editarProducto(producto) {
    productoEditando.value = producto.id
    formulario.value = { ...producto }
    mostrarFormulario.value = true
}

function guardarProducto() {
    const datos = {
        codigo: formulario.value.codigo.trim(),
        descripcion: formulario.value.descripcion.trim(),
        precioUnitario: Number(formulario.value.precioUnitario)
    }

    if (!datos.codigo || !datos.descripcion || datos.precioUnitario < 0 || Number.isNaN(datos.precioUnitario)) {
        return
    }

    if (productoEditando.value) {
        const indice = productos.value.findIndex((producto) => producto.id === productoEditando.value)
        productos.value[indice] = { id: productoEditando.value, ...datos }
    } else {
        productos.value.push({ id: Date.now(), ...datos })
    }

    cerrarFormulario()
}

function eliminarProducto(producto) {
    if (window.confirm(`¿Eliminar el producto ${producto.descripcion}?`)) {
        productos.value = productos.value.filter((item) => item.id !== producto.id)
    }
}

function cerrarFormulario() {
    mostrarFormulario.value = false
    productoEditando.value = null
}

function mostrarPrecio(precio) {
    return Number(precio).toFixed(2)
}
</script>

<template>
    <section class="contenedor">
        <div class="encabezado-vista">
            <div>
                <h2>Productos</h2>
                <p>Administra los productos y sus precios unitarios</p>
            </div>

            <div class="acciones-superiores">
                <label class="buscador">
                    <span class="sr-only">Buscar producto</span>
                    <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                    <input v-model="busqueda" type="search" placeholder="Buscar producto...">
                </label>
                <button class="btn-principal" type="button" @click="abrirNuevoProducto">
                    <i class="fa-solid fa-plus" aria-hidden="true"></i>
                    Nuevo producto
                </button>
            </div>
        </div>

        <form v-if="mostrarFormulario" class="formulario-producto" @submit.prevent="guardarProducto">
            <div class="formulario-titulo">
                <h3>{{ productoEditando ? 'Editar producto' : 'Nuevo producto' }}</h3>
                <button class="btn-cerrar" type="button" aria-label="Cerrar formulario" title="Cerrar" @click="cerrarFormulario">&times;</button>
            </div>
            <div class="campos-formulario">
                <label>Código<input v-model="formulario.codigo" required pattern="[A-Za-z0-9]+" title="Use solo letras y números"></label>
                <label class="campo-descripcion">Descripción<input v-model="formulario.descripcion" required></label>
                <label>Precio unitario<input v-model="formulario.precioUnitario" type="number" min="0" step="0.01" required></label>
            </div>
            <div class="acciones-formulario">
                <button class="btn-secundario" type="button" @click="cerrarFormulario">Cancelar</button>
                <button class="btn-principal" type="submit">Guardar producto</button>
            </div>
        </form>

        <div class="tabla-contenedor">
            <table class="tabla-productos">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Descripción</th>
                        <th>Precio unitario</th>
                        <th><span class="sr-only">Acciones</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="producto in productosFiltrados" :key="producto.id">
                        <td>{{ producto.codigo }}</td>
                        <td class="descripcion-producto">{{ producto.descripcion }}</td>
                        <td>{{ mostrarPrecio(producto.precioUnitario) }}</td>
                        <td class="acciones-fila">
                            <button type="button" aria-label="Editar producto" title="Editar" @click="editarProducto(producto)">
                                <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>
                            </button>
                            <button type="button" aria-label="Eliminar producto" title="Eliminar" @click="eliminarProducto(producto)">
                                <i class="fa-solid fa-trash" aria-hidden="true"></i>
                            </button>
                        </td>
                    </tr>
                    <tr v-if="productosFiltrados.length === 0">
                        <td class="sin-resultados" colspan="4">No se encontraron productos.</td>
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
.formulario-producto {
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
    grid-template-columns: 1fr 2fr 1fr;
    gap: 1rem;
}
.campos-formulario label {
    display: grid;
    gap: 0.35rem;
    color: var(--color1);
    font-weight: 600;
}
.campos-formulario input {
    width: 100%;
    padding: 0.6rem 0.7rem;
    border: 1px solid #cbd2d9;
    border-radius: 4px;
    background: #fff;
    font: inherit;
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
.tabla-productos {
    width: 100%;
    border-collapse: collapse;
    color: var(--color1);
}
.tabla-productos th,
.tabla-productos td {
    padding: 0.4rem 1rem;
    border-bottom: 1px solid #d7dce2;
    text-align: left;
}
.tabla-productos th {
    background: #eef3eb;
    color: var(--color4);
    font-weight: 700;
}
.descripcion-producto {
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
    .campo-descripcion {
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
    .campo-descripcion {
        grid-column: auto;
    }
}
</style>