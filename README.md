# Amadeus

Amadeus es un proyecto de Angular diseñado para describir cual es el viaje de tus sueños.

## Servicios y Componentes
- **ReportsService**: Servicio agregado para hacer solicitudes GET a la API de reportes usando axios.
- **ReportsComponent**: Componente creado para mostrar los datos de reportes obtenidos desde el backend.
- **Template de ReportsComponent**: Añadido un botón para actualizar el reporte y una vista condicional (*ngIf) para mostrar los datos en formato JSON.

## Instalación

Para instalar y configurar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/d4lion/Reto-Amadeus-Grupo-1.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd Reto-Amadeus-Grupo-1
   ```

3. instala las dependecias:
   ```bash
   npm install
   ```

## Despligue

Correr el servidor local (puerto por defecto localhost:4200)

```bash
ng serve
```

Luego, abre tu navegador y navega a http://localhost:4200/ una vez allí descubre tu viaje

## Reglas del Bundler

### Import alias

En el compilador dentro del archivo `tsconfig.json` se pueden definir _impor alias_ los cuales nos van a permitir
importar archivos usando de manera corta algun tipo de sintaxis, en este caso para definir o ver las existentes
debes revisar dentro del archivo `tsconfig.json` en su propiedad `compilerOptions` el apartado `paths`, se verá de esta manera:

```json
"compilerOptions": {
    "outDir": "./dist/out-tsc",
    "baseUrl": "./src",
    "paths": {
      "@services/*": ["app/services/*"],
      "@assets/*": ["assets/*"],
      "@components/*": ["app/components/*"]
},
```

### Uso de import alias

viendo la estructura del objeto aterior con los `paths` que se definieron puedes hacer imports de la siguiente
manera:

```typescript
import { someThing } from "@service/someService";
```
