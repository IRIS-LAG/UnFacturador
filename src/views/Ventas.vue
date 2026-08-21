<script setup>
import { computed, ref } from 'vue'
import { clientesIniciales } from '../data/clientes'
import { productosIniciales } from '../data/productos'
import { ventasIniciales } from '../data/ventas'

const clientes = ref([...clientesIniciales])
const productos = ref([...productosIniciales])
const ventas = ref([...ventasIniciales])
const busqueda = ref('')
const mostrarFormulario = ref(false)
const ventaEditando = ref(null)
const ventaVistaPrevia = ref(null)
const formulario = ref(crearVentaVacia())

function fechaActual() {
    return new Date().toISOString().slice(0, 10)
}

function crearVentaVacia() {
    return {
        numero: '',
        documentoCliente: '',
        productoId: '',
        fecha: fechaActual(),
        monto: '',
        estado: 'Pendiente'
    }
}

const ventasMostradas = computed(() => {
    const termino = busqueda.value.trim().toLowerCase()

    if (!termino) {
        return ventas.value
    }

    return ventas.value.filter((venta) => {
        const cliente = clientes.value.find((item) => item.nroDocumento === venta.documentoCliente)
        const producto = productos.value.find((item) => item.id === venta.productoId)

        return venta.numero.toLowerCase().includes(termino)
            || venta.codigoUnico.toLowerCase().includes(termino)
            || venta.documentoCliente.toLowerCase().includes(termino)
            || cliente?.nombre.toLowerCase().includes(termino)
            || producto?.codigo.toLowerCase().includes(termino)
            || producto?.descripcion.toLowerCase().includes(termino)
            || venta.estado.toLowerCase().includes(termino)
    })
})

function nombreCliente(documento) {
    return clientes.value.find((cliente) => cliente.nroDocumento === documento)?.nombre || documento
}

function descripcionProducto(productoId) {
    return productos.value.find((producto) => producto.id === productoId)?.descripcion || '-'
}

function abrirNuevaVenta() {
    ventaEditando.value = null
    formulario.value = crearVentaVacia()
    mostrarFormulario.value = true
}

function editarVenta(venta) {
    ventaEditando.value = venta.id
    formulario.value = { ...venta }
    mostrarFormulario.value = true
}

function abrirVistaPrevia(venta) {
    ventaVistaPrevia.value = venta
}

function cerrarVistaPrevia() {
    ventaVistaPrevia.value = null
}

function actualizarMonto() {
    const producto = productos.value.find((item) => item.id === Number(formulario.value.productoId))

    if (producto) {
        formulario.value.monto = producto.precioUnitario
    }
}

function generarCodigoUnico() {
    const fecha = formulario.value.fecha.replaceAll('-', '')
    return `VEN-${fecha}-${Date.now()}`
}

function guardarVenta() {
    const datos = {
        numero: formulario.value.numero.trim(),
        codigoUnico: ventaEditando.value
            ? formulario.value.codigoUnico
            : generarCodigoUnico(),
        documentoCliente: formulario.value.documentoCliente,
        productoId: Number(formulario.value.productoId),
        fecha: formulario.value.fecha,
        monto: Number(formulario.value.monto),
        estado: formulario.value.estado
    }

    if (!datos.numero || !datos.documentoCliente || !datos.productoId || !datos.fecha || datos.monto < 0 || Number.isNaN(datos.monto)) {
        return
    }

    if (ventaEditando.value) {
        const indice = ventas.value.findIndex((venta) => venta.id === ventaEditando.value)
        ventas.value[indice] = { id: ventaEditando.value, ...datos }
    } else {
        ventas.value.push({ id: Date.now(), ...datos })
    }

    cerrarFormulario()
}

function eliminarVenta(venta) {
    if (window.confirm(`¿Eliminar la venta ${venta.numero}?`)) {
        ventas.value = ventas.value.filter((item) => item.id !== venta.id)
    }
}

function cerrarFormulario() {
    mostrarFormulario.value = false
    ventaEditando.value = null
}

function mostrarMonto(monto) {
    return Number(monto).toFixed(2)
}
</script>

<template>
    <section class="contenedor">
        <div class="encabezado-vista">
            <div>
                <h2>Ventas</h2>
                <p>Administra las ventas registradas</p>
            </div>

            <div class="acciones-superiores">
                <label class="buscador">
                    <span class="sr-only">Buscar venta</span>
                    <i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
                    <input v-model="busqueda" type="search" placeholder="Buscar venta...">
                </label>
                <button class="btn-principal" type="button" @click="abrirNuevaVenta">
                    <i class="fa-solid fa-plus" aria-hidden="true"></i>
                    Nueva venta
                </button>
            </div>
        </div>

        <form v-if="mostrarFormulario" class="formulario-venta" @submit.prevent="guardarVenta">
            <div class="formulario-titulo">
                <h3>{{ ventaEditando ? 'Editar venta' : 'Nueva venta' }}</h3>
                <button class="btn-cerrar" type="button" aria-label="Cerrar formulario" title="Cerrar" @click="cerrarFormulario">&times;</button>
            </div>

            <p v-if="!ventaEditando" class="codigo-nota">El código único interno se generará automáticamente al guardar.</p>

            <div class="campos-formulario">
                <label>Número<input v-model="formulario.numero" required></label>
                <label>Documento
                    <select v-model="formulario.documentoCliente" required>
                        <option value="" disabled>Seleccione un cliente</option>
                        <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.nroDocumento">
                            {{ cliente.nroDocumento }} - {{ cliente.nombre }}
                        </option>
                    </select>
                </label>
                <label>Producto
                    <select v-model="formulario.productoId" required @change="actualizarMonto">
                        <option value="" disabled>Seleccione un producto</option>
                        <option v-for="producto in productos" :key="producto.id" :value="producto.id">
                            {{ producto.codigo }} - {{ producto.descripcion }}
                        </option>
                    </select>
                </label>
                <label>Fecha<input v-model="formulario.fecha" type="date" required></label>
                <label>Monto<input v-model="formulario.monto" type="number" min="0" step="0.01" required></label>
                <label>Estado
                    <select v-model="formulario.estado">
                        <option>Pendiente</option>
                        <option>Pagada</option>
                        <option>Anulada</option>
                    </select>
                </label>
            </div>

            <div class="acciones-formulario">
                <button class="btn-secundario" type="button" @click="cerrarFormulario">Cancelar</button>
                <button class="btn-principal" type="submit">Guardar venta</button>
            </div>
        </form>

        <div class="tabla-contenedor">
            <table class="tabla-ventas">
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>Código único</th>
                        <th>Documento</th>
                        <th>Producto</th>
                        <th>Fecha</th>
                        <th>Monto</th>
                        <th>Estado</th>
                        <th><span class="sr-only">Acciones</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="venta in ventasMostradas" :key="venta.id">
                        <td>{{ venta.numero }}</td>
                        <td class="codigo-unico">{{ venta.codigoUnico }}</td>
                        <td>{{ nombreCliente(venta.documentoCliente) }}</td>
                        <td>{{ descripcionProducto(venta.productoId) }}</td>
                        <td>{{ venta.fecha }}</td>
                        <td>{{ mostrarMonto(venta.monto) }}</td>
                        <td><span :class="['estado', venta.estado.toLowerCase()]">{{ venta.estado }}</span></td>
                        <td class="acciones-fila">
                            <button type="button" aria-label="Vista previa de la venta" title="Vista previa" @click="abrirVistaPrevia(venta)">
                                <i class="fa-solid fa-file-lines" aria-hidden="true"></i>
                            </button>
                            <button type="button" aria-label="Editar venta" title="Editar" @click="editarVenta(venta)">
                                <i class="fa-solid fa-pen-to-square" aria-hidden="true"></i>
                            </button>
                            <button type="button" aria-label="Eliminar venta" title="Eliminar" @click="eliminarVenta(venta)">
                                <i class="fa-solid fa-trash" aria-hidden="true"></i>
                            </button>
                        </td>
                    </tr>
                    <tr v-if="ventasMostradas.length === 0">
                        <td class="sin-resultados" colspan="8">No se encontraron ventas.</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div v-if="ventaVistaPrevia" class="modal-fondo" role="presentation" @click.self="cerrarVistaPrevia">
            <section class="documento-venta" role="dialog" aria-modal="true" aria-labelledby="titulo-vista-previa" @keydown.esc="cerrarVistaPrevia">
                <div class="documento-encabezado">
                    <div>
                        <span class="documento-etiqueta">Vista previa</span>
                        <h3 id="titulo-vista-previa">Documento de venta</h3>
                    </div>
                    <button class="btn-cerrar" type="button" aria-label="Cerrar vista previa" title="Cerrar" @click="cerrarVistaPrevia">&times;</button>
                </div>

                <div class="documento-codigo">
                    <span>Código único interno</span>
                    <strong>{{ ventaVistaPrevia.codigoUnico }}</strong>
                </div>

                <dl class="detalle-venta">
                    <div><dt>Número</dt><dd>{{ ventaVistaPrevia.numero }}</dd></div>
                    <div><dt>Fecha</dt><dd>{{ ventaVistaPrevia.fecha }}</dd></div>
                    <div><dt>Documento</dt><dd>{{ ventaVistaPrevia.documentoCliente }}</dd></div>
                    <div><dt>Cliente</dt><dd>{{ nombreCliente(ventaVistaPrevia.documentoCliente) }}</dd></div>
                    <div><dt>Producto</dt><dd>{{ descripcionProducto(ventaVistaPrevia.productoId) }}</dd></div>
                    <div><dt>Estado</dt><dd><span :class="['estado', ventaVistaPrevia.estado.toLowerCase()]">{{ ventaVistaPrevia.estado }}</span></dd></div>
                </dl>

                <div class="documento-total">
                    <span>Monto total</span>
                    <strong>{{ mostrarMonto(ventaVistaPrevia.monto) }}</strong>
                </div>
            </section>
        </div>
    </section>
</template>

<style scoped>
.contenedor { padding: 2.2rem; }
.encabezado-vista,
.formulario-titulo,
.acciones-superiores,
.acciones-formulario { display: flex; align-items: center; }
.encabezado-vista { justify-content: space-between; gap: 1.5rem; }
h2 { color: var(--color1); }
p { margin-top: 0.35rem; color: var(--color2); }
.acciones-superiores { justify-content: flex-end; gap: 0.75rem; }
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
.buscador input { width: 100%; border: 0; outline: 0; font: inherit; }
button { font: inherit; cursor: pointer; }
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
.btn-principal { border: 1px solid var(--color4); background: var(--color4); color: #fff; }
.btn-principal:hover { background: var(--color3); border-color: var(--color3); color: var(--color1); }
.formulario-venta {
    margin-top: 1.5rem;
    padding: 1.25rem;
    border: 1px solid #d7dce2;
    border-left: 4px solid var(--color4);
    background: #fafcf9;
}
.formulario-titulo { justify-content: space-between; margin-bottom: 1rem; }
.formulario-titulo h3 { color: var(--color4); }
.btn-cerrar { border: 0; background: transparent; color: var(--color1); font-size: 1.5rem; line-height: 1; }
.codigo-nota { margin: -0.4rem 0 1rem; font-size: 0.85rem; }
.campos-formulario { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; }
.campos-formulario label { display: grid; gap: 0.35rem; color: var(--color1); font-weight: 600; }
.campos-formulario input,
.campos-formulario select {
    width: 100%;
    padding: 0.6rem 0.7rem;
    border: 1px solid #cbd2d9;
    border-radius: 4px;
    background: #fff;
    font: inherit;
}
.acciones-formulario { justify-content: flex-end; gap: 0.75rem; margin-top: 1rem; }
.btn-secundario { border: 1px solid #cbd2d9; background: #fff; color: var(--color1); }
.tabla-contenedor { margin-top: 1.5rem; overflow-x: auto; }
.tabla-ventas { width: 100%; border-collapse: collapse; color: var(--color1); }
.tabla-ventas th,
.tabla-ventas td { padding: 0.4rem 0.8rem; border-bottom: 1px solid #d7dce2; text-align: left; white-space: nowrap; }
.tabla-ventas th { background: #eef3eb; color: var(--color4); font-weight: 700; }
.codigo-unico { color: var(--color2); font-size: 0.85rem; }
.estado { display: inline-block; padding: 0.25rem 0.55rem; border-radius: 12px; font-size: 0.8rem; font-weight: 700; }
.estado.pendiente { background: #fff1c7; color: #8a6500; }
.estado.pagada { background: #e1f1dc; color: var(--color4); }
.estado.anulada { background: #f8ded8; color: #a43b2c; }
.acciones-fila { width: 105px; white-space: nowrap !important; text-align: right !important; }
.acciones-fila button { width: 30px; height: 30px; margin-left: 0.3rem; border: 0; background: transparent; color: var(--color2); }
.acciones-fila button:hover:first-child { color: var(--color4); }
.acciones-fila button:hover:last-child { color: var(--color5); }
.sin-resultados { padding: 2rem !important; color: var(--color2); text-align: center !important; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.modal-fondo {
    position: fixed;
    inset: 0;
    z-index: 10;
    display: grid;
    place-items: center;
    padding: 1.5rem;
    background: rgba(35, 42, 48, 0.58);
}
.documento-venta {
    width: min(100%, 560px);
    padding: 1.5rem;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
}
.documento-encabezado {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding-bottom: 1rem;
    border-bottom: 1px solid #d7dce2;
}
.documento-etiqueta {
    color: var(--color4);
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
}
.documento-encabezado h3 { margin-top: 0.25rem; color: var(--color1); }
.documento-codigo {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 0;
    color: var(--color2);
    font-size: 0.85rem;
}
.documento-codigo strong { color: var(--color1); }
.detalle-venta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem 1.5rem;
    padding: 1rem 0;
    border-top: 1px solid #d7dce2;
    border-bottom: 1px solid #d7dce2;
}
.detalle-venta dt { color: var(--color2); font-size: 0.8rem; }
.detalle-venta dd { margin-top: 0.2rem; color: var(--color1); font-weight: 600; }
.documento-total {
    display: flex;
    justify-content: space-between;
    padding-top: 1rem;
    color: var(--color1);
}
.documento-total strong { color: var(--color4); font-size: 1.3rem; }
@media (max-width: 800px) {
    .encabezado-vista { align-items: stretch; flex-direction: column; }
    .acciones-superiores { justify-content: stretch; }
    .buscador { flex: 1; }
    .campos-formulario { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 520px) {
    .contenedor { padding: 1.25rem; }
    .acciones-superiores,
    .acciones-formulario { align-items: stretch; flex-direction: column; }
    .campos-formulario { grid-template-columns: 1fr; }
    .detalle-venta { grid-template-columns: 1fr; }
    .documento-codigo { align-items: flex-start; flex-direction: column; gap: 0.25rem; }
}
</style>