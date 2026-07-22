import { auth, db } from "./firebase.js";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
    collection,
    getDocs,
    doc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const ETIQUETAS_DISPONIBILIDAD = {
    'manana': 'Mañanas',
    'tarde': 'Tardes',
    'fin-semana': 'Fines de semana',
    'flexible': 'Flexible'
};

const ETIQUETAS_ESTADO = {
    'pendiente': 'Pendiente',
    'preseleccionado': 'Preseleccionado',
    'entrevistado': 'Entrevistado',
    'aprobado': 'Aprobado',
    'rechazado': 'Rechazado'
};

const loginBox = document.getElementById('login-box');
const panelBox = document.getElementById('panel-box');
const loginError = document.getElementById('login-error');

let postulantesCache = [];

//Login o logout
document.getElementById('btn-login').addEventListener('click', async () => {
    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-pass').value;

    loginError.textContent = '';

    try {
        await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
        loginError.textContent = 'Correo o contraseña incorrectos';
    }
});

document.getElementById('btn-logout').addEventListener('click', () => signOut(auth));

onAuthStateChanged(auth, (user) => {
    if (user) {
        loginBox.style.display = 'none';
        panelBox.style.display = 'block';
        cargarPostulantes();
    } else {
        loginBox.style.display = 'block';
        panelBox.style.display = 'none';
    }
});

//CARGAR LOS DATOS

async function cargarPostulantes() {
    const ref = collection(db, 'convocatorias/2026-Q1/postulantes');
    const snap = await getDocs(ref);
    postulantesCache = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    probarFiltroHospitales();
    renderTabla();
}

function probarFiltroHospitales() {
    const select = document.getElementById('filtro-hospital');
    select.querySelectorAll('option:not(:first-child)').forEach(o => o.remove());

    const hospitales = [...new Set(
        postulantesCache.map(p => p.hospital_seleccionado).filter(Boolean)
    )];

    hospitales.forEach(h => {
        const opt = document.createElement('option');
        opt.value = h;
        opt.textContent = h;
        select.appendChild(opt);
    });
}

//RENDER TABLA
function renderTabla() {
    const filtroHospital = document.getElementById('filtro-hospital').value;
    const filtroEstado = document.getElementById('filtro-estado').value;
    const tbody = document.getElementById('tabla-postulantes');
    const sinResultados = document.getElementById('sin-resultados');
    const contador = document.getElementById('contador-resultados');

    tbody.innerHTML = '';

    const filtrados = postulantesCache.filter(p =>
        (!filtroHospital || p.hospital_seleccionado === filtroHospital) &&
        (!filtroEstado || p.estado_proceso === filtroEstado)
    );

    contador.textContent = `${filtrados.length} de ${postulantesCache.length} postulantes`;
    sinResultados.style.display = filtrados.length ? 'none' : 'block';

    filtrados.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${p.nombre || ''}</td>
            <td>${p.edad ?? ''}</td>
            <td>${p.hospital_seleccionado || ''}</td>
            <td>${ETIQUETAS_DISPONIBILIDAD[p.disponibilidad] || p.disponibilidad || ''}</td>
            <td>${p.celular || ''}</td>
            <td>
                <select class="panel-estado-select" data-id="${p.id}" data-estado="${p.estado_proceso}">
                    ${Object.entries(ETIQUETAS_ESTADO)
                .map(([valor, etiqueta]) =>
                    `<option value="${valor}" ${valor === p.estado_proceso ? 'selected' : ''}>${etiqueta}</option>`
                ).join('')}
                 </select>
            </td>
        `;
        tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.panel-estado-select').forEach(sel => {
        sel.addEventListener('change', async (e) => {
            const id = e.target.dataset.id;
            const nuevoEstado = e.target.value;

            e.target.disable = true;
            try {
                await updateDoc(doc(db, 'convocatorias/2026-Q1/postulantes', id), {
                    estado_proceso: nuevoEstado
                });
                e.target.dataset.estado = nuevoEstado;
                const item = postulantesCache.find(p => p.id === id);
                if (item) item.estado_proceso = nuevoEstado;

            } catch (err) {
                alert('No se pudo actualizar el estado.intenta de nuevo');
                e.target.value = e.target.dataset.estado;
            } finally {
                e.target.disable = false;
            }
        });
    });

}

document.getElementById('filtro-hospital').addEventListener('change', renderTabla);
document.getElementById('filtro-estado').addEventListener('change', renderTabla);