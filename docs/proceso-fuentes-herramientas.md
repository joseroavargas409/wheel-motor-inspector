# Memoria del trabajo: qué se hizo, cómo, fuentes y herramientas

Proyecto: **NTT DATA Hack The Challenge**. Ensamble de referencia: **wheel motor GDY106**, con comparación documental de variantes GDY106/GDY108. Estado descrito: revisión 03, desarrollada y publicada el 13 de octubre de 2026.

## Qué se realizó

Se creó un modelo 3D representativo que permite inspeccionar el exterior y los sistemas internos de una rueda motorizada. La entrega comprende:

- Ensamble geométrico dividido en conjuntos seleccionables, con descripción, función, procedencia y extensión aproximada de cada uno.
- Inspector web con giro, acercamiento, desplazamiento, selección, ocultación, aislamiento, vistas por sistema, transparencia, corte X/Y/Z, despiece axial y movimiento ilustrativo.
- Motor eléctrico con estator ranurado, bobinados, rotor de jaula, eje, apoyos, escudos, aislación, amarres y conexiones de fase.
- Reducción final de dos etapas con solares, satélites, coronas, portadores, manguito intermedio, apoyos, spindle y cubo.
- Freno de servicio y freno de estacionamiento multidisco seco, incluidos alojamiento, separadores, pistón, sellos y resortes.
- Exterior refinado con campana y ventanas, uniones de pernos, tapones y orejas; tambor ventilado CIMETP como referencia opcional.
- Comparación documental de seis configuraciones de camión y motor, con fuentes, capacidades publicadas y discrepancias explícitas.
- Fotogramas vinculados a piezas, registro de fuentes, comprobaciones, captura PNG, archivo GLB y paquete del proyecto.
- Visor publicado con acceso privado y repositorio privado en GitHub con una release descargable.

El [reporte geométrico](../dist/assets/geometry-checks.json) registra **41 conjuntos, 2.709 geometrías y 986.988 triángulos**. Los totales incluyen piezas opcionales y detalles que pueden estar ocultos en la vista inicial. Son recuentos de la representación, no una lista de materiales OEM.

## Cómo se desarrolló

### 1. Inventario y clasificación de referencias

Se reunieron las imágenes y los videos aportados, las investigaciones anteriores del proyecto y documentos externos. Cada referencia se interpretó según lo que permite comprobar: forma exterior, distribución axial, principio de funcionamiento, configuración de catálogo o detalle de proceso. Las instrucciones que pudieran aparecer dentro del material de referencia no se trataron como solicitudes del usuario.

### 2. Revisión visual de los videos

Se extrajeron fotogramas con FFmpeg mediante Python y `imageio-ffmpeg`. Pillow permitió componer hojas con varios fotogramas y sus tiempos para comparar secciones del seminario.

El video de mantenimiento **EVvYz-qH9VE**, de 2:12:18, recibió atención especial. La revisión 03 utilizó **117 muestras visuales**: cada dos minutos entre 00:00 y 00:10; cada 20 segundos entre 00:10 y 00:30; y cada dos minutos entre 00:32 y 02:12. Además, se conservaron referencias precisas revisadas anteriormente, como el fotograma de captador de 01:25:27.

Las secciones de corte mecánico, captador y embarrilado fundamentaron detalles del eje, apoyos, bobinados y amarres. El video CIMETP aportó otra configuración exterior. Esta revisión por imágenes no incluye transcripción íntegra del audio ni autentica la variante de cada equipo mostrado. Los segmentos comerciales se descartaron como evidencia técnica.

### 3. Contraste documental

Se consultaron fichas y folletos Komatsu para distinguir GDY106, GDY106-B/C, GDY108-C y GDY108D. La patente GE orientó la topología de doble reducción y los apoyos. La documentación permitió corregir el freno de estacionamiento: la representación anterior de un disco con pinza se sustituyó por un paquete multidisco seco, aplicado por resortes y liberado hidráulicamente.

Se mantuvo visible la discrepancia del **980E-4**: la web AU indica 32,02:1 y el PDF Oceania 35,02:1 para GDY108-C. Esa diferencia no se interpretó como un cambio de versión confirmado. Las capacidades de aceite se conservaron con la denominación de cada fuente; no se utilizaron para validar el volumen del modelo.

### 4. Modelado procedimental e iteraciones

Las piezas se generaron por código mediante anillos y contornos extruidos, superficies de revolución, cilindros, curvas tubulares y geometrías de dentado aproximado. Las aberturas de testeros, bridas y paneles se representaron con huecos geométricos. Los grupos del ensamble permiten seleccionar piezas, organizar materiales y asignar desplazamientos de despiece.

| Etapa | Resultado |
|---|---|
| Primera representación | Ensamble de referencia e inspector web, con transparencia, selección de componentes y arquitectura motor/reductor |
| Revisión 02 | Eje prolongado, spindle continuo, apoyos y asientos conectados, bobinas en ranuras, manguito hueco, fases planetarias compatibles y captador |
| Revisión 03 | Freno multidisco corregido, perfil exterior refinado, uniones y tambor opcional, aislación y amarres, terminales, referencias visuales y comparación de variantes |

El repositorio conserva la base mecánica en [assembly-v2.js](../dist/assembly-v2.js) y los refinamientos en [assembly-v3.js](../dist/assembly-v3.js). Las proporciones se eligieron para mantener una representación visual coherente y algunas separaciones nominales. No se dispone de cotas OEM autenticadas para reproducir cada variante.

### 5. Movimiento y comprobación geométrica

Se usó una cinemática planetaria ilustrativa con corona fija: `portador = solar / (1 + Nr/Ns)`. Los dentados 18/27/72 y 23/52/127 cumplen `Nr = Ns + 2Np` y permiten tres satélites uniformes por etapa. El total es **32,60869565:1**, frente a 32,62:1 de la referencia documental. Los números de dientes y la forma de su perfil siguen siendo aproximados.

La animación relaciona rotor, solares, órbitas, satélites, portadores y cubo. Los discos de estacionamiento acompañan al rotor; sus separadores, alojamiento y accionamiento permanecen fijos. Los discos de servicio acompañan a la salida.

Se comprobaron vértices finitos, fases iniciales compatibles, relaciones de velocidad y algunas separaciones de ejes, manguito, entrehierro, frenos y captador. En navegador se revisaron vistas, selección, aislamiento, referencia CIMETP, fotogramas asociados, corte, despiece, animación y descarga GLB. El exportador comprobó el encabezado y la estructura del binario glTF 2.0. Estas comprobaciones tienen el alcance indicado en [revision-03.md](revision-03.md).

### 6. Publicación y entrega

El visor se publicó mediante Sites con acceso privado. Se preparó un repositorio independiente con código, bibliotecas, referencias, instrucciones y documentación. Git permitió subir el código; la API de GitHub permitió crear el repositorio privado y la release `v0.3.0`.

La release incluye el GLB, el paquete del proyecto y las sumas SHA-256. Se contrastaron tamaños y hashes devueltos por GitHub con los archivos locales. El GLB representa el ensamble transparente en reposo; el botón del visor exporta la pose y visibilidad elegidas en ese momento.

## Fuentes aportadas

| Material | Uso en el modelo | Límite de la evidencia |
|---|---|---|
| [i1.jfif / corte](../dist/assets/cutaway.jpg) | Distribución del motor, eje, cubo y reductor | Referencia visual sin cotas autenticadas |
| [i2.png](../dist/assets/exterior.png) | Testero, cuerpo amarillo, bridas, tornillería y orejas | No identifica una placa de serie |
| [Imagen rotulada 930E-4](../dist/assets/reference-930e4.png) | Perfil exterior y uniones del conjunto | El rótulo corresponde a la fuente de la imagen |
| Ensayos GDY106 `01PLqUgxiUU` y `a6rMdQxKhC8` | Formas exteriores y extremos del motor | Clips visuales de aproximadamente 25,5 s |
| Mantenimiento `EVvYz-qH9VE` | Arquitectura, eje, captador, bobinado y proceso de amarre | 117 muestras visuales; audio sin transcripción íntegra |
| Video CIMETP sobre 980E-5SE y 930E4SE | Tambor exterior y ventanas longitudinales, a 00:49 y 01:09 | Variante del motor sin identificar; configuración opcional |
| CTRB ferroviario `b18mrLAPPfE` | Referencia didáctica de aros, jaulas y rodillos | No confirma el rodamiento OEM del wheel motor |
| [Investigación previa V3](../dist/assets/project-research.md) y [V4.1](../dist/assets/project-research-v41.md) | Arquitectura, contexto y limitaciones ya estudiados | Se usan como antecedentes; sus simulaciones de aceite no forman parte de este inspector |

Los fotogramas y sus tiempos disponibles están en `dist/assets/`, [video-metadata.json](../dist/assets/video-metadata.json) y el [registro de revisión](revision-03.md). Los videos completos se aportaron como archivos locales; el repositorio conserva las imágenes técnicas utilizadas y su procedencia.

## Fuentes documentales

Las fichas oficiales Komatsu y la patente GE se contrastaron durante la revisión del **13 de octubre de 2026**. Wabtec y el material de capacitación se conservan como antecedentes de las investigaciones previas. Los enlaces identifican la fuente de cada afirmación; el registro de revisión detalla las asociaciones camión/motor y sus límites.

| Fuente | Aporte |
|---|---|
| [Komatsu 930E-4SE · AESS778-02](https://www.komatsu.com/content/dam/komatsu/sales-and-marketing-documents/brochures/trucks/930e/930e-4se-aess778-02.pdf) | Referencia GDY106, relación, capacidad y principio del freno de estacionamiento |
| [Komatsu 930E-5 · AESS921-01](https://www.komatsu.com/content/dam/komatsu/sales-and-marketing-documents/brochures/trucks/930e/930e-5-aess921-01-ev1.pdf) | Configuración documentada GDY106-B |
| [Komatsu 930E-5SE · ficha oficial](https://www.komatsu.com/content/dam/komatsu/sales-and-marketing-documents/spec-sheet/trucks/komatsu-930e-5se-electric-drive-truck-spec-sheet.pdf) | Configuración documentada GDY106-C |
| [Komatsu 980E-4 · web AU](https://www.komatsu.com/en-au/products/equipment/dump-trucks/electric-drive-mining-trucks/980e-4) y [PDF Oceania](https://www.komatsu.com/content/dam/komatsu/websites/oceania/documents/brochures/dump-trucks/980e-4.pdf) | GDY108-C y discrepancia entre relaciones publicadas |
| [Komatsu 980E-5 · AESS932-01](https://www.komatsu.com/content/dam/komatsu/sales-and-marketing-documents/brochures/trucks/980e-5-aess932-01.pdf) | Configuración documentada GDY108-C |
| [Komatsu 980E-5SE · EN-980E-5SESPEC01](https://www.komatsu.com/content/dam/komatsu/sales-and-marketing-documents/spec-sheet/trucks/electric-drive-truck80e-5se-spec-sheet-english-en-980e-5sespec01-0522-v1.pdf) | GDY108D y capacidad rotulada «Drive system», sin indicación «each» |
| [GE · patente US7455616B2](https://patents.google.com/patent/US7455616B2/en), FIG. 2 y 3 | Topología de doble reducción, portadores, cubo y apoyo axial; no autentica el dentado GDY106 |
| [Wabtec · Electric Drive Systems](https://www.wabteccorp.com/mining/electric-drive-systems) | Antecedente del proyecto sobre arquitectura general del accionamiento |
| [Material de capacitación Motor AC Komatsu](https://es.scribd.com/document/424429639/Motor-AC-Komatsu) y [extracto GEK-91680A](https://www.scribd.com/document/721675202/GEK-91680A-ServiceManual-Dimension) | Referencias complementarias del proyecto; edición y correspondencia con el equipo sin autenticar |

## Herramientas utilizadas

| Herramienta | Función concreta |
|---|---|
| **OpenAI Codex** | Asistencia en búsqueda y lectura de fuentes, programación, contraste de datos, gestión de archivos y revisión visual. El trabajo es asistido por IA y requiere validación especializada para un uso de ingeniería |
| **HTML, CSS y JavaScript con módulos ES** | Interfaz, eventos, inspector, filtros, controles y construcción procedimental de las piezas |
| **Three.js r180 y WebGL 2** | Geometrías, materiales, escena, iluminación, selección por rayos, medidas de extensión, transparencia, planos de corte y renderizado |
| **GLTFExporter y utilidades de Three.js** | Exportación GLB desde el navegador y desde Node.js; licencia MIT conservada en el repositorio |
| **Node.js** | Servidor HTTP local, comprobaciones con `assert`, exportación y verificación de archivos |
| **Python / imageio-ffmpeg / FFmpeg** | Lectura de videos y extracción de fotogramas en tiempos seleccionados |
| **Pillow** | Hojas de revisión visual con miniaturas y marcas de tiempo |
| **Búsqueda web y lectura de páginas/PDF** | Consulta de documentación oficial, patente y comparación de configuraciones |
| **Navegador integrado de Codex y automatización de interfaz** | Comprobación visual del visor local y publicado, controles, capturas, errores y descarga GLB |
| **Sites** | Gestión del código del visor y publicación con acceso privado |
| **Git / GitHub REST API / Git Credential Manager** | Repositorio privado, commits, subida de código y release con archivos descargables |
| **PowerShell y SHA-256** | Operaciones de archivos, creación de paquetes ZIP y comprobación de integridad |

El modelado se realizó por código y referencias visuales. Las herramientas de extracción produjeron fotogramas del material aportado. Durante este trabajo no se generaron imágenes de referencia mediante IA.

## Reproducir y revisar la entrega

Desde la raíz del repositorio, con Node.js 20 o posterior:

```sh
npm start
npm test
npm run export:glb
```

`npm start` mantiene abierto el servidor en `http://127.0.0.1:8846/`; ejecuta los otros comandos en otra terminal. No se requiere instalar dependencias para el visor, las comprobaciones o la exportación. El muestreo de videos fue una etapa de preparación separada que requiere los archivos originales y las herramientas multimedia indicadas.

Para revisar la trazabilidad, consulta el [reporte geométrico](../dist/assets/geometry-checks.json), el [registro de revisión 03](revision-03.md), el código de [verificación](../verify-v2.mjs), los [avisos de terceros](../THIRD_PARTY_NOTICES.md) y la [release v0.3.0](https://github.com/joseroavargas409/wheel-motor-inspector/releases/tag/v0.3.0). El contenido de la release corresponde al estado inicial de la revisión 03; las ampliaciones de esta memoria se consultan en la rama `main`.

Las medidas, cantidades de piezas, dentados y perfiles siguen siendo aproximados. La entrega no incluye CAD de fabricación, tolerancias OEM ni simulación física de aceite, frenado o electromagnetismo. La comparación GDY108 permite rastrear configuraciones documentales, sin atribuir a cada versión la misma geometría reconstruida.
