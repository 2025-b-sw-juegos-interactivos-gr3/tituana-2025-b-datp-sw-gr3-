# 🎮 CHRONOFRACTURE - Game Design Document (GDD)

## I. FICHA TÉCNICA Y CONCEPTO

### A. Información Básica
| Aspecto | Detalle |
|--------|---------|
| **Título** | CHRONOFRACTURE |
| **Género** | Puzzle-Action Platformer 2D |
| **Plataforma Principal** | PC (Windows, macOS, Linux) |
| **Plataforma Secundaria** | Web (Godot HTML5 Export) |
| **Resolución** | 1280x720 (16:9) |
| **Motor** | Godot Engine 4.x |
| **Público Objetivo** | 13+ años, jugadores de puzzle y narrativa |
| **ESRB Rating** | T (Teen) |

### B. Elevator Pitch
*"CHRONOFRACTURE es un puzzle-action 2D donde manipulas tres líneas temporales simultáneas (Pasado, Presente, Futuro) para resolver acertijos ambientales. El mundo se ha fracturado en el tiempo. Solo el Cronista puede ver todas las épocas a la vez y restaurar el equilibrio temporal, derrotando al ser que consume los tiempos."*

### C. Visión Creativa
Un juego que desafía la percepción del jugador sobre la causalidad y las consecuencias. Cada acción en una línea temporal tiene repercusiones en las otras. Los puzzles no tienen una única solución: manipular el pasado y observar sus efectos en el presente crea una sensación de poder y dominio temporal.

---

## II. ANÁLISIS MDA (MECHANICS, DYNAMICS, AESTHETICS)

### Aesthetics (Estética - Experiencia Emocional)
**Emociones Objetivo:**
- 🎯 **Descubrimiento:** Los jugadores sienten curiosidad por explorar las consecuencias de sus acciones
- 🎯 **Maestría:** Dominar la mecánica de capas temporales genera satisfacción
- 🎯 **Tensión:** Los enemigos temporales crean urgencia
- 🎯 **Asombro:** Las cinematics revelan la narrativa del colapso temporal

**Tono Visual & Narrativo:**
Oscuro, especulativo, ciencia ficción. El mundo es hermoso pero decadente. Colores cálidos (pasado) desvanecen a tonos fríos (futuro).

---

### Dynamics (Dinámicas - Comportamiento Emergente)

**¿Cómo interactúan las reglas para crear la experiencia?**

1. **Dinámica Principal: Manipulación Causal**
   - Acción: Mover una caja en el PASADO
   - Resultado: La caja está en una nueva posición en el PRESENTE (la dinámica de la física temporal)
   - Emoción: "Wow, puedo cambiar el presente usando el pasado"

2. **Dinámica de Evasión Temporal**
   - Los enemigos de PRESENTE no pueden cruzar obstáculos creados en PASADO
   - El jugador siente ingenio y control: "He atrapado el enemigo manipulando la historia"

3. **Dinámica de Exploración Multidimensional**
   - Secretos solo accesibles en FUTURO requieren cambiar el PASADO
   - Los jugadores regresan a niveles anteriores con nuevas perspectivas

4. **Dinámica de Progresión Narrativa**
   - Cada nivel revela fragmentos del lore mediante cinemáticas
   - La historia refuerza por qué el jugador debe dominar el tiempo

---

### Mechanics (Mecánicas - Las Reglas del Sistema)

#### Core Loop Principal
```
1. Observar las 3 capas temporales
2. Identificar el puzzle/obstáculo
3. Seleccionar una capa temporal
4. Manipular objetos/entorno en esa capa
5. Ver el impacto en las otras capas
6. Ajustar hasta resolver → Progresión
```

#### Mecánicas Fundamentales

**1. Time Layering (Superposición Temporal)**
- Pantalla dividida en 3 secciones horizontales:
  - **Superior (PASADO):** Tonos sepia, objetos/enemy "fantasmas"
  - **Centro (PRESENTE):** Colores vibrantes, jugador, enemigos activos
  - **Inferior (FUTURO):** Tonos azules/púrpuras, destrucción/ruinas, enemigos espectrales

**2. Cross-Layer Physics**
- Un objeto movido en PASADO aparece movido en PRESENTE y FUTURO
- Distancia entre capas = 1.5 segundos de "tiempo" virtual
- Algoritmo: `Estado_Presente = f(Estado_Pasado + Decaimiento_Natural)`

**3. Enemy Temporal Binding**
- Enemigos tipo "Echoes" solo existen en una capa temporal
- Enemigos tipo "Vorax" pueden cruzar capas pero con penalización de velocidad
- Los enemigos FUTURO son versiones corrompidas de los PRESENTE

**4. Temporal Switches**
- Objetos que cambian estado según la capa:
  - Puerta PASADO: abierta → Puerta PRESENTE: cerrada → Puerta FUTURO: destruida
- Permiten puzzles de múltiples soluciones

**5. Colección de Fragmentos (Progression)**
- Recopilar "Shards de Tiempo" desbloquea nuevas capacidades
- Shard #1 → Ver FUTURO completamente
- Shard #2 → Manipular FUTURO directamente
- Shard #3 → Saltar entre capas sin esperar

---

## III. FEATURES PRINCIPALES

### Gameplay Features
- ✅ Sistema de 3 capas temporales simultáneas
- ✅ 50+ tipos de puzzles diferentes
- ✅ 3 tipos de enemigos con IA única
- ✅ Sistema de progresión (Shards de Tiempo)
- ✅ 4 mundos temáticos con jefes finales
- ✅ Cinematics narrativas
- ✅ Sistema de diálogos con Echo (guía)
- ✅ Coleccionables secretos

### Technical Features
- ✅ Guardado de partida completo
- ✅ Resolución dinámica (responsive)
- ✅ Accesibilidad: colorblind mode, subtítulos
- ✅ Sistema de niveles escalable
- ✅ Editor de niveles integrado (futuro)

---

## IV. SCOPE

### In-Scope (MVP - Mínimo Viable)
- ✅ 4 mundos × 3 niveles = 12 niveles
- ✅ 1 jefe final (Vorax)
- ✅ Mecánica de Time Layering completa
- ✅ 3 enemigos tipos
- ✅ 1 sistema de progresión (Shards)

### Post-Launch (Expansiones)
- ❌ Modo cooperativo (2 players)
- ❌ Modo Desafío (Sin Timer, Perfecto)
- ❌ Editor de niveles para comunidad
- ❌ 2 mundos adicionales

---

## V. PLATAFORMA & TECNOLOGÍA

| Componente | Especificación |
|-----------|----------------|
| **Motor** | Godot Engine 4.x |
| **Lenguaje Scripting** | GDScript / C# |
| **Control de Versión** | Git (GitHub) |
| **Plataformas Target** | Windows, macOS, Linux, Web |
| **Resolución Nativa** | 1280x720 (escalable) |
| **Performance Target** | 60 FPS en hardware modesto |

---

## VI. PÚBLICO OBJETIVO

**Demografía Primaria:**
- Edad: 13-35 años
- Género: 50% M, 50% F
- Intereses: Puzzles, narrativa, ciencia ficción, indie games

**Jugadores Clave:**
- Fans de **Braid** (puzzles temporales)
- Fans de **Celeste** (movimiento precisión)
- Fans de **The Witness** (descubrimiento)

**USP (Unique Selling Point):**
Primer juego 2D donde manipulas 3 líneas temporales simultáneamente en la misma pantalla.

---

## VII. PROPUESTA DE VALOR

### Por qué debería jugarse CHRONOFRACTURE:

1. **Innovación Mecánica:** No hay otro juego 2D con este sistema de capas temporales
2. **Narrativa Integrada:** La historia justifica la mecánica de tiempo
3. **Accesibilidad + Profundidad:** Fácil de entender, difícil de dominar
4. **Experiencia Única:** Cada puzzle tiene múltiples soluciones
5. **Inmersión Visual:** Estética pixel art envolvente

---

## VIII. REFERENCIAS INSPIRACIONALES

- **Braid** - Puzzles con manipulación del tiempo
- **Gris** - Estética visual minimalista y emocional
- **Axiom Verge** - Pixel art y atmósfera cyberpunk
- **Hyper Light Drifter** - Movimiento fluido y cinemática
- **Portal** - Puzzle design iterativo

