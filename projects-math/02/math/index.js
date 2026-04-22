/**
 * index.js - Optimizado y Completo
 */

let mainChart;
let puntos = [];

// Cache de elementos para rendimiento
const dom = {
    nSlider: () => document.getElementById('n-slider'),
    nVal: () => document.getElementById('n-val'),
    areaRiemann: () => document.getElementById('area-riemann'),
    areaTrapecio: () => document.getElementById('area-trapecio'),
    listaPuntos: () => document.getElementById('lista-puntos'),
    logPuntos: () => document.getElementById('log-puntos')
};

window.onload = function () {
    const ctx = document.getElementById('mainChart').getContext('2d');
    mainChart = new Chart(ctx, {
        type: 'line',
        data: {
            datasets: [
                {
                    label: 'Área Riemann (Rectángulos)',
                    data: [],
                    backgroundColor: 'rgba(79, 70, 229, 0.4)',
                    borderColor: 'rgba(79, 70, 229, 1)',
                    borderWidth: 1,
                    fill: 'origin',
                    stepped: 'before', // Representación fiel de Riemann Izquierda
                    order: 2
                },
                {
                    label: 'Área Trapecio (Curva)',
                    data: [],
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    borderWidth: 3,
                    fill: 'origin',
                    tension: 0, // Rectas para trapecios
                    order: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { type: 'linear', position: 'bottom' },
                y: { beginAtZero: true }
            }
        }
    });

    // Escuchar cambios en el slider
    if (dom.nSlider()) {
        dom.nSlider().addEventListener('input', actualizarTodo);
    }
};

// --- FUNCIONES DE DIBUJO (P5.JS O SIMILAR) ---

function draw() {
    background(255);
    let n = parseInt(dom.nSlider().value);
    dom.nVal().innerText = n;

    if (puntos.length > 1) {
        // Estas funciones se asumen definidas globalmente para el dibujo en Canvas
        representarRiemann(n); 
        representarTrapecio(n);

        // Dibujar línea de interpolación manual
        stroke(220);
        strokeWeight(1);
        noFill();
        beginShape();
        puntos.forEach(p => vertex(mapX(p.x), mapY(p.y)));
        endShape();

        // Puntos físicos
        puntos.forEach(p => {
            fill('#4f46e5');
            noStroke();
            circle(mapX(p.x), mapY(p.y), 10);
        });
    } else {
        dibujarInstruccion();
    }
    dibujarEjes();
}

// --- MISIONES Y CARGA ---

function cargarMision(tipo) {
    limpiarDatos(); 

    let misionData = [];
    if (tipo === 'triangulo') {
        misionData = [{ x: 0, y: 0 }, { x: 5, y: 10 }, { x: 10, y: 0 }];
    } else if (tipo === 'aceleracion') {
        misionData = [{ x: 0, y: 0 }, { x: 2, y: 4 }, { x: 4, y: 16 }, { x: 6, y: 36 }];
    } else if (tipo === 'pulso') {
        misionData = [{ x: 0, y: 5 }, { x: 2, y: 8 }, { x: 4, y: 5 }, { x: 6, y: 2 }, { x: 8, y: 5 }];
    }

    puntos = misionData;
    actualizarListaUI();
    actualizarTodo();
}

// --- LÓGICA DE ACTUALIZACIÓN ---

function actualizarTodo() {
    if (puntos.length < 2) return;

    const n = parseInt(dom.nSlider().value);
    dom.nVal().innerText = n;

    // Actualizar Gráfico Chart.js
    mainChart.data.datasets[1].data = puntos; 
    mainChart.data.datasets[0].data = generarPuntosRiemann(n);
    mainChart.update('none');

    // Actualizar Cálculos en UI
    dom.areaRiemann().innerText = calcularAreaRiemann(n).toFixed(4);
    dom.areaTrapecio().innerText = calcularAreaTrapecio().toFixed(4);
    
    if (dom.logPuntos()) dom.logPuntos().innerText = puntos.length;
}

// --- MATEMÁTICAS ---

function calcularAreaTrapecio() {
    let area = 0;
    for (let i = 0; i < puntos.length - 1; i++) {
        let dx = puntos[i + 1].x - puntos[i].x;
        area += ((puntos[i].y + puntos[i + 1].y) / 2) * dx;
    }
    return area;
}

function calcularAreaRiemann(n) {
    const xMin = puntos[0].x, xMax = puntos[puntos.length - 1].x;
    const dx = (xMax - xMin) / n;
    let suma = 0;
    for (let i = 0; i < n; i++) {
        suma += interpolarY(xMin + i * dx);
    }
    return suma * dx;
}

function interpolarY(targetX) {
    for (let i = 0; i < puntos.length - 1; i++) {
        const p1 = puntos[i], p2 = puntos[i + 1];
        if (targetX >= p1.x && targetX <= p2.x) {
            return p1.y + (targetX - p1.x) * (p2.y - p1.y) / (p2.x - p1.x);
        }
    }
    return 0;
}

function generarPuntosRiemann(n) {
    const xMin = puntos[0].x, xMax = puntos[puntos.length - 1].x;
    const dx = (xMax - xMin) / n;
    const rData = [];
    for (let i = 0; i < n; i++) {
        let xi = xMin + i * dx;
        let yi = interpolarY(xi);
        rData.push({ x: xi, y: yi });
        rData.push({ x: xi + dx, y: yi }); // Crea el "techo" del escalón
    }
    return rData;
}

// --- UTILIDADES ---

function agregarPunto() {
    const inX = document.getElementById('inputX'), inY = document.getElementById('inputY');
    let x = parseFloat(inX.value), y = parseFloat(inY.value);

    if (!isNaN(x) && !isNaN(y)) {
        if (puntos.some(p => p.x === x)) return mostrarAlerta('warning', `El punto con x=${x} ya existe.`);
        puntos.push({ x, y });
        puntos.sort((a, b) => a.x - b.x);
        actualizarListaUI();
        actualizarTodo();
        inX.value = ''; inY.value = ''; inX.focus();
    }
}

function actualizarListaUI() {
    dom.listaPuntos().innerHTML = puntos.map(p =>
        `<div class="flex justify-between border-b border-slate-800 py-2">
            <span class="text-indigo-400 italic">x:${p.x}</span>
            <span class="text-emerald-400 font-bold">y:${p.y}</span>
        </div>`
    ).join('');
}

function limpiarDatos() {
    puntos = [];
    actualizarListaUI();
    mainChart.data.datasets.forEach(d => d.data = []);
    mainChart.update();
    dom.areaRiemann().innerText = "0.0000";
    dom.areaTrapecio().innerText = "0.0000";
}

// Funciones auxiliares de mapeo para el canvas manual
function getRangeX() { return puntos.length > 0 ? Math.max(...puntos.map(p => p.x), 10) : 10; }
function mapX(x) { return map(x, 0, getRangeX(), 60, width - 40); }
function mapY(y) {
    let maxY = puntos.length > 0 ? Math.max(...puntos.map(p => p.y), 10) : 10;
    return map(y, 0, maxY, height - 60, 40);
}

function dibujarEjes() {
    stroke(50); strokeWeight(2);
    line(60, 0, 60, height - 60); line(60, height - 60, width, height - 60);
    fill(100); noStroke(); textSize(12);
    text("Y", 45, 30); text("X", width - 20, height - 40);
}

function dibujarInstruccion() {
    fill(150); textAlign(CENTER); noStroke();
    text("Esperando coordenadas para graficar...", width / 2, height / 2);
    textAlign(LEFT);
}

function mostrarAlerta(tipo, mensaje) {
    const container = document.getElementById('alert-container');
    
    // Configuración de estilos por tipo
    const estilos = {
        success: { bg: 'bg-green-100 dark:bg-green-900', border: 'border-green-500', text: 'text-green-900 dark:text-green-100', icon: 'text-green-600', label: 'Éxito' },
        info:    { bg: 'bg-blue-100 dark:bg-blue-900',   border: 'border-blue-500',  text: 'text-blue-900 dark:text-blue-100',   icon: 'text-blue-600',  label: 'Info' },
        warning: { bg: 'bg-yellow-100 dark:bg-yellow-900', border: 'border-yellow-500', text: 'text-yellow-900 dark:text-yellow-100', icon: 'text-yellow-600', label: 'Aviso' },
        error:   { bg: 'bg-red-100 dark:bg-red-900',    border: 'border-red-500',   text: 'text-red-900 dark:text-red-100',    icon: 'text-red-600',   label: 'Error' }
    };

    const s = estilos[tipo] || estilos.info;

    // Crear el elemento de la alerta
    const alerta = document.createElement('div');
    alerta.className = `${s.bg} border-l-4 ${s.border} ${s.text} p-3 rounded-lg flex items-center transition duration-300 ease-in-out transform hover:scale-105 shadow-lg`;
    alerta.setAttribute('role', 'alert');

    alerta.innerHTML = `
        <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" class="h-5 w-5 flex-shrink-0 mr-2 ${s.icon}" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"></path>
        </svg>
        <p class="text-xs font-semibold">${s.label} - ${mensaje}</p>
    `;

    container.appendChild(alerta);

    // Eliminar automáticamente después de 3 segundos con efecto de desvanecimiento
    setTimeout(() => {
        alerta.style.opacity = '0';
        alerta.style.transform = 'translateX(20px)';
        setTimeout(() => alerta.remove(), 300);
    }, 3000);
}