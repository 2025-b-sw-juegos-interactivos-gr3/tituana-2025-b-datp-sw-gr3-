# Índice General - Documentación Jump King

**Proyecto:** Jump King
**Desarrollador:** Dorian Tituana
**Bimestre:** Segundo
**Año Académico:** 2025

---

## Tabla de Contenidos

### 1. Gestión del Proyecto

Documentación sobre la planeación, organización y seguimiento del desarrollo del juego.

- **[Descripción del Proyecto](01_Gestion/01_descripcion_proyecto.md)**
  - Información general del proyecto
  - Descripción conceptual
  - Objetivos principales
  - Alcance del proyecto
  - Equipo y tecnologías

- **[Backlog de Tareas](01_Gestion/02_backlog_tareas.md)**
  - Épicas principales del desarrollo
  - Tareas desglosadas por épica
  - Estado de cada tarea
  - Estimaciones de tiempo
  - Métricas y riesgos

### 2. Game Design Document (GDD)

Documento completo que especifica todos los aspectos del diseño del videojuego.

- **[GDD Completo](02_Game_Design_Document/GDD_completo.md)**
  - Visión general y concepto principal
  - Narrativa y construcción del mundo
  - Mecánicas de juego detalladas
  - Diseño de los 10 niveles
  - Especificaciones del personaje
  - Diseño de interfaz de usuario
  - Dirección visual y arte
  - Sistema de audio
  - Especificaciones técnicas
  - Consideraciones futuras

### 3. Documentación de Assets

Inventario completo y especificaciones de todos los recursos del juego.

- **[Documentación de Assets](03_Assets/assets_documentacion.md)**
  - Inventario total de assets
  - Especificaciones de cada fondo (Niveles 1-10)
  - Documentación del personaje
  - Información del fondo de menú
  - Especificaciones de audio
  - Resoluciones y aspectos
  - Integración en el código
  - Requisitos de almacenamiento

---

## Resumen Ejecutivo

### Visión del Proyecto

Jump King es un videojuego de plataformas vertical completamente funcional, inspirado en el juego homónimo. Los jugadores deben ascender a través de 10 niveles progresivamente desafiantes saltando sobre plataformas, utilizando mecánicas de física realista y sistemas de colisión precisos.

### Objetivos Logrados

- ✓ Implementación completa del motor de juego en JavaScript vanilla
- ✓ 10 niveles jugables con dificultad progresiva
- ✓ Sistema de física y colisiones funcionando correctamente
- ✓ Integración de assets visuales para todos los niveles
- ✓ Interfaz de usuario profesional (menú, HUD, instrucciones)
- ✓ Retroalimentación de audio y visual
- ✓ Documentación técnica completa

### Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Motor:** JavaScript vanilla con requestAnimationFrame
- **Assets:** Imágenes (JPG, WebP), Audio (MP3)
- **Control de Versiones:** Git

### Estadísticas del Proyecto

| Métrica | Valor |
|---------|-------|
| Líneas de Código | ~1,000 |
| Niveles Implementados | 10 |
| Assets Visuales | 12 |
| Archivos de Documentación | 4 |
| Horas Estimadas | 32 |
| Horas Reales | 32.5 |

---

## Estructura de Directorios

```
Examen Bimestre 2 - Implementacion/
├── jump_king.html                    # Archivo principal del juego
├── Personaje.webp                    # Sprite del personaje
├── Fondo.jpg                         # Fondo del menú
├── Nivel 1.jpg - Nivel 9.jpg        # Fondos de niveles
├── SonidoSalto.mp3                   # Efecto de sonido
└── Documentacion/
    ├── 01_Gestion/
    │   ├── 01_descripcion_proyecto.md
    │   └── 02_backlog_tareas.md
    ├── 02_Game_Design_Document/
    │   └── GDD_completo.md
    └── 03_Assets/
        └── assets_documentacion.md
```

---

## Guía de Lectura Recomendada

### Para Programadores

1. Leer: Descripción del Proyecto (enfoque técnico)
2. Estudiar: GDD - Especificaciones Técnicas
3. Analizar: GDD - Mecánicas de Juego
4. Revisar: Código en jump_king.html

### Para Diseñadores

1. Leer: Visión General del GDD
2. Analizar: Diseño de Niveles
3. Estudiar: Dirección Visual y Arte
4. Revisar: Documentación de Assets

### Para Project Managers

1. Leer: Descripción del Proyecto
2. Analizar: Backlog de Tareas
3. Revisar: Métricas y Riesgos
4. Supervisar: Estado del Proyecto

---

## Documentos de Referencia Rápida

### Controles del Juego
- Flecha Izquierda: Movimiento izquierda
- Flecha Derecha: Movimiento derecha
- Espacio / W: Saltar

### Parámetros de Física
- Gravedad: 0.6 unidades/frame²
- Velocidad de Salto: 15 unidades/frame
- Velocidad Máxima de Caída: 20 unidades/frame
- Velocidad de Movimiento: 5 píxeles/frame

### Dimensiones Principales
- Contenedor de Juego: 500x800 píxeles
- Personaje (Visual): 80x80 píxeles
- Personaje (Hitbox): 60x60 píxeles
- Plataformas: 100x20 píxeles (promedio)

### Cronograma del Desarrollo

| Fase | Duración | Estado |
|------|----------|--------|
| Planificación y Diseño | 1 día | Completado |
| Desarrollo del Motor | 3 días | Completado |
| Implementación de Niveles | 2 días | Completado |
| Integración de Assets | 2 días | Completado |
| Pulido y Optimización | 1.5 días | Completado |
| Documentación | 2 días | En Progreso |

---

## Próximos Pasos y Mejoras Futuras

### Corto Plazo (1-2 semanas)
1. Completar documentación final
2. Realizar pruebas exhaustivas
3. Optimizaciones de rendimiento
4. Feedback de usuarios

### Mediano Plazo (1-2 meses)
1. Agregar más niveles (11-20)
2. Sistema de guardado de progreso
3. Tabla de puntuaciones
4. Mejoras visuales

### Largo Plazo (3+ meses)
1. Modo infinito
2. Logros y desafíos especiales
3. Personalización de personaje
4. Multijugador

---

## Contacto y Créditos

**Desarrollador:** Dorian Tituana
**Proyecto:** Jump King
**Institución:** Educativa
**Período:** Segundo Bimestre 2025

---

## Historial de Cambios en Documentación

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | Feb 2025 | Creación de documentación completa |

---

## Notas Finales

Esta documentación representa un registro comprensivo del desarrollo de Jump King. Cada sección ha sido diseñada para proporcionar información clara, estructurada y accesible para diferentes audiencias (programadores, diseñadores, gestores de proyecto).

El proyecto ha sido completado exitosamente dentro de los estimados de tiempo y cumple con todos los objetivos establecidos al inicio del desarrollo.

Para consultas específicas sobre secciones técnicas, artísticas o de gestión, referirse a los documentos especializados listados en la Tabla de Contenidos.

---

**Fin del Índice General**
