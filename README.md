
# SkyAlert

SkyAlert es una aplicación sencilla diseñada para proporcionar información meteorológica de cualquier ciudad del mundo. Utiliza la API de [OpenWeatherMap](https://api.openweathermap.org/) para obtener datos actualizados sobre el clima, incluyendo temperatura, humedad, velocidad del viento, y más.

La aplicación está desarrollada con Angular e Ionic, ofreciendo una experiencia de usuario fluida y responsiva tanto en dispositivos móviles como en navegadores web.


## Tabla de Contenidos

- [Características](#características)
- [Video Demostrativo](#video-de-demostrativo)
- [Instalación](#instalación)
- [Uso](#uso)
- [Funcionalidades](#funcionalidades)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)
- [Contacto](#contacto)
## Características

- Búsqueda de información meteorológica por ciudad.
- Visualización de datos como temperatura, humedad, y velocidad del viento.
- Interfaz de usuario simple y atractiva, diseñada con Ionic.
- Compatible con dispositivos móviles.
## Video demostrativo

[![Ver video en YouTube](https://img.youtube.com/vi/ZMYiKRYq48Y/0.jpg)](https://youtube.com/shorts/ZMYiKRYq48Y?feature=share)
## Instrucciones de Instalación

#### Requisitos Previos

- Node.js y npm:
  - Si no tienes Node.js instalado, descárgalo e instálalo desde [https://nodejs.org/](https://nodejs.org/).

#### Descarga del Proyecto

1. **Ubicación de la Carpeta del Proyecto:**
   - Asegúrate de que la carpeta del proyecto esté ubicada en la carpeta correspondiente del servidor local (por ejemplo, en la carpeta `htdocs` de XAMPP o la carpeta `www` de WampServer).

2. **Instalación de Dependencias:**
   - Abre la terminal en la carpeta del proyecto y ejecuta el siguiente comando para instalar las dependencias del proyecto:
     ```bash
     npm install
     ```

#### Sugerencia: Instalación Global de Herramientas de Desarrollo

- Si planeas trabajar con más proyectos en el futuro, puedes instalar Ionic CLI y Angular CLI globalmente. Ejecuta los siguientes comandos en la terminal:
  ```bash
  npm install -g @ionic/cli
  npm install -g @angular/cli

La aplicación estará disponible en tu navegador en la dirección http://localhost:8100/ o en el puerto que hayas especificado.


## Ejecución del Servidor de Desarrollo

Para iniciar el servidor de desarrollo de Ionic, ejecuta el siguiente comando:

ionic serve

La aplicación estará disponible en tu navegador en la dirección http://localhost:8100/ o en el puerto que hayas especificado
## Uso

- Ingresa el nombre de una ciudad en la barra de búsqueda.
- La aplicación mostrará la información meteorológica actual de la ciudad seleccionada.
## API

SkyAlert utiliza la API de [OpenWeatherMap](https://api.openweathermap.org/) para obtener datos meteorológicos.

Para más detalles sobre cómo funciona la API, visita su [documentación](https://openweathermap.org/api).
## Tecnologías Utilizadas

- **Angular**: Framework de desarrollo front-end.
- **Ionic**: Framework para el desarrollo de aplicaciones móviles híbridas.
- **OpenWeatherMap API**: Fuente de datos meteorológicos.
## Contribución

1. 
**Fork del Repositorio**: Haz un fork del repositorio en GitHub y clona tu fork localmente:

   git clone https://github.com/beltrandev90/skyalert.git
   cd skyalert

2. 
**Crear una Rama**
Crea una nueva rama para trabajar en tu contribución:

git checkout -b feature/nueva-funcionalidad

3. **Realizar tus Cambios** Haz los cambios necesarios en el código.

4. 
**Commit de Cambios** Haz commit de tus cambios con un mensaje descriptivo:

git add .
git commit -m "Agrega nueva funcionalidad para ..."

5. 
**Subir los Cambios** Sube tus cambios a tu fork en GitHub:

git push origin feature/nueva-funcionalidad

6.
**Enviar un Pull Request**
Ve a tu repositorio en GitHub y crea un Pull Request para que tus cambios sean revisados e incorporados al proyecto principal.
Para más detalles, consulta el archivo LICENSE en este repositorio.
## Licencia

Este proyecto está licenciado bajo los términos de la [Licencia MIT](https://opensource.org/licenses/MIT).

### Resumen de la Licencia

- **Permisos:** Esta licencia permite a cualquier persona usar, copiar, modificar, fusionar, publicar, distribuir, sublicenciar y/o vender copias del software, bajo las siguientes condiciones.
  
- **Limitaciones:** Este software se proporciona "tal cual", sin garantía de ningún tipo, expresa o implícita.

- **Condiciones:** La licencia y los derechos de autor deben incluirse en todas las copias o partes sustanciales del software.

Para más detalles, consulta el archivo [LICENSE](./LICENSE) en este repositorio.
## Contacto

Si tienes alguna pregunta, sugerencia o simplemente quieres ponerte en contacto, puedes hacerlo a través de los siguientes medios:

- **Email**: [info@beltrandev.com](mailto:info@beltrandev.com)
- **GitHub**: [beltrandev90](https://github.com/beltrandev90)
- 
**Sitio Web**: [beltrandev.com](https://beltrandev.com/)
¡Esperamos saber de ti!