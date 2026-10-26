# Generador de enlace y QR para reseñas en Google

Herramienta gratuita de [Ramilink](https://www.ramilink.es/?utm_source=github&utm_medium=referral&utm_campaign=generador-resenas-google). Crea el **enlace directo al formulario de reseñas de Google** de tu negocio y un **código QR** para imprimir, a partir de tu Place ID o del enlace de «Pedir reseñas» de tu Perfil de Empresa.

**Úsala aquí:** https://sergiopotente.github.io/generador-resenas-google/ (o en la web: [ramilink.es/herramientas/enlace-resenas-google](https://www.ramilink.es/herramientas/enlace-resenas-google?utm_source=github&utm_medium=referral&utm_campaign=generador-resenas-google))

## Qué hace

1. Pega tu **Place ID** (empieza por «ChIJ») o el enlace de **«Pedir reseñas»** (`https://g.page/r/…/review`).
2. Obtienes el enlace `https://search.google.com/local/writereview?placeid=…` (o el de g.page validado).
3. Copia el enlace, pruébalo o descarga el QR en **PNG (1024 px)** o **SVG**.

Si pegas el enlace que abre tu ficha (por ejemplo `maps.app.goo.gl/…`), te avisa: ese no abre el formulario de reseñas.

## Privacidad

- Es una página estática: **no hay servidor, ni analítica, ni cookies**.
- El enlace y el QR se calculan **en tu navegador**. No se envía ni se guarda nada.
- La política de seguridad de contenido (`Content-Security-Policy`) solo permite scripts de este mismo repositorio.

## Cómo encontrar tu Place ID

- **Perfil de Empresa en Google:** busca tu negocio con la cuenta que lo gestiona, pulsa «Pedir reseñas» y copia el enlace.
- **Place ID Finder de Google:** [developers.google.com/maps/documentation/places/web-service/place-id](https://developers.google.com/maps/documentation/places/web-service/place-id).

Pide la reseña a todos tus clientes y sin dar nada a cambio: Google prohíbe los incentivos por reseñas ([Ayuda de Perfil de Empresa](https://support.google.com/business/answer/3474122?hl=es)). Guía: [cómo conseguir más reseñas en Google sin saltarte las normas](https://www.ramilink.es/blog/como-conseguir-mas-resenas-en-google?utm_source=github&utm_medium=referral&utm_campaign=generador-resenas-google).

## Archivos

| Archivo | Qué es |
|---|---|
| `index.html` | La página |
| `app.mjs` | Interfaz (formulario, copiar, descargar) |
| `review-link.mjs` | Validación y construcción del enlace (misma lógica y tests que la herramienta de ramilink.es) |
| `uqr.mjs` | Generador de QR [uqr](https://github.com/unjs/uqr) 0.1.3, MIT (`LICENSE-uqr.txt`) |
| `styles.css`, `icon.png` | Estilos e icono |
| `.nojekyll` | Para que GitHub Pages sirva los archivos tal cual |

Para probarla en local: `python3 -m http.server` en esta carpeta y abre `http://localhost:8000` (los módulos ES no cargan desde `file://`).

## Publicar en GitHub Pages

```bash
cd generador-resenas-google
git init -b main && git add . && git commit -m "Generador de enlace y QR para reseñas en Google"
gh repo create generador-resenas-google --public --source . --push \
  --description "Generador gratis de enlace y QR para reseñas en Google. Sin registro, todo en el navegador. Por Ramilink." \
  --homepage "https://www.ramilink.es/herramientas/enlace-resenas-google"
gh api -X POST repos/{owner}/generador-resenas-google/pages -f "source[branch]=main" -f "source[path]=/"
gh repo edit --add-topic google-reviews,qr-code,resenas-google,place-id,pymes,nfc
```

## Y si quieres que además vuelvan

Un QR consigue reseñas, pero no sabe quién es tu cliente. Con **Mozo de Ramilink**, el soporte NFC de tu mostrador, el mismo toque abre la reseña, suma un sello en tu [tarjeta de sellos](https://www.ramilink.es/fidelizacion-clientes?utm_source=github&utm_medium=referral&utm_campaign=generador-resenas-google), le da su [ticket digital](https://www.ramilink.es/ticket-digital?utm_source=github&utm_medium=referral&utm_campaign=generador-resenas-google) y te deja su contacto con su permiso. [Ver cómo funciona](https://www.ramilink.es/resenas-google?utm_source=github&utm_medium=referral&utm_campaign=generador-resenas-google).

## Licencia

MIT. Google y Google Maps son marcas de Google LLC; esta herramienta no está afiliada a Google.
