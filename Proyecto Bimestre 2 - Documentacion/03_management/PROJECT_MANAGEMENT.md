# 📊 CHRONOFRACTURE - Project Management & Roadmap

## I. METODOLOGÍA ÁGIL (SCRUM)

**Enfoque:** SCRUM adaptado para desarrollo de videojuegos en equipo pequeño

### Estructura de Sprints
- **Duración:** 2 semanas por sprint
- **Reuniones:** Daily standup (15 min), Sprint review (30 min), Retrospectiva (30 min)
- **Herramienta:** GitHub Projects (Kanban) o Jira
- **Meta Global:** Juego MVP en 10 semanas

---

## II. ÉPICAS Y ROADMAP GENERAL

### Estructura Jerárquica
```
Proyecto CHRONOFRACTURE
├─ ÉPICA 1: Pre-Producción (Semanas 1-2)
├─ ÉPICA 2: Core Gameplay Loop (Semanas 3-4)
├─ ÉPICA 3: Niveles & Contenido (Semanas 5-7)
├─ ÉPICA 4: Sistemas de Interfaz (Semana 8)
├─ ÉPICA 5: Arte & Audio (Semanas 5-8)
├─ ÉPICA 6: Pulido & Optimización (Semanas 9-10)
└─ ÉPICA 7: Testing & QA (Semana 10)
```

---

## III. ÉPICAS DETALLADAS

### **ÉPICA 1: PRE-PRODUCCIÓN Y INVESTIGACIÓN**
**Duración:** Semanas 1-2 (Sprint 1)
**Objetivo:** Establecer la base técnica y documentación

#### User Stories:

**US-1.1:** Configurar ambiente de desarrollo
- [ ] Instalar Godot Engine 4.3
- [ ] Crear repositorio Git
- [ ] Configurar estructura de carpetas
- [ ] Tarea: 2 días | Responsable: Tech Lead

**US-1.2:** Crear documento GDD completo
- [ ] Redactar concepto
- [ ] Definir mecánicas
- [ ] Análisis MDA
- [ ] Tarea: 3 días | Responsable: Game Designer

**US-1.3:** Prototipo conceptual de Time Layering
- [ ] Crear escena básica con 3 capas
- [ ] Renderizar capas como 3 viewports separados
- [ ] Implementar cambio de capa básico (sin feedback)
- [ ] Tarea: 2 días | Responsable: Programmer

**US-1.4:** Definir arte style guide
- [ ] Paleta de colores (3 capas)
- [ ] Resolución sprite base (64x64)
- [ ] Referencias visuales
- [ ] Tarea: 1 día | Responsable: Artist

---

### **ÉPICA 2: CORE GAMEPLAY LOOP**
**Duración:** Semanas 3-4 (Sprint 2)
**Objetivo:** Implementar mecánica fundamental jugable

#### User Stories:

**US-2.1:** Sistema de movimiento y física
- [ ] Implementar CharacterController
- [ ] Gravedad 3 capas (PAST=5, PRESENT=9.8, FUTURE=12)
- [ ] Colisión básica
- [ ] Salto simple + doble salto (PRESENT)
- [ ] Tarea: 3 días | Responsable: Programmer

**US-2.2:** Sistema de cambio de capas
- [ ] Implementar TemporalManager
- [ ] Mapear Q/E a cambio de capas
- [ ] Animación fade (0.15s)
- [ ] Actualizar UI indicador de capa
- [ ] Tarea: 2 días | Responsable: Programmer

**US-2.3:** Crear Nivel 1 (Tutorial)
- [ ] Diseñar layout
- [ ] Implementar plataformas
- [ ] Agregar puntos de spawn/exit
- [ ] Tarea: 2 días | Responsable: Level Designer

**US-2.4:** Sistema de detección de colisiones
- [ ] Implementar Collider2D para player
- [ ] Detectar plataformas (sólidas)
- [ ] Detectar triggers (Shards, exit)
- [ ] Tarea: 2 días | Responsable: Programmer

**US-2.5:** Crear primer enemy: Echo
- [ ] Modelo de comportamiento (patrulla)
- [ ] Detección de jugador (rango 8m)
- [ ] Disparo de proyectil
- [ ] Animaciones básicas
- [ ] Tarea: 3 días | Responsable: Programmer + Artist

---

### **ÉPICA 3: NIVELES & CONTENIDO**
**Duración:** Semanas 5-7 (Sprints 3-4)
**Objetivo:** Implementar 12 niveles progresivos

#### User Stories por Nivel:

**US-3.1 a US-3.12:** Crear Niveles 1-12

*Estructura similar para cada nivel:*
```
US-3.X: Crear Nivel X
- [ ] Diseñar layout (3 capas)
- [ ] Implementar plataformas + objetos
- [ ] Colocar enemigos
- [ ] Crear puzzle (si aplica)
- [ ] Spawnear Shard (si aplica)
- [ ] Testing básico
- [ ] Tarea: X días | Dificultad: X
```

| Nivel | Story | Duración | Dificultad | Shard |
|-------|-------|----------|-----------|-------|
| 1 | US-3.1 | 1.5d | Muy Fácil | - |
| 2 | US-3.2 | 1.5d | Muy Fácil | - |
| 3 | US-3.3 | 2d | Fácil | ✓ #1 |
| 4 | US-3.4 | 2d | Fácil | - |
| 5 | US-3.5 | 2.5d | Media | ✓ #2 |
| 6 | US-3.6 | 2.5d | Media | - |
| 7 | US-3.7 | 3d | Media-Alta | - |
| 8 | US-3.8 | 4d | Alta (Boss) | ✓ #3 |
| 9 | US-3.9 | 2d | Alta | - |
| 10 | US-3.10 | 3d | Muy Alta | ✓ #4 |
| 11 | US-3.11 | 3d | Muy Alta | - |
| 12 | US-3.12 | 4d | Épico (Boss Final) | ✓ #5 |

**US-3.13:** Crear enemigos adicionales (Shade, Vorax)
- [ ] Implementar Shade (cruce de capas)
- [ ] Implementar Vorax Menor (mini-boss)
- [ ] Implementar Vorax Final (boss épico)
- [ ] Tarea: 4 días | Responsable: Programmer

**US-3.14:** Crear sistema de Shards
- [ ] Implementar InventorySystem
- [ ] Crear 5 Shards coleccionables
- [ ] Definir efectos de cada Shard
- [ ] Tarea: 2 días | Responsable: Programmer

---

### **ÉPICA 4: SISTEMAS DE INTERFAZ**
**Duración:** Semana 8 (Sprint 5)
**Objetivo:** Crear UI/UX completa

#### User Stories:

**US-4.1:** Crear HUD (En-juego)
- [ ] Display de HP (corazones)
- [ ] Indicador de capa temporal
- [ ] Display de Shards recogidos
- [ ] Tarea: 1.5 días | Responsable: UI Designer

**US-4.2:** Crear menú de pausa
- [ ] Botones: Reanudar, Reintentar, Ir a menú, Salir
- [ ] Mostrar estadísticas
- [ ] Animaciones de fade
- [ ] Tarea: 1 día | Responsable: UI Designer

**US-4.3:** Crear menú principal
- [ ] Botones: Jugar, Continuar, Opciones, Salir
- [ ] Animación de transición
- [ ] Título del juego
- [ ] Tarea: 1.5 días | Responsable: UI Designer

**US-4.4:** Crear sistema de guardado
- [ ] JSON save file format
- [ ] Load/Save functionality
- [ ] Slots de guardado (3)
- [ ] Tarea: 1.5 días | Responsable: Programmer

**US-4.5:** Crear sistema de cinemáticas
- [ ] Scriptable events
- [ ] Transiciones de texto/imagen
- [ ] Reproducir cinemáticas en puntos clave
- [ ] Tarea: 2 días | Responsable: Designer + Programmer

---

### **ÉPICA 5: ARTE & AUDIO**
**Duración:** Semanas 5-8 (Paralelo a otros)
**Objetivo:** Crear assets visuales y sonoros

#### User Stories:

**US-5.1:** Crear sprite sheets
- [ ] Player (8 frames animación)
- [ ] Enemies (6 frames c/u)
- [ ] Plataformas (variantes)
- [ ] Objetos (Shards, items)
- [ ] Tarea: 5 días | Responsable: Artist

**US-5.2:** Crear backgrounds/tileset
- [ ] Templo (3 versiones capas)
- [ ] Bosque (3 versiones capas)
- [ ] Fortaleza (3 versiones capas)
- [ ] Ciudad (3 versiones capas)
- [ ] Tarea: 6 días | Responsable: Artist

**US-5.3:** Crear música
- [ ] Tema principal (2 min)
- [ ] Música Templo (3 min)
- [ ] Música Bosque (3 min)
- [ ] Música Fortaleza (3 min)
- [ ] Música Ciudad (3 min)
- [ ] Tema Boss (2 min)
- [ ] Tarea: 4 días | Responsable: Composer

**US-5.4:** Crear efectos de sonido
- [ ] SFX movimiento (salto, aterrizaje)
- [ ] SFX temporal (cambio capas)
- [ ] SFX enemigos (alerta, ataque)
- [ ] SFX UI (click, collectible)
- [ ] SFX ambiente
- [ ] Tarea: 2 días | Responsable: Sound Designer

**US-5.5:** Implementar assets en motorn
- [ ] Importar sprites en Godot
- [ ] Configurar animaciones
- [ ] Crear Prefabs
- [ ] Ajustar físicas de sprites
- [ ] Tarea: 2 días | Responsable: Programmer

---

### **ÉPICA 6: PULIDO & OPTIMIZACIÓN**
**Duración:** Semanas 9-10 (Sprint 6)
**Objetivo:** Refinar experiencia y performance

#### User Stories:

**US-6.1:** Balanceo de dificultad
- [ ] Testear cada nivel
- [ ] Ajustar spawns de enemigos
- [ ] Rebalancear daño/HP
- [ ] Tarea: 2 días | Responsable: Designer + Tester

**US-6.2:** Optimización de performance
- [ ] Profiling de FPS
- [ ] Optimizar Physics (quadtree)
- [ ] Reducir draw calls
- [ ] Tarea: 2 días | Responsable: Programmer

**US-6.3:** Pulir animaciones y VFX
- [ ] Agregar particle effects
- [ ] Screen shake en eventos importantes
- [ ] Feedback visual mejorado
- [ ] Tarea: 2 días | Responsable: Artist

**US-6.4:** Agregar accesibilidad
- [ ] Subtítulos
- [ ] Colorblind mode
- [ ] Opciones de dificultad
- [ ] Tarea: 1 día | Responsable: Designer

**US-6.5:** Testing completo
- [ ] QA de todos los niveles
- [ ] Buscar bugs
- [ ] Verificar colisiones
- [ ] Tarea: 2 días | Responsable: QA Tester

---

### **ÉPICA 7: TESTING & QA FINAL**
**Duración:** Semana 10 (Sprint 6 final)
**Objetivo:** Asegurar calidad antes de lanzamiento

#### User Stories:

**US-7.1:** Testing de gameplay
- [ ] Playtest completo (12 niveles)
- [ ] Documentar bugs críticos
- [ ] Verificar victoria/derrota
- [ ] Tarea: 1.5 días | Responsable: QA

**US-7.2:** Testing de compatibilidad
- [ ] Windows build
- [ ] macOS build
- [ ] Linux build
- [ ] Web build (si aplica)
- [ ] Tarea: 1 día | Responsable: Programmer

**US-7.3:** Testing de rendimiento
- [ ] FPS stables 60
- [ ] Memory leak check
- [ ] Load time aceptable
- [ ] Tarea: 0.5 días | Responsable: Programmer

---

## IV. ASIGNACIÓN DE EQUIPO Y RESPONSABILIDADES

### Estructura Propuesta (Equipo Mínimo)

```
┌─────────────────────────────────────────┐
│    CHRONOFRACTURE TEAM STRUCTURE        │
├─────────────────────────────────────────┤
│                                         │
│  Productor (Project Manager)            │
│  └─ Gestiona timeline, scope           │
│                                         │
│  ┌─ Technical Lead (Programmer)         │
│  │  ├─ Core Systems                     │
│  │  ├─ Enemy AI                         │
│  │  └─ Optimization                     │
│  │                                      │
│  ├─ Game Designer                       │
│  │  ├─ Puzzle Design                    │
│  │  ├─ Balancing                        │
│  │  └─ Level Design                     │
│  │                                      │
│  ├─ Artist (Visual)                     │
│  │  ├─ Sprites                          │
│  │  ├─ Backgrounds                      │
│  │  └─ VFX                              │
│  │                                      │
│  └─ Audio Designer                      │
│     ├─ Music Composition                │
│     └─ Sound Effects                    │
│                                         │
│  QA Tester (Parte-tiempo)              │
│  └─ Bug reporting, Testing             │
│                                         │
└─────────────────────────────────────────┘
```

### Responsabilidades por Rol

| Rol | Epic 1 | Epic 2 | Epic 3 | Epic 4 | Epic 5 | Epic 6 | Epic 7 |
|-----|--------|--------|--------|--------|--------|--------|--------|
| Producer | Lead | Support | Support | Support | Support | Lead | Lead |
| Tech Lead | Lead | Lead | Lead | Lead | Support | Lead | Lead |
| Designer | Lead | Lead | Lead | Support | Support | Lead | Support |
| Artist | Support | Support | Support | Support | Lead | Lead | Support |
| Audio | - | - | - | - | Lead | Lead | Support |
| QA | - | - | Support | Support | Support | Lead | Lead |

---

## V. TIMELINE DETALLADO

### Sprint 1: Pre-Producción (Semanas 1-2)

```
Semana 1:
  L: US-1.1, US-1.2 (inicio)
  M: US-1.2 (continuación), US-1.3 (inicio)
  M: US-1.3 (continuación), US-1.4 (inicio)
  J: US-1.2, US-1.3, US-1.4 (finalizando)
  V: Review + Retrospective

Semana 2:
  L: US-1.3 (pulir), US-1.4 (finalizar), Comienza prep US-2.1
  M: Test prototipo, documentación final
  M: Reunión de nivelación, confirmación specs
  J: Buffer para arreglos finales
  V: Sprint Review + Planning Sprint 2
```

### Sprint 2: Core Loop (Semanas 3-4)

```
Semana 3:
  Tareas Paralelas:
  ├─ US-2.1: Movimiento física (3 días)
  ├─ US-2.2: Cambio capas (2 días)
  ├─ US-2.3: Nivel 1 (2 días)
  └─ US-5.1 (inicio): Sprites player (2 días)

Semana 4:
  ├─ US-2.4: Colisiones (2 días)
  ├─ US-2.5: Enemy Echo (3 días)
  ├─ US-3.1, US-3.2: Niveles 1-2
  └─ US-5.2 (inicio): Backgrounds templo
```

### Sprints 3-4: Contenido (Semanas 5-7)

Estructura similar a Sprint 2, pero enfocado en:
- Crear Niveles 3-8 en paralelo
- Crear Shade + Vorax Menor
- Crear Shards 1-3
- Paralelo: Assets visuales + Audio

### Sprint 5: UI (Semana 8)

```
Todos los US-4.X en paralelo
- Cada task toma 1-2 días
- Integration testing al final
```

### Sprints 6-7: Pulido (Semanas 9-10)

```
Semana 9:
  ├─ US-6.1: Balanceo (2 días)
  ├─ US-6.2: Optimización (2 días)
  ├─ US-6.3: VFX (1 día)
  └─ Playtesting contínuo

Semana 10:
  ├─ US-7.1: QA (1.5 días)
  ├─ US-7.2: Build testing (1 día)
  ├─ US-7.3: Performance (0.5 días)
  ├─ Hotfix bugs críticos
  └─ Lanzamiento
```

---

## VI. DIAGRAMA DE GANTT (Resumen)

```
ÉPICA                   S1  S2  S3  S4  S5  S6  S7
────────────────────────────────────────────────
Pre-Producción         [█ █]
Core Loop                  [█ █]
Niveles & Enemigos            [█ █ █ █]
Arte & Audio           [   █ █ █ █ █]
UI/UX                              [█ █]
Pulido & Opt                           [█]
QA & Lanzamiento                       [█]
────────────────────────────────────────────────
TOTAL:                10 semanas
```

---

## VII. RIESGOS & MITIGACIÓN

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|------------|---------|-----------|
| Scope creep | Alta | Alto | Sprint planning rígido, cambios solo en releases post-launch |
| Performance issues | Media | Alto | Profiling desde Sprint 2, arquitectura escalable |
| Delay en assets | Media | Medio | Placeholder assets desde Sprint 1, reemplazo progresivo |
| Bugs en juegos | Alta | Medio | Testing contínuo, QA en Sprint 5+ |
| Equipo enfermo | Baja | Medio | Documentación clara, pares de backups |
| Godot API changes | Baja | Bajo | Mantener versión 4.3 LTS locked |

---

## VIII. CRITERIOS DE ACEPTACIÓN

### Para cada User Story:

```
Dado que [contexto]
Cuando [acción]
Entonces [resultado esperado]

Ejemplo (US-2.1):
Dado que el jugador está en la pantalla de juego
Cuando presiona A/D para mover
Entonces el jugador se mueve a velocidad 5 m/s en la dirección presionada
Y no se mueve más rápido de 15 m/s al caer
Y puede saltar presionando ESPACIO
```

### DoD (Definition of Done):

- [ ] Código escrito y revisado (Code Review)
- [ ] Tests unitarios pasados (si aplica)
- [ ] Documentación actualizada
- [ ] Cambios integrados en rama main
- [ ] QA testing completado
- [ ] Performance acceptable (< 3% FPS drop)

---

## IX. METRICAS DE SEGUIMIENTO

### Velocidad del Sprint

```
Sprint 1: X story points (capacidad inicial)
Sprint 2: Y story points
...

Meta: Estabilizar velocidad en Sprint 3+
```

### Defect Tracking

```
Blocker bugs (Critical): Resolver antes de siguiente sprint
Major bugs: Resolver en siguiente sprint
Minor bugs: Backlog para post-launch
```

### Coverage

```
Nivel completado = Todos los US del nivel "DONE"
Juego completado = Niveles 1-12 + Boss + UI + Pulido
```

---

## X. HERRAMIENTAS RECOMENDADAS

| Herramienta | Propósito | Costo |
|-----------|----------|-------|
| GitHub Projects | Kanban, issues | Gratis |
| Discord | Comunicación | Gratis |
| Google Drive | Documentación | Gratis |
| Figma | UI/UX mockups | Gratis (básico) |
| Godot Engine | Game engine | Gratis |
| VS Code | IDE | Gratis |
| Aseprite | Pixel art | $20 |

---

## XI. POST-LAUNCH ROADMAP (Futuro)

### Fase 2: Expansión (Semanas 11-15)

- [ ] Modo cooperativo (2 players)
- [ ] 4 niveles adicionales
- [ ] Jefes adicionales
- [ ] Skins alternativas para Kael

### Fase 3: Contenido Comunitario (Semanas 16+)

- [ ] Editor de niveles
- [ ] Publicar niveles de comunidad
- [ ] Leaderboards en línea

---

## XII. CONCLUSIÓN

Este roadmap asegura que CHRONOFRACTURE sea completable en 10 semanas con un equipo pequeño. La clave es:

1. ✅ **Claridad:** Cada US tiene objetivo específico
2. ✅ **Flexibilidad:** Buffers incluidos, cambios priorizados
3. ✅ **Comunicación:** Daily standups + Sprint reviews
4. ✅ **Calidad:** QA integrado desde Sprint 2

**Lanzamiento Estimado:** Semana 10 con MVP completo

