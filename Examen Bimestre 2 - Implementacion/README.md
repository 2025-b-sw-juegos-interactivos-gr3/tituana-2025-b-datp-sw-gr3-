# Jump King - Estructura del Proyecto

## Descripción

Jump King es un videojuego de plataformas vertical desarrollado en HTML5, CSS3 y JavaScript vanilla. Este documento describe la estructura organizada del proyecto.

## Estructura de Archivos

```
Examen Bimestre 2 - Implementacion/
├── index.html                          # Archivo HTML principal
├── src/
│   ├── css/
│   │   └── style.css                  # Estilos CSS del juego
│   ├── js/
│   │   ├── game.js                    # Lógica principal del juego
│   │   └── ui.js                      # Funciones de interfaz de usuario
│   └── assets/
│       ├── Fondo.jpg                  # Fondo del menú principal
│       ├── Nivel 1.jpg                # Fondo del Nivel 1
│       ├── Nivel 2.jpg                # Fondo del Nivel 2
│       ├── Nivel 3.jpg                # Fondo del Nivel 3
│       ├── Nivel 4.jpg                # Fondo del Nivel 4
│       ├── Nivel 5.jpg                # Fondo del Nivel 5
│       ├── Nivel 6.jpg                # Fondo del Nivel 6
│       ├── Nivel 7.jpg                # Fondo del Nivel 7
│       ├── Nivel 8.jpg                # Fondo del Nivel 8
│       ├── Nivel 9.jpg                # Fondo del Nivel 9
│       ├── Personaje.webp             # Sprite del personaje
│       └── SonidoSalto.mp3            # Efecto de sonido de salto
├── Documentacion/
│   ├── INDICE_GENERAL.md
│   ├── 01_Gestion/
│   │   ├── 01_descripcion_proyecto.md
│   │   └── 02_backlog_tareas.md
│   ├── 02_Game_Design_Document/
│   │   └── GDD_completo.md
│   └── 03_Assets/
│       └── assets_documentacion.md
└── jump_king.html                      # Archivo antiguo (sin usar)
```

## Descripción de Archivos

### Archivos Principales

#### `index.html`
- Archivo HTML limpio y bien estructurado
- Define la estructura DOM del juego
- Incluye: menú principal, modal de instrucciones, contenedor del juego
- Referencia los archivos CSS y JavaScript

### Carpeta `src/css/`

#### `style.css`
- Estilos completos del juego organizados por secciones
- Incluye: cuerpo, contenedor, jugador, plataformas, HUD, menú, instrucciones, game over
- Responsable de toda la presentación visual
- Rutas relativas a `src/assets/` para imágenes de fondo

### Carpeta `src/js/`

#### `game.js`
- Lógica principal del juego
- Contiene: variables, constantes, física, colisiones, movimiento del jugador
- Funciones: `generatePlatforms()`, `checkCollisions()`, `jump()`, `updatePlayer()`, `gameLoop()`
- Gestiona la progresión entre niveles

#### `ui.js`
- Funciones de interfaz de usuario
- Contiene: manejo del menú, instrucciones, HUD, pantalla de game over
- Funciones: `startGame()`, `showInstructions()`, `closeInstructions()`, `goToMenu()`, `updateHUD()`

### Carpeta `src/assets/`

Contiene todos los recursos del juego:
- **10 fondos de niveles** (Nivel 1-9.jpg)
- **Fondo del menú** (Fondo.jpg)
- **Sprite del personaje** (Personaje.webp)
- **Efecto de sonido** (SonidoSalto.mp3)

## Características de la Estructura Organizada

### Ventajas

1. **Separación de Responsabilidades**
   - HTML: Estructura únicamente
   - CSS: Estilos y presentación
   - JavaScript: Lógica y comportamiento

2. **Mantenibilidad**
   - Fácil de actualizar estilos sin tocar código
   - Cambios en lógica no afectan presentación
   - Código bien comentado y organizado

3. **Escalabilidad**
   - Fácil agregar nuevos niveles
   - Posibilidad de agregar nuevos scripts
   - Estructura preparada para expansión

4. **Rendimiento**
   - Archivos separados permiten caché del navegador
   - CSS minificado es más eficiente
   - JavaScript modular facilita optimización

5. **Legibilidad**
   - Código bien indentado y comentado
   - Funciones con nombres descriptivos
   - Secciones claramente delimitadas

## Cómo Ejecutar el Juego

### Opción 1: Servidor Python
```bash
cd "Examen Bimestre 2 - Implementacion"
python3 -m http.server 8000
```
Luego acceder a: `http://localhost:8000`

### Opción 2: Servidor Node.js
```bash
npm install -g http-server
http-server
```

### Opción 3: Servidor Local
- Usar Live Server en VS Code
- O cualquier servidor local que sirva archivos estáticos

## Modificaciones Futuras

Para agregar cambios:

1. **Nuevos estilos**: Editar `src/css/style.css`
2. **Nueva lógica**: Agregar funciones en `src/js/game.js`
3. **Nuevas características de UI**: Agregar funciones en `src/js/ui.js`
4. **Nuevos assets**: Colocar en `src/assets/`
5. **Nuevas imágenes**: Actualizar referencias en `style.css`

## Optimizaciones Aplicadas

1. **CSS**: Variables reutilizables, selectores eficientes
2. **JavaScript**: Funciones modularizadas, uso de requestAnimationFrame
3. **HTML**: Estructura semántica, minimal DOM nesting
4. **Assets**: Compresión JPEG, WebP para personaje, MP3 para audio

## Requisitos Técnicos

- Navegador moderno con soporte HTML5
- Resolución: 500x800 píxeles (mínimo recomendado: 1024x768)
- JavaScript habilitado
- Conexión a internet (para cargar fuentes locales)

## Notas de Desarrollo

- El juego utiliza `requestAnimationFrame` para un bucle de 60 FPS suave
- Sistema de colisiones AABB (Axis-Aligned Bounding Box)
- Fondos de niveles con rutas relativas desde `src/css/style.css`
- Audio con manejo de errores para navegadores que no soportan autoplay

## Compatibilidad

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Licencia y Créditos

Proyecto desarrollado como parte del segundo bimestre educativo.

---

**Última actualización:** Febrero 2025
