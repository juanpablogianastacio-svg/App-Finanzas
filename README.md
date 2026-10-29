# Finanzas personales

App web sencilla para registrar ingresos y gastos personales. Hecha con **Vite + React + TypeScript**, sin backend ni login: los datos se guardan en el `localStorage` del navegador.

## Funcionalidades

- Agregar movimientos con tipo (ingreso/gasto), monto, descripción, categoría y fecha (por defecto, hoy).
- Lista de movimientos ordenada del más reciente al más antiguo.
- Editar y eliminar movimientos.
- Resumen con total de ingresos, total de gastos y saldo.
- Filtro por mes (o ver todos los meses).
- Categorías predefinidas: Comida, Transporte, Servicios, Ocio, Salud, Sueldo, Otros.
- Montos en pesos argentinos (`$ 1.234,56`), interfaz en español y diseño responsive.

> Los datos quedan guardados solo en el navegador y dispositivo donde los cargás. Si borrás los datos del sitio, se pierden.

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior (recomendado 20+).

## Instalación

```bash
npm install
```

## Correr en desarrollo

```bash
npm run dev
```

Después abrí la URL que muestra la consola (por ejemplo `http://localhost:5173/App-Finanzas/`).

## Build de producción

```bash
npm run build
```

Los archivos quedan en la carpeta `dist/`. Para probar el build localmente:

```bash
npm run preview
```

## Deploy en GitHub Pages

El repositorio incluye un workflow (`.github/workflows/deploy.yml`) que compila y publica la app en GitHub Pages en cada push a `main`.

1. El repositorio en GitHub se llama `App-Finanzas`.
   Si usás otro nombre, cambiá `base` en `vite.config.ts` a `'/<nombre-del-repo>/'`.
2. En GitHub, andá a **Settings → Pages** y en **Source** elegí **GitHub Actions**.
3. Hacé push a `main`. La app queda publicada en `https://<tu-usuario>.github.io/App-Finanzas/`.

## Estructura

```
src/
├── components/          # Componentes de UI
│   ├── FiltroMes.tsx
│   ├── FormularioMovimiento.tsx
│   ├── ListaMovimientos.tsx
│   └── Resumen.tsx
├── hooks/
│   ├── useLocalStorage.ts   # Estado persistido en localStorage
│   └── useMovimientos.ts    # Alta, edición y baja de movimientos
├── utils/
│   └── formato.ts       # Formato de pesos, fechas y parseo de montos
├── types.ts             # Tipos y categorías
├── App.tsx
├── main.tsx
└── index.css
```
