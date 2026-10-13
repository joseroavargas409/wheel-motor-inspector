# Wheel Motor · Revisión 03

Visor privado: https://wheel-motor-inspector-3d.glossy-snow-8166.chatgpt.site

41 conjuntos seleccionables y 2.709 elementos geométricos, incluidos componentes opcionales. Modelo representativo GDY106, refinado con las imágenes, ensayos y videos de mantenimiento/CIMETP aportados.

Cambios principales: freno de estacionamiento multidisco seco con resortes y pistón; perfil de carcasa y campana abierta; bridas y pernos; tambor exterior CIMETP opcional; aislación de ranuras, amarres y terminales. La comparación GDY106/GDY108 enlaza seis fichas oficiales y señala las contradicciones entre fuentes.

El seminario de mantenimiento se revisó mediante 117 muestras visuales; no hay transcripción íntegra de su audio. El registro completo de fuentes, variantes y límites está en dist/assets/revision-03.md.

Arrastra para girar, rueda para acercar, Mayús y arrastre para desplazar. Selecciona, oculta y aísla piezas en la lista. Usa Transparente, Sólido o Corte, las vistas por sistema y el despiece axial. El inspector permite abrir fotogramas asociados a las piezas que tienen referencia visual.

Descargar GLB exporta geometría, pose y visibilidad actuales, sin plano de corte ni animación temporal. La copia GLB entregada contiene el ensamble transparente en reposo, con neumáticos, llantas y tambor CIMETP ocultos. Tamaño aproximado: 57 MB.

Para usar la copia web local con Node.js, ejecuta node server.mjs desde esta carpeta y abre http://127.0.0.1:8846/. La web necesita WebGL 2 y aceleración gráfica. Abrir index.html directamente puede bloquear los módulos del visor.

El dentado 18/27/72 y 23/52/127 produce 32,6087:1 frente a 32,62:1 publicado para la referencia GDY106. Es ilustrativo; no es dentado OEM autenticado. No hay cotas disponibles para reconstruir GDY108 con fidelidad dimensional: se compara documentalmente y no se altera el GDY106 por una escala arbitraria.

Medidas, cantidades, montajes y perfiles son aproximados. No es CAD de fabricación ni un procedimiento de mantenimiento. No simula aceite, presión, frenado, cargas ni electromagnetismo. Las comprobaciones verifican geometría finita, cinemática planetaria y algunas separaciones nominales, sin análisis completo de interferencias ni certificación OEM. Three.js conserva su licencia MIT en dist/vendor/LICENSE-three.txt.
