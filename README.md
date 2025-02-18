# Amadeus

Amadeus es un proyecto de Angular diseñado para describir cual es el viaje que deseas realizar.

## Servicios y Componentes
- **ReportsService**: Servicio agregado para hacer solicitudes GET a la API de reportes usando axios.

## Instalación

Para instalar y configurar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio en la carpeta que desees:

   Ejemplo: "C:\Users\ROG STRIX\Desktop\reto-front-francisco"

   ```cmd
   git clone https://github.com/franciscoJoseEchavarria/frontend-amadeus.git
   ```

2. Navega al directorio del proyecto en tu carpeta local

   ```cmd
   cd "ubicación del proyecto en tu carpeta local"
   
   ```

3. abrir VSC con el comando code .

   cd "C:\Users\ROG STRIX\Desktop\reto-front-francisco\Amadeus-main (2)\Amadeus-main"  

   code .

4. Ya dentro de las del VSC, descargar las dependencias que necesita el proyecto. En la terminal de VSC ejecuta el siguient comando:
   
   npm install
  

## Despligue

Correr el servidor local (puerto por defecto localhost:4200)

```bash
ng serve
```

Luego, abre tu navegador y navega a http://localhost:4200/ una vez allí descubre tu viaje

## A tener en cuenta

El desarrollo de esta pagina toma datos directamente del backend de Java, por tal motivo, se debe descargar el programa de Java Amadeus y correr en conjunto con este. Los datos Destino, junto con las rutas de las imagenes son traidos directamente.