# ⚙️ CHRONOFRACTURE - Mecánicas Core & Game Systems

## I. CORE LOOP (Ciclo Principal de Juego)

El Core Loop es la secuencia repetida que define cómo el jugador interactúa con el juego momento a momento.

### Macro Loop (Sesión completa)
```
[INICIO SESIÓN]
     ↓
[CARGA NIVEL]
     ↓
[SPAWN JUGADOR EN CHECKPOINT]
     ↓
┌────────────────────────────────┐
│   CORE LOOP ITERATIVO          │
│  (Repetir cada frame ~60 FPS)  │
└────────────────────────────────┘
     ↓ (Para cada frame)
[PROCESAR INPUT]
     ↓
[ACTUALIZAR ESTADO JUGADOR]
     ↓
[ACTUALIZAR ENEMIGOS]
     ↓
[ACTUALIZAR FÍSICA (3 capas)]
     ↓
[DETECTAR COLISIONES]
     ↓
[RENDERIZAR 3 CAPAS]
     ↓
(¿Ganó? ¿Perdió? ¿Pausa?)
     ↓
[SI: Condición Victoria] → [CINEMATICA] → [SIGUIENTE NIVEL]
[SI: Condición Derrota]  → [RESPAWN]
[SI: Pausa]              → [MENU PAUSA]
     ↓
[FIN SESIÓN]
```

### Micro Loop (Puzzle Solving - 30-120 segundos)
```
[OBSERVAR PUZZLE EN 3 CAPAS]
         ↓
[IDENTIFICAR OBJETIVO]
         ↓
[FORMULAR ESTRATEGIA]
         ↓
┌─────────────────────────────┐
│ ACTION LOOP (Intentos)      │
├─────────────────────────────┤
│ 1. Seleccionar capa temporal│
│ 2. Ejecutar acción (mover)  │
│ 3. Ver consecuencia         │
│ 4. Evaluar progreso         │
│ 5. Ajustar estrategia       │
└─────────────────────────────┘
         ↓
[¿PUZZLE RESUELTO?]
    ↓         ↓
   SÍ         NO
    ↓         ↓
[AVANZAR]   [REINTENTAR]
    ↓         ↑
    └─────────┘
```

---

## II. SYSTEMS OVERVIEW

### System 1: Movement & Physics

**Componentes:**
- Player Position (3 capas)
- Velocity Vector
- Gravity Application
- Collision Detection

**Pseudocódigo del Sistema:**

```pseudocode
FUNCIÓN ActualizarMovimiento():
    capas_activas = [PASADO, PRESENTE, FUTURO]
    
    PARA cada capa EN capas_activas:
        // Aplicar input
        velocidad_x = input.horizontal * PLAYER_SPEED
        
        // Aplicar gravedad
        velocidad_y += gravedad[capa] * delta_time
        
        // Limitar velocidad máxima de caída
        velocidad_y = MIN(velocidad_y, MAX_FALL_SPEED)
        
        // Calcular nueva posición
        nueva_pos = posicion_actual + (velocidad * delta_time)
        
        // Detectar colisiones
        SI CheckearColision(nueva_pos):
            nueva_pos = AjustarAlimetrica(nueva_pos)  // Deslizar contra obstáculos
            velocidad_y = 0  // Detener caída si hay piso
        
        // Guardar nueva posición
        ActualizarPosicion(capa, nueva_pos)

FUNCIÓN Saltar():
    SI JugadorEnPiso():
        velocidad_y = -JUMP_FORCE  // Fuerza de salto (negativa = arriba)
        reproducir_SFX("salto")

FUNCIÓN SaltoDoble():  // Solo disponible en PRESENTE
    SI SaltosDisponibles > 0:
        velocidad_y = -JUMP_FORCE * 0.8  // Salto más débil
        SaltosDisponibles -= 1
```

**Parámetros de Física:**

| Parámetro | PASADO | PRESENTE | FUTURO | Unidad |
|-----------|--------|----------|--------|--------|
| Gravedad | 5 | 9.8 | 12 | m/s² |
| Velocidad Movimiento | 5 | 5 | 5 | m/s |
| Fuerza de Salto | 8 | 8 | 8 | m/s |
| Velocidad Máxima Caída | 12 | 15 | 18 | m/s |
| Fricción (ground) | 0.7 | 0.8 | 0.5 | factor |
| Fricción (aire) | 0.1 | 0.1 | 0.1 | factor |

---

### System 2: Temporal Layer Switching

**Descripción:**
Permite al jugador cambiar entre capas temporales.

**Antes de Shard #3 (Delay Mode):**
```pseudocode
FUNCIÓN CambiarCapa(capa_destino):
    SI capa_destino != capa_actual:
        capa_actual = capa_destino
        reproducir_SFX("whoosh_temporal")
        
        // Animación de transición
        Iniciar Tween(jugador.alpha, 0.3, 0.1 segundos)
        Esperar(0.5 segundos)  // Delay de cambio
        Iniciar Tween(jugador.alpha, 1.0, 0.1 segundos)
        
        // Cámara sigue a jugador en nueva capa
        ActualizarCamara()
```

**Después de Shard #3 (Instant Mode):**
```pseudocode
FUNCIÓN CambiarCapa_Instant(capa_destino):
    SI capa_destino != capa_actual:
        capa_actual = capa_destino
        reproducir_SFX("whoosh_fast")  // Sonido diferente
        
        // Sin delay, cambio instantáneo
        ActualizarCamara()
```

**Restricciones:**
- Solo 1 capa activa a la vez
- No se puede cambiar durante ciertos eventos (cinematicas, ataques)
- Durante combate con Vorax: Cambio limitado a 1x por 2 segundos

---

### System 3: Enemy AI

#### A. Enemy Type: Echo

**Diagrama de Estados:**

```
┌─────────────┐
│  PATROLLING │ ← Estado inicial
└────┬────────┘
     │ Detecta jugador (rango 8m)
     ↓
┌─────────────┐
│   ALERTA    │ ← Sonido de alerta
└────┬────────┘
     │ Espera 1 segundo
     ↓
┌─────────────┐
│   ATTACKING │ ← Carga proyectil
└────┬────────┘
     │ Proyectil golpea o pasa
     ↓
     ├─→ Golpea → [Damge Jugador] → Vuelve PATROLLING
     └─→ Falla  → [Proyectil destruido] → Vuelve PATROLLING
```

**Parámetros Echo:**
- Velocidad Patrulla: 2 m/s
- Rango Detección: 8 metros
- Daño por Golpe: 1 HP
- Tiempo Recarga Ataque: 3 segundos
- Velocidad Proyectil: 6 m/s
- Rango Ataque: 10 metros

---

#### B. Enemy Type: Shade

**Descripción:**
Enemigo intermedio que puede cruzar capas temporales.

**Diagrama de Estados:**

```
PATROLLING (5s) → DETECCIÓN → PERSECUCIÓN
                                    │
                              Cambio de capa
                              (cada 3s)
                                    │
                                 ATAQUE
```

**Parámetros Shade:**
- Velocidad Base: 3.5 m/s
- Velocidad Cruzando Capas: 1.75 m/s (-50%)
- Frecuencia Cruce Capas: 3 segundos
- Daño: 1.5 HP
- Capacidad de Ataque: Carga y suelta proyectil en arco

---

#### C. Enemy Type: Vorax (Boss)

**Descripción:**
Jefe multitemporal que existe en 3 formas simultáneamente.

**Arquitectura:**
- Vorax-Pasado (2 HP)
- Vorax-Presente (2 HP)
- Vorax-Futuro (2 HP)
- Total: 6 HP compartidos

**Patrón de Ataque (Ciclo de 10 segundos):**

```
CICLO VORAX (10s total)
├─ [0-3s]   Vorax-PASADO ataca:
│           Bola de energía sepia
│           Velocidad: 4 m/s
│           Daño: 2 HP
│
├─ [3-6s]   Vorax-PRESENTE ataca:
│           Proyectil rojo directo
│           Velocidad: 7 m/s
│           Daño: 2 HP
│
├─ [6-10s]  Vorax-FUTURO ataca:
│           Múltiples proyectiles (3x) en abanico
│           Velocidad: 5 m/s cada uno
│           Daño: 2 HP por impacto
│
└─ [Repite cada 10s]
```

**Fases del Combate:**

| Fase | HP Vorax | Dificultad | Cambios |
|------|----------|-----------|---------|
| 1 | 6-4 | Media | Patrón standard |
| 2 | 3-2 | Alta | Ataques más rápidos (-25% cooldown) |
| 3 | 1-0 | Crítica | Todas las formas atacan simultáneamente |

**Derrota:**
- Cuando 3 formas llegan a 0 HP
- Cinemática de Vorax fragmentándose temporalmente
- Otorga Shard #4 (Verdad Temporal)

---

### System 4: Collision Detection

**Tipos de Colisores:**

1. **Sólido:** Bloquea movimiento (paredes, plataformas)
2. **Trigger:** No bloquea, solo ejecuta evento (Shards, enemigos)
3. **Morte:** Daño instantáneo si toca (-1 HP)
4. **Trampa:** Paraliza jugador 2s, sin daño

**Pseudocódigo Colisión:**

```pseudocode
FUNCIÓN CheckearColisiones():
    capas = [PASADO, PRESENTE, FUTURO]
    
    PARA cada capa EN capas:
        colisiones = EncontrarColisiones(jugador_capa, objetos_capa)
        
        PARA cada colisión EN colisiones:
            SWITCH(colisión.tipo):
                CASE SOLIDO:
                    AjustarPosicion(jugador, colisión)
                    velocidad_y = 0
                
                CASE TRIGGER:
                    EjecutarEvento(colisión.evento)
                
                CASE MORTE:
                    RecibirDaño(1)
                    ParaalizarDespues(0.5s)
                
                CASE TRAMPA:
                    AplicarParalisis(2s)
```

---

### System 5: Inventory & Progression

**Inventario del Jugador:**

```javascript
{
    shards: {
        "shard_1": { nombre: "Visión Temporal", tengo: false },
        "shard_2": { nombre: "Manipulación Futura", tengo: false },
        "shard_3": { nombre: "Salto Temporal", tengo: false },
        "shard_4": { nombre: "Verdad Temporal", tengo: false },
        "shard_5": { nombre: "Dominio Temporal", tengo: false }
    },
    pociones: 0,
    dinero: 0  // Para futuras expansiones
}
```

**Efectos de Shard (Sistema de Capacidades):**

```pseudocode
SISTEMA DE SHARDS:

SHARD 1: Visión Temporal
├─ Antes: FUTURO mostrado en silueta oscura
└─ Después: FUTURO totalmente visible, colores diferenciados

SHARD 2: Manipulación Futura
├─ Antes: Objetos FUTURO no pueden moverse
└─ Después: Jugador puede mover objetos FUTURO con interacción

SHARD 3: Salto Temporal
├─ Antes: Cambio de capa con delay 0.5s
└─ Después: Cambio de capa instantáneo

SHARD 4: Verdad Temporal
├─ Efecto: Cinemática de flashback (pre-colapso)
└─ Gameplaychange: Desbloquea comprensión narrativa

SHARD 5: Dominio Temporal (Secreto)
├─ Efecto: Ralentizar tiempo global (0.5x velocidad)
├─ Duración: 5 segundos
└─ Cooldown: 30 segundos
```

---

### System 6: HUD & UI

**Elementos de HUD:**

```
┌─────────────────────────────────────────────────┐
│ CAPA ACTUAL: PRESENTE                          │
│ HP: ❤️ ❤️ ❤️  (3/3)                             │
│ SHARDS: ✓ ✓ ✗ ✗ ✗  (2/5)                      │
│ TIEMPO DOMINIO: [████████░░] 8.2s             │
│ CHECKPOINT: 1/3                                │
└─────────────────────────────────────────────────┘
        [Nivel 5: El Bosque Cristalizado]
```

**Pantalla de Pausa:**
```
┌────────────────────┐
│   PAUSA            │
├────────────────────┤
│ • Reanudar (ESC)   │
│ • Reintentar       │
│ • Ir a Menú        │
│ • Salir al Escritorio
│                    │
│ SHARDS: 2/5        │
│ ENEMIGOS DERROTADOS
│ TIEMPO: 14:32      │
└────────────────────┘
```

---

## III. CONTROLES DETALLADOS

### Mappeo de Teclado (QWERTY)

| Acción | Tecla | Descripción |
|--------|-------|-------------|
| **Movimiento** | ← / A | Izquierda |
| | → / D | Derecha |
| **Salto** | ESPACIO | Salto normal |
| | ESPACIO × 2 | Doble salto (solo PRESENTE) |
| **Capas** | Q | Cambiar a PASADO |
| | W | Cambiar a PRESENTE (siempre visible) |
| | E | Cambiar a FUTURO |
| **Interacción** | F | Recoger Shard, activar puerta |
| **Pausa** | ESC | Pausar/Reanudar |
| **Reintentar** | R | Volver a checkpoint |

### Mappeo de Gamepad (Xbox Style)

| Acción | Botón |
|--------|-------|
| Movimiento | Stick Izquierdo |
| Salto | A |
| Doble Salto | A × 2 |
| PASADO | LB |
| PRESENTE | Y (para confirmación) |
| FUTURO | RB |
| Interacción | X |
| Pausa | START |
| Reintentar | BACK |

---

## IV. FEEDBACK SYSTEMS

### Audio Feedback

| Evento | SFX | Duración |
|--------|-----|----------|
| Salto | "jump_whoosh.ogg" | 0.3s |
| Aterrizaje | "land_thud.ogg" | 0.2s |
| Daño recibido | "hurt_synth.ogg" | 0.5s |
| Recoger Shard | "shard_collect_chime.ogg" | 1.2s |
| Cambiar PASADO | "temporal_whoosh_past.ogg" | 0.4s |
| Cambiar FUTURO | "temporal_whoosh_future.ogg" | 0.4s |
| Enemy Ataca | "enemy_attack_warn.ogg" | 0.6s |
| Puzzle Resuelto | "victory_chime.ogg" | 2s |
| Muerte | "death_sting.ogg" | 1s |

### Visual Feedback

| Evento | Efecto Visual |
|--------|---------------|
| Salto | Dust particles (2-3 partículas) |
| Aterrizaje | Screen shake (0.1s, intensidad baja) |
| Daño | Parpadeo jugador 1.5s (alpha 0.5↔1.0) |
| Recoger Shard | Destello dorado + zoom leve (+10%) |
| Cambiar capa | Fade out/in (0.15s) |
| Enemy Ataca | Rojo destello breve alrededor del enemigo |
| Puzzle Resuelto | Punto verde en esquina + destello nivel |
| Vorax Ataque | Screen shake proporcional a daño |

---

## V. DIFFICULTY PROGRESSION

| Nivel | Dificultad | Mecánicas Introducidas | Enemigos |
|-------|-----------|----------------------|----------|
| 1 | Muy Fácil | Movimiento básico | 0 |
| 2 | Muy Fácil | Salto, plataformas | 1 Echo |
| 3 | Fácil | Cambio de capa | 1 Echo |
| 4 | Fácil | Objeto movible (1 capa) | 1 Shade |
| 5 | Media | Objeto movible (3 capas) | 2 Shade |
| 6 | Media | Temporal Switches | 1 Echo + 1 Shade |
| 7 | Media-Alta | Puzzle de 4+ acciones | 2 Shade |
| 8 | Alta | JEFE: Vorax Menor | Vorax |
| 9 | Alta | Puzzle emergentes | 3 Enemigos variados |
| 10 | Muy Alta | Sincronización de capas | 2 Shade + Trampas |
| 11 | Muy Alta | Puzzle final antes de jefe | Varios |
| 12 | Épico | JEFE FINAL: Vorax | Vorax (6 HP) |

---

## VI. CHECKPOINTS & SAVING

**Sistema de Checkpoints:**

- Cada nivel tiene 2-3 puntos de control
- Se activan automáticamente al llegar
- Se guardan: Posición, HP, Inventario de Shards, enemigos derrotados
- Al morir: Respawn en último checkpoint

**Sistema de Guardado Global:**

```json
{
    "saveName": "Save 1",
    "lastLevel": 5,
    "playerStats": {
        "totalDeaths": 12,
        "totalTime": 3600,
        "levelTimes": [45, 67, 89, 120, 150]
    },
    "inventory": {
        "shards": [true, true, false, false, false],
        "pociones": 2
    },
    "levelProgress": [
        {"nivel": 1, "completado": true},
        {"nivel": 2, "completado": true},
        {"nivel": 3, "completado": true},
        {"nivel": 4, "completado": true},
        {"nivel": 5, "completado": false}
    ]
}
```

