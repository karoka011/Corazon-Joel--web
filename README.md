## Corazon Joel de Jesus - Proyecto "Arrullando a las Infancias"

**Arrulladorando a las infancias** es un modelo de acompañamiento a niñas, niños y adolescentes hospitalizados, cuyo objetivo es reducir el estrés y la ansiedad que viven ellos y sus familias durante la hospitalización. Este sitio es la puerta de entrada del proceso de reclutamiento de voluntarios: comunica la misión del proyecto, captura el registro de aspirantes y sienta las bases para dar seguimiento ordenado a cada persona que quiere sumarse.

**Zona piloto:** Guadalajara, Jalisco.

---

## Tecnologia Involucrada
| Capa | Tecnología |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (vanilla, sin frameworks) |
| Componentes compartidos | `partials/` (header y footer) inyectados vía `fetch()` |
| Base de datos (planeada) | Firebase Firestore |
| Hosting (planeado) | Firebase Hosting |
| Entorno de desarrollo | VS Code + extensión **Live Server** |


## Estructura del Proyecto
```
arrulladoras-web/
├── index.html              # Página de inicio
├── quienes-somos.html      # Quiénes somos / misión de la organización
├── proyecto.html           # Detalle del proyecto Arrulladoras
├── registro.html           # Formulario de registro de voluntarios
├── partials/
│   ├── header.html         # Header reutilizable (logo, navegación)
│   └── footer.html         # Footer reutilizable
├── css/
│   └── style.css           # Estilos con la identidad de marca de la organización
├── js/
│   ├── includes.js         # Inyecta header/footer vía fetch()
│   └── main.js             # Lógica del sitio y validaciones del formulario
└── img/                    # Recursos gráficos (logo, fotos, etc.)
```
## Progreso Realizado

- [x] Estructura HTML de todas las páginas + header/footer reutilizables
- [x] Identidad visual completa aplicada en CSS
- [x] Validaciones de formulario en JavaScript
- [x] Proyecto Firebase creado, Firestore configurado con reglas de seguridad
- [ ] Conectar el formulario a Firestore (`addDoc`) para guardar postulantes
- [ ] Desplegar el sitio con Firebase Hosting
- [ ] Pruebas end-to-end y ajustes
- [ ] (Opcional) Panel simple de administración para ver registros
- [ ] Automatización de correos por cambio de estado (extensión Trigger Email de Firebase)
- [ ] Dashboards de KPIs, bandeja de postulantes y expediente digital (fase posterior)

## Como correr el proyecto localmente (por ahora)

1. Clona el repositorio:

    ```bash
   git clone <url-del-repositorio>
   cd arrulladoras-web
   ```

2. Abre la carpeta en VS Code.
3. Instala la extensión Live Server (si no la tienes).
4. Click derecho sobre index.html → "Open with Live Server".
5. El sitio se abrirá en http://127.0.0.1:5500 (o puerto similar) con header y footer cargando correctamente.

## Para la Continuacion del proyecto

Este sitio fue desarrollado como parte de un servicio social y está pensado para que otra persona pueda darle continuidad sin perder el contexto:

- Respeta la estructura de `partials/` + `includes.js`: **no dupliques** el header o footer directamente en cada página.
- Antes de modificar los nombres de los campos del formulario o de Firestore, verifica que coincidan con los ya usados en `registro.html` — los ejemplos de la documentación de arquitectura son ilustrativos, no literales.
- Cualquier cambio a las reglas de seguridad de Firestore debe probarse en el simulador de reglas de Firebase antes de publicarse, dado que se manejan datos sensibles de personas (incluyendo datos relacionados con menores hospitalizados).

## Contribuciones
Este proyecto es parte del trabajo de servicio social para la organización Corazón Joel de Jesús. Si formas parte de un futuro periodo de servicio social o voluntariado técnico y quieres continuarlo, contacta a la organización para coordinar acceso al proyecto de Firebase y a los lineamientos de marca.


## Licencia
Uso interno para la organización Corazón Joel de Jesús. Consulta con la organización antes de reutilizar el código o los contenidos fuera de este contexto.
