# Game Design Document - Jump King

**Versión:** 1.0
**Fecha:** Febrero 2025
**Desarrollador:** Dorian Tituana
**Género:** Plataformas Vertical
**Plataforma:** Web (HTML5)

---

## 1. Visión General del Juego

### 1.1 Concepto Principal

Jump King es un videojuego de plataformas vertical que desafía al jugador a ascender a través de 10 niveles progresivos saltando sobre plataformas de diferentes tamaños y dificultades. Inspirado en el juego Jump King original, el título captura la esencia del género de plataformas al tiempo que introduce mecánicas refinadas de física y colisión.

### 1.2 Proposición de Valor

- Jugabilidad adictiva y desafiante
- Progresión gradual de dificultad
- Ambiente visual inmersivo con temas únicos por nivel
- Mecánicas de salto precisas y satisfactorias
- Experiencia accesible pero desafiante

### 1.3 Audiencia Objetivo

- Edades: 8 años en adelante
- Jugadores casuales de videojuegos
- Entusiastas del género plataformas
- Personas que disfrutan de desafíos cognitivos

### 1.4 Plataforma y Especificaciones Técnicas

**Plataforma Principal:** Navegador Web (Chrome, Firefox, Safari, Edge)

**Tecnologías:**
- HTML5
- CSS3 (Gradientes, Animaciones, Flexbox)
- JavaScript ES6+
- Canvas indirectamente (a través de DOM)

**Requisitos Mínimos:**
- Navegador moderno con soporte HTML5
- Resolución: 1024x768 píxeles o superior
- Conexión a internet (solo para cargar archivos iniciales)

**Rendimiento Objetivo:**
- 60 FPS en dispositivos estándar
- Tiempo de carga inicial: < 2 segundos
- Uso de memoria: < 50 MB

---

## 2. Narrativa y Mundo

### 2.1 Historia Principal

El jugador controla a un héroe sin nombre que ha decidido conquistar un misterioso castillo vertical. Dentro de sus muros se encuentran diez reinos temáticos, cada uno representando un desafío distinto. Ascendiendo a través de estos reinos, el jugador deberá demostrar su destreza, determinación y habilidad para alcanzar la cima del castillo.

### 2.2 Ambientes por Nivel

**Nivel 1: Torre Medieval**
Plataformas de madera y piedra en la base del castillo, representando la arquitectura medieval tradicional.

**Nivel 2: Castillo Oscuro**
Ambiente interior del castillo con paredes de piedra oscura y elementos góticos.

**Nivel 3: Templo de Cristal**
Zona subterránea luminosa con cristales bioluminiscentes y plataformas de energía mágica.

**Nivel 4: Torre Gótica**
Arquitectura gótica elaborada con elementos sombreados y atmósfera misteriosa.

**Nivel 5: Bosque Encantado**
Ambiente selvático mágico con árboles antigüos y fuego del bosque etéreo.

**Nivel 6: Castillo Mágico**
Dimensión mágica con cristales flotantes y símbolos arcanos.

**Nivel 7: Cielo Celestial**
Realm de las nubes con islas flotantes y luz celestial dorada.

**Nivel 8: Desierto Dorado**
Antiguo paisaje desértico inspirado en civilizaciones perdidas.

**Nivel 9: Abismo Oscuro**
Vacío cósmico con materia oscura y elementos sobrenaturales.

**Nivel 10: Trono de la Cima**
Gradiente final representando el pico del castillo con atmósfera épica.

---

## 3. Mecánicas de Juego

### 3.1 Sistemas Principales

#### Sistema de Movimiento

**Controles:**
- Tecla izquierda: Movimiento horizontal izquierda (velocidad: 5 px/frame)
- Tecla derecha: Movimiento horizontal derecha (velocidad: 5 px/frame)
- Espacio / W: Saltar (solo cuando está en plataforma)

**Características:**
- Movimiento horizontal continuo mientras la tecla está presionada
- Movimiento pendular suave sin aceleración/desaceleración
- Sin restricción de velocidad horizontal máxima

#### Sistema de Física

**Parámetros de Física:**
- Gravedad: 0.6 unidades de aceleración por frame
- Velocidad de caída máxima: 20 unidades por frame
- Potencia de salto: 15 unidades de velocidad inicial
- Framerate: 60 FPS (requestAnimationFrame)

**Comportamiento:**
- Gravedad constante aplicada en cada frame del juego
- Velocidad limitada para evitar atravesar plataformas
- Arco de salto realista con pico en la mitad de la trayectoria

#### Sistema de Colisiones

**Tipo:** AABB (Axis-Aligned Bounding Box)

**Dimensiones del Jugador:** 60x60 píxeles

**Detección de 4 Direcciones:**

1. **Colisión desde Arriba (Aterrizaje)**
   - Detecta cuando el jugador cae sobre una plataforma
   - Posiciona al jugador encima de la plataforma
   - Anula velocidad vertical
   - Activa estado "En Tierra"

2. **Colisión desde Abajo**
   - Detecta cuando el jugador golpea una plataforma desde abajo
   - Anula solo velocidad ascendente
   - Permite caída posterior

3. **Colisión Lateral**
   - Detecta choques con bordes laterales de plataformas
   - Detiene movimiento horizontal
   - Permite continuación del movimiento vertical

4. **Colisión desde Abajo (Golpe de Cabeza)**
   - Similar a colisión desde abajo
   - Invierte velocidad si es necesario

#### Sistema de Niveles

**Progresión de Niveles:**
- Automático: Cuando el jugador alcanza y = 0, avanza al siguiente nivel
- Regresión automática: Si cae más allá de y = 800, retrocede un nivel
- Niveles 1 y 10: No hay regresión más allá de estos

**Características por Nivel:**
- Posiciones de plataformas fijas (no aleatorias)
- Fondos temáticos únicos
- Dificultad progresiva: más espacios, plataformas más pequeñas

**Generador de Plataformas:**
Cada nivel tiene una configuración predefinida de plataformas en forma de array:
```
platforms: [
    {x: 200, y: 693, width: 100, height: 20},
    {x: 125, y: 573, width: 100, height: 20},
    ...
]
```

### 3.2 Estados del Juego

```
MENU
  ├── INSTRUCCIONES
  └── JUEGO
       ├── ACTIVO (jugador en juego)
       ├── PAUSA (no implementado)
       └── GAME_OVER
            └── MENU
```

### 3.3 Mecánicas de Retroalimentación

**Retroalimentación Visual:**
- Sombra dinámica bajo el personaje
- Cambio de posición visual al saltar
- Transiciones suaves entre niveles
- HUD con información clara del nivel

**Retroalimentación Sonora:**
- Efecto de sonido al saltar (SonidoSalto.mp3)
- Volumen consistente en todos los saltos

**Retroalimentación Háptica:**
- No implementado en versión web

---

## 4. Diseño de Niveles

### 4.1 Principios de Diseño de Niveles

1. **Progresión de Dificultad:** Cada nivel aumenta gradualmente en complejidad
2. **Variedad de Espacios:** Alternancia entre espacios cerrados y abiertos
3. **Flujo Vertical:** Todos los niveles siguen un flujo ascendente
4. **Puntos de Descanso:** Plataformas grandes para recuperarse entre saltos difíciles
5. **Desafío Localizado:** Pequeñas secciones difíciles intercaladas con áreas más fáciles

### 4.2 Análisis de Niveles

#### Nivel 1: Tutorial y Base (Dificultad: Muy Fácil)
- 6 plataformas principales + 1 plataforma de inicio grande (400x27px)
- Espaciado generoso entre plataformas
- Ancho de plataformas: 100px (promedio)
- Propósito: Enseñar controles y mecánicas básicas
- Tiempo esperado de finalización: 1-2 minutos

#### Niveles 2-4: Introducción a la Complejidad (Dificultad: Fácil-Media)
- 5-6 plataformas cada uno
- Inicio de variación en tamaños de plataformas
- Saltos más desafiantes pero recuperables
- Tiempo esperado: 2-3 minutos cada uno

#### Niveles 5-7: Zona de Desafío Medio (Dificultad: Media)
- 5 plataformas con disposiciones más complejas
- Menos plataformas de "descanso"
- Mayor distancia vertical entre plataformas
- Más elementos de sorpresa
- Tiempo esperado: 3-5 minutos cada uno

#### Niveles 8-9: Desafío Avanzado (Dificultad: Difícil)
- Disposiciones asimetricas
- Plataformas pequeñas (80px)
- Saltos largos y precisos requeridos
- Menos margen de error
- Tiempo esperado: 4-6 minutos cada uno

#### Nivel 10: Clímax (Dificultad: Muy Difícil)
- Configuración final épica
- Combinación de todos los desafíos previos
- Último salto hacia la victoria
- Transición final especial
- Tiempo esperado: 5-7 minutos

### 4.3 Especificaciones de Plataformas

| Nivel | Num. Plataformas | Tamaño Promedio | Distancia Promedio | Dificultad |
|-------|------------------|-----------------|-------------------|------------|
| 1     | 7 (inc. inicio)  | 100x20          | 117px              | Muy Fácil  |
| 2     | 6                | 100x20          | 130px              | Fácil      |
| 3     | 5                | 100x20          | 160px              | Fácil      |
| 4     | 5                | 100x20          | 150px              | Media      |
| 5     | 5                | 100x20          | 172px              | Media      |
| 6     | 5                | 100x20          | 175px              | Media      |
| 7     | 5                | 100x20          | 160px              | Media-Difícil |
| 8     | 5                | 100x20          | 170px              | Difícil    |
| 9     | 5                | 100x20          | 178px              | Difícil    |
| 10    | 6                | 100x20          | 165px              | Muy Difícil |

---

## 5. Personajes

### 5.1 Personaje Principal (Jugador)

**Nombre:** Héroe Anónimo

**Apariencia:** Sprite personalizado (80x80px visual, 60x60px hitbox)

**Habilidades:**
- Saltar indefinidamente (sin límite en cantidad)
- Movimiento horizontal suave
- Aterrizaje en cualquier plataforma

**Movimiento:**
- Velocidad horizontal: 5 px/frame
- Velocidad de salto inicial: 15 px/frame
- Gravedad: 0.6 px/frame²

**Características Especiales:**
- Sombra visual bajo los pies
- Efecto de drop-shadow para profundidad
- Sin animación de sprites (representación estática)

---

## 6. Interfaz de Usuario

### 6.1 Pantalla de Menú Principal

**Elementos:**
- Título "JUMP KING" con subtítulo "Salta hacia la victoria"
- Botón "Jugar" (azul/verde vibrante)
- Botón "Instrucciones" (naranja/amarillo)
- Información del juego en pequeño
- Fondo visual dinámico (Fondo.jpg con overlay)

**Funcionalidad:**
- Botón Jugar: Inicia el juego en Nivel 1
- Botón Instrucciones: Abre modal de instrucciones
- Efectos de hover en botones
- Animación de entrada suave

### 6.2 Modal de Instrucciones

**Contenido:**
- Objetivo del juego
- Controles disponibles (izquierda, derecha, saltar)
- Consejo especial
- Mensaje de advertencia (caer = retroceso)

**Funcionalidad:**
- Botón "Entendido" para cerrar
- Fondo semitransparente
- Texto claro y legible

### 6.3 HUD en Juego

**Información Mostrada:**
- Nivel Actual (Nivel: X)

**Diseño:**
- Fondo dorado gradient
- Texto grande y legible
- Posicionamiento superior del pantalla
- Actualización en tiempo real

**Estilos:**
```
Fondo: linear-gradient(135deg, rgba(255, 215, 0, 0.95), rgba(255, 165, 0, 0.95))
Borde: 3px solid #FFD700
Padding: 18px 35px
Border-radius: 15px
```

### 6.4 Pantalla Game Over

**Elementos:**
- Título "GAME OVER"
- Altura final alcanzada
- Nivel alcanzado
- Botón "Menú Principal"

**Funcionalidad:**
- Aparece cuando el juego termina
- Centro de pantalla
- Fondo oscuro semitransparente
- Datos persisten hasta cerrar modal

---

## 7. Arte y Dirección Visual

### 7.1 Paleta de Colores

**Colores Primarios por Nivel:**
- Nivel 1: Marrones, beiges, verdes
- Nivel 2: Grises oscuros, negros, plateados
- Nivel 3: Cíanes, morados, azules
- Nivel 4: Grises, morados, negros
- Nivel 5: Verdes, azules etéreos
- Nivel 6: Púrpuras, azules mágicos
- Nivel 7: Dorados, blancos, azul claro
- Nivel 8: Dorados, anaranjados, arenas
- Nivel 9: Púrpuras oscuros, negros cósmicos
- Nivel 10: Gradiente final épico

### 7.2 Estilo Visual

**Género:** Pixel art estilizado con elementos realistas

**Características:**
- Fondos de alta resolución (500x800px)
- Personaje sprite de tamaño mediano (80x80px)
- Plataformas con bordes definidos
- Efectos de sombra y profundidad
- Filtros drop-shadow para elementos flotantes

### 7.3 Interfaz Visual

**Tipografía:** Arial, Arial Black para énfasis

**Tamaño de Texto:**
- Títulos: 32-48px
- Información principal: 18-24px
- Información secundaria: 14-16px

**Efectos Visuales:**
- Animaciones de entrada suave (0.5s ease-out)
- Box-shadows con múltiples capas
- Gradientes lineales y radiales
- Transiciones suaves en hover

---

## 8. Audio

### 8.1 Efectos de Sonido

**Sonido de Salto:**
- Archivo: SonidoSalto.mp3
- Disparo: Cada vez que el jugador salta
- Volumen: 100%
- Duración: 0.2-0.5 segundos
- Tipo: Efecto sísmico/percusivo

### 8.2 Música de Fondo

**Estado:** No implementado en esta versión

**Consideraciones Futuras:**
- Música ambiental por nivel
- Transiciones suaves entre temas
- Volumen moderado para no distraer

### 8.3 Sistema de Audio

**Implementación:**
- HTML5 Audio API
- Precargar archivos en memoria
- Control de reproducción vía JavaScript

---

## 9. Sistema de Puntuación y Progresión

### 9.1 Métricas de Progreso

**Métrica Principal:** Nivel Alcanzado (1-10)

**Información Secundaria:**
- Altura máxima alcanzada durante el juego
- Nivel en el que el jugador fue eliminado

### 9.2 Objetivo Final

Completar el Nivel 10 y alcanzar la parte superior del castillo. No hay sistema de puntos competitivo en esta versión.

---

## 10. Especificaciones Técnicas del Juego

### 10.1 Ciclo de Juego Principal

```
Inicio
  ├─ Mostrar Menú
  ├─ Esperar entrada del usuario
  └─ Al presionar "Jugar"
      ├─ Inicializar Nivel 1
      ├─ Bucle Principal (60 FPS)
      │   ├─ Procesar entrada
      │   ├─ Actualizar posición del jugador
      │   ├─ Detectar colisiones
      │   ├─ Renderizar pantalla
      │   ├─ Verificar condiciones de victoria/derrota
      │   └─ Repetir
      ├─ Al ganar: Mostrar Game Over
      └─ Volver a Menú
```

### 10.2 Estructura de Datos

**Objeto Plataforma:**
```javascript
{
    x: número,      // posición X
    y: número,      // posición Y
    width: número,  // ancho en píxeles
    height: número  // alto en píxeles
}
```

**Objeto Jugador:**
```javascript
playerX: número,         // posición X actual
playerY: número,         // posición Y actual
velocityX: número,       // velocidad horizontal
velocityY: número,       // velocidad vertical
isOnGround: booleano,    // está en plataforma
bestHeight: número       // mejor altura alcanzada
```

### 10.3 Variables Globales Principales

```javascript
playerSize = 60              // tamaño de hitbox
platformWidth = 100          // ancho de plataforma promedio
platformHeight = 20          // alto de plataforma
gravity = 0.6                // aceleración de caída
jumpPower = 15               // fuerza de salto
moveSpeed = 5                // velocidad de movimiento horizontal
currentLevel = 1             // nivel actual (1-10)
gameActive = true            // estado del juego
```

---

## 11. Consideraciones de Diseño Futuro

### 11.1 Mejoras Potenciales

1. **Sistema de Guardado:** Guardar progreso entre sesiones
2. **Tabla de Puntuaciones:** Comparar con otros jugadores
3. **Logros Especiales:** Desafíos adicionales por nivel
4. **Modos de Juego:** Modo contrarreloj, modo infinito
5. **Personalización:** Cambiar apariencia del personaje
6. **Multijugador:** Carreras simultáneas

### 11.2 Optimizaciones Técnicas

1. Caché de imágenes en memoria
2. Compresión de archivos de audio
3. Lazy loading de assets
4. Responsive design para dispositivos móviles
5. Offline support con Service Workers

### 11.3 Expansión de Contenido

1. 10 niveles adicionales con nuevos temas
2. Boss fights al final de secciones
3. Power-ups temporales (salto doble, velocidad, etc.)
4. Enemigos que se mueven en plataformas
5. Puzzles ambientales integrados

---

## 12. Requisitos de Calidad

### 12.1 Criterios de Aceptación

- Juego completable sin errores críticos
- Colisiones funcionando correctamente en todos los 10 niveles
- Controles responsivos con latencia < 50ms
- Rendimiento mantenido a 60 FPS en dispositivos estándar
- Interfaz clara y accesible

### 12.2 Pruebas Realizadas

- Prueba de gameplay en cada nivel
- Verificación de colisiones en puntos de transición
- Prueba de sonido en múltiples navegadores
- Prueba de responsive design
- Prueba de Game Over y Game Win

---

## 13. Glosario

| Término | Definición |
|---------|-----------|
| AABB | Axis-Aligned Bounding Box - método de detección de colisiones |
| Hitbox | Área rectangular que define límites de colisión |
| Frame | Un ciclo del bucle de renderizado del juego |
| FPS | Fotogramas por segundo |
| Sprite | Gráfico 2D que representa un personaje u objeto |
| Plataforma | Superficie sólida sobre la que el jugador puede estar de pie |
| Física | Sistema que simula movimiento y gravedad realistas |

---

## Historial de Cambios

| Versión | Fecha | Cambios |
|---------|-------|---------|
| 1.0 | Feb 2025 | Documento inicial completo |

---

**Fin del Documento**
