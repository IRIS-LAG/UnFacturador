<script setup>
import { computed, ref } from 'vue'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
)
const anioSeleccionado = ref(2026)
const datosPorAnio = {
    2024: [120, 180, 150, 220, 260, 310, 280, 340, 390, 420, 460, 500],
    2025: [150, 210, 190, 250, 300, 350, 330, 380, 420, 480, 510, 560],
    2026: [180, 240, 220, 290, 340, 390, 360, 420, 460, 520, 570, 610]
}
const datosGrafico = computed(() => ({
    labels: [
    'Ene', 'Feb', 'Mar', 'Abr',
    'May', 'Jun', 'Jul', 'Ago',
    'Sep', 'Oct', 'Nov', 'Dic'
    ],
    datasets: [
    {
        data: datosPorAnio[anioSeleccionado.value],
        borderColor: '#598234',
    }
    ]
}))
const opcionesGrafico = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
        display: false
        }
    },
    scales: {
        y: {
        beginAtZero: true
        }
    }
}
</script>

<template>
    <section class="contenedor">
        <h2>Información general</h2>
        <h3>MILECIN LOS ANDES DE MERLO</h3>
        <p>Sector: <strong>FACTURA COMPRA-VENTA (Computarizada en línea)</strong></p>

        <div class="conte-items">
            <div class="card-item left">
                <table class="info-table lagg">
                <tbody>
                    <tr><td>NIT</td><td>344548484</td></tr>
                    <tr><td>SUCURSAL</td><td>0</td></tr>
                    <tr><td>PUNTO DE VENTA</td><td>0</td></tr>
                    <tr><td>MUNICIPIO</td><td>Mi municipio</td></tr>
                    <tr><td>DIRECCION</td><td>Los andes Av. las esquinas del recuerdo</td></tr>
                    <tr><td>TELEFONO</td><td>591-77787878</td></tr>
                </tbody>
                </table>
            </div>

            <div class="card-item top-right">
                <table class="info-table">
                <tbody>
                    <tr><td>SUCURSAL</td><td>0</td></tr>
                    <tr><td>NOMBRE</td><td>La Sucursal 0</td></tr>
                </tbody>
                </table>
            </div>

            <div class="card-item bottom-right">
                <table class="info-table">
                <tbody>
                    <tr><td>VIGENCIA CUIS</td><td>15/05/2026 14:00</td></tr>
                    <tr><td>VIGENCIA CUFD</td><td>16/05/2026 18:28</td></tr>
                </tbody>
                </table>
                <button class="btn-actualiz">ACTUALIZAR</button>
            </div>
        
            <div class="card-item bottom">
                <div class="grafico-header">
                    <h3>Ventas mensuales</h3>
                    <select v-model="anioSeleccionado" aria-label="Seleccionar año">
                        <option
                        v-for="anio in Object.keys(datosPorAnio)"
                        :key="anio"
                            :value="Number(anio)">
                            {{ anio }}
                        </option>
                    </select>
                </div>
                <div class="grafico-contenedor">
                    <Line
                    :data="datosGrafico"
                    :options="opcionesGrafico"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.contenedor {
    margin: 0px;
    padding: 2.2rem;
    /*background-color: #f9f9f9;*/
}
h3 {
    margin: 10px 0 10px;
    color: var(--color5);
}
p {
    padding: 0 0 10px;
    color: var(--color4);
}
.conte-items {
    padding-top: 20px;
    display: grid;
    gap: 15px;
    grid-template-columns: 2fr 1fr;
    align-items: stretch;
}
.left {
    grid-column: 1;    /* primera columna */
    grid-row: 1 / 3;   /* desde fila 1 hasta fila 3 */
}
.top-right {
    grid-column: 2;    /* segunda columna */
    grid-row: 1;       /* primera fila */
}
.bottom-right {
    grid-column: 2;    /* segunda columna */
    grid-row: 2;       /* segunda fila */
}
.bottom {
    grid-column: 1 / 3; /* desde columna 1 hasta columna 3 */
    grid-row: 3;       /* tercera fila */
}
/*************************************************************/
.card-item {
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}
.info-table {
    width: 100%;
    border-collapse: collapse; /* elimina espacios entre celdas */
}
.info-table td {
    padding: 4px 10px;
    vertical-align: top;
}
.info-table td:first-child {
    color: var(--color1);
}
.info-table td:last-child {
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    color: var(--color4);
}
.lagg td:first-child {
    width: 22%;
}
.btn-actualiz {
    margin-top: 10px;
    padding: 8px;
    width: 100%;
    background-color: var(--color4);
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.btn-actualiz:hover {
    background-color: var(--color3);
    color: black;
}
/*************************************************************/
.grafico-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}
.grafico-header h3 {
    margin: 0;
    color: var(--color4);
}
.grafico-header select {
    padding: 6px 10px;
    border: 2px solid var(--color4);
    border-radius: 5px;
}
.grafico-header select option {
    background-color: white;
    color: var(--color4);
}
.grafico-header select option:checked {
    background-color: var(--color4);
    color: white;
}
.grafico-contenedor {
    position: relative;
    width: 100%;
    height: 280px;
}
</style>
