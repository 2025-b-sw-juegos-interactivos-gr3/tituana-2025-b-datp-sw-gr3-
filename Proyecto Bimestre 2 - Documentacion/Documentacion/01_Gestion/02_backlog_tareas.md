# Backlog de Tareas - Jump King

## Épica 1: Desarrollo del Sistema de Juego Base

### Tarea 1.1: Configurar entorno de desarrollo
- **Estado:** Completado
- **Prioridad:** Alta
- **Descripción:** Establecer estructura HTML5, CSS3 y JavaScript para el juego
- **Entregable:** Archivo jump_king.html con estructura base
- **Horas Estimadas:** 2
- **Horas Reales:** 2

### Tarea 1.2: Implementar sistema de física
- **Estado:** Completado
- **Prioridad:** Alta
- **Descripción:** Crear sistema de gravedad, velocidad y aceleración para el personaje
- **Criterios de Aceptación:**
  - Gravedad constante de 0.6 aplicada en cada frame
  - Velocidad máxima limitada a 20 unidades por frame
  - Salto con potencia configurable de 15 unidades
- **Horas Estimadas:** 3
- **Horas Reales:** 3

### Tarea 1.3: Implementar detección de colisiones AABB
- **Estado:** Completado
- **Prioridad:** Alta
- **Descripción:** Desarrollar sistema de colisiones axis-aligned bounding box para plataformas
- **Criterios de Aceptación:**
  - Detección de colisiones desde 4 direcciones (arriba, abajo, izquierda, derecha)
  - Manejo correcto de múltiples colisiones simultáneas
  - Respuesta realista a colisiones
- **Horas Estimadas:** 4
- **Horas Reales:** 5

### Tarea 1.4: Implementar sistema de controles
- **Estado:** Completado
- **Prioridad:** Media
- **Descripción:** Crear controles de entrada para movimiento y salto
- **Criterios de Aceptación:**
  - Tecla izquierda y derecha para movimiento horizontal
  - Teclas espacio y W para saltar
  - Solo permitir salto cuando el personaje está en una plataforma
- **Horas Estimadas:** 1
- **Horas Reales:** 1

## Épica 2: Diseño y Generación de Niveles

### Tarea 2.1: Crear configuración de 10 niveles fijos
- **Estado:** Completado
- **Prioridad:** Alta
- **Descripción:** Definir posiciones de plataformas para cada nivel
- **Criterios de Aceptación:**
  - 10 niveles con dificultad progresiva
  - Posiciones consistentes en cada ejecución
  - Niveles verificados como jugables
- **Horas Estimadas:** 4
- **Horas Reales:** 4

### Tarea 2.2: Implementar sistema de progresión entre niveles
- **Estado:** Completado
- **Prioridad:** Media
- **Descripción:** Crear lógica para avance automático y retroceso entre niveles
- **Criterios de Aceptación:**
  - Avance al siguiente nivel cuando el jugador alcanza la parte superior
  - Retroceso al nivel anterior si cae fuera de los límites
  - Límites en nivel 1 y nivel 10 (fin del juego)
- **Horas Estimadas:** 2
- **Horas Reales:** 2

## Épica 3: Integración de Assets

### Tarea 3.1: Crear/obtener fondos para niveles 1-4
- **Estado:** Completado
- **Prioridad:** Alta
- **Descripción:** Generar imágenes de fondo para los primeros 4 niveles
- **Entregables:**
  - Nivel 1.jpg (Torre Medieval)
  - Nivel 2.jpg (Castillo Oscuro)
  - Nivel 3.jpg (Templo de Cristal)
  - Nivel 4.jpg (Torre Gótica)
- **Horas Estimadas:** 2
- **Horas Reales:** 2

### Tarea 3.2: Crear/obtener fondos para niveles 5-9
- **Estado:** Completado
- **Prioridad:** Alta
- **Descripción:** Generar imágenes de fondo para niveles intermedios
- **Entregables:**
  - Nivel 5.jpg (Bosque Encantado)
  - Nivel 6.jpg (Castillo Mágico)
  - Nivel 7.jpg (Cielo Celestial)
  - Nivel 8.jpg (Desierto Dorado)
  - Nivel 9.jpg (Abismo Oscuro)
- **Horas Estimadas:** 2
- **Horas Reales:** 2

### Tarea 3.3: Crear/obtener imagen de personaje
- **Estado:** Completado
- **Prioridad:** Media
- **Descripción:** Generar sprite del personaje jugable
- **Entregable:** Personaje.webp
- **Horas Estimadas:** 1
- **Horas Reales:** 1

### Tarea 3.4: Crear/obtener fondo de menú principal
- **Estado:** Completado
- **Prioridad:** Media
- **Descripción:** Generar imagen de fondo para la pantalla inicial
- **Entregable:** Fondo.jpg
- **Horas Estimadas:** 1
- **Horas Reales:** 1

### Tarea 3.5: Obtener efecto de sonido de salto
- **Estado:** Completado
- **Prioridad:** Baja
- **Descripción:** Adquirir archivo de audio para el sonido de salto
- **Entregable:** SonidoSalto.mp3
- **Horas Estimadas:** 0.5
- **Horas Reales:** 0.5

## Épica 4: Desarrollo de la Interfaz de Usuario

### Tarea 4.1: Crear menú principal
- **Estado:** Completado
- **Prioridad:** Alta
- **Descripción:** Diseñar e implementar pantalla de menú
- **Criterios de Aceptación:**
  - Botón para iniciar juego
  - Botón para ver instrucciones
  - Animaciones de entrada
  - Fondo visual atractivo
- **Horas Estimadas:** 2
- **Horas Reales:** 2

### Tarea 4.2: Crear modal de instrucciones
- **Estado:** Completado
- **Prioridad:** Media
- **Descripción:** Implementar ventana modal con reglas del juego
- **Criterios de Aceptación:**
  - Descripciones de controles
  - Objetivo del juego
  - Botón para cerrar
- **Horas Estimadas:** 1
- **Horas Reales:** 1

### Tarea 4.3: Implementar HUD en juego
- **Estado:** Completado
- **Prioridad:** Media
- **Descripción:** Crear panel de información durante el juego
- **Criterios de Aceptación:**
  - Mostrar nivel actual
  - Diseño visual claro y legible
  - Actualización en tiempo real
- **Horas Estimadas:** 1
- **Horas Reales:** 1

### Tarea 4.4: Crear pantalla de Game Over
- **Estado:** Completado
- **Prioridad:** Media
- **Descripción:** Implementar pantalla de fin de juego
- **Criterios de Aceptación:**
  - Mostrar nivel alcanzado
  - Botón para volver al menú
  - Información clara de estado
- **Horas Estimadas:** 1
- **Horas Reales:** 1

## Épica 5: Pulido y Optimización

### Tarea 5.1: Ajustar tamaño de contenedor de juego
- **Estado:** Completado
- **Prioridad:** Media
- **Descripción:** Aumentar dimensiones del contenedor de 400x600 a 500x800
- **Horas Estimadas:** 0.5
- **Horas Reales:** 0.5

### Tarea 5.2: Redimensionar obstáculos y personaje
- **Estado:** Completado
- **Prioridad:** Media
- **Descripción:** Ajustar tamaños de plataformas y jugador proporcionalmente
- **Horas Estimadas:** 1
- **Horas Reales:** 1

### Tarea 5.3: Mejorar estilo visual del HUD
- **Estado:** Completado
- **Prioridad:** Baja
- **Descripción:** Actualizar diseño del panel de información
- **Horas Estimadas:** 0.5
- **Horas Reales:** 0.5

### Tarea 5.4: Integrar personalización del personaje
- **Estado:** Completado
- **Prioridad:** Media
- **Descripción:** Implementar imagen personalizada del personaje
- **Horas Estimadas:** 0.5
- **Horas Reales:** 0.5

### Tarea 5.5: Ajustar área de colisión del personaje
- **Estado:** Completado
- **Prioridad:** Baja
- **Descripción:** Refinar área de colisión para mayor realismo
- **Horas Estimadas:** 0.5
- **Horas Reales:** 0.5

## Épica 6: Documentación

### Tarea 6.1: Crear Game Design Document
- **Estado:** En Progreso
- **Prioridad:** Alta
- **Descripción:** Documentar diseño completo del juego
- **Horas Estimadas:** 3
- **Horas Reales:** 2 (en progreso)

### Tarea 6.2: Documentar gestión del proyecto
- **Estado:** En Progreso
- **Prioridad:** Alta
- **Descripción:** Crear documento de gestión y tareas
- **Horas Estimadas:** 2
- **Horas Reales:** 1.5 (en progreso)

### Tarea 6.3: Documentar assets utilizados
- **Estado:** En Progreso
- **Prioridad:** Media
- **Descripción:** Listar y describir todos los assets
- **Horas Estimadas:** 1
- **Horas Reales:** 0.5 (en progreso)

## Resumen de Métricas

| Métrica | Valor |
|---------|-------|
| Total de Tareas | 23 |
| Tareas Completadas | 20 |
| Tareas en Progreso | 3 |
| Horas Estimadas Totales | 32 |
| Horas Reales Totales (hasta ahora) | 32.5 |
| Variación | +0.5 horas (+1.6%) |

## Riesgos Identificados

1. **Riesgo:** Detección de colisiones imprecisa
   - **Mitigación:** Realizar pruebas exhaustivas en cada nivel
   - **Estado:** Resuelto

2. **Riesgo:** Inconsistencia visual entre niveles
   - **Mitigación:** Mantener paleta de colores coherente
   - **Estado:** Resuelto

3. **Riesgo:** Rendimiento en navegador
   - **Mitigación:** Optimizar bucle de juego con requestAnimationFrame
   - **Estado:** Resuelto

## Próximos Pasos

1. Completar documentación final del proyecto
2. Realizar pruebas exhaustivas de gameplay
3. Optimizaciones finales según feedback
4. Entrega de documentación completa
