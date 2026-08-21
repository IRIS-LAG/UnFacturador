<script setup>
import { computed, ref } from 'vue'
import {
    selectoresParametros,
    selectoresSectores
} from '../data/configuracion'

const tabActiva = ref('parametros')
const modeloActivo = ref('tipoEmision')

const modelosActivos = computed(() => (
    tabActiva.value === 'parametros' ? selectoresParametros : selectoresSectores
))

const modeloSeleccionado = computed(() => (
    modelosActivos.value.find((modelo) => modelo.modelo === modeloActivo.value)
    || modelosActivos.value[0]
))

function cambiarTab(tab) {
    tabActiva.value = tab
    modeloActivo.value = tab === 'parametros'
        ? selectoresParametros[0].modelo
        : selectoresSectores[0].modelo
}
</script>

<template>
    <section class="contenedor">
        <h2>Configuración</h2>

        <div class="tabs" role="tablist" aria-label="Secciones de configuración">
            <button class="tab" :class="{ activa: tabActiva === 'parametros' }" type="button" role="tab" :aria-selected="tabActiva === 'parametros'" @click="cambiarTab('parametros')">Parámetros</button>
            <button class="tab" :class="{ activa: tabActiva === 'sectores' }" type="button" role="tab" :aria-selected="tabActiva === 'sectores'" @click="cambiarTab('sectores')">Sectores</button>
            <button class="tab" :class="{ activa: tabActiva === 'otros' }" type="button" role="tab" :aria-selected="tabActiva === 'otros'" @click="tabActiva = 'otros'">Otros</button>
        </div>

        <div v-if="tabActiva !== 'otros'" class="tab-cuerpo" role="tabpanel">
            <div class="configuracion-panel">
                <aside class="modelos-contenedor" aria-label="Modelos de configuración">
                    <button
                        v-for="modelo in modelosActivos"
                        :key="modelo.modelo"
                        class="modelo"
                        :class="{ seleccionado: modeloActivo === modelo.modelo }"
                        type="button"
                        @click="modeloActivo = modelo.modelo">
                        {{ modelo.etiqueta }}
                    </button>
                </aside>

                <div class="tabla-contenedor">
                    <h3>{{ modeloSeleccionado?.etiqueta }}</h3>
                    <table class="tabla-modelo">
                        <thead><tr><th>N°</th><th>Detalle</th></tr></thead>
                        <tbody>
                            <tr v-for="(opcion, indice) in modeloSeleccionado?.opciones" :key="opcion.valor">
                                <td>{{ indice + 1 }}</td>
                                <td>{{ opcion.texto }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div v-else class="tab-cuerpo" role="tabpanel">
            <div class="acciones-grid">
                <button class="accion" type="button">Copia de respaldo</button>
                <button class="accion" type="button">Otros ajustes</button>
            </div>
        </div>
    </section>
</template>

<style scoped>
.contenedor {
    margin: 0px;
    padding: 2.2rem;
}
.tabs {
    margin-top: 0.6rem;
    display: flex;
    gap: 0.35rem;
    border-bottom: 1px solid #d7dce2;
}
.tab {
    padding: 0.45rem 1.25rem;
    border: 0;
    border-bottom: 3px solid transparent;
    background: transparent;
    color: var(--color1);
    cursor: pointer;
    font: inherit;
}
.tab:hover,
.tab.activa {
    color: var(--color4);
    font-size: 1.13rem;
}
.tab.activa {
    border-bottom-color: var(--color4);
    font-weight: 700;
}
/***************************************************/
.tab-cuerpo {
    padding: 1rem 0;
    /*background: #f9f9f9;*/
}
.configuracion-panel {
    display: grid;
    grid-template-columns: 380px minmax(0, 1fr);
    gap: 1rem;
}
.modelo {
    display: block;
    width: 100%;
    padding: 0.75rem 0.8rem;
    border: 0;
    border-left: 3px solid transparent;
    background: transparent;
    color: var(--color1);
    cursor: pointer;
    font: inherit;
    text-align: left;
}
.modelo:hover,
.modelo.seleccionado {
    border-left-color: var(--color4);
    background: #eef3eb;
    color: var(--color4);
    font-weight: 700;
}
.modelo:hover {
    color: var(--color5);
}
.tabla-contenedor {
    padding-left: 1.5rem;
    border-left: 1px solid #d7dce2;
}
.tabla-contenedor h3 {
    margin-top: 0.5rem;
    padding-bottom: 12px;
    color: var(--color4);
    border-bottom: 1px solid #d7dce2;
}
.tabla-modelo {
    width: 100%;
    border-collapse: collapse;
    color: var(--color1);
}
.tabla-modelo th,
.tabla-modelo td {
    padding: 0.3rem 1rem;
    border-bottom: 1px solid #d7dce2;
    text-align: left;
}
.tabla-modelo th:first-child,
.tabla-modelo td:first-child {
    width: 80px;
    text-align: center;
    }
.tabla-modelo th {
    background: #eef3eb;
    color: var(--color4);
}
/************************************************/
.acciones-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 220px));
    gap: 1rem;
}
.accion {
    padding: 0.8rem 1rem;
    border: 1px solid var(--color4);
    border-radius: 5px;
    background: #fff;
    color: var(--color4);
    cursor: pointer;
    font: inherit;
    font-weight: 600;
}
.accion:hover {
    background: var(--color4);
    color: #fff;
}
/*
@media (max-width: 700px) {
    .contenedor {
        padding: 1.25rem;
    }
    .tabs {
        overflow-x: auto;
    }
    .tab {
        flex: 1 0 auto;
    }
    .configuracion-panel,
    .acciones-grid {
        grid-template-columns: 1fr;
    }
    .modelos-contenedor {
        border-top: 1px solid #d7dce2;
        border-left: 0;
        padding-top: 1.25rem;
        padding-left: 0;
    }
}
*/
</style>
