# 🗺️ CHRONOFRACTURE - Level Design

## I. FILOSOFÍA DE LEVEL DESIGN

### Principios Core

1. **Claridad Progresiva**
   - Cada nivel introduce UN concepto nuevo
   - Los conceptos anteriores se dominan antes de agregar complejidad
   - El jugador nunca se siente perdido sobre qué hacer

2. **Múltiples Soluciones**
   - Cada puzzle tiene 2-4 formas de resolverse
   - Las soluciones se descubren, no prescriben
   - El jugador se siente creativo

3. **Espacios Verticales**
   - Uso de altura para crear desafío sin agregar enemigos
   - Las 3 capas temporales añaden profundidad visual
   - El movimiento es tan importante como la solución

4. **Feedback Constante**
   - Cada acción tiene consecuencia visible
   - El jugador aprende por causa-efecto
   - El mundo responde a sus acciones

---

## II. LAYOUT & DIMENSIONES DE NIVELES

### Tamaño Estándar de Nivel
- **Ancho:** 2560 px (4 pantallas de 640px)
- **Alto:** 1440 px (2 pantallas de 720px, dato que cada capa se ve a 240px altura)
- **Aspectos Visual:** 3 capas horizontales, cada una de 240px de alto

### Estructura de Capas (Pantalla)

```
┌──────────────────────────────┐
│    PASADO (240px)            │ ← Tonos sepia/dorado
│    [Geometría histórica]     │
├──────────────────────────────┤
│    PRESENTE (240px)          │ ← Colores vibrantes
│    [Kael aquí]               │
│    [Acción del nivel]        │
├──────────────────────────────┤
│    FUTURO (240px)            │ ← Tonos azul/morado
│    [Ruinas / Consecuencias]  │
└──────────────────────────────┘

Altura Total: 720px = Pantalla completa 16:9
```

---

## III. PROGRESIÓN DE DIFICULTAD

```
         DIFICULTAD DEL JUEGO
              ╱╲
             ╱  ╲
            ╱    ╲  Área de desafío óptimo
           ╱      ╲ (Jugador "en la zona")
          ╱────────╲
    Fácil          Difícil
   (1-3)       (4-8)  (9-12)

Curva esperada:
Suavemente ascendente con "picos" en jefes
y "valles" de respiración entre actos
```

---

## IV. DESCRIPCIÓN POR NIVEL

---

### **NIVEL 1: "Awakening" - Ruinas del Templo (Tutorial A)**

**Objetivo:** Alcanzar la puerta de salida

**Dificultad:** ⭐ (Muy Fácil)

**Conceptos Introducidos:**
- Movimiento básico (← → saltar)
- Visión de 3 capas simultáneas
- Plataformas simples

**Layout ASCII:**

```
PASADO:  ═══════════════════════════════════════
        ║     ╔═══╗              ╔═══╗         ║
        ║     ║   ║              ║   ║         ║
        ║     ╚═══╝              ╚═══╝         ║
        ║                                      ║
        ╚═════════════════════════════════════╝

PRESENTE: ╔═════════════════════════════════════╗
         ║ ►START                             ║
         ║ ███  ███              ███  ███     ║
         ║ ███  ███   ███████    ███  ███     ║
         ║                       ███  ███     ║
         ║                       ███  ███     ║
         ║                              EXIT► ║
         ╚═════════════════════════════════════╝

FUTURO:   ═══════════════════════════════════════
         ║     ▓▓▓▓              ▓▓▓▓▓▓▓▓     ║
         ║     ▓▓▓▓              ▓▓▓▓▓▓▓▓     ║
         ║                                      ║
         ║                                      ║
         ╚═════════════════════════════════════╝

LEYENDA:
►START = Spawn Point
EXIT = Salida
███ = Plataforma sólida
╔═══╗ = Pilares (PASADO)
▓▓▓ = Escombros (FUTURO)
```

**Puzzles:** 0 (Ninguno)

**Enemigos:** 0

**Shards:** 0

**Checkpoints:** 1 (Inicio)

**Duración Estimada:** 2-3 minutos

**Feedback Jugador:** "Entiendo cómo se ve el mundo. Puedo saltar entre plataformas."

---

### **NIVEL 2: "Echo Encounter" - Templo (Tutorial B)**

**Objetivo:** Alcanzar la salida sin ser alcanzado por un Echo

**Dificultad:** ⭐ (Muy Fácil)

**Conceptos Nuevos:**
- Primer enemigo (Echo)
- Evasión básica (cambio de capa)

**Layout ASCII:**

```
PASADO:  ═══════════════════════════════════════
        ║                                      ║
        ║  ╔═══╗          ╔═══╗               ║
        ║  ║   ║          ║   ║               ║
        ║  ╚═══╝          ╚═══╝               ║
        ║     ECHO (fantasma dorado)          ║
        ╚═════════════════════════════════════╝

PRESENTE: ╔═════════════════════════════════════╗
         ║ ►START                             ║
         ║ ███    ███          ███    ███     ║
         ║ ███    ███   ███    ███    ███     ║
         ║        ECHO (patrulla) →           ║
         ║                              EXIT► ║
         ║ ███    ███          ███    ███     ║
         ╚═════════════════════════════════════╝

FUTURO:   ═══════════════════════════════════════
         ║                                      ║
         ║  ▓▓▓▓              ▓▓▓▓▓▓▓▓        ║
         ║  ▓▓▓▓              ▓▓▓▓▓▓▓▓        ║
         ║        ECHO (sombra morada)         ║
         ║                                      ║
         ╚═════════════════════════════════════╝
```

**Enemigos:** 1 Echo (patrulla, rango corto)

**Soluciones Posibles:**
1. Correr a través de PRESENTE evitando el Echo
2. Cambiar a PASADO (donde Echo está en versión fantasma, no daña)
3. Cambiar a FUTURO (donde el echo es débil)

**Shards:** 0

**Duración Estimada:** 3-4 minutos

**Feedback Jugador:** "Los enemigos existen en capas. Puedo evitar cambiando de tiempo."

---

### **NIVEL 3: "Three Moments" - Templo (Cinemática & Shard #1)**

**Objetivo:** Alcanzar la cámara final y obtener Shard #1

**Dificultad:** ⭐⭐ (Fácil)

**Conceptos Nuevos:**
- Cambio deliberado de capas (no solo evasión)
- Primer puzzle de capas múltiples

**Layout ASCII:**

```
PASADO:  ═══════════════════════════════════════
        ║ ┌────┐  ┌────┐        ┌────┐       ║
        ║ │    │  │    │        │    │       ║
        ║ │ C1 │  │ C2 │   C3   │ C4 │       ║
        ║ │    │  │    │        │    │       ║
        ║ └────┘  └────┘        └────┘       ║
        ║ (Cajas intactas)                   ║
        ╚═════════════════════════════════════╝

PRESENTE: ╔═════════════════════════════════════╗
         ║ ►START     PUZZLE AREA            ║
         ║ ███                                ║
         ║ ███    ███         ███   ███      ║
         ║                                   ║
         ║ ███     █         █ █   ███      ║
         ║                 SHARD #1          ║
         ║                         EXIT► ███║
         ╚═════════════════════════════════════╝

FUTURO:   ═══════════════════════════════════════
         ║                                      ║
         ║  ▓▓▓  ▓    ▓ ▓ ▓   ▓▓▓    ▓▓▓      ║
         ║  ▓▓▓  ▓    ▓ ▓ ▓   ▓▓▓    ▓▓▓      ║
         ║  ▓▓▓  ▓    ▓ ▓ ▓   ▓▓▓    ▓▓▓      ║
         ║  (Cajas ruinadas)                  ║
         ║                                      ║
         ╚═════════════════════════════════════╝
```

**Puzzle Central:**

*Objetivo: Crear un escalera temporal para alcanzar SHARD #1*

**Ruta 1 (Intuitive):**
1. En PASADO, ver 4 cajas intactas en línea
2. En PRESENTE, 2 cajas han "caído"
3. Usar las 2 cajas caídas como escalera
4. Saltar a SHARD (que solo existe en PRESENTE)

**Ruta 2 (Creativa):**
1. Saltar directamente en PRESENTE
2. Es imposible... pero si cambias a PASADO
3. Las cajas alineadas permiten saltar más alto
4. Saltar en PASADO, pero recoger shard en PRESENTE

**Ruta 3 (Alternativa):**
1. En FUTURO, las ruinas forman una rampa natural
2. Correr por el futuro (aunque sea peligroso)
3. Saltar lateralmente a PRESENTE en la cima

**Enemigos:** 1 Echo (lejos del puzzle, no interfiere)

**Shards:** 1 (Shard #1: Visión Temporal)

**Checkpoint:** Antes del puzzle

**Duración Estimada:** 5-7 minutos

**Feedback Jugador:** "El PASADO me ayuda a alcanzar cosas imposibles en PRESENTE. Mi imaginación es el límite."

---

### **NIVEL 4: "Crystal Path" - Bosque (Introducción mecánica)**

**Objetivo:** Cruzar el bosque cristalizado

**Dificultad:** ⭐⭐ (Fácil-Media)

**Conceptos Nuevos:**
- Objetos movibles (primero simple)
- Shade (enemigo más rápido)

**Enemies:** 1 Shade (patrulla, menos peligroso que un combo)

**Puzzle:** Mover una roca en PASADO para crear puente en PRESENTE

**Shards:** 0

**Duración:** 6-8 minutos

---

### **NIVEL 5: "Fractured Grove" - Bosque (Shard #2)**

**Objetivo:** Obtener Shard #2 (Manipulación Futura)

**Dificultad:** ⭐⭐ (Media)

**Conceptos Nuevos:**
- Manipular FUTURO directamente
- Puzzles de 3+ acciones coordinadas

**Puzzle Central:**
```
PASADO:  Árbol vivo creciendo → PRESENTE: Árbol con cristales → FUTURO: Árbol cristal puro

Para obtener Shard #2:
1. En PASADO: Mover rama (causa grieta en PRESENTE)
2. En PRESENTE: Esa grieta crea saliente de cristal
3. En FUTURO: Esa grieta permite acceso a plataforma superior
4. Recoger Shard en la plataforma
```

**Enemigos:** 2 Shade (móviles, pero no directamente hostiles)

**Duración:** 8-10 minutos

---

### **NIVEL 6: "Temporal Synchronization" - Templo (Puzzle Complejo)**

**Objetivo:** Resolver puzzle de 4+ acciones

**Dificultad:** ⭐⭐⭐ (Media-Alta)

**Concepto:**
- Sincronizar movimientos entre capas
- Tiempo es mecánica de juego

**Puzzle:** "Reloj Temporal"
```
Hay 4 plataformas que se activan en secuencia:
T=0s: PASADO plataforma activa
T=2s: PRESENTE plataforma activa
T=4s: FUTURO plataforma activa
T=6s: vuelve a PASADO

Debo cruzar:
1. Cambiar a PASADO, pisar plataforma (T=0s)
2. En T=2s, cambiar a PRESENTE automáticamente
3. Saltar (timing es crucial)
4. En T=4s, cambiar a FUTURO
5. Alcanzar la salida
```

**Enemies:** 1 Echo + 1 Shade (ambos molestos pero no letales)

**Duración:** 10-12 minutos

---

### **NIVEL 7: "The Guardian's Trial" - Fortaleza (Pre-Boss)**

**Objetivo:** Acceder a la cámara del Jefe

**Dificultad:** ⭐⭐⭐⭐ (Alta)

**Concepto:**
- Combinar todos los conceptos anteriores
- Enemigos coordinados
- Espacios verticales complejos

**Desafíos:**
- Múltiples Shades patrullando
- Trampa temporal (ralentiza el tiempo por 3s)
- Puzzle de sincronización bajo presión

**Duración:** 12-15 minutos

---

### **NIVEL 8: "Vorax Ascending" - Fortaleza (JEFE - Vorax Menor)**

**Objetivo:** Derrotar a Vorax Menor

**Dificultad:** ⭐⭐⭐⭐ (Alta)

**Arena de Combate:**

```
┌─────────────────────────────────────────────┐
│  PASADO: Plataformas estables, Vorax dorado│
├─────────────────────────────────────────────┤
│ PRESENTE: Centro, Vorax plateado activo    │
│           Jugador aquí                      │
├─────────────────────────────────────────────┤
│  FUTURO: Plataformas inestables, Vorax azul│
└─────────────────────────────────────────────┘
```

**Patrón de Combate:**
- Fase 1 (6 HP → 4 HP): Vorax ataca 1 capa a la vez
- Fase 2 (3 HP → 2 HP): Vorax ataca 2 capas simultáneamente
- Fase 3 (1 HP → 0 HP): Todas las capas atacan, el jugador debe sincronizar saltos

**Estrategia:**
- Kael debe cambiar de capas para evitar ataques
- Atacar a Vorax en PRESENTE (donde es más vulnerable)
- Usar plataformas de otras capas para posicionarse

**Reward:** Shard #3 (Salto Temporal)

**Cinemática Post-Boss:** Echo revela el primer lore significativo

**Duración del Combate:** 5-8 minutos

---

### **NIVEL 9: "The Descent" - Ciudad (Exploración)**

**Objetivo:** Descender a la Ciudad Colapsada

**Dificultad:** ⭐⭐⭐ (Media-Alta)

**Concepto:**
- Largo descenso vertical
- Múltiples enemigos, pero espaciados
- Visita a la sección más grande del juego

**Características:**
- Caída larga con plataformas intermedias
- En PASADO: Ascensor funcional
- En PRESENTE: Ascensor roto
- En FUTURO: Ascensor como ruinas

**Duración:** 10-12 minutos

---

### **NIVEL 10: "Echoes of Home" - Ciudad (Narrativo + Puzzle)**

**Objetivo:** Obtener Shard #4

**Dificultad:** ⭐⭐⭐⭐ (Alta)

**Concepto:**
- Primer puzzle que requiere entender toda la mecánica
- Cinemática de The Guardian revelando el pasado

**Puzzle Maestro:** "Restaurar el Corazón Temporal"
```
Hay 5 fragmentos del Corazón Temporal esparcidos en diferentes capas:
- 1 en PASADO (debe manipularse primero)
- 1 en PRESENTE (directo)
- 1 en FUTURO (debe sincronizarse)
- 1 en sincronización PASADO+PRESENTE
- 1 en sincronización PRESENTE+FUTURO

Debo activarlas en orden correcto para ver la cinemática de Verdad
```

**Cinemática:** The Guardian aparece, muestra el colapso original

**Reward:** Shard #4 (Verdad Temporal)

**Duración:** 12-15 minutos

---

### **NIVEL 11: "The Threshold" - Ciudad (Pre-Final)**

**Objetivo:** Alcanzar las puertas del Núcleo Temporal

**Dificultad:** ⭐⭐⭐⭐⭐ (Muy Alta)

**Concepto:**
- Todos los enemigos presentes
- Trampas de tiempo
- Puzzle de triple sincronización

**Características:**
- El nivel es una "gauntlet" de desafíos progresivos
- Cada sección requiere una habilidad diferente
- Enemigos cada vez más agresivos

**Jefe Menor:** Vorax Shade (mini-boss)
- Un Vorax débil que aparece a mitad del nivel
- Vencible, no es combate final

**Duración:** 15-20 minutos

---

### **NIVEL 12: "Nexus" - Núcleo Temporal (FINAL BOSS)**

**Objetivo:** Derrotar a Vorax (verdadera forma)

**Dificultad:** ⭐⭐⭐⭐⭐ (Épico)

**Arena:**

```
┌─────────────────────────────────────────┐
│  PASADO: Vorax Primordial (Dorado)     │
│  Ataque: Energía temporal                │
├─────────────────────────────────────────┤
│ PRESENTE: Vorax Corporeal (Plateado)   │
│  Ataque: Proyectiles múltiples           │
├─────────────────────────────────────────┤
│  FUTURO: Vorax Espectral (Azul)        │
│  Ataque: Devastación temporal            │
└─────────────────────────────────────────┘
```

**Fases:**

**Fase 1 (HP: 18-12):** Vorax ataca 1 capa a la vez
**Fase 2 (HP: 11-6):** Vorax ataca 2 capas alternas
**Fase 3 (HP: 5-0):** Vorax ataca todas las capas simultáneamente

**Mecanismo de Victoria:**

Opción A (Derecho):
- Atacar a todas las formas de Vorax a 0 HP
- Requerimiento de habilidad alta

Opción B (Sacrificio):
- Activar ritual del Corazón Temporal
- Kael se funde con el Corazón
- Vorax es dispersado pero no destruido (final ambiguo)

**Duración del Combate:** 10-15 minutos

**Cinematica Post-Boss:** Conclusión basada en la opción elegida

---

## V. MAPA DEL MUNDO

```
┌─────────────────────────────────────────────┐
│              CHRONOFRACTURE WORLD           │
├─────────────────────────────────────────────┤
│                    NORTE                    │
│                  (Futuro)                   │
│                                             │
│    ┌────────────────────────────────┐     │
│    │  FORTALEZA SUSPENDIDA          │     │
│    │  (Niveles 7-8)                 │     │
│    │  Jefe: Vorax Menor             │     │
│    └────────────────────────────────┘     │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ BOSQUE CRISTALIZADO                  │  │
│  │ (Niveles 4-6)                        │  │
│  │ Oeste del Templo                     │  │
│  └──────────────────────────────────────┘  │
│                                             │
│              ┌──────────────┐              │
│              │ TEMPLO       │              │
│              │ (Niveles 1-3)│              │
│              │ Centro       │              │
│              └──────────────┘              │
│                                             │
│  ┌──────────────────────────────────────┐  │
│  │ CIUDAD COLAPSADA                     │  │
│  │ (Niveles 9-12)                       │  │
│  │ Sur - Núcleo del Colapso             │  │
│  │ Jefe Final: Vorax                    │  │
│  └──────────────────────────────────────┘  │
│                                             │
│                  (PRESENTE)                 │
│                   SUR                       │
└─────────────────────────────────────────────┘
```

---

## VI. CHECKPOINTS POR NIVEL

| Nivel | Checkpoint 1 | Checkpoint 2 | Checkpoint 3 |
|-------|-------------|-------------|-------------|
| 1 | Inicio | Mid-point | Pre-salida |
| 2 | Inicio | Post-primer-echo | Final |
| 3 | Inicio | Antes-puzzle | Pre-shard |
| 4 | Inicio | Antes-shade | Mid-puzzle |
| 5 | Inicio | Mid-puzzle | Pre-shard |
| 6 | Inicio | Antes-sincronización | Pre-salida |
| 7 | Inicio | Mid-gauntlet | Pre-jefe |
| 8 | Arena jefe | - | - |
| 9 | Inicio | Mid-descenso | Pre-final |
| 10 | Inicio | Antes-puzzle-maestro | Pre-shard |
| 11 | Inicio | Mid-gauntlet | Pre-jefe-menor |
| 12 | Arena jefe | - | - |

---

## VII. PALETA DE COLORES POR REGIÓN

### Región 1: Templo
- **PASADO:** Dorado (#D4AF37), Blanco hueso (#F5F5DC)
- **PRESENTE:** Rojo oscuro (#8B0000), Gris plateado (#C0C0C0)
- **FUTURO:** Cian (#00FFFF), Púrpura (#8B00FF)

### Región 2: Bosque
- **PASADO:** Verde vibrante (#00FF00), Marrón (#8B4513)
- **PRESENTE:** Verde cristal (#00CED1), Transparente
- **FUTURO:** Azul frío (#1E90FF), Blanco transparente

### Región 3: Fortaleza
- **PASADO:** Dorado metálico (#FFD700), Negro (#000000)
- **PRESENTE:** Plateado brillante (#C0C0C0), Gris (#808080)
- **FUTURO:** Cian neón (#00FFFF), Negro profundo (#0A0E27)

### Región 4: Ciudad
- **PASADO:** Dorado urbano (#D4AF37), Blanco (#FFFFFF)
- **PRESENTE:** Azul noche (#191970), Verde neón (#00FF00)
- **FUTURO:** Morado bioluminiscente (#9D00FF), Negro vacío (#000000)

