# Conversor de Monedas - Frontend

Conversor de divisas con soporte para USD, EUR, PEN (Soles Peruanos) y CNY (Yuanes Chinos).

## Características

- Conversión entre 4 monedas: USD, EUR, PEN, CNY
- Matriz de permisos para combinaciones permitidas
- Gráfico histórico de los 5 últimos tipos de cambio
- Endpoint mocking emulado
- Interfaz responsiva

## Installation

```bash
npm install
```

## Desarrollo

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

## Construcción

Build para producción:

```bash
npm run build
```

## Pruebas

Ejecutar tests unitarios:

```bash
npm test
```

Ejecutar tests en modo watch:

```bash
npm run test:watch
```

## Tecnologías

- React 19
- TypeScript
- Recharts
- Vitest
- Vite

## Estructura del Proyecto

```
src/
├── components/       # Componentes React
│   ├── CurrencyConverter.tsx
│   ├── CurrencyInput.tsx
│   ├── HistoricalChart.tsx
│   └── BackendConfig.tsx
├── hooks/             # Custom hooks
│   └── useExchangeRate.ts
├── services/         # Servicios API
│   └── exchangeApi.ts
├── constants/        # Constantes
│   └── currencies.ts
├── types/            # Tipos TypeScript
│   └── index.ts
└── test/            # Configuración de pruebas
    └── setup.ts
```