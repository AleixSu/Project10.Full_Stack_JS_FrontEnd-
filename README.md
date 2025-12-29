# EventHub - Frontend (Vite + Vanilla JavaScript)

Aplicación web construida con **Vite** y **JavaScript Vanilla** para la gestión de eventos y localizaciones.

Interfaz moderna y responsive que consume la API REST de EventHub, permitiendo registro de usuarios, navegación de eventos, inscripciones y gestión de perfil.

---

## Aplicación desplegada

Frontend (Vercel): https://project10-full-stack-js-front-end-git-main-aleixsus-projects.vercel.app
Repositorio BackEnd: https://github.com/AleixSu/Project10.Full_Stack_JS_BackEnd
Backend desplegado (Render): https://project10-full-stack-js-backend.onrender.com

## Instalación y uso

### 1. Clona el repositorio:

```bash
git clone https://github.com/AleixSu/Project10.Full_Stack_JS_FrontEnd
```

### 2. Entra al directorio:

```bash
cd eventhub-frontend-vite
```

### 3. Instala dependencias:

```bash
npm install
```

### 4. Crea archivo `.env` en la raíz:

```env
VITE_API_URL=http://localhost:3000/api/v1
```

Para producción, usa la URL de tu backend desplegado:

```env
VITE_API_URL=https://project10-full-stack-js-backend.onrender.com/api/v1
```

### 5. Inicia servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:5173`

### 6. Build para producción:

```bash
npm run build
```

### 7. Preview del build:

```bash
npm run preview
```

---

## 📁 Estructura del proyecto

```
eventhub-frontend-vite/
├── public/
│   ├── images/           # Imágenes estáticas
│   └── favicon.ico
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── header/
│   │   ├── footer/
│   │   └── cards/
│   ├── pages/            # Páginas principales
│   │   ├── home/
│   │   ├── events/
│   │   ├── locations/
│   │   ├── profile/
│   │   ├── login/
│   │   └── register/
│   ├── utils/            # Utilidades
│   │   ├── api.js        # Gestión de API
│   │   ├── router.js     # Sistema de routing
│   │   └── auth.js       # Gestión de autenticación
│   ├── styles/           # Estilos CSS
│   │   ├── global.css
│   │   └── components/
│   ├── main.js           # Punto de entrada
│   └── style.css         # Estilos globales
├── index.html            # HTML principal
├── .env                  # Variables de entorno
├── vite.config.js        # Configuración de Vite
└── package.json
```

---

## Funcionalidades

### Autenticación

- Registro de usuarios con validación
- Login con JWT
- Protección de rutas privadas
- Persistencia de sesión con localStorage
- Logout

### Perfil de usuario

- Visualización de perfil
- Edición de datos personales
- Subida de foto de perfil
- Visualización de eventos inscritos
- Actualización en tiempo real

### Eventos

- Listado de todos los eventos
- Filtrado por país/localización
- Detalle completo de cada evento
- Inscripción a eventos
- Cancelación de inscripción
- Visualización de aforo disponible
- Contador de asistentes en tiempo real

### Localizaciones

- Listado de países/localizaciones
- Eventos por localización
- Navegación entre localizaciones
- Filtrado dinámico

### UI/UX

- Diseño responsive (mobile-first)
- Sistema de routing SPA (Single Page Application)
- Mensajes de éxito/error
- Loading states
- Animaciones y transiciones suaves
- Imágenes optimizadas con Cloudinary

---

## Tecnologías usadas

### Core

- **Vite** - Build tool ultrarrápido
- **JavaScript Vanilla (ES6+)** - Sin frameworks
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos

### Características de ES6+ utilizadas

- **Módulos ES6** (`import`/`export`)
- **Async/Await** - Manejo asíncrono
- **Template Literals** - Strings dinámicos
- **Destructuring** - Desestructuración
- **Arrow Functions** - Funciones flecha
- **Spread Operator** - Operador spread
- **Classes** - Programación orientada a objetos

### Herramientas

- **Fetch API** - Peticiones HTTP
- **localStorage** - Persistencia de datos
- **History API** - Navegación SPA
- **FormData** - Subida de archivos

---

## Arquitectura del proyecto

### Sistema de Routing personalizado

El proyecto implementa un sistema de routing SPA sin librerías externas:

```javascript
// src/utils/router.js
export const navigate = (path) => {
  window.history.pushState({}, '', path)
  router()
}

export const router = () => {
  const path = window.location.pathname

  const routes = {
    '/': HomePage,
    '/events': EventsPage,
    '/locations': LocationsPage,
    '/profile': ProfilePage,
    '/login': LoginPage,
    '/register': RegisterPage
  }

  const page = routes[path] || NotFoundPage
  page()
}
```

### Gestión de autenticación

```javascript
// src/utils/auth.js
export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null
}

export const getUser = () => {
  return JSON.parse(localStorage.getItem('user'))
}

export const getToken = () => {
  return localStorage.getItem('token')
}
```

### API Integration

Utilidad centralizada para comunicación con el backend:

```javascript
// src/utils/api.js
const API_URL = import.meta.env.VITE_API_URL

export const API = async ({
  endpoint,
  method = 'GET',
  body,
  isJSON = true,
  token = null
}) => {
  const headers = {
    Authorization: `Bearer ${token}`
  }

  if (isJSON) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: isJSON ? JSON.stringify(body) : body
  })

  const data = await response.json()
  return { status: response.status, data }
}
```

---

## Diseño y estilos

### Metodología CSS

- **CSS Modules** - Estilos encapsulados por componente
- **BEM Naming** - Convención de nombres
- **CSS Custom Properties** - Variables CSS para tematización
- **Flexbox & Grid** - Layouts modernos
- **Mobile-first** - Diseño responsive

### Paleta de colores

```css
:root {
  --color-primary: #667eea;
  --color-secondary: #764ba2;
  --color-accent: #f093fb;
  --color-bg: #0f0f0f;
  --color-surface: #1a1a1a;
  --color-text: #ffffff;
  --color-text-secondary: #a0a0a0;
  --color-border: #333333;
  --color-success: #10b981;
  --color-error: #ef4444;
  --color-warning: #f59e0b;
}
```

### Breakpoints responsive

```css
/* Mobile: < 768px */
/* Tablet: 768px - 1024px */
/* Desktop: > 1024px */

@media (max-width: 768px) {
  /* Estilos mobile */
}

@media (min-width: 769px) and (max-width: 1024px) {
  /* Estilos tablet */
}
```

---

## Variables de entorno

```env
# Desarrollo local
VITE_API_URL=http://localhost:3000/api/v1

# Producción
VITE_API_URL=https://project10-full-stack-js-backend.onrender.com/api/v1
```

**Nota:** Las variables deben empezar con `VITE_` para ser accesibles en Vite.

---

## Testing local

### 1. Asegúrate de que el backend esté corriendo

```bash
# En otra terminal, inicia el backend
cd ../backend
npm run dev
```

### 2. Configura la URL correcta en `.env`

```env
VITE_API_URL=http://localhost:3000/api/v1
```

### 3. Ejecuta el frontend

```bash
npm run dev
```

### 4. Prueba las siguientes funcionalidades:

- Registro de nuevo usuario
- Login con usuario existente
- Navegación entre páginas
- Visualización de eventos
- Inscripción a eventos
- Edición de perfil
- Subida de imagen de perfil
- Logout

---

## 🌐 Despliegue

### Producción: Vercel (Recomendado)

#### 1. Prepara tu proyecto

Asegúrate de que `vite.config.js` esté correctamente configurado:

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
```

#### 2. Sube a GitHub

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 3. Despliega en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click en "Add New..." → "Project"
3. Importa tu repositorio
4. Configuración:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Configura variables de entorno:
   ```
   VITE_API_URL=https://project10-full-stack-js-backend.onrender.com/api/v1
   ```
6. Click en "Deploy"

#### 4. URL final

Tu aplicación estará disponible en:

```
https://tu-proyecto.vercel.app
```

### Alternativas de despliegue

- **Netlify** - Similar a Vercel
- **GitHub Pages** - Para proyectos estáticos
- **Render** - Hosting completo

---

## Scripts disponibles

```bash
npm run dev        # Servidor de desarrollo (puerto 5173)
npm run build      # Build de producción en /dist
npm run preview    # Preview del build de producción
```

---

## Diferencias con la versión React

| Aspecto           | Versión React       | Versión Vite Vanilla         |
| ----------------- | ------------------- | ---------------------------- |
| Framework         | React 18            | JavaScript Vanilla           |
| Gestión de estado | Context API + Hooks | localStorage + Variables     |
| Routing           | React Router        | History API custom           |
| Componentes       | JSX                 | Template Literals            |
| Re-renderizado    | Virtual DOM         | Manipulación DOM directa     |
| Formularios       | React Hook Form     | FormData + Validación manual |
| Bundle size       | ~150KB              | ~50KB                        |
| Performance       | Excelente           | Mejor (menos overhead)       |

### Ventajas de la versión Vanilla:

- **Más ligera** - Bundle más pequeño
- **Más rápida** - Menos abstracción
- **Mejor para aprender** - Entiendes cómo funciona todo
- **Sin dependencias** - No dependes de librerías externas

### Ventajas de la versión React:

- **Más escalable** - Mejor para proyectos grandes
- **Ecosistema** - Más librerías disponibles
- **Comunidad** - Más recursos y ayuda
- **Desarrollo más rápido** - Componentes reutilizables

---

## Problemas conocidos y soluciones

### CORS errors

**Problema:** `Access-Control-Allow-Origin` error  
**Solución:** Verifica que el backend tenga configurado CORS para tu dominio de Vercel

### Token expirado

**Problema:** Usuario deslogueado automáticamente  
**Solución:** Implementa refresh token o aumenta duración del JWT

### Imágenes no cargan

**Problema:** 404 en imágenes  
**Solución:**

- Verifica que estén en `public/images/`
- Usa rutas absolutas: `/images/nombre.jpg`
- O usa URLs de Cloudinary

### Navegación no funciona

**Problema:** Al recargar página da 404  
**Solución:** Vercel ya maneja esto automáticamente con `vercel.json`

---

### JavaScript Vanilla

- [MDN Web Docs](https://developer.mozilla.org/)
- [ES6 Features](http://es6-features.org/)

### APIs Web

- [Fetch API](https://developer.mozilla.org/es/docs/Web/API/Fetch_API)
- [History API](https://developer.mozilla.org/es/docs/Web/API/History_API)
- [LocalStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)

---

## 👤 Autor

**Tu Nombre**  
GitHub: https://github.com/AleixSu

---
