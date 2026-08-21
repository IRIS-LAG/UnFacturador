export const selectoresParametros = [
    {
        modelo: 'tipoEmision',
        etiqueta: 'Tipo de emisión',
        placeholder: 'Seleccionar tipo de emisión',
        opciones: [
            { valor: 'linea', texto: 'En línea' },
            { valor: 'fuera-linea', texto: 'Fuera de línea' },
            { valor: 'masivo', texto: 'Masivo' },
            { valor: 'contingencia', texto: 'Contingencia' }
        ]
    },
    {
        modelo: 'tipoDocumFac',
        etiqueta: 'Tipo documento factura',
        placeholder: 'Seleccionar tipo de documento factura',
        opciones: [
            { valor: 'facturaCD', texto: 'Factura con derecho a crédito fiscal' },
            { valor: 'facturaSD', texto: 'Factura sin derecho a crédito fiscal' },
            { valor: 'dAjuste', texto: 'Documento de ajuste' },
            { valor: 'dEquival', texto: 'Documento equivalente' }
        ]
    },
    {
        modelo: 'tipoDocumIde',
        etiqueta: 'Tipo documento de identidad',
        placeholder: 'Seleccionar tipo de documento de identidad',
        opciones: [
            { valor: 'carnetIdentidad', texto: 'Carnet de identidad' },
            { valor: 'carnetExtranjero', texto: 'Carnet de identidad extranjero' },
            { valor: 'pasaporte', texto: 'Pasaporte' },
            { valor: 'otroDoc', texto: 'Otro documento de identidad' },
            { valor: 'numIdentificacion', texto: 'Número de identificación tributaria' }
        ]
    },
    {
        modelo: 'tipoDocSector',
        etiqueta: 'Tipo de documento sector',
        placeholder: 'Seleccionar tipo de documento sector',
        opciones: [
            { valor: 'facturaCV', texto: 'Factura compra-venta' },
            { valor: 'facturaBI', texto: 'Factura de alquiler de bienes inmuebles' },
            { valor: 'facturaExpo', texto: 'Factura comercial de exportación' }
        ]
    },
    {
        modelo: 'metodoPago',
        etiqueta: 'Método de pago',
        placeholder: 'Seleccionar método de pago',
        opciones: [
            { valor: 'efectivo', texto: 'Efectivo' },
            { valor: 'tarjeta', texto: 'Tarjeta' },
            { valor: 'transferencia', texto: 'Transferencia bancaria' }
        ]
    }
]

export const selectoresSectores = [
    {
        modelo: 'actividad',
        etiqueta: 'Actividades',
        placeholder: 'Seleccionar actividad',
        opciones: [
            { valor: 'consultores', texto: 'Consultores' },
            { valor: 'aConsultoria', texto: 'Actividades de consultoría' },
        ]
    },
    {
        modelo: 'sector',
        etiqueta: 'Sectores',
        placeholder: 'Seleccionar sector',
        opciones: [
            { valor: 'facturacv', texto: 'Factura compra-venta' },
            { valor: 'notaCD', texto: 'Nota de crédito-debito' },
        ]
    },
    {
        modelo: 'catalogo',
        etiqueta: 'Catálogos',
        placeholder: 'Seleccionar catálogo',
        opciones: [
            { valor: 'consultGes', texto: 'Consultoría de gestión' },
            { valor: 'consultInf', texto: 'Consultoría de informática' },
        ]
    }
]
