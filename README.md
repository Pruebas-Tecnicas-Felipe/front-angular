# Proyecto Angular 18 - Dashboard con Filtro por Categoría

Este es un proyecto Angular 18 que muestra una tabla con posts y un filtro de texto para filtrar los resultados por categoría.

## Requisitos previos

Asegúrate de tener instalados los siguientes programas:

1. **Node.js** (versión 16 o superior)  
   Puedes descargarlo desde [Node.js](https://nodejs.org/).

2. **Angular CLI** (Command Line Interface)  
   Instálalo globalmente ejecutando el siguiente comando:
   ```bash
   npm install -g @angular/cli
3. **Git** Si no lo tienes instalado, puedes descargarlo desde Git.

4. **Editor de código** (por ejemplo, Visual Studio Code) Puedes descargarlo desde Visual Studio Code.

## 5. Pasos para clonar y ejecutar el proyecto
Sigue los siguientes pasos para clonar el repositorio y ejecutar el proyecto en tu máquina local:

Clonar el repositorio Primero, clona este repositorio a tu máquina local con el siguiente comando:

bash
git clone https://github.com/tu-usuario/tu-repositorio.git
Instalar dependencias Accede al directorio del proyecto y ejecuta el siguiente comando para instalar las dependencias necesarias:

bash
cd nombre-del-proyecto
npm install
Configurar el backend (opcional) Este proyecto hace uso de un backend para obtener las categorías y los posts. Si el backend no está incluido en el repositorio, asegúrate de tenerlo configurado o modificar las llamadas a la API en el servicio correspondiente (PostService y CategoryService) para usar una API existente.

Ejemplo de API de posts:

json
[
  {
    "id": 1,
    "title": "Trabajo remoto",
    "content": "esto es una prueba con usuario y categoria",
    "category_name": "Negocios"
  },
  {
    "id": 2,
    "title": "esto es una prueba desde el front",
    "content": "adsfahsdjf aj",
    "category_name": "Negocios"
  },
  {
    "id": 3,
    "title": "otra prueba front",
    "content": "angular",
    "category_name": "Programación"
  }
]
Ejemplo de API de categorías:

json
[
  { "id": 1, "name": "Negocios" },
  { "id": 2, "name": "Programación" }
]
Ejecutar el proyecto Una vez que todas las dependencias estén instaladas, puedes iniciar el servidor de desarrollo de Angular con el siguiente comando:

bash
ng serve
Esto iniciará la aplicación en modo de desarrollo. La aplicación estará disponible en http://localhost:4200/ por defecto.

Acceder a la aplicación Abre tu navegador y accede a http://localhost:4200/. Deberías poder ver la tabla con los posts, junto con el campo de texto para filtrar por categoría.
