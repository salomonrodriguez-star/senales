/**
 * SEMEX - Señales Landing | Google Apps Script
 * Recibe POST con JSON desde la landing y lo guarda en la hoja activa.
 *
 * CÓMO USAR:
 * 1. Crea un Google Sheet nuevo (ej. "Cotizaciones Señales").
 * 2. En la hoja, ve a: Extensiones > Apps Script.
 * 3. Borra el código de ejemplo y pega ESTE archivo completo.
 * 4. Guarda (Ctrl+S). Nombra el proyecto: "Señales Form Handler".
 * 5. Click en "Implementar" (botón azul arriba a la derecha) > "Nueva implementación".
 *    - Tipo: "Aplicación web"
 *    - Descripción: "Señales form v1"
 *    - Ejecutar como: "Yo (tu correo)"
 *    - Quién tiene acceso: "Cualquier persona"  ← IMPORTANTE
 * 6. Copia la URL del Web App que te da Google.
 * 7. Pégala en index.html (constante GOOGLE_SCRIPT_URL).
 *
 * Si después modificas este script, debes crear una NUEVA implementación
 * o "administrar implementaciones" y publicar una nueva versión.
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Si la hoja está vacía, agregar encabezados
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Fecha de envío",
        "Origen",
        "Nombre",
        "Empresa",
        "Teléfono",
        "Correo",
        "Ciudad/Estado",
        "Tipo de señal",
        "Cantidad",
        "Fecha estimada de entrega",
        "¿Requiere estructura?",
        "¿Requiere instalación?",
        "Lugar de instalación",
        "Comentarios",
        "Consentimiento"
      ]);
      // Formato a encabezados
      const headerRange = sheet.getRange(1, 1, 1, 15);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#8DC63F");
      headerRange.setFontColor("#0F1110");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data.fecha_envio || new Date().toLocaleString("es-MX"),
      data.origen || "Landing Señales",
      data.nombre || "",
      data.empresa || "",
      data.telefono || "",
      data.correo || "",
      data.ciudad || "",
      data.tipo_senal || "",
      data.cantidad || "",
      data.fecha_entrega || "",
      data.estructura || "",
      data.instalacion || "",
      data.lugar_instalacion || "",
      data.comentarios || "",
      data.consent ? "Sí" : "No"
    ]);

    // (Opcional) enviar notificación por correo:
    // const TU_CORREO = "salomon.rodriguez@semex.com.mx";
    // MailApp.sendEmail({
    //   to: TU_CORREO,
    //   subject: "Nueva cotización - Señales",
    //   body: JSON.stringify(data, null, 2)
    // });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Endpoint de salud (para probar desde el navegador)
function doGet() {
  return ContentService
    .createTextOutput("OK - SEMEX Señales form handler online")
    .setMimeType(ContentService.MimeType.TEXT);
}
