# Taller 1.1 (Asincrónico): Deconstruyendo la Diversión

Tema: El "Qué" y el "Dónde" - Análisis de Sistemas con el Framework MDA

---

## 1. Contexto y Objetivo

Como ingenieros de sistemas, su disciplina es deconstruir sistemas complejos para entender sus componentes, sus interacciones y sus objetivos. Un videojuego es un sistema de software con un objetivo muy particular: generar una respuesta emocional específica en el usuario (la "diversión" o Estética).

El Framework MDA (Mecánicas, Dinámicas, Estéticas) es una herramienta de ingeniería de diseño que nos permite "leer" un juego. Nos permite aplicar una autopsia formal a la experiencia del jugador:

**Mecánicas (M):** Las reglas fundamentales y el código. Son los algoritmos, las acciones (los "verbos" del jugador como saltar(), disparar()) y los componentes base que el diseñador implementa.

**Dinámicas (D):** El comportamiento emergente del sistema cuando el usuario (jugador) interactúa con las mecánicas. Son las estrategias, tácticas y comportamientos que no están programados explícitamente, pero que surgen del juego.

**Estéticas (A):** La experiencia del usuario (UX) o la respuesta emocional que el sistema busca evocar. Es el "objetivo" del software (Desafío, Fantasía, Narrativa, Descubrimiento, etc.).

---

## 2. Objetivo del Taller

**Primario:** Aplicar el framework MDA para analizar y deconstruir seis (6) sistemas de software (juegos) pertenecientes a los géneros principales.

**Secundario:** Identificar los patrones de diseño (Mecánicas) que definen un género y comparar cómo diferentes sistemas (juegos) los implementan.

**Terciario:** Practicar la habilidad de identificar cómo mecánicas similares pueden generar dinámicas y estéticas completamente diferentes.

---

## 3. Instrucciones de la Tarea Principal

La tarea de su grupo es analizar seis (6) juegos.

Deben seleccionar un (1) juego que represente clara y fuertemente a cada uno de los siguientes seis géneros principales vistos en la presentación:

- Acción
- Aventura
- RPG (Juego de Rol)
- Estrategia
- Simulación
- Puzle

Son libres de elegir cualquier juego (clásico o moderno) siempre que sea un buen ejemplo del género. Un buen ejemplo es aquel cuyas mecánicas centrales definen el género.

Completen la "Tabla Comparativa de Análisis MDA" que se encuentra en la Sección 4.

Una vez completada la tabla, respondan a las preguntas de análisis en la Sección 5.

---

## 4. Ficha de Análisis: Tabla Comparativa MDA

---

### GÉNERO: ACCIÓN

**Juego Seleccionado:** Celeste (2018)

**Mecánicas Clave (M):**

- saltar() - Salto base con física precisa
- dash() - Dash aéreo en 8 direcciones (una vez por salto)
- escalar() - Trepar paredes con resistencia limitada
- Regla fundamental: El dash se resetea al tocar el suelo o ciertos objetos especiales

**Dinámicas Emergentes (D):**

- Encadenamiento de saltos y dashes para mantener momentum
- Técnicas de "speedrunning" y optimización de rutas
- Tácticas de "baile" para evitar obstáculos en movimiento
- Búsqueda y experimentación con rutas alternativas óptimas
- Memorización de patrones de nivel

**Estética Dominante (A):**

- Desafío (Precisión de timing y ejecución)
- Dominio (Sentirse hábil y mejorar progresivamente)
- Superación (Vencer niveles extremadamente difíciles)

---

### GÉNERO: AVENTURA

**Juego Seleccionado:** The Legend of Zelda: Breath of the Wild (2017)

**Mecánicas Clave (M):**

- explorar() - Mundo abierto sin restricciones de nivel
- escalar() - Trepar cualquier superficie (limitado por resistencia)
- cocinar() - Combinar ingredientes para crear comidas con efectos
- resolver() - Santuarios con puzles físicos y ambientales
- Regla fundamental: La resistencia limita todas las acciones físicas

**Dinámicas Emergentes (D):**

- Exploración no lineal dirigida por curiosidad visual
- Experimentación con sistemas de física (fuego, electricidad, viento)
- Preparación estratégica antes de combates difíciles
- Descubrimiento orgánico de secretos sin waypoints
- Creatividad en resolución de problemas (múltiples soluciones posibles)

**Estética Dominante (A):**

- Descubrimiento (Exploración y asombro constante)
- Libertad (Agencia total del jugador)
- Asombro (Mundo que se siente vivo y responsive)
- Expresión (Creatividad en cómo resolver desafíos)

---

### GÉNERO: RPG (JUEGO DE ROL)

**Juego Seleccionado:** Final Fantasy VII (1997)

**Mecánicas Clave (M):**

- combatir() - Sistema ATB (Active Time Battle) por turnos
- equipar() - Sistema de Materia modificable en armas y armaduras
- subir_nivel() - Experiencia, niveles y mejora de estadísticas
- personalizar() - Construcción de builds de personajes
- Regla fundamental: La Materia equipada determina las habilidades disponibles

**Dinámicas Emergentes (D):**

- Teorycrafting de builds óptimos y synergies de Materia
- Planificación estratégica de equipamiento según enemigos
- Grinding opcional para superar desafíos difíciles
- Experimentación con combinaciones únicas de Materia
- Gestión de recursos (MP, items) a largo plazo

**Estética Dominante (A):**

- Narrativa (Historia épica y desarrollo de personajes)
- Fantasía (Encarnar al héroe en un mundo fantástico)
- Progresión (Crecimiento de poder y capacidades)
- Colección (Acumular Materia, invocaciones, objetos raros)

---

### GÉNERO: ESTRATEGIA

**Juego Seleccionado:** StarCraft: Brood War (1998)

**Mecánicas Clave (M):**

- recolectar() - Minerales y gas vespeno con workers
- construir() - Edificios y producción de unidades
- micro_gestionar() - Control preciso de unidades individuales
- macro_gestionar() - Economía y producción global
- Regla fundamental: Recursos limitados en el mapa, tres razas asimétricas

**Dinámicas Emergentes (D):**

- Meta-juego de builds y counter-strategies (rock-paper-scissors)
- Multi-tasking constante entre micro y macro
- Timing attacks y ventanas de poder específicas
- Control de información (fog of war) y scouting
- Adaptación en tiempo real a estrategia enemiga

**Estética Dominante (A):**

- Desafío (Competición de alto nivel)
- Estrategia (Planificación y anticipación)
- Dominio (Skill ceiling extremadamente alto)
- Tensión (Decisiones críticas bajo presión temporal)

---

### GÉNERO: SIMULACIÓN

**Juego Seleccionado:** The Sims 4 (2014)

**Mecánicas Clave (M):**

- crear() - Personalización detallada de Sims y espacios
- gestionar_necesidades() - Hambre, social, higiene, diversión, energía
- construir() - Diseño y construcción de casas
- desarrollar_relaciones() - Sistema social complejo con otros Sims
- Regla fundamental: Las necesidades decaen constantemente con el tiempo

**Dinámicas Emergentes (D):**

- Narrativas emergentes generadas por el jugador (storytelling)
- Priorización de necesidades contradictorias
- Drama social no programado entre Sims
- Experimentación con arquitectura y decoración
- Gestión simultánea de múltiples vidas y familias

**Estética Dominante (A):**

- Fantasía (Vivir una vida alternativa o ideal)
- Expresión (Creatividad en diseño y personalización)
- Narrativa (Historias emergentes únicas)
- Descubrimiento (Consecuencias inesperadas de acciones)

---

### GÉNERO: PUZLE

**Juego Seleccionado:** Portal 2 (2011)

**Mecánicas Clave (M):**

- crear_portal() - Colocar portales azul y naranja en superficies válidas
- atravesar() - Teleportación instantánea entre portales
- conservar_momentum() - La física se mantiene al atravesar portales
- manipular_objetos() - Cubos, botones, láseres, geles
- Regla fundamental: Máximo 2 portales activos, solo en superficies específicas

**Dinámicas Emergentes (D):**

- Pensamiento espacial tridimensional complejo
- "Pensar con portales" (cambio radical de perspectiva)
- Secuencias de momentum (flinging) para alcanzar altura
- Experimentación con soluciones alternativas creativas
- Proceso sistemático de prueba y error

**Estética Dominante (A):**

- Desafío (Mental y lógico, no físico)
- Descubrimiento (Momento "eureka" al resolver)
- Sensación (Satisfacción intelectual de la solución)
- Humor (Narrativa cómica de GLaDOS)

---

## 5. Análisis Comparativo (Similitudes y Diferencias)

---

### Análisis de Diferencias: Acción vs Estrategia

**Comparación:** Celeste vs StarCraft: Brood War

**Core Loop (Bucle de Juego):**

Celeste (Acción):
```
Intentar → Fallar → Aprender → Repetir → Dominar
Duración del ciclo: 2-30 segundos
```

StarCraft (Estrategia):
```
Planificar → Ejecutar → Adaptarse → Contra-estrategia → Victoria/Derrota
Duración del ciclo: 10-45 minutos
```

**Diferencias Fundamentales:**

**1. Presión Temporal**

Celeste: La presión está en MICROSEGUNDOS. El jugador debe ejecutar inputs con timing de frames (1/60 de segundo). Un dash 0.1 segundos tarde significa muerte instantánea.

StarCraft: La presión está en MINUTOS. El jugador debe decidir su build order en los primeros 30 segundos, pero las consecuencias se ven 5-10 minutos después cuando llega el ataque enemigo.

**2. Tipo de Decisión**

Celeste: Decisiones REACTIVAS e INSTINTIVAS (Sistema 1 del cerebro). "Veo el pico, salto ahora". No hay tiempo para análisis consciente.

StarCraft: Decisiones ANALÍTICAS y ANTICIPATORIAS (Sistema 2 del cerebro). "Si hago Pool primero, puedo rushear, pero si hace Bunker me counter-ea". Requiere planificación consciente.

**3. Penalización del Error**

Celeste:
- Error → Muerte → Restart instantáneo (1 segundo)
- Penalización LOCALIZADA (solo pierdes progreso de esa pantalla)
- No hay efecto acumulativo

StarCraft:
- Error → Desventaja económica o militar
- Penalización ACUMULATIVA (pierdes workers = menos recursos = menos ejército)
- Efecto CASCADA (un error a los 5 minutos puede costarte el juego a los 20)

**4. Habilidad Requerida**

Celeste:
- Coordinación motora fina
- Memoria muscular (repetir exactamente los mismos inputs)
- Reconocimiento de patrones visuales rápidos

StarCraft:
- Multitasking (gestionar 3-4 tareas simultáneamente)
- Planificación estratégica
- Lectura de información incompleta (fog of war)
- APM (Actions Per Minute) - velocidad de clicks

**5. Conocimiento Necesario**

Celeste: Conocimiento del nivel específico y física del juego. Una vez dominas las mecánicas, puedes aplicarlas a cualquier nivel nuevo relativamente rápido.

StarCraft: Conocimiento profundo del META-JUEGO: Build orders de las 3 razas, counters (qué unidad vence a qué), timings (cuándo atacar según el build enemigo), mapas específicos y sus estrategias.

**¿Dónde pone cada sistema la presión sobre el jugador?**

Celeste pone presión en la EJECUCIÓN FÍSICA INMEDIATA:
- El jugador SABE qué hacer (la pantalla muestra el camino)
- El desafío está en HACERLO con precisión de milisegundos
- Feedback inmediato: saltas mal → mueres → reintentas en 1 segundo

StarCraft pone presión en la TOMA DE DECISIONES BAJO INCERTIDUMBRE:
- El jugador debe DECIDIR qué hacer sin información completa
- El desafío está en ANTICIPAR al enemigo y GESTIONAR múltiples sistemas
- Feedback retardado: decides mal → lo descubres 10 minutos después cuando pierdes

**Diferencia en diseño de sistemas:**
- Acción: Low latency, alta frecuencia de interacción, feedback instantáneo
- Estrategia: High latency, baja frecuencia de decisiones críticas, feedback retardado

---

### Análisis de Similitudes (Polimorfismo de Mecánicas)

**Mecánica Compartida:** gestionar_recursos()

Esta mecánica aparece en tres géneros de nuestra tabla: RPG, Estrategia y Simulación.

**Implementación 1: Final Fantasy VII (RPG)**

Recursos:
- MP (Puntos de Magia)
- Items consumibles (Pociones, Ethers, Phoenix Downs)
- Materia (equipamiento que determina habilidades)

Contexto:
- Combate por turnos + Progresión narrativa lineal
- Recursos se recuperan en Save Points
- No hay presión de tiempo real

Dinámica Emergente:
- Conservación estratégica: "¿Uso este Megalixir ahora o lo guardo para el jefe final?"
- Decisiones de riesgo/recompensa: "¿Gasto MP en curación o confío en aguantar hasta el próximo Save Point?"
- Grinding opcional para acumular recursos

Estética Resultante:
- Tensión táctica - La escasez de recursos crea decisiones difíciles
- Planificación a largo plazo - "¿Puedo llegar al siguiente pueblo con estos items?"
- Sensación de progresión - Acumular recursos = sentirse más poderoso

**Implementación 2: StarCraft: Brood War (Estrategia)**

Recursos:
- Minerales (construcción básica)
- Gas Vespeno (unidades avanzadas)
- Supply (límite poblacional)

Contexto:
- Tiempo real + Competición directa vs enemigo humano
- Recursos limitados en el mapa
- Presión constante de tiempo

Dinámica Emergente:
- Optimización económica brutal: "¿Cuántos workers construyo antes de hacer unidades militares?"
- Trade-offs constantes: "¿Expando ahora (arriesgado) o me defiendo (seguro pero lento)?"
- Negación de recursos al enemigo (destruir sus expansiones)
- Curva de crecimiento exponencial (más bases = más recursos = más ejército)

Estética Resultante:
- Dominio económico - Gestionar recursos mejor que el enemigo = victoria
- Presión competitiva - "Si no expando antes que mi oponente, pierdo automáticamente"
- Tensión estratégica - Cada recurso gastado es una decisión crítica

**Implementación 3: The Sims 4 (Simulación)**

Recursos:
- Simoleons (dinero)
- Tiempo del Sim (24 horas simuladas por día)
- Necesidades (energía, hambre, social, diversión)

Contexto:
- Sandbox sin win-condition definida
- Sin oposición (no hay "enemigo")
- Sin presión de tiempo real (puedes pausar)

Dinámica Emergente:
- Priorización de necesidades contradictorias: "¿Trabajo para ganar dinero o socializo para mantener amistades?"
- Emergencia de historias por escasez: "Mi Sim está durmiendo en el suelo porque no tiene cama"
- Gestión de múltiples Sims simultáneamente
- Decisiones de estilo de vida (carrera vs familia)

Estética Resultante:
- Narrativa emergente - La escasez crea historias: "Mi Sim pobre que lucha por sobrevivir"
- Expresión creativa - "Quiero hacer a mi Sim rico" o "Quiero vivir en una cabaña modesta"
- Sin estrés real - Fallar en gestionar recursos no tiene consecuencias graves (no hay Game Over)

**Análisis: ¿Cómo el contexto cambia la Dinámica y la Estética?**

La misma mecánica (gestionar_recursos()) produce experiencias radicalmente diferentes porque el contexto determina:

| Factor | RPG | Estrategia | Simulación |
|--------|-----|------------|------------|
| Escala temporal | Largo plazo (20-60 horas) | Corto plazo (20-40 minutos) | Sin límite temporal |
| Consecuencia del error | Posible Game Over | Derrota inmediata competitiva | Sin penalización real |
| Oposición | PvE (Diseñador vs Jugador) | PvP (Humano vs Humano) | Sin oposición |
| Objetivo final | Victoria narrativa | Victoria competitiva | Auto-expresión |
| Presión de tiempo | Por turnos (sin presión) | Tiempo real (alta presión) | Pausable (sin presión) |

Conclusión Ingenieril:

El mismo "algoritmo base" (if recurso < umbral: tomar_decision()) produce "outputs emocionales" completamente diferentes según el "sistema operativo" (género) en que se ejecuta.

Es como la función sort() en programación:
- Ordenar una lista de números: utilidad matemática
- Ordenar objetos complejos por prioridad: sistema de gestión
- Ordenar strings alfabéticamente: utilidad de texto

Mismo algoritmo, diferentes contextos, diferentes experiencias.

---

### Análisis de Híbridos: Aventura y RPG

**Comparación:** Breath of the Wild (Aventura) vs Final Fantasy VII (RPG)

**¿Es Breath of the Wild "puro" Aventura?**

Mecánicas "prestadas" de RPG:

- Progresión de equipamiento: Armas y armaduras tienen stats (ataque, defensa). Hay rareza (común, raro, legendario).
- Sistema de crafteo/cocina: Combinar ingredientes para crear comidas con buffs temporales (más ataque, más defensa, resistencia al frío).
- Gestión de inventario: Inventario limitado que requiere decisiones sobre qué llevar y qué dejar.
- Santuarios como "mini-dungeons": Completar santuarios otorga recompensas de progresión (corazones, resistencia).
- Colección de objetos: Korok Seeds, armaduras completas, mejoras de items.

NO tiene:
- Sistema de niveles tradicional: Link no sube de nivel ni tiene stats numéricos que crecen con XP.
- Sistema de clases/builds permanentes: No eliges ser "mago" o "guerrero".

Mecánicas que mantienen su esencia de Aventura:
- Exploración libre sin restricciones de nivel (puedes ir al jefe final desde el inicio)
- Puzles ambientales que se resuelven con creatividad, no con stats
- Narrativa por descubrimiento y exploración, no por diálogo extenso
- Combate basado en habilidad del jugador, no en números

Pureza del género: Aproximadamente 70% Aventura / 30% RPG

**¿Es Final Fantasy VII "puro" RPG?**

Mecánicas "prestadas" de otros géneros:

- Aventura: Exploración de world map, ciudades y dungeons. Algunos dungeons tienen puzles ambientales (Templo Antiguo).
- Puzle: Minijuegos integrados (Snowboarding en Gold Saucer, Carreras de Chocobo).
- Estrategia: El sistema de Materia es esencialmente "construcción de builds" como en juegos de estrategia. Hay synergies y meta-estrategias.

NO tiene:
- Acción en tiempo real: El combate es por turnos, no requiere reflejos.
- Exploración no lineal: La historia es lineal (aunque hay side-quests opcionales).

Mecánicas que mantienen su esencia de RPG:
- Sistema de niveles y estadísticas como core del juego
- Progresión numérica (nivel 1 → nivel 99)
- Narrativa lineal dirigida por historia
- Combate basado en números y decisiones estratégicas, no en reflejos

Pureza del género: Aproximadamente 75% RPG / 25% Híbrido (Aventura + Estrategia)

**¿Qué nos dice esto sobre los géneros modernos?**

**Observación 1: Convergencia de Géneros**

Los juegos modernos son cada vez más sistemas híbridos modulares. Los géneros "puros" son raros porque:

1. Diseñadores toman prestadas "best practices" de otros géneros exitosos
2. Jugadores esperan profundidad multidimensional (no solo una mecánica repetida)
3. La tecnología permite complejidad sin sacrificar rendimiento

Evolución histórica:

Géneros Clásicos (1980-2000):
Acción | RPG | Estrategia
(Silos separados, mecánicas exclusivas)

Géneros Modernos (2010-2025):
Action-RPG-Souls-like-Metroidvania-Roguelike
(Mashup de 4+ géneros en un solo juego)

**Observación 2: "Género" como Etiqueta de Dominio, no de Definición**

El género ya no define QUÉ mecánicas tiene un juego, sino QUÉ mecánica es DOMINANTE en el core loop.

- BotW es "Aventura" porque la exploración es el core loop principal, aunque tenga progresión de equipamiento RPG.
- FF VII es "RPG" porque la progresión de personaje y niveles es el core loop, aunque tenga puzles de Aventura.

El género es ahora el "tipo de dato principal", no el "único tipo permitido".

**Observación 3: Arquitectura en Capas**

Los juegos modernos usan una arquitectura de capas de género:

Capa 1: Género Principal (Core Loop) - 60-70% del tiempo de juego
Capa 2: Género Secundario (Profundidad) - 20-30% del tiempo de juego
Capa 3: Mecánicas de "Sabor" - 10% del tiempo de juego

Ejemplo - Breath of the Wild:
- AVENTURA (exploración, descubrimiento) - Core Loop Principal
- RPG (progresión de equipamiento, cocina) - Sistema Secundario
- Puzle (santuarios, korok seeds) - Mecánicas de Sabor

**Observación 4: Los Híbridos NO son "Impuros", son "Evolucionados"**

Históricamente, los géneros "puros" existían por limitaciones técnicas:

- Pong (1972): Solo podía hacer una mecánica (rebotar pelota)
- Space Invaders (1978): Solo una mecánica (disparar hacia arriba)
- Pac-Man (1980): Solo una mecánica (comer puntos, evitar fantasmas)

Pero a medida que la tecnología avanzó:

- The Legend of Zelda (1986): Aventura + Acción + Puzle
- Final Fantasy VII (1997): RPG + Aventura + Minijuegos
- Breath of the Wild (2017): Aventura + RPG + Acción + Simulación (física) + Puzle

Los juegos modernos pueden implementar MÚLTIPLES sistemas complejos simultáneamente.

**Lección para Ingenieros de Sistemas**

Los géneros son ahora "patrones de diseño", no "especificaciones rígidas".

Como ingenieros de software, esto significa:

**1. Composición sobre Herencia (Paradigma de Programación)**

Enfoque antiguo (Herencia - Género Puro):
```
class Juego_Aventura:
    def explorar():
        pass
    def resolver_puzles():
        pass
```

Enfoque moderno (Composición - Híbrido):
```
class BreathOfTheWild:
    sistema_aventura = AventuraSystem()
    sistema_rpg = RPGSystem()
    sistema_combate = ActionSystem()
    sistema_fisica = SimulationSystem()
    
    def play(self):
        while jugando:
            self.sistema_aventura.explorar()      # Core loop
            self.sistema_rpg.mejorar_equipo()     # Secundario
            self.sistema_combate.pelear()         # Terciario
            self.sistema_fisica.experimentar()    # Sabor
```

**2. Sistemas Modulares e Independientes**

Las mecánicas deben ser módulos desacoplados que pueden integrarse sin romper el core loop:

- Sistema de combate puede funcionar independiente de sistema de progresión
- Sistema de cocina puede existir sin sistema de niveles
- Sistema de física puede aplicarse a puzles Y combate

**3. UX (Estética) como Norte, no el Género**

La decisión de qué mecánicas incluir debe basarse en:

Incorrecto: "Este es un RPG, entonces DEBE tener niveles y stats"

Correcto: "Queremos que el jugador se sienta poderoso progresivamente (Estética: Crecimiento), entonces usaremos progresión de equipamiento porque encaja mejor con exploración libre que niveles numéricos"

**Conclusión Final:**

Los juegos modernos son sistemas complejos multi-paradigma, no ejemplos "puros" de un solo género.

Esta evolución los hace:
- Más ricos en contenido
- Más profundos en mecánicas
- Más interesantes de analizar como ingenieros de sistemas

Y como futuros desarrolladores, deben pensar en términos de "¿Qué sistemas componer?" en lugar de "¿A qué género pertenezco?"

El género es la etiqueta de marketing. El diseño es la arquitectura de sistemas.

---

## Entregables

- Documento completo con Tabla MDA + Análisis Comparativo
- Guardar en carpeta: "Clase-007" dentro del repositorio
- Publicar enlace en el canal: 002 - Definición T. Clase

---

Grupo: [Número de grupo]
Integrantes: [Nombres de los integrantes]
Fecha de entrega: [Fecha]

---

Curso: 2025-B SW Juegos Interactivos GR3
Módulo: JG - 01 Fundamentos y Contexto del Juego: Módulo 1
