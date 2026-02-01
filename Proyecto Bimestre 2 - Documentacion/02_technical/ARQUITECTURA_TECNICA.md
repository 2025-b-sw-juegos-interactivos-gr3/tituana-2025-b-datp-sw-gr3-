# 🏗️ CHRONOFRACTURE - Arquitectura Técnica

## I. STACK TECNOLÓGICO

### Motor de Juego
- **Engine:** Godot Engine 4.3+
- **Lenguaje Scripting:** GDScript (primario) / C# (opcional)
- **Resolución:** 1280x720 (16:9 escalable)
- **Plataformas Target:** Windows, macOS, Linux, Web (HTML5)

### Herramientas de Desarrollo
| Herramienta | Propósito |
|-----------|----------|
| Godot Engine 4.3+ | Motor principal |
| Git + GitHub | Control de versión |
| Aseprite / Piskel | Creación pixel art |
| Audacity | Diseño de sonido |
| Krita / GIMP | Dirección visual |
| VS Code + GDScript Debugger | IDE |

### Dependencias Externas
- Godot Built-in Physics 2D
- Godot Input System
- Godot Signal System
- Godot FileSystem API (guardado)

---

## II. ARQUITECTURA DE SOFTWARE

### Patrón Arquitectónico: Entity Component System (ECS) + MVC Híbrido

```
┌─────────────────────────────────────────────┐
│         GODOT SCENE TREE (MVC)              │
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  Root: GameManager (Singleton)      │   │
│  │  ├─ Maneja estado global            │   │
│  │  ├─ Carga/descarga niveles          │   │
│  │  └─ Coordina sistemas               │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  LevelManager (Nodo de nivel)       │   │
│  │  ├─ PhysicsManager                  │   │
│  │  │  ├─ Simula 3 capas               │   │
│  │  │  └─ Resuelve colisiones          │   │
│  │  ├─ EnemyManager                    │   │
│  │  │  ├─ Mantiene lista de enemigos   │   │
│  │  │  └─ Updates IA                   │   │
│  │  ├─ PuzzleManager                   │   │
│  │  │  ├─ Detecta progreso             │   │
│  │  │  └─ Maneja eventos               │   │
│  │  └─ UIManager                       │   │
│  │     ├─ HUD                          │   │
│  │     └─ Menús                        │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  Player (Controlable)               │   │
│  │  ├─ Position [x, y, layer]         │   │
│  │  ├─ Velocity [vx, vy]              │   │
│  │  ├─ Health = 3                      │   │
│  │  ├─ InputComponent                  │   │
│  │  ├─ MovementComponent               │   │
│  │  ├─ CollisionComponent              │   │
│  │  └─ InventoryComponent              │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  Enemies (Array de instancias)      │   │
│  │  ├─ Echo (patrulla simple)          │   │
│  │  ├─ Shade (cruce de capas)          │   │
│  │  ├─ Vorax (boss)                    │   │
│  │  └─ [Cada uno con su IA]            │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │  Objetos del Mundo (Estaticos)      │   │
│  │  ├─ Plataformas                     │   │
│  │  ├─ Shards                          │   │
│  │  ├─ Trampa temporales               │   │
│  │  └─ Props visuales                  │   │
│  └─────────────────────────────────────┘   │
│                                             │
└─────────────────────────────────────────────┘
```

---

## III. DIAGRAMA DE CLASES UML

```
┌─────────────────────────────────────────────────────────────┐
│                   CLASE RAÍZ: CharacterBase                 │
├─────────────────────────────────────────────────────────────┤
│ - position: Vector2                                         │
│ - velocity: Vector2                                         │
│ - health: int                                               │
│ - current_layer: TemporalLayer                              │
│                                                              │
│ + move(delta): void                                         │
│ + take_damage(amount): void                                 │
│ + change_layer(new_layer): void                             │
│ + is_alive(): bool                                          │
└─────────────────────────────────────────────────────────────┘
                              △
                              │ (herencia)
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        │                     │                     │
   ┌────▼────┐           ┌────▼────┐           ┌────▼────┐
   │  Player  │           │   Echo   │           │  Shade   │
   ├──────────┤           ├──────────┤           ├──────────┤
   │- HP: 3   │           │- HP: 1   │           │- HP: 1.5 │
   │- shards[]│           │- pattern │           │- cross   │
   │          │           │          │           │- layer   │
   │+ input() │           │+ patrol()│           │+ chase() │
   └──────────┘           └──────────┘           └──────────┘
   
   
┌─────────────────────────────────────────┐
│         IDamageable (Interface)         │
├─────────────────────────────────────────┤
│ + on_damage(amount): void               │
│ + get_health(): int                     │
└─────────────────────────────────────────┘
          △                    △
          │                    │
    ┌─────┴────┐          ┌────┴──────┐
    │  Player   │          │   Enemy   │
    └───────────┘          └───────────┘


┌──────────────────────────────────────────┐
│         ICollidable (Interface)          │
├──────────────────────────────────────────┤
│ + get_collider(): Collider2D             │
│ + on_collision(other): void              │
│ + is_solid(): bool                       │
└──────────────────────────────────────────┘
        △              △              △
        │              │              │
    ┌───┴──┐      ┌────┴────┐      ┌─┴────┐
    │Player│      │Platform │      │Trap  │
    └──────┘      └─────────┘      └──────┘


┌─────────────────────────────────────────┐
│      TemporalManager (Singleton)        │
├─────────────────────────────────────────┤
│ - layers: Dictionary                    │
│   - PAST: LayerData                     │
│   - PRESENT: LayerData                  │
│   - FUTURE: LayerData                   │
│                                         │
│ + update_cross_layer(): void            │
│ + get_state(layer): LayerData           │
│ + apply_physics(layer, delta): void     │
└─────────────────────────────────────────┘


┌─────────────────────────────────────────┐
│         LayerData (Estructura)          │
├─────────────────────────────────────────┤
│ + gravity: float = 9.8                  │
│ + objects: Array[Node2D]                │
│ + visibility: float = 1.0               │
│ + color_tint: Color                     │
│                                         │
│ + apply_effect(effect): void            │
│ + get_visible_objects(): Array          │
└─────────────────────────────────────────┘
```

---

## IV. PATRONES DE DISEÑO UTILIZADOS

### 1. **Singleton Pattern**

```gdscript
# GameManager.gd (Singleton)
extends Node

static var instance: GameManager

func _ready():
    if instance == null:
        instance = self
    else:
        queue_free()

func get_current_level() -> int:
    return current_level

# Uso en otro script:
# GameManager.instance.get_current_level()
```

**Aplicación:** GameManager, TemporalManager, AudioManager

**Justificación:** Estos sistemas necesitan ser únicos y accesibles globalmente.

---

### 2. **Observer Pattern (Signals)**

```gdscript
# Player.gd
signal health_changed(new_health)
signal shard_collected(shard_id)
signal layer_changed(new_layer)

func take_damage(amount: int):
    health -= amount
    health_changed.emit(health)
    
    if health <= 0:
        died.emit()

# UIManager.gd
func _ready():
    player.health_changed.connect(_on_health_changed)
    player.shard_collected.connect(_on_shard_collected)
    
func _on_health_changed(new_health: int):
    update_hp_display(new_health)
```

**Aplicación:** Salud, Shards, eventos de nivel

**Justificación:** Desacoplamiento entre sistemas (UI, gameplay, audio).

---

### 3. **State Machine Pattern**

```gdscript
# EnemyAI.gd (Máquina de estados)
enum State { PATROL, ALERTED, ATTACKING, DEAD }

var current_state: State = State.PATROL

func _process(delta):
    match current_state:
        State.PATROL:
            patrol_behavior()
        State.ALERTED:
            alerted_behavior()
        State.ATTACKING:
            attack_behavior()
        State.DEAD:
            pass

func change_state(new_state: State):
    if new_state == current_state:
        return
    
    exit_state()
    current_state = new_state
    enter_state()

func enter_state():
    match current_state:
        State.PATROL:
            play_animation("patrol")
        State.ALERTED:
            play_sound("alert")
        # ...

func exit_state():
    # Limpiar estado actual
    pass
```

**Aplicación:** IA de enemigos, Player, Puzzles

**Justificación:** Código limpio y fácil de mantener, transiciones explícitas.

---

### 4. **Component Pattern (Composición)**

```gdscript
# Player.gd (Composición de componentes)
class_name Player
extends CharacterBody2D

@onready var input_component = InputComponent.new()
@onready var movement_component = MovementComponent.new(self)
@onready var collision_component = CollisionComponent.new(self)

func _ready():
    add_child(input_component)
    add_child(movement_component)
    add_child(collision_component)

func _process(delta):
    var input = input_component.get_input()
    movement_component.apply_movement(input, delta)
    collision_component.check_collisions()
```

**Aplicación:** Player, Enemies, Objetos del mundo

**Justificación:** Reutilización de lógica, fácil extensión.

---

### 5. **Factory Pattern**

```gdscript
# EnemyFactory.gd
class_name EnemyFactory

static func create_enemy(type: String, position: Vector2) -> CharacterBase:
    match type:
        "echo":
            return Echo.new(position)
        "shade":
            return Shade.new(position)
        "vorax":
            return Vorax.new(position)
        _:
            return null

# Uso:
# var enemy = EnemyFactory.create_enemy("echo", Vector2(100, 100))
```

**Aplicación:** Creación de enemigos, Shards, objetos

**Justificación:** Centralizar lógica de instanciación.

---

### 6. **Strategy Pattern**

```gdscript
# Diferentes estrategias de ataque
class_name AttackStrategy

class DirectAttack:
    func execute(attacker: CharacterBase, target: Vector2):
        # Ataque recto
        pass

class ArcAttack:
    func execute(attacker: CharacterBase, target: Vector2):
        # Ataque en arco
        pass

# Enemy utiliza una estrategia:
class Enemy:
    var attack_strategy: AttackStrategy
    
    func attack(target: Vector2):
        attack_strategy.execute(self, target)
```

**Aplicación:** Diferentes patrones de ataque de enemigos

**Justificación:** Intercambiar comportamientos en tiempo de ejecución.

---

## V. SISTEMAS PRINCIPALES

### A. Physics System

```gdscript
# PhysicsManager.gd
extends Node

var layers: Dictionary = {
    "PAST": LayerData.new(),
    "PRESENT": LayerData.new(),
    "FUTURE": LayerData.new()
}

func _process(delta):
    for layer_name in layers.keys():
        update_layer_physics(layer_name, delta)
    
    check_cross_layer_interactions()

func update_layer_physics(layer_name: String, delta: float):
    var layer = layers[layer_name]
    var gravity = get_gravity(layer_name)
    
    for obj in layer.objects:
        if obj.has_meta("dynamic"):
            obj.velocity.y += gravity * delta
            obj.position += obj.velocity * delta
            
            check_collisions(obj, layer_name)
```

### B. Temporal Layer Switching

```gdscript
# TemporalManager.gd
func switch_layer(player: Player, new_layer: String):
    if not can_switch(player):
        return
    
    # Animación de transición
    create_fade_animation(player, 0.15)
    
    # Cambiar capa
    player.current_layer = new_layer
    
    # Actualizar física
    update_player_colliders(player, new_layer)
    
    # Actualizar cámara
    camera.follow_player(player)
    
    # SFX
    AudioManager.instance.play_sfx("temporal_switch")
```

### C. Enemy AI System

```gdscript
# EnemyAI.gd (Base class)
func patrol():
    # Movimiento patrulla simple
    velocity.x = patrol_speed * direction
    
    # Detección de jugador
    if detect_player_in_range(detection_range):
        change_state(State.ALERTED)

func attack(target: Vector2):
    # Cargar proyectil
    fire_projectile(target)
    change_state(State.PATROL)
```

### D. Input Handling

```gdscript
# InputManager.gd (Centralizado)
func _ready():
    if not is_multiplayer_active:
        setup_single_player_input()
    else:
        setup_multiplayer_input()

func get_player_input() -> InputData:
    return InputData.new(
        move_input = Input.get_vector("move_left", "move_right", "move_up", "move_down"),
        jump = Input.is_action_just_pressed("jump"),
        interact = Input.is_action_just_pressed("interact"),
        layer_change = Input.get_action_strength("change_layer")
    )
```

---

## VI. ESTRUCTURA DE DATOS

### Game State

```gdscript
# GameState.gd
class_name GameState

var current_level: int = 1
var player_position: Vector2
var player_health: int = 3
var player_layer: String = "PRESENT"

var inventory: Inventory = Inventory.new()
var collected_shards: Array[String] = []

var enemies: Array[CharacterBase] = []
var checkpoints: Array[Checkpoint] = []

func to_dictionary() -> Dictionary:
    return {
        "level": current_level,
        "position": player_position,
        "health": player_health,
        "layer": player_layer,
        "shards": collected_shards,
        "enemies_defeated": enemies.filter(func(e): return e.is_alive() == false)
    }
```

### Checkpoint

```gdscript
# Checkpoint.gd
class_name Checkpoint

var id: String
var position: Vector2
var level: int
var player_health: int
var collected_shards: Array[String]
var enemies_state: Dictionary  # { enemy_id: is_alive }

func save_state(player: Player):
    position = player.global_position
    player_health = player.health
    collected_shards = player.inventory.get_shard_ids()
```

---

## VII. DIAGRAMAS DE FLUJO

### Flow: Player Cambiar de Capa

```
[START: Presionar Q/E]
    ↓
[¿Está en animación?] → SÍ → [ABORT]
    ↓ NO
[¿Está en evento?] → SÍ → [ABORT]
    ↓ NO
[¿Tiene Shard #3?]
    ├─ SÍ → [Cambio instantáneo]
    │        ↓
    │   [Fade out 0.1s]
    │        ↓
    │   [Cambiar layer]
    │        ↓
    │   [Fade in 0.1s]
    │        ↓
    │   [Play SFX "fast"]
    │        ↓
    │   [END]
    │
    └─ NO → [Cambio con delay 0.5s]
             ↓
        [Fade out 0.15s]
             ↓
        [Esperar 0.5s]
             ↓
        [Cambiar layer]
             ↓
        [Fade in 0.15s]
             ↓
        [Play SFX "whoosh"]
             ↓
        [END]
```

### Flow: Enemy Detectar Jugador

```
[PATROL estado]
    ↓
[EACH FRAME: ¿Distancia al jugador < rango?]
    ├─ NO → [Continuar patrulla] → LOOP
    │
    └─ SÍ → [¿Jugador en capa visible?]
            ├─ NO → [Continuar patrulla] → LOOP
            │
            └─ SÍ → [Change state → ALERTED]
                     ↓
                  [Play SFX "alert"]
                     ↓
                  [Esperar 1s]
                     ↓
                  [Change state → ATTACKING]
                     ↓
                  [Fire projectile]
```

---

## VIII. COMUNICACIÓN ENTRE SISTEMAS

```
EVENTO: Player recolecta Shard

Player.gd
├─ emit_signal("shard_collected", shard_id)
│
├─→ InventoryManager.gd
│   ├─ add_shard(shard_id)
│   └─ emit_signal("inventory_changed")
│
├─→ UIManager.gd
│   └─ update_shard_display()
│
├─→ AudioManager.gd
│   └─ play_sfx("shard_collect")
│
└─→ PuzzleManager.gd
    └─ check_puzzle_completion()
        └─ IF all_shards_collected → emit_signal("victory")
```

---

## IX. PERFORMANCE TARGETS

| Métrica | Target |
|---------|--------|
| FPS | 60 (mínimo 30) |
| Load Time Nivel | < 3 segundos |
| Memory per Level | < 256 MB |
| Enemy Count | Max 10 simultáneos |
| Physics Updates | 60/segundo |
| Collision Checks | Optimizado con quadtree |

---

## X. ESCALABILIDAD

### Agregar nuevo tipo de enemigo:

```gdscript
# 1. Crear clase heredando de CharacterBase
class_name NewEnemy
extends CharacterBase

# 2. Implementar IA específica
func update_ai(delta):
    pass

# 3. Registrar en EnemyFactory
# EnemyFactory.create_enemy("new_enemy", pos)

# 4. Agregar al LevelData
# "enemies": [{"type": "new_enemy", "pos": [100, 200]}]
```

### Agregar nuevo nivel:

```gdscript
# 1. Crear archivo de datos JSON
# res://levels/level_13.json

# 2. Cargar en LevelManager
# var level_data = load_level_data(13)

# 3. Instanciar objetos desde datos
# spawn_objects_from_data(level_data)
```

---

## XI. HERRAMIENTAS DE DEBUGGING

- **Godot Remote Debugger:** Inspeccionar variables en tiempo real
- **Performance Monitor:** Ver FPS, Memory, Physics updates
- **Debugger GDScript:** Breakpoints y step-through
- **Visual Debugger:** Ver colisores, raycast, físicas

