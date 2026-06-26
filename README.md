# Landing Señales - Tienda SEMEX

Landing page de alta conversión para señales viales (restrictivas, preventivas, informativas y personalizadas). Stack: HTML/CSS/JS estático, desplegable en Vercel, formulario conectado a Google Sheets + apertura automática de WhatsApp.

## Estructura

```
landing/
├── index.html              ← Landing principal (HTML + CSS + JS inline)
├── google-apps-script.gs   ← Script para Google Sheets
├── vercel.json             ← Config de Vercel (headers, cache)
├── .gitignore
├── README.md
└── images/
    ├── restrictiva-alto.png
    ├── restrictiva-1.png
    ├── informativa-puente.png
    ├── informativa-1.png
    ├── informativa-2.png
    └── informativa-3.png
```

## Despliegue paso a paso

### 1. Subir a GitHub

```bash
cd "Señales/landing"
git init
git add .
git commit -m "Initial commit - Landing Señales"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/landing-senales.git
git push -u origin main
```

### 2. Conectar con Vercel

1. Entra a [vercel.com](https://vercel.com) e inicia sesión con GitHub.
2. Click en **"Add New... > Project"**.
3. Importa el repositorio `landing-senales`.
4. **Framework Preset:** "Other" (es HTML estático).
5. **Root Directory:** dejar en blanco (raíz).
6. Click en **Deploy**.

Vercel te dará una URL tipo `landing-senales.vercel.app`. Para usar dominio propio (ej. `senales.semex.com.mx`), entra a Settings > Domains.

### 3. Conectar Google Sheets

1. Crea un Google Sheet nuevo. Llámalo "Cotizaciones Señales".
2. Dentro de la hoja, ve a: **Extensiones > Apps Script**.
3. Borra el código de ejemplo. Pega el contenido completo de `google-apps-script.gs`.
4. Guarda (Ctrl+S). Nombra el proyecto "Señales Form Handler".
5. Click en el botón azul **"Implementar" (Deploy) > "Nueva implementación"**.
6. Configura:
   - **Tipo:** Aplicación web (Web app)
   - **Ejecutar como:** Yo (tu cuenta)
   - **Quién tiene acceso:** **Cualquier persona** ← muy importante
7. Click en **Implementar**. Autoriza los permisos.
8. **Copia la URL del Web App** (algo como `https://script.google.com/macros/s/AKfyc.../exec`).

### 4. Conectar la landing con el Script

1. Abre `index.html`.
2. Reemplaza la constante `GOOGLE_SCRIPT_URL` con la URL que copiaste.
3. Haz commit y push:
   ```bash
   git add index.html
   git commit -m "Conectar form a Google Sheets"
   git push
   ```
4. Vercel redesplegará automáticamente.

### 5. Verificar

1. Abre la URL de Vercel.
2. Llena el formulario con datos de prueba.
3. Verifica:
   - Se abre WhatsApp con tu mensaje precargado.
   - Aparece una nueva fila en el Google Sheet con tus datos.

## Probar localmente

Solo abre `index.html` en el navegador, o sirve la carpeta:

```bash
python3 -m http.server 8080
# Abre http://localhost:8080
```

## Datos del proyecto

- **WhatsApp:** 81 8128 4090 → `https://wa.me/528181284090`
- **Tienda:** https://tienda.semex.com.mx/
- **Producto:** Señales viales (restrictivas, preventivas, informativas, personalizadas)
- **Normativa:** NOM-034-SCT2/SEDATU · N-CMT-5-02-002/05

## Notas

- El formulario usa `mode: "no-cors"` para evitar problemas de CORS al postear a Apps Script. No vas a ver respuesta del servidor en el navegador, pero los datos sí se guardan. (Comprobable en tu Sheet.)
- WhatsApp se abre incluso si Sheets falla — el lead nunca se pierde.
- Para modificar campos del formulario: edita el HTML, ajusta `construirMensajeWhatsApp()` en el `<script>` final y actualiza encabezados en `google-apps-script.gs`.
- Si modificas `google-apps-script.gs`, debes crear **una nueva implementación** (no se actualiza solo). Apps Script > Implementar > Administrar implementaciones > Editar (lápiz) > Nueva versión.
