# KeyNest - Sistema de Intercambio de Llaves

Esta es una Progressive Web App (PWA) para gestionar el intercambio de llaves entre propietarios y locales verificados. La aplicación incluye interfaces tanto para propietarios como para locales, permitiendo la generación de códigos de transacción, confirmación de recepción y entrega de llaves.

## Tecnologías utilizadas

- React con Vite
- TypeScript
- Node.js con Express (Backend)
- PWA (con vite-plugin-pwa)
- Custom Hooks de React para gestión de estado
- Notificaciones del navegador
- API REST
- Servicios modulares para autenticación, notificaciones y pagos
- TypeScript para seguridad de tipos

## Características

### Para Locales Verificados
- Confirmación de recepción de llaves
- Confirmación de entrega de llaves
- Vista de transacciones y estadísticas
- Notificaciones de cambios de estado

### Para Propietarios
- Generación de códigos de transacción
- Selección del local donde depositar la llave
- Estadísticas de transacciones
- Notificaciones cuando las llaves son recibidas/entregadas

### Funcionalidades Generales
- Procesamiento automático de pagos al entregar la llave
- Interfaz responsive y moderna
- Experiencia PWA para instalación en dispositivos móviles

## Estructura del proyecto

```
├── src/                     # Código fuente del frontend
│   ├── components/          # Componentes UI reutilizables
│   │   ├── AppSwitcher.tsx  # Selector de tipo de usuario
│   │   ├── KeyActionForm.tsx # Formulario para acciones de llaves
│   │   ├── LocalApp.tsx     # Aplicación para locales verificados
│   │   ├── OwnerApp.tsx     # Aplicación para propietarios
│   │   └── TransactionStats.tsx # Componente de estadísticas
│   ├── config/              # Configuraciones del cliente
│   │   └── constants.ts     # Constantes compartidas (estados de llaves, etc.)
│   ├── features/            # Módulos de características organizados por dominio
│   │   ├── auth/            # Autenticación para locales
│   │   │   └── hooks/       # Custom hooks de autenticación
│   │   ├── keyExchange/     # Intercambio de llaves
│   │   └── owner/           # Funcionalidades del propietario
│   │       └── hooks/       # Custom hooks para propietarios
│   ├── services/            # Servicios compartidos
│   │   ├── api.ts           # Cliente API para comunicación con backend
│   │   └── notificationService.ts # Servicio de notificaciones
│   └── App.tsx              # Componente principal
├── server/                  # Código del backend
│   ├── config/              # Configuraciones del servidor
│   │   └── config.ts        # Constantes y configuración
│   ├── controllers/         # Controladores de API
│   ├── models/              # Modelos de datos
│   │   ├── database.ts      # Gestión de almacenamiento
│   │   └── interfaces.ts    # Interfaces TypeScript
│   ├── routes/              # Rutas de API
│   │   ├── authRoutes.ts    # Rutas de autenticación
│   │   ├── keyRoutes.ts     # Rutas para gestión de llaves
│   │   └── ownerRoutes.ts   # Rutas para propietarios
│   └── services/            # Servicios del servidor
```

## Comandos disponibles

- `npm install` - Instala las dependencias
- `npm run dev` - Inicia el servidor de desarrollo del frontend
- `npm run dev-server` - Inicia el servidor backend en modo desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la versión construida
- `npm run server` - Inicia el servidor backend en modo producción

## Flujo de uso para Locales Verificados

1. El usuario accede a la aplicación y selecciona "Acceder como Local Verificado"
2. Ingresa el ID del local para autenticarse
3. En el dashboard, puede:
   - Ver estadísticas de transacciones
   - Seleccionar "Confirmar Recepción de Llave" cuando recibe una
   - Seleccionar "Confirmar Entrega de Llave" cuando la entrega
   - Ver el historial de transacciones

## Flujo de uso para Propietarios

1. El usuario accede a la aplicación y selecciona "Acceder como Propietario"
2. Ingresa su ID de propietario para autenticarse
3. En el dashboard, puede:
   - Generar un nuevo código de transacción
   - Seleccionar el local donde se depositará la llave
   - Copiar el código generado para compartirlo
   - Ver estadísticas y el historial de transacciones
5. Recibe confirmación visual del resultado de la operación

## Cambios recientes

### Mejoras de estabilidad y compatibilidad
- Reemplazado el `enum KeyStatus` por un objeto constante para mejorar la compatibilidad con TypeScript
- Separación de constantes entre cliente y servidor para evitar errores como "process is not defined"
- Corrección de la implementación de rutas Express para adaptarlas a Express 5
- Simplificación de la estructura de componentes de autenticación para eliminar componentes intermedios redundantes

### Mejoras de arquitectura
- Implementación de un sistema de tipos más seguro y consistente
- Reorganización de servicios para mejorar la modularidad
- Separación clara entre constantes del cliente y del servidor

## Tareas pendientes
- Implementar pruebas del flujo completo entre frontend y backend
- Migrar al almacenamiento persistente en lugar de memoria
- Implementar sistema de control de versiones para el proyecto

## Requisitos del sistema
- Node.js v14.0 o superior
- npm v6.0 o superior
- Navegador compatible con PWA (Chrome, Firefox, Edge, Safari)
