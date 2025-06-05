# KeyNest - Aplicación para Local Verificado

Esta es una Progressive Web App (PWA) para la interfaz de un "Local Verificado" en un sistema de intercambio de llaves. La aplicación permite confirmar la recepción y entrega de llaves utilizando códigos de transacción.

## Tecnologías utilizadas

- React con Vite
- TypeScript
- PWA (con vite-plugin-pwa)
- Hooks de React para gestión de estado (useState, useReducer)

## Características

- Confirmación de recepción de llaves
- Confirmación de entrega de llaves
- Interfaz simple y funcional
- Experiencia PWA para instalación en dispositivos móviles

## Estructura del proyecto

```
src/
  ├── components/            # Componentes UI reutilizables
  │   └── KeyActionForm.tsx  # Formulario para acciones de llaves
  ├── features/
  │   └── keyExchange/       # Feature específica de intercambio de llaves
  │       ├── hooks/         # Custom hooks
  │       │   └── useKeyExchange.ts
  │       └── screens/       # Pantallas/páginas
  │           └── LocalDashboardScreen.tsx
  ├── services/              # Servicios (ej: llamadas a API)
  │   └── api.ts
  ├── App.tsx                # Componente principal
  └── main.tsx               # Punto de entrada
```

## Comandos disponibles

- `npm install` - Instala las dependencias
- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la versión construida

## Flujo de uso

1. El usuario (local verificado) accede a la aplicación
2. Selecciona la acción que desea realizar:
   - "Confirmar Recepción de Llave" cuando recibe una llave
   - "Confirmar Entrega de Llave" cuando entrega una llave
3. Ingresa el código de transacción proporcionado
4. Confirma la acción
5. Recibe confirmación visual del resultado de la operación
