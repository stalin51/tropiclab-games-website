# TropicLab Games

Sitio estático en español para el estudio. No necesita instalar dependencias ni compilar.

## Ejecutar localmente

Abre `index.html` en un navegador moderno. Para probarlo por HTTP en Windows, desde esta carpeta ejecuta:

```powershell
py -m http.server 8000
```

Visita `http://localhost:8000`. Detén el servidor con `Ctrl+C`.

## Configuración antes de publicar

Edita `SITE_CONFIG` al inicio de `app.js` para cambiar el nombre de marca, la ubicación, el dominio público (`productionUrl`), el correo de contacto y los enlaces de redes y tiendas. Los valores no confirmados se dejan vacíos; no se crean enlaces de contacto o perfiles falsos. Cuando `productionUrl` tenga un dominio aprobado, el sitio genera las etiquetas canonical y `og:url` para ambas páginas.

El formulario solo se habilita cuando `contactEmail` tiene una dirección verificada. Prepara un mensaje `mailto:` y deja que la persona lo revise y lo envíe desde su aplicación de correo; el sitio no afirma que el mensaje ya fue enviado. No hay backend configurado.

## Ilustraciones

Los originales proporcionados se conservan en `assets/images/`. Las imágenes de Hurry Match son arte conceptual, no capturas reales. Al disponer de capturas auténticas, reemplaza `hurry-match-ilustracion.png`, `hurry-match-tablero.png`, `hurry-match-combo.png` y `hurry-match-mapa.png`, actualiza los textos alternativos y conserva las proporciones con atributos `width` y `height`. El arte del metroidvania es conceptual y su pixel art debe mantenerse fiel, sin suavizado ni ampliación borrosa.

## Política de privacidad

`privacidad.html` es una estructura editable, no una política aprobada. Completa la identidad responsable, los datos reales del alojamiento y formulario, proveedores, transferencias, conservación y canal de solicitudes. Revisa y aprueba el texto con asesoría adecuada antes de publicarlo. La política de privacidad de cada juego debe revisarse por separado a la luz de sus integraciones; este sitio no hace afirmaciones sobre los datos de los juegos.

## Pendiente para publicación

- Confirmar dominio y configurar canonical y `og:url`.
- Confirmar correo de contacto y enlaces oficiales de redes/tiendas.
- Sustituir las ilustraciones conceptuales de Hurry Match por capturas reales cuando existan.
- Revisar y aprobar la política de privacidad del sitio; preparar políticas independientes para cada juego según sus integraciones.
- Validar el contenido legal y los datos de alojamiento/proveedores.