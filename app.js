// =========================================================
// LA VIDA DE MAX — lógica base
// Cada <section data-screen="..."> es una pantalla.
// Cualquier botón con data-go="nombre" te lleva a esa pantalla.
// =========================================================
//
// ╔═══════════════════════════════════════════════════════╗
// ║  GUÍA: QUÉ PUEDES CAMBIAR TÚ SOLA EN ESTE ARCHIVO     ║
// ╚═══════════════════════════════════════════════════════╝
// Truco: abre la búsqueda (Ctrl+F en VS Code) y pega el nombre en MAYÚSCULAS de cada punto.
// Todo lo de esta lista son "listas" o "números" sueltos: cambias el texto/valor y guardas. No hay que tocar nada más.
//
// ── TIEMPOS ───────────────────────────────────────────────
//  SPLASH_DURATION       cuánto dura el logo del inicio (ms: 3200 = 3,2 segundos)
//  LOGIN_ADVANCE_DELAY   cuánto tarda en pasar de pantalla tras tocar un botón de inicio de sesión
//  LOADING_DURATION      cuánto dura la barra de "cargando"
//
// ── DATOS DEL JUGADOR ─────────────────────────────────────
//  AGE_MIN / AGE_MAX     edades permitidas
//  PET_NAME_MAX          letras máximas del nombre de la mascota
//  PET_NAME_DEFAULT      nombre que se usa si no escriben ninguno ("Max")
//
// ── RAZAS (pantalla 7) ────────────────────────────────────
//  BREEDS                lista de razas. Para AGREGAR una: copia una línea y cambia id, nombre, rasgo, energia, tamano.
//                        El "id" es también el nombre de la foto: assets/razas/<id>.png (PNG con fondo transparente).
//                        Si la foto no existe se ve un círculo con una huellita (no se rompe nada).
//                        ⚠ Los datos (rasgo, energía, tamaño) están POR INVESTIGAR: valídalos antes de entregar.
//  BREED_START           qué tarjeta sale al centro al entrar (0 = la primera)
//  BREED_SPACING         qué tan separadas se ven las tarjetas del slider
//
// ── CÓMO CAMBIAR/AGREGAR LA FOTO DE UNA RAZA (y que los accesorios le queden bien) ──
//  1) Guarda la foto como assets/razas/<id>.png, SIN fondo (recortada al contorno del animal).
//  2) Busca  ANCHORS  (más abajo). Cada raza tiene su bloque con 4 puntos: cuello, ojos, gorro (sombreros) y lazo.
//     x, y = posición en % de la foto (0 = izquierda/arriba, 100 = derecha/abajo)   w = ancho del accesorio en %   r = giro en grados.
//  3) Copia un bloque, ponle el id de tu raza y ajusta los números mirando el resultado en la pantalla "toque" (paso 3)
//     o en el vestuario. Si una raza no tiene bloque usa el de "default".
//  La foto genérica que sale si la raza no tiene imagen es assets/perrito.png / assets/gatito.png.
//
// ── ACCESORIOS ────────────────────────────────────────────
//  ACC_CATEGORIES        las pestañas de la pantalla 8 (Bandanas, Gafas…)
//  ACCESSORIES           los 6 accesorios de la pantalla 8: nombre, categoría, zona (cuello/ojos/cabeza), colores
//  EXTRA_ACC             accesorios extra que SOLO aparecen en el vestuario (copa, corona, gorra, corbatín). Aquí puedes agregar más
//  ACC_ART               los DIBUJOS (SVG) de cada accesorio. Cambia colores aquí (por ejemplo "#E5383B" = rojo)
//  VEST_L / VEST_R       los botones de las columnas del vestuario y qué accesorios abre cada uno
//  POSES                 las poses del vestuario (Sentado, Saludo, Brinco). Cada una tiene su animación en styles.css (.pose-…)
//
// ── RINCÓN FELIZ (pantalla 9) ─────────────────────────────
//  CAMAS                 las camitas: nombre, estrellas. Foto de cada una: assets/camas/<id>.jpg
//  JUGUETES              los juguetes (el dibujo es un SVG pequeño en "icono")
//  MAX_TOYS              cuántos juguetes se eligen (2)
//
// ── CUARTO Y JUEGO ────────────────────────────────────────
//  ROOM_PROPS            dónde se dibujan la camita y los juguetes elegidos sobre el fondo del cuarto (y sus imágenes: busca CAMITA Y JUGUETES EN EL CUARTO)
//  applyRoomBg           qué foto de cuarto se usa según el género: assets/cuarto-macho.jpg / assets/cuarto-hembra.jpg
//  game                  monedas, nivel, experiencia y energía con las que EMPIEZA el jugador
//  PHRASES               frases que dice la mascota en el cuarto
//  EXTRAS                las misioncitas extra que aparecen de vez en cuando (+10 monedas)
//  MISSIONS              las misiones de hoy (texto, cuántas veces, recompensa)
//  NAV                   los 4 botones de la barra de abajo (emoji y nombre)
//  FOODS                 la comida (emoji, nombre, cuánta energía da)
//
// ── MINIJUEGOS ────────────────────────────────────────────
//  DAILY / DET_REWARD    los casos del detective y su premio
//  GAMES                 las 4 tarjetas de juegos (nombre, descripción, nivel al que se desbloquean "lv")
//  PRIZES                los premios de la ruleta
//  ENERGY_COST           cuánta energía gasta jugar
//  BALLS_LEVEL / BALLS_GOAL   Atrapa Pelotas: con cuántos puntos se completa el primer nivel (cada pelota = 10 pts)
//  (dentro de playBalls: 3 vidas, 30 % de piedras y velocidad de caída — busca "lives = 3" y "spawn")
//
// ── BUSCA EL SÍMBOLO 👉 ───────────────────────────────────
//  Antes de cada raza, camita, juguete y accesorio hay una línea que empieza con 👉 y dice EXACTAMENTE qué archivo
//  guardar para reemplazar su imagen. Ctrl+F → 👉 y vas saltando de una a otra.
//
// ── MÁS IMÁGENES QUE PUEDES PONER ─────────────────────────
//  assets/galletita.png        tu símbolo de galletitas (PNG transparente, cuadrado). Sale en la barra de arriba, premios y tareas.
//  assets/accesorios/<id>.png  la imagen de cada accesorio (ver 👉 en ACCESSORIES y EXTRA_ACC)
//  assets/musica.mp3           la música de fondo (se puede apagar en Ajustes)
//
// ── JUEGOS DE LOS NIVELES 2, 3 y 4 (provisionales, pero funcionan) ──
//  GAME_RULES            a qué nivel pertenece cada juego y cuántos puntos completan ese nivel (goal)
//  CHEF_ITEMS / CHEF_ROUNDS / CHEF_RECIPE_LEN / CHEF_SHOW_MS   Chef Perruno (nivel 2): ingredientes, recetas, tiempo para memorizar
//  MAZES / MAZE_COUNT / MAZE_BONUS_SECS                        Laberinto Patitas (nivel 3): los laberintos (# pared, . camino, S salida, E hueso)
//  RITMO_*                                                     Ritmo Huellitas (nivel 4): rondas, vidas, velocidad, colores
//  Al terminar cualquier juego salen Continuar / Volver a jugar / Salir y, si subiste de nivel, el letrero grande.
//
// ── AJUSTES, PERFIL Y GALLETITAS (⚙, nivel/foto y galletitas de la barra de arriba) ──
//  settings              con qué ajustes empieza (sonido, música, vibración, notificaciones)
//  TASKS / TASKS_BONUS   las 3 tareas diarias para ganar galletitas y el premio extra
//  LOGROS                "lo que ha descubierto" la mascota (perfil): nombre, texto y cuándo se desbloquea
//
// ── LETRERO "NIVEL NUEVO" ─────────────────────────────────
//  LEVEL_REWARD          galletitas que regala (200) y si regala accesorio
//  LEVEL_TEXT            los textos del letrero ("¡Has alcanzado un nuevo nivel!", "Sigue así…")
//  addXp                 aquí se decide cuándo se sube de nivel (cada 100 de experiencia)
//  Su diseño (colores, tamaños) está en styles.css → busca  LETRERO DE NIVEL
//
// ── FONDOS Y LOGO ─────────────────────────────────────────
//  Los fondos NO se cambian aquí sino en styles.css (arriba, bloque :root) — mira la guía de ese archivo.
//  Excepción: los fondos del cuarto, que se escogen por género en applyRoomBg (aquí).
// =========================================================

const screens = document.querySelectorAll(".screen");

// Tiempo que dura la pantalla de carga antes de pasar a la siguiente (ms)
const SPLASH_DURATION = 3200;

// Preferencia elegida en el diálogo de notificaciones: "si" | "no" | null
// (más adelante se guarda de verdad en la configuración del jugador)
let notificationChoice = null;

// Fondo del cuarto según el género elegido (macho = azul/verde, hembra = rosado)
const ROOM_SCREENS = ["cuarto", "vestuario", "comida", "minijuegos"];
function applyRoomBg() {
  const file = petGender === "hembra" ? "cuarto-hembra.jpg" : "cuarto-macho.jpg";
  document.getElementById("app").style.setProperty("--cuarto-img", `url("assets/${file}")`);
}

function goTo(name) {
  const target = document.querySelector(`[data-screen="${name}"]`);
  if (!target) {
    console.warn(`No existe la pantalla "${name}"`);
    return;
  }
  screens.forEach((s) => s.classList.remove("is-active"));
  target.classList.add("is-active");

  // Cuarto, vestuario, comida y minijuegos: pone el fondo según el género
  if (ROOM_SCREENS.includes(name)) applyRoomBg();
  if (ROOM_SCREENS.includes(name)) renderRoomProps();

  // Al volver a inicio de sesión, los botones vuelven a su tamaño normal
  if (name === "inicio-sesion") resetLoginSelection();

  // Pantalla de edad: pone el cursor en el campo para que salga el teclado
  if (name === "edad") focusAgeInput();

  // Pantalla de carga: arranca la barra (y la detiene si salimos de ella)
  if (name === "cargando") startLoading();
  else stopLoading();

  // Pantalla de razas: arma el slider según el compañero elegido
  if (name === "razas") enterBreeds();

  // Pantalla de toque especial: pone la mascota elegida con sus accesorios
  if (name === "toque") enterToque();

  // Pantalla del rincón feliz: arma las camitas y los juguetes (una sola vez)
  if (name === "rincon") enterRincon();

  // Cuarto y vestuario (pantallas 10 y 11)
  if (name === "cuarto") enterCuarto(); else stopRoom();
  if (name === "vestuario") enterVestuario();
  if (name === "comida") enterComida();
  if (name === "minijuegos") enterMj();

  // Pantallas que se abren desde la barra de arriba (ajustes, perfil, galletitas)
  if (name === "ajustes") renderAjustes();
  if (name === "perfil") renderPerfil();
  if (name === "galletas") renderGalletas();

  // Pantalla de prueba: muestra lo que eligió el jugador
  if (name === "siguiente") renderSummary();
}

// Navegación por botones con data-go
// (los botones de inicio de sesión se manejan aparte, abajo, para que se vea la animación)
document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-go]");
  if (btn && !btn.disabled && !btn.classList.contains("choice")) goTo(btn.dataset.go);
});

// --- Pantalla 1: carga → pasa sola a notificaciones ---
setTimeout(() => {
  const splashActiva = document
    .querySelector('[data-screen="splash"]')
    .classList.contains("is-active");
  if (splashActiva) goTo("notificaciones");
}, SPLASH_DURATION);

// --- Pantalla 2: diálogo de permisos ---
const overlay = document.getElementById("dialog-overlay");
const btnContinuar = document.getElementById("btn-continuar");

document.querySelectorAll("[data-permission]").forEach((btn) => {
  btn.addEventListener("click", () => {
    notificationChoice = btn.dataset.permission; // "si" o "no"
    overlay.classList.add("is-hidden");          // cierra el diálogo
    btnContinuar.disabled = false;               // habilita CONTINUAR
  });
});

// --- Pantalla 3: inicio de sesión ---
// El botón que se toca crece y los demás se achican.
// Después de un momento (para que se alcance a ver) pasa a la siguiente pantalla.
const LOGIN_ADVANCE_DELAY = 700; // ms

const loginOptions = document.getElementById("login-options");
const loginChoices = loginOptions.querySelectorAll(".choice");
let loginTimer = null;

function resetLoginSelection() {
  clearTimeout(loginTimer);
  loginOptions.classList.remove("has-selection");
  loginChoices.forEach((c) => c.classList.remove("is-selected"));
}

loginChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    clearTimeout(loginTimer);
    loginChoices.forEach((c) => c.classList.remove("is-selected"));
    choice.classList.add("is-selected");
    loginOptions.classList.add("has-selection");

    loginTimer = setTimeout(() => goTo(choice.dataset.go), LOGIN_ADVANCE_DELAY);
  });
});

// --- Pantalla 4: edad ---
// PENDING: definir edad mínima y máxima, y qué pasa según la edad (por ejemplo, consentimiento de un adulto).
const AGE_MIN = 1;
const AGE_MAX = 99;

// La edad solo se guarda en memoria mientras la app está abierta (no se guarda en el dispositivo).
let playerAge = null;

const ageForm = document.getElementById("edad-form");
const ageInput = document.getElementById("edad-input");
const ageButton = document.getElementById("edad-continuar");

function isValidAge(value) {
  if (!/^\d{1,2}$/.test(value)) return false;
  const n = Number(value);
  return n >= AGE_MIN && n <= AGE_MAX;
}

function focusAgeInput() {
  // Pequeña espera para que termine la animación de entrada de la pantalla
  setTimeout(() => ageInput.focus(), 400);
}

// Solo deja escribir números y habilita CONTINUAR cuando la edad es válida
ageInput.addEventListener("input", () => {
  ageInput.value = ageInput.value.replace(/\D/g, "").slice(0, 2);
  ageButton.disabled = !isValidAge(ageInput.value);
});

// Tocar en cualquier parte de la tarjeta pone el cursor en el campo (así siempre sale el teclado)
document.querySelector(".edad__card").addEventListener("click", (e) => {
  if (!e.target.closest("button")) ageInput.focus();
});

// CONTINUAR o la tecla "Ir/Enter" del teclado
ageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!isValidAge(ageInput.value)) return;
  playerAge = Number(ageInput.value);
  ageInput.blur(); // esconde el teclado en el celular
  goTo("cargando");
});

// --- Pantalla 5: cargando ---
// La barra avanza de 0 a 100 % y luego pasa a la siguiente pantalla.
const LOADING_DURATION = 4500; // ms (PENDING: ajustar o conectar con la carga real de la app)

const progressBar = document.getElementById("progress");
const progressFill = document.getElementById("progress-fill");
let loadingFrame = null;
let loadingDone = null;

// Empieza rápido, se toma su tiempo en el medio y termina suave
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function setProgress(percent) {
  progressFill.style.width = percent + "%";
  progressBar.setAttribute("aria-valuenow", String(Math.round(percent)));
}

function startLoading() {
  stopLoading();
  setProgress(0);
  const start = performance.now();

  function frame(now) {
    const t = Math.min((now - start) / LOADING_DURATION, 1);
    setProgress(easeInOut(t) * 100);

    if (t < 1) {
      loadingFrame = requestAnimationFrame(frame);
    } else {
      // Se queda un instante en 100 % antes de cambiar de pantalla
      loadingDone = setTimeout(() => goTo("nombre"), 500);
    }
  }
  loadingFrame = requestAnimationFrame(frame);
}

function stopLoading() {
  if (loadingFrame) cancelAnimationFrame(loadingFrame);
  if (loadingDone) clearTimeout(loadingDone);
  loadingFrame = null;
  loadingDone = null;
}

// --- Pantalla 6: nombre y compañero (Paso 1 de 4) ---
const PET_NAME_MAX = 12;           // letras máximas del nombre
const PET_NAME_DEFAULT = "Max";    // PENDING: qué pasa si el niño no escribe nombre (por ahora se usa "Max")

// Se guardan solo en memoria mientras la app está abierta
let petName = null;
let petType = null;                // "perrito" | "gatito"

const nameInput = document.getElementById("nombre-input");
const petsGroup = document.getElementById("pets");
const petButtons = petsGroup.querySelectorAll(".pet");
const nameContinue = document.getElementById("nombre-continuar");

// Solo letras, espacios, guion y apóstrofe (sin números, símbolos ni emojis)
nameInput.addEventListener("input", () => {
  nameInput.value = nameInput.value
    .replace(/[^\p{L}\p{M}\s'-]/gu, "")
    .replace(/\s{2,}/g, " ")
    .slice(0, PET_NAME_MAX);
});

// La tecla "Listo/Enter" esconde el teclado para ver las tarjetas
nameInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    nameInput.blur();
  }
});

// Elegir compañero: la tarjeta se agranda, la otra se achica y se habilita CONTINUAR
function choosePet(type) {
  petType = type;
  petsGroup.classList.add("has-selection");
  petButtons.forEach((b) => {
    const selected = b.dataset.pet === type;
    b.classList.toggle("is-selected", selected);
    b.setAttribute("aria-checked", String(selected));
  });
  nameContinue.disabled = false;
}

petButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    choosePet(btn.dataset.pet);
    nameInput.blur();                // esconde el teclado si estaba abierto
  });
});

nameContinue.addEventListener("click", () => {
  if (!petType) return;
  petName = nameInput.value.trim() || PET_NAME_DEFAULT;
  goTo("razas");
});

// Al volver a esta pantalla desde la siguiente, se conserva lo que se escribió y eligió.

function renderSummary() {
  const box = document.getElementById("resumen");
  if (!box) return;
  const parts = [];
  if (playerAge !== null) parts.push(`Edad: ${playerAge}`);
  if (petName) parts.push(`Nombre: ${petName}`);
  if (petType) parts.push(`Compañero: ${petType}`);
  if (petBreed) parts.push(`Raza: ${petBreed}`);
  if (petGender) parts.push(`Género: ${petGender}`);
  const worn = Object.values(petAccessories).map((id) => ACC_BY_ID[id].nombre);
  parts.push(`Accesorios: ${worn.length ? worn.join(", ") : "ninguno"}`);
  const cama = CAMAS.find((c) => c.id === petBed);
  if (cama) parts.push(`Camita: ${cama.nombre}`);
  if (petToys.length) parts.push(`Juguetes: ${petToys.map((id) => JUGUETES.find((j) => j.id === id).nombre).join(", ")}`);
  box.textContent = parts.join(" · ");
}

// --- Pantalla 7: razas (Paso 2 de 4) ---
// Slider de tarjetas: la del centro es la elegida; las de los lados quedan detrás, más pequeñas y con baja opacidad.
// Se cambia de tarjeta arrastrando, tocando una tarjeta del lado, con las flechas del teclado o con los puntos.
//
// POR INVESTIGAR: los datos de abajo (razas, rasgo, energía y tamaño) son PROVISIONALES, excepto el Golden Retriever,
// que es el de tu diseño. Valídalos con una fuente antes de la entrega y cámbialos aquí mismo.
// Para la foto de cada raza, pon un PNG con fondo transparente en assets/razas/<id>.png
// (por ejemplo assets/razas/bulldog.png). Si no existe, se muestra un círculo con una huellita.
const BREEDS = {
  perrito: [
    // 👉 RAZA «bulldog»: reemplaza su imagen guardando tu PNG sin fondo como  assets/razas/bulldog.png  (y sus accesorios se ajustan en ANCHORS, clave "bulldog")
    { id: "bulldog",          nombre: "Bulldog",          rasgo: "Tranquilo y leal",        energia: "Baja",     tamano: "Mediano" },
    // 👉 RAZA «golden-retriever»: reemplaza su imagen guardando tu PNG sin fondo como  assets/razas/golden-retriever.png  (y sus accesorios se ajustan en ANCHORS, clave "golden-retriever")
    { id: "golden-retriever", nombre: "Golden Retriever", rasgo: "Cariñoso y activo",       energia: "Muy alta", tamano: "Mediano/Grande", popular: true },
    // 👉 RAZA «poodle-toy»: reemplaza su imagen guardando tu PNG sin fondo como  assets/razas/poodle-toy.png  (y sus accesorios se ajustan en ANCHORS, clave "poodle-toy")
    { id: "poodle-toy",       nombre: "Poodle Toy",       rasgo: "Inteligente y juguetón",  energia: "Media",    tamano: "Pequeño" },
    // 👉 RAZA «husky»: reemplaza su imagen guardando tu PNG sin fondo como  assets/razas/husky.png  (y sus accesorios se ajustan en ANCHORS, clave "husky")
    { id: "husky",            nombre: "Husky Siberiano",  rasgo: "Aventurero y sociable",   energia: "Muy alta", tamano: "Mediano/Grande" },
    // 👉 RAZA «beagle»: reemplaza su imagen guardando tu PNG sin fondo como  assets/razas/beagle.png  (y sus accesorios se ajustan en ANCHORS, clave "beagle")
    { id: "beagle",           nombre: "Beagle",           rasgo: "Curioso y amigable",      energia: "Alta",     tamano: "Mediano" },
  ],
  gatito: [
    // 👉 RAZA «siames»: reemplaza su imagen guardando tu PNG sin fondo como  assets/razas/siames.png  (y sus accesorios se ajustan en ANCHORS, clave "siames")
    { id: "siames",     nombre: "Siamés",     rasgo: "Hablador y sociable", energia: "Alta",     tamano: "Mediano" },
    // 👉 RAZA «persa»: reemplaza su imagen guardando tu PNG sin fondo como  assets/razas/persa.png  (y sus accesorios se ajustan en ANCHORS, clave "persa")
    { id: "persa",      nombre: "Persa",      rasgo: "Tranquilo y dulce",   energia: "Baja",     tamano: "Mediano" },
    // 👉 RAZA «maine-coon»: reemplaza su imagen guardando tu PNG sin fondo como  assets/razas/maine-coon.png  (y sus accesorios se ajustan en ANCHORS, clave "maine-coon")
    { id: "maine-coon", nombre: "Maine Coon", rasgo: "Gentil y juguetón",   energia: "Media",    tamano: "Grande" },
    // 👉 RAZA «bengali»: reemplaza su imagen guardando tu PNG sin fondo como  assets/razas/bengali.png  (y sus accesorios se ajustan en ANCHORS, clave "bengali")
    { id: "bengali",    nombre: "Bengalí",    rasgo: "Activo y curioso",    energia: "Muy alta", tamano: "Mediano" },
  ],
};
// Tarjeta que aparece al centro al entrar (en perritos arranca en el Golden Retriever, como en el diseño)
const BREED_START = { perrito: 1, gatito: 0 };
// Qué tanto asoman las tarjetas de los lados (más pequeño = más tapadas por la del centro)
const BREED_SPACING = 0.64;

const stage = document.getElementById("carousel-stage");
const dotsBox = document.getElementById("carousel-dots");
const tabButtons = document.querySelectorAll(".tab");
const breedContinue = document.getElementById("razas-continuar");
const breedBack = document.getElementById("razas-atras");

let petBreed = null;               // raza elegida (se guarda solo en memoria)
let petBreedId = null;             // id de la raza elegida (nombre del archivo en assets/razas/)
let breedTab = "perrito";
let breedList = [];
let breedCards = [];
let breedIndex = 0;                // tarjeta elegida
let breedPos = 0;                  // posición del slider (con decimales mientras se arrastra)

const ICON_CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#12502a"/><path d="M7 12.5l3.2 3.2L17 9" fill="none" stroke="#72F59A" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const ICON_CHEVRON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>';
const ICON_BOLT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 2 5 13.5h6L10 22l9-12h-6z" fill="#F0701F"/></svg>';
const ICON_SIZE = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="3" fill="#2FAE5C"/><path d="M7 10v4M12 10v4M17 10v4" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>';
const ICON_PAW = '<svg viewBox="0 0 64 64" aria-hidden="true"><ellipse cx="14" cy="28" rx="6" ry="8" transform="rotate(-20 14 28)"/><ellipse cx="26" cy="16" rx="6" ry="8" transform="rotate(-8 26 16)"/><ellipse cx="40" cy="16" rx="6" ry="8" transform="rotate(8 40 16)"/><ellipse cx="52" cy="28" rx="6" ry="8" transform="rotate(20 52 28)"/><path d="M32 30c-9 0-18 9-18 17 0 6 5 9 10 9 3 0 5-1 8-1s5 1 8 1c5 0 10-3 10-9 0-8-9-17-18-17z"/></svg>';

function buildBreedCards() {
  stage.innerHTML = "";
  dotsBox.innerHTML = "";
  breedCards = breedList.map((b, i) => {
    const card = document.createElement("article");
    card.className = "raza";
    card.dataset.index = String(i);
    card.setAttribute("aria-label", b.nombre);
    card.innerHTML = `
      ${b.popular ? `<span class="raza__badge">${ICON_CHECK}POPULAR</span>` : ""}
      <div class="raza__photo">
        <img src="assets/razas/${b.id}.png" alt="" draggable="false" />
        <div class="raza__ph" aria-hidden="true">${ICON_PAW}</div>
      </div>
      <h3 class="raza__name">${b.nombre}</h3>
      <span class="raza__trait">${ICON_CHEVRON}${b.rasgo}</span>
      <div class="raza__stats">
        <div class="stat"><span class="stat__label">ENERGÍA</span><span class="stat__value">${ICON_BOLT}${b.energia}</span></div>
        <div class="stat"><span class="stat__label">TAMAÑO</span><span class="stat__value">${ICON_SIZE}${b.tamano}</span></div>
      </div>`;
    card.querySelector("img").addEventListener("error", () => card.classList.add("no-img"));
    stage.appendChild(card);
    dotsBox.appendChild(document.createElement("i"));
    return card;
  });
}

// Coloca cada tarjeta según su distancia a la posición actual del slider
function renderBreeds() {
  if (!breedCards.length) return;
  const cardW = breedCards[0].offsetWidth || 240;
  const near = cardW * BREED_SPACING;  // cuánto se separa la tarjeta vecina del centro
  const far = cardW * 0.22;        // separación extra de las siguientes
  breedCards.forEach((card, i) => {
    const off = i - breedPos;
    const abs = Math.abs(off);
    const dir = Math.sign(off);
    const x = dir * (Math.min(abs, 1) * near + Math.max(abs - 1, 0) * far);
    const scale = Math.max(0.6, 1 - 0.2 * Math.min(abs, 2));
    const opacity = abs <= 1 ? 1 - 0.58 * abs : Math.max(0, 0.42 - 0.42 * (abs - 1));
    card.style.transform = `translateX(${x}px) scale(${scale})`;
    card.style.opacity = String(opacity);
    card.style.zIndex = String(100 - Math.round(abs * 10));
    card.style.visibility = opacity < 0.02 ? "hidden" : "visible";
    card.setAttribute("aria-hidden", String(i !== breedIndex));
  });
  dotsBox.querySelectorAll("i").forEach((d, i) => d.classList.toggle("is-on", i === breedIndex));
}

function goToBreed(i) {
  breedIndex = Math.max(0, Math.min(breedCards.length - 1, i));
  breedPos = breedIndex;
  renderBreeds();
}

// Cambia entre Perritos y Gatitos
function setBreedTab(tab) {
  breedTab = tab;
  breedList = BREEDS[tab];
  tabButtons.forEach((t) => {
    const on = t.dataset.tab === tab;
    t.classList.toggle("is-active", on);
    t.setAttribute("aria-selected", String(on));
  });
  buildBreedCards();
  breedIndex = BREED_START[tab] ?? 0;
  breedPos = breedIndex;
  renderBreeds();
}

function enterBreeds() {
  // Arranca en la pestaña del compañero que se eligió en el paso anterior
  const wanted = petType || breedTab;
  if (!breedCards.length || wanted !== breedTab) setBreedTab(wanted);
  else renderBreeds();
}

tabButtons.forEach((t) => {
  t.addEventListener("click", () => {
    if (t.dataset.tab === breedTab) return;
    setBreedTab(t.dataset.tab);
    choosePet(breedTab);           // mantiene sincronizado el compañero del paso anterior
  });
});

// Arrastrar con el dedo o el mouse, o tocar una tarjeta del lado
let dragStartX = 0;
let dragStartPos = 0;
let dragging = false;
let dragMoved = false;

stage.addEventListener("pointerdown", (e) => {
  if (e.pointerType === "mouse" && e.button !== 0) return;
  dragging = true;
  dragMoved = false;
  dragStartX = e.clientX;
  dragStartPos = breedPos;
  stage.setPointerCapture(e.pointerId);
});

stage.addEventListener("pointermove", (e) => {
  if (!dragging) return;
  const dx = e.clientX - dragStartX;
  if (Math.abs(dx) > 6 && !dragMoved) {
    dragMoved = true;
    stage.classList.add("is-dragging");
  }
  if (!dragMoved) return;
  const cardW = breedCards[0].offsetWidth || 240;
  breedPos = Math.max(0, Math.min(breedCards.length - 1, dragStartPos - dx / (cardW * BREED_SPACING)));
  renderBreeds();
});

function endDrag(e) {
  if (!dragging) return;
  dragging = false;
  stage.classList.remove("is-dragging");
  if (dragMoved) {
    const dx = e.clientX - dragStartX;
    let target = Math.round(breedPos);
    // Un arrastre corto pero decidido también cambia de tarjeta
    if (target === Math.round(dragStartPos) && Math.abs(dx) > 40) target += dx < 0 ? 1 : -1;
    goToBreed(target);
  } else {
    const under = document.elementFromPoint(e.clientX, e.clientY);
    const card = under && under.closest(".raza");
    if (card) goToBreed(Number(card.dataset.index));
  }
}
stage.addEventListener("pointerup", endDrag);
stage.addEventListener("pointercancel", endDrag);

stage.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") { e.preventDefault(); goToBreed(breedIndex + 1); }
  if (e.key === "ArrowLeft")  { e.preventDefault(); goToBreed(breedIndex - 1); }
});

dotsBox.addEventListener("click", (e) => {
  const dot = e.target.closest("i");
  if (dot) goToBreed([...dotsBox.children].indexOf(dot));
});

window.addEventListener("resize", renderBreeds);

breedBack.addEventListener("click", () => goTo("nombre"));

breedContinue.addEventListener("click", () => {
  const breed = breedList[breedIndex];
  if (!breed) return;
  petType = breedTab;
  petBreed = breed.nombre;
  petBreedId = breed.id;
  goTo("toque");
});

// --- Pantalla 8: toque especial (Paso 3 de 4) — género y accesorios ---
// La mascota elegida aparece arriba y se "viste" con los accesorios que se tocan.
// Cada accesorio ocupa una zona (cuello, ojos o cabeza): al elegir otro de la misma zona se cambia por el nuevo,
// y al tocar el que ya está puesto se quita. Se pueden llevar varios de zonas distintas a la vez.
const ACC_CATEGORIES = [
  { id: "todos",    nombre: "Todos" },
  { id: "bandanas", nombre: "Bandanas" },
  { id: "collares", nombre: "Collares" },
  { id: "gafas",    nombre: "Gafas" },
  { id: "lazos",    nombre: "Lazos" },
  { id: "gorros",   nombre: "Gorros" },
];

// zona: dónde se pone | ancla: qué punto de la mascota usa (ver ANCHORS) | colores: los puntitos de la tarjeta
const ACCESSORIES = [
  // 👉 ACCESORIO «bandana-roja»: reemplaza el dibujo por tu imagen guardando un PNG transparente (recortado al objeto) como  assets/accesorios/bandana-roja.png  — su posición/tamaño sobre cada raza se ajusta en ANCHORS
  { id: "bandana-roja",    nombre: "Bandana Roja",    cat: "bandanas", zona: "cuello", ancla: "cuello", colores: ["#E5383B", "#F9B233"], icono: "paw",   fondo: "#FFE5CF", color: "#E2703F" },
  // 👉 ACCESORIO «bandana-estelar»: reemplaza el dibujo por tu imagen guardando un PNG transparente (recortado al objeto) como  assets/accesorios/bandana-estelar.png  — su posición/tamaño sobre cada raza se ajusta en ANCHORS
  { id: "bandana-estelar", nombre: "Bandana Estelar", cat: "bandanas", zona: "cuello", ancla: "cuello", colores: ["#2F5BEA", "#25C2B0"], icono: "star",  fondo: "#E3EEFF", color: "#3B63E8" },
  // 👉 ACCESORIO «collar-dorado»: reemplaza el dibujo por tu imagen guardando un PNG transparente (recortado al objeto) como  assets/accesorios/collar-dorado.png  — su posición/tamaño sobre cada raza se ajusta en ANCHORS
  { id: "collar-dorado",   nombre: "Collar Dorado",   cat: "collares", zona: "cuello", ancla: "cuello", colores: ["#F2A21E", "#FFE8A3"], icono: "bell",  fondo: "#FFF1C7", color: "#E5A100" },
  // 👉 ACCESORIO «gafas-cool»: reemplaza el dibujo por tu imagen guardando un PNG transparente (recortado al objeto) como  assets/accesorios/gafas-cool.png  — su posición/tamaño sobre cada raza se ajusta en ANCHORS
  { id: "gafas-cool",      nombre: "Gafas Cool",      cat: "gafas",    zona: "ojos",   ancla: "ojos",   colores: ["#2F8BEA", "#1B2433"], icono: "shades", fondo: "#E3F0FF", color: "#16355F" },
  // 👉 ACCESORIO «lazo-rosa»: reemplaza el dibujo por tu imagen guardando un PNG transparente (recortado al objeto) como  assets/accesorios/lazo-rosa.png  — su posición/tamaño sobre cada raza se ajusta en ANCHORS
  { id: "lazo-rosa",       nombre: "Lazo Rosa",       cat: "lazos",    zona: "cabeza", ancla: "lazo",   colores: ["#F0388F", "#FFA8CC"], icono: "heart", fondo: "#FFE0EC", color: "#E83E8C" },
  // 👉 ACCESORIO «gorro-fiesta»: reemplaza el dibujo por tu imagen guardando un PNG transparente (recortado al objeto) como  assets/accesorios/gorro-fiesta.png  — su posición/tamaño sobre cada raza se ajusta en ANCHORS
  { id: "gorro-fiesta",    nombre: "Gorro Fiesta",    cat: "gorros",   zona: "cabeza", ancla: "gorro",  colores: ["#1FA463", "#FFC933"], icono: "party", fondo: "#D5F5E3", color: "#1FA463" },
];
const ACC_BY_ID = Object.fromEntries(ACCESSORIES.map((a) => [a.id, a]));

// Dónde va cada accesorio sobre cada imagen, en % de la imagen (0–100):
//   x, y = el punto donde se "ancla" (cuello: la línea del cuello; ojos: entre los ojos; gorro: la base; lazo: el nudo)
//   w = ancho del accesorio  |  r = giro en grados
// Las claves son el nombre del archivo sin .png. Cuando subas las fotos finales, estos números hay que ajustarlos
// (si me pasas las imágenes, los calibro de una vez). Una imagen sin entrada aquí usa "default".
const ANCHORS = {
  "golden-retriever": {
    cuello: { x: 53, y: 45, w: 36, r: 0 },
    ojos:   { x: 58, y: 21, w: 40, r: -12 },
    gorro:  { x: 57, y: 9, w: 23, r: 10 },
    lazo:   { x: 45, y: 9, w: 18, r: -14 },
  },
  // Poodle de cuerpo completo (assets/razas/poodle-toy.png y assets/perrito.png, sin fondo, recortado al contorno)
  "poodle-toy": {
    cuello: { x: 62, y: 44.5, w: 40, r: -6 },
    ojos:   { x: 60.8, y: 22, w: 33, r: -14 },
    gorro:  { x: 59.5, y: 12.5, w: 35, r: -12 },
    lazo:   { x: 45, y: 12, w: 23, r: -22 },
  },
  "gatito": {
    cuello: { x: 58, y: 87, w: 46, r: 0 },
    ojos:   { x: 57.5, y: 55.5, w: 70, r: -10 },
    gorro:  { x: 58, y: 24, w: 28, r: -4 },
    lazo:   { x: 40, y: 26, w: 22, r: -12 },
  },
};
ANCHORS["perrito"] = ANCHORS["poodle-toy"];
ANCHORS["default"] = ANCHORS["golden-retriever"];

// Dibujos de los accesorios. viewBox = lienzo del dibujo; pivot = qué punto del dibujo se pone sobre el ancla (0–1).
const starPts = (cx, cy, r) =>
  Array.from({ length: 10 }, (_, k) => {
    const ang = -Math.PI / 2 + (k * Math.PI) / 5;
    const rad = k % 2 === 0 ? r : r * 0.45;
    return `${(cx + rad * Math.cos(ang)).toFixed(1)},${(cy + rad * Math.sin(ang)).toFixed(1)}`;
  }).join(" ");

function bandanaArt(main, dark, pattern) {
  const dots = [[-26, -6], [-8, 4], [12, -4], [28, -8], [-4, 26], [2, 12]]
    .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="#fff" opacity=".92"/>`).join("");
  const stars = [[-28, -8, 6.5], [-6, 6, 7], [20, -6, 6.5], [2, 28, 5.5]]
    .map(([x, y, r]) => `<polygon points="${starPts(x, y, r)}" fill="#fff"/>`).join("");
  return {
    viewBox: "-56 -30 112 86",
    pivot: [0.5, 0.19],
    svg: `<path d="M-50 -20 L50 -20 Q53 -13 46 -7 L7 47 Q0 55 -7 47 L-46 -7 Q-53 -13 -50 -20Z" fill="${main}"/>
          ${pattern === "dots" ? dots : stars}
          <path d="M-53 -26 Q0 -12 53 -26 L53 -14 Q0 0 -53 -14Z" fill="${dark}"/>`,
  };
}

const ACC_ART = {
  "bandana-roja": bandanaArt("#E5383B", "#B71C1C", "dots"),
  "bandana-estelar": bandanaArt("#2F5BEA", "#1E3FAE", "stars"),
  "collar-dorado": {
    viewBox: "-56 -18 112 50",
    pivot: [0.5, 0.36],
    svg: `<defs><linearGradient id="gGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFD95A"/><stop offset="1" stop-color="#E0A012"/></linearGradient></defs>
          <path d="M-52 -14 Q0 8 52 -14 L52 -3 Q0 20 -52 -3Z" fill="url(#gGold)" stroke="#B8860B" stroke-width="1.4"/>
          <circle cx="0" cy="17" r="10.5" fill="url(#gGold)" stroke="#B8860B" stroke-width="1.6"/>
          <path d="M-6 19 Q0 23 6 19" stroke="#8A6508" stroke-width="2" fill="none" stroke-linecap="round"/>
          <circle cx="-3.5" cy="13.5" r="2.4" fill="#fff" opacity=".7"/>
          <circle cx="0" cy="6.5" r="3" fill="none" stroke="#B8860B" stroke-width="1.6"/>`,
  },
  "gafas-cool": {
    viewBox: "-52 -18 104 36",
    pivot: [0.5, 0.5],
    svg: `<defs><linearGradient id="gLens" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2F6FD0"/><stop offset="1" stop-color="#0E1A2E"/></linearGradient></defs>
          <path d="M-46 -6 L-50 -12 M46 -6 L50 -12" stroke="#0B1426" stroke-width="4" stroke-linecap="round"/>
          <path d="M-6 -3 Q0 -9 6 -3" stroke="#0B1426" stroke-width="4" fill="none" stroke-linecap="round"/>
          <rect x="-40" y="-13" width="35" height="27" rx="12" fill="url(#gLens)" stroke="#0B1426" stroke-width="3.2"/>
          <rect x="5" y="-13" width="35" height="27" rx="12" fill="url(#gLens)" stroke="#0B1426" stroke-width="3.2"/>
          <path d="M-34 -5 Q-29 -9 -21 -8 L-28 7 Q-33 7 -36 3Z" fill="#fff" opacity=".35"/>
          <path d="M11 -5 Q16 -9 24 -8 L17 7 Q12 7 9 3Z" fill="#fff" opacity=".35"/>`,
  },
  "lazo-rosa": {
    viewBox: "-48 -26 96 52",
    pivot: [0.5, 0.5],
    svg: `<path d="M0 0 C-10 -24 -44 -24 -42 -2 C-40 20 -12 18 0 0Z" fill="#FF5FA2" stroke="#E0307E" stroke-width="2"/>
          <path d="M0 0 C10 -24 44 -24 42 -2 C40 20 12 18 0 0Z" fill="#FF5FA2" stroke="#E0307E" stroke-width="2"/>
          <path d="M-8 -3 C-16 -14 -30 -14 -31 -4" stroke="#FFB3D2" stroke-width="3" fill="none" stroke-linecap="round"/>
          <path d="M8 -3 C16 -14 30 -14 31 -4" stroke="#FFB3D2" stroke-width="3" fill="none" stroke-linecap="round"/>
          <circle cx="0" cy="0" r="8" fill="#E0307E"/><circle cx="-2.5" cy="-2.5" r="2.5" fill="#FF8DBD"/>`,
  },
  "gorro-fiesta": {
    viewBox: "-32 -56 64 96",
    pivot: [0.5, 0.9],
    svg: `<path d="M-26 30 L0 -44 L26 30 Q0 38 -26 30Z" fill="#2FBF71"/>
          <path d="M-12.6 -8 L12.6 -8 L16.9 4 L-16.9 4Z" fill="#FFD23F"/>
          <path d="M-21.1 16 L21.1 16 L25.3 28 L-25.3 28Z" fill="#FFD23F"/>
          <circle cx="-4" cy="-24" r="2.2" fill="#fff"/><circle cx="6" cy="-14" r="2" fill="#fff"/><circle cx="-8" cy="10" r="2.2" fill="#fff"/>
          <ellipse cx="0" cy="31" rx="27" ry="6" fill="#1A9E58"/>
          <circle cx="0" cy="-46" r="7.5" fill="#FF5FA2"/><circle cx="-2.5" cy="-48.5" r="2.5" fill="#FF9CC5"/>`,
  },
};

// Iconos de las tarjetas (se pintan con el color de la tarjeta)
const ACC_ICONS = {
  paw:    `<svg viewBox="0 0 64 64" fill="currentColor" aria-hidden="true"><ellipse cx="14" cy="28" rx="6" ry="8" transform="rotate(-20 14 28)"/><ellipse cx="26" cy="16" rx="6" ry="8" transform="rotate(-8 26 16)"/><ellipse cx="40" cy="16" rx="6" ry="8" transform="rotate(8 40 16)"/><ellipse cx="52" cy="28" rx="6" ry="8" transform="rotate(20 52 28)"/><path d="M32 30c-9 0-18 9-18 17 0 6 5 9 10 9 3 0 5-1 8-1s5 1 8 1c5 0 10-3 10-9 0-8-9-17-18-17z"/></svg>`,
  star:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round" aria-hidden="true"><polygon points="${starPts(12, 12.5, 9.5)}"/><polygon points="${starPts(12, 12.5, 4)}"/></svg>`,
  bell:   `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4a5 5 0 0 0-5 5v3l-2 3h14l-2-3V9a5 5 0 0 0-5-5zM10 18a2 2 0 0 0 4 0"/></svg>`,
  shades: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="2" y="8" width="8.5" height="7" rx="3"/><rect x="13.5" y="8" width="8.5" height="7" rx="3"/><path d="M10.5 10.5q1.5-1 3 0" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`,
  heart:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>`,
  party:  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l4-12 8 8z"/><path d="M13 5l1 2M17 8l2-1M15 3v.01M20 12v.01"/></svg>`,
};
const ICON_CHECK_SMALL = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

const mascotaImg = document.getElementById("mascota-img");
const mascotaAcc = document.getElementById("mascota-acc");
const accChips = document.getElementById("acc-chips");
const accGrid = document.getElementById("acc-grid");
const generoButtons = document.querySelectorAll(".genero__btn");

let petGender = "macho";           // como en el diseño, arranca en Macho
let petAccessories = {};           // zona -> id del accesorio puesto
let accFilter = "todos";
let petImageKey = "default";
let wornEls = {};                  // zona -> elemento dibujado sobre la mascota

// Busca la primera imagen que exista: la foto de la raza o, si aún no la hay, la general del perrito/gatito
function loadFirstImage(srcs) {
  return new Promise((resolve) => {
    const tryAt = (n) => {
      if (n >= srcs.length) return resolve(null);
      const im = new Image();
      im.onload = () => resolve(srcs[n]);
      im.onerror = () => tryAt(n + 1);
      im.src = srcs[n];
    };
    tryAt(0);
  });
}

// Pone cada accesorio sobre la imagen. Las medidas son % de la imagen, aunque no sea cuadrada.
// Zona de la caja donde se dibuja la imagen (debe coincidir con .mascota__img en styles.css)
const FIT = { l: 0.04, t: 0.14, w: 0.92, h: 0.82 };

// Si existe assets/accesorios/<id>.png se usa tu imagen en lugar del dibujo provisional (ACC_ART).
// Tu PNG (fondo transparente, recortado al objeto) se ancla así: sombreros por el centro de su base, bandanas/collares por el
// centro de su borde de arriba y gafas por su centro. Su tamaño y posición sobre cada raza se ajustan en ANCHORS.
const ACC_IMG_PIVOT = { cabeza: [0.5, 0.92], cuello: [0.5, 0.12], ojos: [0.5, 0.5] };
function accPivot(el, def) { return el.dataset.img ? (ACC_IMG_PIVOT[def.zona] || [0.5, 0.5]) : ACC_ART[def.id].pivot; }
function attachAccImage(el, def, reposition) {
  const im = new Image();
  im.alt = "";
  im.onload = () => { el.innerHTML = ""; el.appendChild(im); el.dataset.img = "1"; reposition(); };
  im.src = `assets/accesorios/${def.id}.png`;
}

function positionAcc(el, def) {
  const set = ANCHORS[petImageKey] || ANCHORS.default;
  const a = set[def.ancla] || ANCHORS.default[def.ancla];
  const nw = mascotaImg.naturalWidth || 1;
  const nh = mascotaImg.naturalHeight || 1;
  const scale = Math.min(FIT.w / nw, FIT.h / nh);    // la imagen se ajusta dentro de la zona (object-fit: contain)
  const dw = nw * scale, dh = nh * scale;
  const ox = FIT.l + (FIT.w - dw) / 2, oy = FIT.t + (FIT.h - dh) / 2;
  const [px, py] = accPivot(el, def);
  el.style.left = `${(ox + (a.x / 100) * dw) * 100}%`;
  el.style.top = `${(oy + (a.y / 100) * dh) * 100}%`;
  el.style.width = `${(a.w / 100) * dw * 100}%`;
  el.style.transformOrigin = `${px * 100}% ${py * 100}%`;
  el.style.transform = `translate(${-px * 100}%, ${-py * 100}%) rotate(${a.r || 0}deg)`;
}

function makeWornEl(def) {
  const art = ACC_ART[def.id];
  const el = document.createElement("div");
  el.className = "acc-on";
  el.dataset.acc = def.id;
  el.innerHTML = `<svg viewBox="${art.viewBox}" aria-hidden="true">${art.svg}</svg>`;
  positionAcc(el, def);
  attachAccImage(el, def, () => positionAcc(el, def));
  return el;
}

// Muestra solo lo que cambió, para que el accesorio nuevo "aparezca" sin que los demás se muevan
function syncWorn() {
  ["cuello", "ojos", "cabeza"].forEach((zona) => {
    const id = petAccessories[zona];
    const current = wornEls[zona];
    if (current && current.dataset.acc !== id) { current.remove(); delete wornEls[zona]; }
    if (id && !wornEls[zona]) {
      wornEls[zona] = makeWornEl(ACC_BY_ID[id]);
      mascotaAcc.appendChild(wornEls[zona]);
    }
  });
}

function repositionWorn() {
  Object.values(wornEls).forEach((el) => positionAcc(el, ACC_BY_ID[el.dataset.acc]));
}

function renderAccChips() {
  accChips.innerHTML = "";
  ACC_CATEGORIES.forEach((c) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip" + (c.id === accFilter ? " is-active" : "");
    b.setAttribute("role", "tab");
    b.setAttribute("aria-selected", String(c.id === accFilter));
    b.dataset.cat = c.id;
    b.textContent = c.id === "todos" ? `${c.nombre} (${ACCESSORIES.length})` : c.nombre;
    accChips.appendChild(b);
  });
}

function renderAccGrid() {
  accGrid.innerHTML = "";
  ACCESSORIES.filter((a) => accFilter === "todos" || a.cat === accFilter).forEach((a) => {
    const on = petAccessories[a.zona] === a.id;
    const b = document.createElement("button");
    b.type = "button";
    b.className = "acc" + (on ? " is-selected" : "");
    b.dataset.acc = a.id;
    b.setAttribute("aria-pressed", String(on));
    b.innerHTML = `
      <span class="acc__check" aria-hidden="true">${ICON_CHECK_SMALL}</span>
      <span class="acc__icon" style="background:${a.fondo};color:${a.color}">${ACC_ICONS[a.icono]}</span>
      <span class="acc__name">${a.nombre}</span>
      <span class="acc__dots" aria-hidden="true">${a.colores.map((c) => `<i style="background:${c}"></i>`).join("")}</span>
      <span class="acc__tag">Gratis</span>`;
    accGrid.appendChild(b);
  });
}

function toggleAccessory(id) {
  const a = ACC_BY_ID[id];
  if (!a) return;
  if (petAccessories[a.zona] === id) delete petAccessories[a.zona];   // tocar el puesto lo quita
  else petAccessories[a.zona] = id;                                   // otro de la misma zona lo reemplaza
  syncWorn();
  accGrid.querySelectorAll(".acc").forEach((el) => {
    const on = petAccessories[ACC_BY_ID[el.dataset.acc].zona] === el.dataset.acc;
    el.classList.toggle("is-selected", on);
    el.setAttribute("aria-pressed", String(on));
  });
}

async function enterToque() {
  const generic = petType === "gatito" ? "assets/gatito.png" : "assets/perrito.png";
  const src = await loadFirstImage([petBreedId ? `assets/razas/${petBreedId}.png` : null, generic].filter(Boolean));
  petImageKey = (src || generic).split("/").pop().replace(/\.png$/, "");
  const apply = () => { repositionWorn(); };
  mascotaImg.onload = apply;
  if (mascotaImg.getAttribute("src") !== src) mascotaImg.src = src || generic;
  else apply();
  mascotaImg.alt = petName ? `${petName}, tu mascota` : "Tu mascota";
  petAccessories = petAccessories || {};
  renderAccChips();
  renderAccGrid();
  syncWorn();
}

accChips.addEventListener("click", (e) => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  accFilter = chip.dataset.cat;
  renderAccChips();
  renderAccGrid();
});

accGrid.addEventListener("click", (e) => {
  const card = e.target.closest(".acc");
  if (card) toggleAccessory(card.dataset.acc);
});

generoButtons.forEach((b) => {
  b.addEventListener("click", () => {
    petGender = b.dataset.genero;
    generoButtons.forEach((x) => {
      const on = x === b;
      x.classList.toggle("is-active", on);
      x.setAttribute("aria-checked", String(on));
    });
  });
});

document.getElementById("toque-atras").addEventListener("click", () => goTo("razas"));
document.getElementById("toque-continuar").addEventListener("click", () => goTo("rincon"));


// --- Pantalla 9: rincón feliz (Paso 4 de 4) ---
// 1 camita (de 4, se desliza de lado) + 2 juguetes (de 4). CONTINUAR se habilita cuando la selección está completa.
//
// PENDING: la foto de cada camita va en assets/camas/<id>.jpg (id: nube, estelar, nido, cueva).
// Mientras no exista, se ve un dibujo provisional.
// PENDING: nombres y estrellas de las camitas 3 y 4 son provisionales (el diseño solo muestra las dos primeras).
// Los juguetes se dibujan como SVG; no hay foto que subir.
const MAX_TOYS = 2;

const CAMAS = [
  // 👉 CAMITA «nube»: foto de la tarjeta del paso 4 → assets/camas/nube.jpg  ·  imagen que se ve en el cuarto → assets/camas/nube-cuarto.png (PNG transparente)
  { id: "nube",    nombre: "Cama Nube",      estrellas: 5, color: "#F6C58A", borde: "#E39A45" },
  // 👉 CAMITA «estelar»: foto de la tarjeta del paso 4 → assets/camas/estelar.jpg  ·  imagen que se ve en el cuarto → assets/camas/estelar-cuarto.png (PNG transparente)
  { id: "estelar", nombre: "Cojín Estelar",  estrellas: 4, color: "#A9C8E6", borde: "#6F9CC9" },
  // 👉 CAMITA «nido»: foto de la tarjeta del paso 4 → assets/camas/nido.jpg  ·  imagen que se ve en el cuarto → assets/camas/nido-cuarto.png (PNG transparente)
  { id: "nido",    nombre: "Nido Acogedor",  estrellas: 4, color: "#E8B88A", borde: "#C98E4B" },   // PENDING: nombre y estrellas
  // 👉 CAMITA «cueva»: foto de la tarjeta del paso 4 → assets/camas/cueva.jpg  ·  imagen que se ve en el cuarto → assets/camas/cueva-cuarto.png (PNG transparente)
  { id: "cueva",   nombre: "Cueva Secreta",  estrellas: 5, color: "#B9A7E8", borde: "#8F7BD0" },   // PENDING: nombre y estrellas
];

const JUGUETES = [
  // 👉 JUGUETE «pelota»: imagen que se ve en el cuarto → assets/juguetes/pelota.png (PNG transparente). El dibujito del paso 4 es el SVG de abajo ("icono"); para usar imagen ahí también, avísame
  { id: "pelota", nombre: "Pelota",  rasgo: "Sonora",     icono: '<circle cx="16" cy="16" r="12" fill="#C9E03C" stroke="#93A81C" stroke-width="1.5"/><path d="M5.5 10c6 3 15 3 21 0M5.5 22c6-3 15-3 21 0" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>' },
  // 👉 JUGUETE «huesito»: imagen que se ve en el cuarto → assets/juguetes/huesito.png (PNG transparente). El dibujito del paso 4 es el SVG de abajo ("icono"); para usar imagen ahí también, avísame
  { id: "huesito", nombre: "Huesito", rasgo: "Crujiente", icono: '<g fill="#F7F1E6" stroke="#CDBFA8" stroke-width="1.3"><circle cx="7" cy="11" r="4"/><circle cx="7" cy="21" r="4"/><circle cx="25" cy="11" r="4"/><circle cx="25" cy="21" r="4"/><rect x="7" y="12" width="18" height="8" rx="3" stroke="none"/></g>' },
  // 👉 JUGUETE «osito»: imagen que se ve en el cuarto → assets/juguetes/osito.png (PNG transparente). El dibujito del paso 4 es el SVG de abajo ("icono"); para usar imagen ahí también, avísame
  { id: "osito",  nombre: "Osito",   rasgo: "Súper Suave", icono: '<circle cx="9" cy="9" r="4" fill="#C98E4B"/><circle cx="23" cy="9" r="4" fill="#C98E4B"/><circle cx="16" cy="17" r="10" fill="#C98E4B"/><circle cx="12.5" cy="15" r="1.4" fill="#4A3428"/><circle cx="19.5" cy="15" r="1.4" fill="#4A3428"/><ellipse cx="16" cy="19.5" rx="3.4" ry="2.5" fill="#FBE3B8"/><circle cx="16" cy="18.6" r="1" fill="#4A3428"/>' },
  // 👉 JUGUETE «cuerda»: imagen que se ve en el cuarto → assets/juguetes/cuerda.png (PNG transparente). El dibujito del paso 4 es el SVG de abajo ("icono"); para usar imagen ahí también, avísame
  { id: "cuerda", nombre: "Cuerda",  rasgo: "Resistente",  icono: '<path d="M7 16h18" stroke="#E5383B" stroke-width="6" stroke-linecap="round"/><path d="M12 13v6M17 13v6M22 13v6" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/><circle cx="6" cy="16" r="4.5" fill="#2F5BEA"/><circle cx="26" cy="16" r="4.5" fill="#2F5BEA"/>' },
];

let petBed = null;     // id de la camita elegida
let petToys = [];      // ids de juguetes, del más antiguo al más nuevo
let rinconBuilt = false;

const SVG_OK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

function camaArt(c) {
  // Dibujo provisional de la camita (se cubre con la foto si existe)
  return `<svg viewBox="0 0 120 100" aria-hidden="true">
    <rect width="120" height="100" fill="#F4EEE6"/>
    <ellipse cx="60" cy="78" rx="46" ry="9" fill="rgba(0,0,0,.08)"/>
    <ellipse cx="60" cy="62" rx="44" ry="24" fill="${c.borde}"/>
    <ellipse cx="60" cy="58" rx="34" ry="16" fill="${c.color}"/>
    <ellipse cx="46" cy="55" rx="10" ry="4" fill="rgba(255,255,255,.35)"/>
  </svg>`;
}

function buildRincon() {
  const camasBox = document.getElementById("camas");
  camasBox.innerHTML = CAMAS.map((c) => `
    <button type="button" class="cama" role="radio" aria-checked="false" data-id="${c.id}">
      <span class="cama__check">${SVG_OK}</span>
      <span class="cama__foto">${camaArt(c)}<img src="assets/camas/${c.id}.jpg" alt="" onload="this.classList.add('is-loaded')" onerror="this.remove()"></span>
      <span class="cama__nombre">${c.nombre}</span>
      <span class="cama__estrellas" aria-label="${c.estrellas} de 5 estrellas">${"★".repeat(c.estrellas)}<span class="off">${"★".repeat(5 - c.estrellas)}</span></span>
      <span class="cama__precio">Gratis</span>
    </button>`).join("");

  document.getElementById("juguetes").innerHTML = JUGUETES.map((j) => `
    <button type="button" class="jug" aria-pressed="false" data-id="${j.id}">
      <span class="jug__icon"><svg viewBox="0 0 32 32" aria-hidden="true">${j.icono}</svg></span>
      <span class="jug__txt"><span class="jug__nombre">${j.nombre}</span><span class="jug__rasgo">${j.rasgo}</span></span>
      <span class="jug__mark" aria-hidden="true">
        <svg class="mas" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
        <svg class="ok" viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>
      </span>
    </button>`).join("");

  camasBox.addEventListener("click", (e) => {
    const b = e.target.closest(".cama");
    if (!b) return;
    petBed = b.dataset.id;            // elegir otra camita reemplaza la anterior
    updateRincon();
  });

  document.getElementById("juguetes").addEventListener("click", (e) => {
    const b = e.target.closest(".jug");
    if (!b) return;
    const id = b.dataset.id;
    if (petToys.includes(id)) petToys = petToys.filter((t) => t !== id);       // tocar de nuevo = quitar
    else {
      petToys.push(id);
      if (petToys.length > MAX_TOYS) petToys.shift();                          // el tercero reemplaza al más antiguo
    }
    updateRincon();
  });

  document.getElementById("rincon-atras").addEventListener("click", () => goTo("toque"));
  document.getElementById("rincon-continuar").addEventListener("click", () => { savedLook = { ...petAccessories }; goTo("cuarto"); });
}

function updateRincon() {
  document.querySelectorAll("#camas .cama").forEach((b) => {
    const on = b.dataset.id === petBed;
    b.classList.toggle("is-selected", on);
    b.setAttribute("aria-checked", on);
  });
  document.querySelectorAll("#juguetes .jug").forEach((b) => {
    const on = petToys.includes(b.dataset.id);
    b.classList.toggle("is-selected", on);
    b.setAttribute("aria-pressed", on);
  });
  document.getElementById("camas-count").textContent = `${petBed ? 1 : 0} de ${CAMAS.length} elegida`;
  const pill = document.getElementById("juguetes-count");
  pill.textContent = `${petToys.length} de ${MAX_TOYS} elegidos`;
  pill.classList.toggle("is-complete", petToys.length === MAX_TOYS);
  document.getElementById("rincon-continuar").disabled = !(petBed && petToys.length === MAX_TOYS);
}

function enterRincon() {
  if (!rinconBuilt) { buildRincon(); rinconBuilt = true; }
  updateRincon();
}

// =========================================================
// CAMITA Y JUGUETES EN EL CUARTO (se ven en cuarto, vestuario, comida y minijuegos)
// Lo que eligió el jugador en el paso 4 se dibuja ENCIMA del fondo, como capas sueltas.
// Por eso NO necesitas una imagen por cada combinación: el fondo del cuarto va VACÍO (sin cama ni juguetes)
// y solo haces 1 imagen por camita y 1 por juguete, todas PNG con fondo transparente:
//     assets/camas/<id>-cuarto.png        (4 camitas: nube, estelar, nido, cueva)
//     assets/juguetes/<id>.png            (4 juguetes: pelota, huesito, osito, cuerda)
// Si la imagen no existe se ve el dibujito provisional, así que nada se rompe.
// DÓNDE QUEDA CADA COSA se cambia aquí abajo, en ROOM_PROPS (valores en % de la pantalla).
// =========================================================
// Una posición por pantalla. Si pones  null  en una pantalla, ahí no se dibujan (comida y minijuegos tienen el plato / las tarjetas encima).
const ROOM_PROPS = {
  cuarto: {
    cama: { left: "1%", bottom: "27%", width: "42%" },        // la camita (esquina izquierda del piso)
    juguetes: [                                                  // el 1.º y el 2.º juguete que eligió (sobre la alfombra)
      { right: "5%", bottom: "33%", width: "13%" },
      { right: "6%", bottom: "23%", width: "13%" },
    ],
  },
  vestuario: {
    cama: { left: "3%", bottom: "20%", width: "36%" },
    juguetes: [
      { right: "20%", bottom: "21%", width: "12%" },
      { right: "6%",  bottom: "18%", width: "12%" },
    ],
  },
  comida: null,
  minijuegos: null,
};

function propImg(src, fallbackSvg, cls, pos) {
  const wrap = document.createElement("div");
  wrap.className = "prop " + cls;
  Object.assign(wrap.style, pos);
  wrap.innerHTML = fallbackSvg;                              // dibujo provisional…
  const im = new Image();
  im.alt = "";
  im.onload = () => { wrap.innerHTML = ""; wrap.appendChild(im); };   // …que se cambia por tu PNG si existe
  im.src = src;
  return wrap;
}

function renderRoomProps() {
  const cama = CAMAS.find((c) => c.id === petBed);
  ROOM_SCREENS.forEach((name) => {
    const screen = document.querySelector(`[data-screen="${name}"]`);
    let layer = screen.querySelector(".room__props");
    if (!layer) {
      layer = document.createElement("div");
      layer.className = "room__props";
      layer.setAttribute("aria-hidden", "true");
      screen.querySelector(".room__bg").after(layer);
    }
    layer.innerHTML = "";
    const pos = ROOM_PROPS[name];
    if (!pos) return;                                            // esta pantalla no lleva camita ni juguetes
    if (cama) {
      const art = `<svg viewBox="0 0 120 70" aria-hidden="true"><ellipse cx="60" cy="52" rx="56" ry="14" fill="rgba(0,0,0,.14)"/><ellipse cx="60" cy="40" rx="54" ry="26" fill="${cama.borde}"/><ellipse cx="60" cy="36" rx="42" ry="17" fill="${cama.color}"/><ellipse cx="44" cy="32" rx="12" ry="4" fill="rgba(255,255,255,.35)"/></svg>`;
      layer.appendChild(propImg(`assets/camas/${cama.id}-cuarto.png`, art, "prop--cama", pos.cama));
    }
    petToys.slice(0, pos.juguetes.length).forEach((id, i) => {
      const j = JUGUETES.find((x) => x.id === id);
      if (!j) return;
      const art = `<svg viewBox="0 0 32 32" aria-hidden="true">${j.icono}</svg>`;
      layer.appendChild(propImg(`assets/juguetes/${j.id}.png`, art, "prop--juguete", pos.juguetes[i]));
    });
  });
}

// =========================================================
// PANTALLAS 10 y 11 — CUARTO y VESTUARIO
// El cuarto es la pantalla principal; el vestuario cambia el look, la pose y toma la foto polaroid.
// PENDING: monedas, nivel y energía viven en memoria (más adelante se guardan en la cuenta del jugador).
// =========================================================
let savedLook = {};                 // look guardado (zona -> id de accesorio)
const game = { coins: 350, level: 1, xp: 0, energy: 50 };   // la energía arranca en 50 % como en el diseño
// ---- Contadores para el perfil y las tareas de galletitas ----
const stats = { pet: 0, foto: 0, comida: 0, look: 0, juego: 0, casos: 0, accs: new Set() };

// ---- Icono de galletitas ----
// Pon tu dibujo en assets/galletita.png (PNG transparente, cuadrado). Si no existe se ve el emoji 🍪.
// En el código, CK es el símbolo que se pega dentro de los textos.
const CK = '<span class="ck" aria-hidden="true"></span>';
{ const im = new Image(); im.onload = () => document.documentElement.classList.add("has-ck"); im.src = "assets/galletita.png"; }

let petPose = "sentado";
let stageSrc = null;
let roomTimers = [];

const $ = (id) => document.getElementById(id);
const stageRoom = $("stage-room"), stageVest = $("stage-vest");

// ---- Accesorios nuevos (se suman a los de la pantalla 8; allá no aparecen) ----
const EXTRA_ACC = [
  // 👉 ACCESORIO «copa»: reemplaza el dibujo por tu imagen guardando un PNG transparente (recortado al objeto) como  assets/accesorios/copa.png  — su posición/tamaño sobre cada raza se ajusta en ANCHORS
  { id: "copa", nombre: "Sombrero Copa", zona: "cabeza", ancla: "gorro", rareza: "Elegante", tag: "Nuevo", icono: "hat", fondo: "#E6E3F0", color: "#2b2b33",
    art: { viewBox: "-32 -34 64 64", pivot: [0.5, 0.84], svg: `<ellipse cx="0" cy="20" rx="30" ry="7" fill="#17171c"/><rect x="-18" y="-26" width="36" height="44" rx="4" fill="#22222a"/><ellipse cx="0" cy="-26" rx="18" ry="5" fill="#2e2e38"/><rect x="-18" y="6" width="36" height="9" fill="#D7263D"/>` } },
  // 👉 ACCESORIO «corona»: reemplaza el dibujo por tu imagen guardando un PNG transparente (recortado al objeto) como  assets/accesorios/corona.png  — su posición/tamaño sobre cada raza se ajusta en ANCHORS
  { id: "corona", nombre: "Corona Real", zona: "cabeza", ancla: "gorro", rareza: "Épico", tag: "Gratis", icono: "crown", fondo: "#FFF1C7", color: "#E5A100",
    art: { viewBox: "-28 -26 56 44", pivot: [0.5, 0.9], svg: `<path d="M-24 14 L-24 -10 L-12 2 L0 -22 L12 2 L24 -10 L24 14Z" fill="#F6BE2C" stroke="#B8860B" stroke-width="2" stroke-linejoin="round"/><circle cx="0" cy="4" r="3.5" fill="#E5383B"/><circle cx="-14" cy="8" r="2.5" fill="#2F8BEA"/><circle cx="14" cy="8" r="2.5" fill="#2F8BEA"/>` } },
  // 👉 ACCESORIO «gorra»: reemplaza el dibujo por tu imagen guardando un PNG transparente (recortado al objeto) como  assets/accesorios/gorra.png  — su posición/tamaño sobre cada raza se ajusta en ANCHORS
  { id: "gorra", nombre: "Gorra Azul", zona: "cabeza", ancla: "gorro", rareza: "Común", tag: "Gratis", icono: "cap", fondo: "#E3F0FF", color: "#2F6FD0",
    art: { viewBox: "-34 -26 72 48", pivot: [0.45, 0.8], svg: `<path d="M-26 10 Q-26 -22 0 -22 Q26 -22 26 10Z" fill="#2F6FD0"/><path d="M-4 8 Q30 3 38 13 Q20 19 -4 14Z" fill="#1E4FA3"/><circle cx="0" cy="-22" r="3" fill="#1E4FA3"/>` } },
  // 👉 ACCESORIO «corbatin»: reemplaza el dibujo por tu imagen guardando un PNG transparente (recortado al objeto) como  assets/accesorios/corbatin.png  — su posición/tamaño sobre cada raza se ajusta en ANCHORS
  { id: "corbatin", nombre: "Corbatín", zona: "cuello", ancla: "cuello", escala: 0.55, rareza: "Elegante", tag: "Nuevo", icono: "bow", fondo: "#E6E3F0", color: "#22222a",
    art: { viewBox: "-30 -16 60 32", pivot: [0.5, 0.3], svg: `<path d="M0 0 L-28 -14 L-28 14Z M0 0 L28 -14 L28 14Z" fill="#17171c"/><rect x="-6" y="-7" width="12" height="14" rx="4" fill="#2e2e38"/>` } },
];
EXTRA_ACC.forEach((a) => { ACC_BY_ID[a.id] = a; ACC_ART[a.id] = a.art; });
Object.assign(ACC_ICONS, {
  hat:   `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="7" y="4" width="10" height="12" rx="1.5"/><rect x="3" y="16" width="18" height="3" rx="1.5"/></svg>`,
  crown: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M3 18V7l5 5 4-8 4 8 5-5v11z"/></svg>`,
  cap:   `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 16a8 8 0 0 1 16 0z"/><path d="M12 16h10v2H12z"/></svg>`,
  bow:   `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 12 3 6v12zM12 12l9-6v12z"/></svg>`,
});

// Categorías: [id, emoji, nombre, accesorios]  (la de pose y la de foto no llevan accesorios)
const VEST_L = [["sombreros", "🎩", "Sombreros", ["copa", "gorro-fiesta"]], ["gafas", "🕶️", "Gafas", ["gafas-cool"]], ["realeza", "👑", "Realeza", ["corona", "collar-dorado"]], ["gorras", "🧢", "Gorras", ["gorra"]]];
const VEST_R = [["monos", "🎀", "Moños", ["lazo-rosa", "corbatin"]], ["bandanas", "🧣", "Bandanas", ["bandana-roja", "bandana-estelar"]], ["pose", "⚡", "Pose"], ["foto", "📷", "Foto"]];
const POSES = [["sentado", "🐕", "Sentado", "Relajado"], ["saludo", "👋", "Saludo", "¡Hola!"], ["brinco", "🦘", "Brinco", "Con energía"]];
let vestCat = null;

// ---- Mensajes del perrito y misiones ----
const PHRASES = ["¡Guau! ¿Me acompañas a jugar?", "¡Qué rico día para correr!", "¿Me rascas la pancita?", "¡Hoy me siento muy feliz!", "Huelo una galletita… 🦴"];
const EXTRAS = ["¡Lánzale la pelota a Max!", "Llénale su plato de agua", "Cuéntale un secreto a Max"];
const MISSIONS = [
  { txt: "Acaricia a Max 3 veces", n: 3, reward: 50, type: "pet" },
  { txt: "Estrena un look nuevo", n: 1, reward: 30, type: "look" },
  { txt: "Tómale una foto polaroid", n: 1, reward: 40, type: "foto" },
  { txt: "Dale de comer a Max", n: 1, reward: 20, type: "comida" },
];
let mIdx = 0, mProg = 0;

function toast(msg) {
  const t = $("toast");
  t.innerHTML = msg;                 // acepta el símbolo de galletitas (CK); si metes texto del jugador, pásalo por esc()
  t.classList.add("is-on");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.classList.remove("is-on"), 1800);
}

// ---- HUD y barra de abajo (se arman una vez para las dos pantallas) ----
const NAV = [["cuarto", "🏠", "Cuarto"], ["vestuario", "🧥", "Vestuario"], ["comida", "🍴", "Comida"], ["minijuegos", "🎮", "Minijuegos"]];
document.querySelectorAll("[data-hud]").forEach((h) => {
  h.innerHTML = `<div class="hud__top">
      <div class="hud__lvl" data-open="perfil" role="button" tabindex="0" aria-label="Ver el perfil de mi mascota"><img class="hud__av" alt=""><div><b>Nivel <span data-lvl>1</span> ✎</b><i class="hud__xp"><u data-xp></u></i></div></div>
      <div class="hud__coins" data-open="galletas" role="button" tabindex="0" aria-label="Mis galletitas"><span class="ck ck--hud" aria-hidden="true"></span><b data-coins>350</b><button type="button" tabindex="-1" aria-hidden="true">+</button></div>
      <button type="button" class="hud__gear" data-open="ajustes" aria-label="Ajustes">⚙</button></div>
    <div class="hud__en"><span>⚡ Energía</span><b data-enp>100%</b><i><u data-enw></u></i></div>`;
});
document.querySelectorAll("[data-nav]").forEach((n) => {
  n.innerHTML = NAV.map(([id, ico, name]) => `<button type="button" class="nav__b${id === n.dataset.nav ? " is-on" : ""}" data-go="${id}"><span>${ico}</span>${name}</button>`).join("");
});
document.addEventListener("click", (e) => { if (e.target.closest("[data-soon]")) toast("Próximamente"); });

function renderHud() {
  document.querySelectorAll("[data-lvl]").forEach((n) => (n.textContent = game.level));
  document.querySelectorAll("[data-xp]").forEach((n) => (n.style.width = game.xp + "%"));
  document.querySelectorAll("[data-coins]").forEach((n) => (n.textContent = game.coins));
  document.querySelectorAll("[data-enp]").forEach((n) => (n.textContent = game.energy + "%"));
  document.querySelectorAll("[data-enw]").forEach((n) => (n.style.width = game.energy + "%"));
}
// Subir de nivel NO muestra un aviso chiquito: guarda el nivel en una "cola" y se enseña el letrero grande (showLevelSign).
// En el juego de la pelota el letrero espera a que el jugador toque Continuar / Volver a jugar / Salir (holdLevelSign).
let levelQueue = [];
let holdLevelSign = false;
function addXp(n) {
  game.xp += n;
  if (game.xp >= 100) {
    game.xp -= 100; game.level++;
    levelQueue.push(game.level);
    if (!holdLevelSign) flushLevelSign();
  }
  renderHud();
}

// ---- Mascota con accesorios (misma lógica de la pantalla 8, pero para cualquier "escenario") ----
function makeStage(host) {
  host.insertAdjacentHTML("beforeend", '<div class="pstage__inner"><img class="pstage__img" alt="Tu mascota" draggable="false"><div class="pstage__acc"></div></div>');
  return { inner: host.querySelector(".pstage__inner"), img: host.querySelector("img"), acc: host.querySelector(".pstage__acc") };
}
const stR = makeStage(stageRoom), stV = makeStage(stageVest);

function dressStage(st, look) {
  const run = () => {
    st.acc.innerHTML = "";
    const key = stageSrc.key;
    const nw = st.img.naturalWidth || 1, nh = st.img.naturalHeight || 1;
    const scale = Math.min(FIT.w / nw, FIT.h / nh), dw = nw * scale, dh = nh * scale;
    const ox = FIT.l + (FIT.w - dw) / 2, oy = FIT.t + (FIT.h - dh) / 2;
    Object.values(look).forEach((id) => {
      const d = ACC_BY_ID[id], art = ACC_ART[id];
      const a = (ANCHORS[key] || ANCHORS.default)[d.ancla] || ANCHORS.default[d.ancla];
      const el = document.createElement("div");
      el.className = "acc-on";
      el.innerHTML = `<svg viewBox="${art.viewBox}" aria-hidden="true">${art.svg}</svg>`;
      const place = () => {
        const [px, py] = accPivot(el, d);
        el.style.left = `${(ox + (a.x / 100) * dw) * 100}%`;
        el.style.top = `${(oy + (a.y / 100) * dh) * 100}%`;
        el.style.width = `${(a.w / 100) * dw * 100 * (d.escala || 1)}%`;
        el.style.transform = `translate(${-px * 100}%, ${-py * 100}%) rotate(${a.r || 0}deg)`;
      };
      place();
      attachAccImage(el, d, place);
      st.acc.appendChild(el);
      stats.accs.add(id);
    });
  };
  if (st.img.complete && st.img.naturalWidth) run(); else st.img.onload = run;
}

async function loadStage() {
  const generic = petType === "gatito" ? "assets/gatito.png" : "assets/perrito.png";
  const s = (await loadFirstImage([petBreedId ? `assets/razas/${petBreedId}.png` : null, generic].filter(Boolean))) || generic;
  stageSrc = { src: s, key: s.split("/").pop().replace(/\.png$/, "") };
  [stR, stV, stC, stP].forEach((st) => { if (st.img.getAttribute("src") !== s) st.img.src = s; });
  document.querySelectorAll(".hud__av").forEach((a) => (a.src = s));
}

// ---- CUARTO ----
function renderMision() {
  const m = MISSIONS[mIdx % MISSIONS.length];
  $("mision").innerHTML = `<span class="mision__ic">💡</span><div><b>Misión de Hoy</b><small>${m.txt} (${mProg}/${m.n})</small></div><span class="mision__rw">+${m.reward} ${CK}</span>`;
}
function missionEvent(type) {
  stats[type] = (stats[type] || 0) + 1;   // alimenta el perfil (logros) y las tareas de galletitas
  taskEvent(type);
  const m = MISSIONS[mIdx % MISSIONS.length];
  if (m.type !== type) return;
  if (++mProg < m.n) return renderMision();
  game.coins += m.reward;
  renderHud();
  toast(`¡Misión cumplida! +${m.reward} ${CK}`);
  mProg = 0; mIdx++;
  setTimeout(renderMision, 1200);
}
function say(txt) { const b = $("bubble"); b.textContent = txt || PHRASES[Math.floor(Math.random() * PHRASES.length)]; }

function caress(e) {
  addXp(5);
  missionEvent("pet");
  say();
  const h = document.createElement("span");
  h.className = "heart";
  h.textContent = "❤️";
  h.style.left = 30 + Math.random() * 40 + "%";
  stageRoom.appendChild(h);
  setTimeout(() => h.remove(), 1000);
  stR.inner.classList.add("pose-saludo");
  setTimeout(() => stR.inner.classList.remove("pose-saludo"), 700);
}
stageRoom.addEventListener("click", caress);
$("pet-pill").addEventListener("click", caress);

function stopRoom() { roomTimers.forEach(clearInterval); roomTimers.forEach(clearTimeout); roomTimers = []; }
function showExtra() {
  const x = $("extra");
  x.textContent = `✨ ${EXTRAS[Math.floor(Math.random() * EXTRAS.length)]} +10`;
  x.hidden = false;
  roomTimers.push(setTimeout(() => (x.hidden = true), 12000));
}
$("extra").addEventListener("click", () => { $("extra").hidden = true; game.coins += 10; renderHud(); toast(`¡Misión extra! +10 ${CK}`); });

async function enterCuarto() {
  stopRoom();
  await loadStage();
  dressStage(stR, savedLook);
  stR.inner.className = "pstage__inner pose-" + petPose;
  renderHud(); renderMision(); say();
  roomTimers.push(setInterval(() => say(), 6000));
  roomTimers.push(setTimeout(showExtra, 20000));
}

// ---- VESTUARIO ----
function renderVest() {
  const btn = ([id, ico, name, ids]) => {
    const worn = ids && ids.some((i) => petAccessories[ACC_BY_ID[i].zona] === i);
    return `<button type="button" class="vb vb--${id}${vestCat === id ? " is-on" : ""}${worn ? " has-worn" : ""}" data-cat="${id}"><span>${ico}</span>${name}</button>`;
  };
  $("vcol-l").innerHTML = VEST_L.map(btn).join("");
  $("vcol-r").innerHTML = VEST_R.map(btn).join("");
  $("vest").classList.toggle("vest-open", !!vestCat && vestCat !== "foto");
  const sheet = $("sheet");
  sheet.hidden = !vestCat || vestCat === "foto";
  if (sheet.hidden) return;
  if (vestCat === "pose") {
    $("sheet-cards").innerHTML = POSES.map(([id, ico, n, s]) => `<button type="button" class="vcard${petPose === id ? " is-on" : ""}" data-pose="${id}"><span class="vcard__ic">${ico}</span><b>${n}</b><small>${s}</small></button>`).join("");
    return;
  }
  const cat = [...VEST_L, ...VEST_R].find((c) => c[0] === vestCat);
  $("sheet-cards").innerHTML = cat[3].map((id) => {
    const a = ACC_BY_ID[id], on = petAccessories[a.zona] === id;
    return `<button type="button" class="vcard${on ? " is-on" : ""}" data-acc="${id}"><em class="vcard__tag">${a.tag || "Gratis"}</em><span class="vcard__ic" style="background:${a.fondo};color:${a.color}">${ACC_ICONS[a.icono]}</span><b>${a.nombre}</b><small>${a.rareza || "Común"}</small></button>`;
  }).join("");
}
function enterVestuario() {
  petAccessories = { ...savedLook };
  vestCat = null;
  loadStage().then(() => { dressStage(stV, petAccessories); stV.inner.className = "pstage__inner pose-" + petPose; renderHud(); });
  renderVest();
}
["vcol-l", "vcol-r"].forEach((id) => $(id).addEventListener("click", (e) => {
  const b = e.target.closest(".vb");
  if (!b) return;
  if (b.dataset.cat === "foto") return openPolaroid();
  vestCat = vestCat === b.dataset.cat ? null : b.dataset.cat;   // tocar de nuevo cierra
  renderVest();
}));
$("sheet-cards").addEventListener("click", (e) => {
  const c = e.target.closest(".vcard");
  if (!c) return;
  if (c.dataset.pose) {
    petPose = c.dataset.pose;
    stV.inner.className = "pstage__inner pose-" + petPose;
  } else {
    const a = ACC_BY_ID[c.dataset.acc];
    if (petAccessories[a.zona] === a.id) delete petAccessories[a.zona]; else petAccessories[a.zona] = a.id;
    dressStage(stV, petAccessories);
  }
  renderVest();
});
$("look-reset").addEventListener("click", () => { petAccessories = { ...savedLook }; dressStage(stV, petAccessories); renderVest(); });
$("look-save").addEventListener("click", () => {
  const changed = JSON.stringify(petAccessories) !== JSON.stringify(savedLook);
  savedLook = { ...petAccessories };
  if (changed) missionEvent("look");
  toast("¡Look guardado! ✨");
  goTo("cuarto");
});

// ---- FOTO POLAROID ----
// PENDING: guardar/compartir la imagen (hoy solo se muestra en pantalla).
function openPolaroid() {
  const p = $("polaroid");
  const photo = $("pola-photo");
  photo.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "pstage pstage--pola";
  wrap.appendChild(stV.inner.cloneNode(true));
  photo.appendChild(wrap);
  $("pola-cap").textContent = `${petName || "Max"} · ${new Date().toLocaleDateString("es", { day: "numeric", month: "short", year: "numeric" })}`;
  p.hidden = false;
  p.classList.remove("go"); void p.offsetWidth; p.classList.add("go");   // reinicia el flash
  missionEvent("foto");
}
$("pola-again").addEventListener("click", openPolaroid);
$("pola-close").addEventListener("click", () => ($("polaroid").hidden = true));

// =========================================================
// PANTALLA 12 — COMIDA
// Se arrastra una comida del menú (o se toca) hasta el plato; Max come y la energía sube.
// PENDING: las comidas son emojis provisionales; si tienes dibujos, cámbialos en FOODS (campo "ico").
// =========================================================
const FOODS = [
  { id: "chuleta", n: "Chuletita",    ico: "🥩", e: 20, ring: "#E2703F" },
  { id: "alita",   n: "Alita Dorada", ico: "🍗", e: 40, ring: "#E2703F" },
  { id: "zanahoria", n: "Zanahorita", ico: "🥕", e: 25, ring: "#7A7A1A" },
  { id: "galleta", n: "Galletita",    ico: "🍪", e: 15, ring: "#E2703F" },
  { id: "caldito", n: "Caldito",      ico: "🥣", e: 30, ring: "#12803E" },
];
const stC = makeStage($("stage-comida"));
let eating = false;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
$("menu").innerHTML = FOODS.map((f) => `<div class="fd" role="listitem" data-id="${f.id}"><span class="fd__c" style="--ring:${f.ring}"><em>${f.ico}</em><b>+${f.e}%</b></span><small>${f.n}</small></div>`).join("");

async function feed(f) {
  if (eating) return;
  if (game.energy >= 100) return toast("¡Max está lleno! 😋");
  eating = true;
  const spots = [[18, 30], [34, 8], [50, 38], [64, 10], [76, 34], [42, 20], [26, 12]];
  const food = $("bowl-food");
  food.innerHTML = spots.map(([x, y]) => `<span style="left:${x}%;top:${y}%">${f.ico}</span>`).join("");
  food.classList.add("has");
  $("comida-hint").hidden = true;
  stC.inner.classList.add("comiendo");
  $("eat").hidden = false;
  const gain = Math.min(f.e, 100 - game.energy), steps = spots.length;
  const before = game.energy;
  for (let i = 1; i <= steps; i++) {
    await sleep(450);
    food.lastElementChild && food.lastElementChild.remove();
    game.energy = Math.round(before + (gain * i) / steps);
    renderHud();
  }
  food.classList.remove("has");
  stC.inner.classList.remove("comiendo");
  $("eat").hidden = true;
  $("comida-hint").hidden = false;
  addXp(3);
  toast(`¡Qué rico! +${gain}% de energía ⚡`);
  missionEvent("comida");
  eating = false;
}

// Arrastrar: en celular, un movimiento vertical arrastra la comida y uno horizontal desliza el menú
const menuEl = $("menu"), phoneEl = $("app");
let drag = null;
menuEl.addEventListener("pointerdown", (e) => {
  const it = e.target.closest(".fd");
  if (it) drag = { it, f: FOODS.find((x) => x.id === it.dataset.id), x: e.clientX, y: e.clientY, ghost: null, id: e.pointerId };
});
window.addEventListener("pointermove", (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
  if (!drag.ghost) {
    const go = e.pointerType === "mouse" ? Math.hypot(dx, dy) > 6 : dy < -8 && Math.abs(dy) > Math.abs(dx);
    if (!go) return;
    drag.ghost = document.createElement("div");
    drag.ghost.className = "ghost";
    drag.ghost.textContent = drag.f.ico;
    phoneEl.appendChild(drag.ghost);
    drag.it.classList.add("is-drag");
  }
  const r = phoneEl.getBoundingClientRect();
  drag.ghost.style.left = e.clientX - r.left + "px";
  drag.ghost.style.top = e.clientY - r.top + "px";
  const b = $("bowl").getBoundingClientRect();
  $("bowl").classList.toggle("is-over", e.clientX > b.left - 20 && e.clientX < b.right + 20 && e.clientY > b.top - 60 && e.clientY < b.bottom + 20);
});
function endDrag2(e) {
  if (!drag) return;
  const d = drag; drag = null;
  d.it.classList.remove("is-drag");
  const over = $("bowl").classList.contains("is-over");
  $("bowl").classList.remove("is-over");
  if (d.ghost) { d.ghost.remove(); if (over && e.type === "pointerup") feed(d.f); }
  else if (e.type === "pointerup") feed(d.f);          // un toque sin arrastrar también da de comer
}
window.addEventListener("pointerup", endDrag2);
window.addEventListener("pointercancel", () => { if (drag) { if (drag.ghost) drag.ghost.remove(); drag.it.classList.remove("is-drag"); drag = null; $("bowl").classList.remove("is-over"); } });

async function enterComida() {
  await loadStage();
  dressStage(stC, savedLook);
  stC.inner.className = "pstage__inner";
  renderHud();
}

// =========================================================
// PANTALLA 13 — MINIJUEGOS
// Caso detective del día (cambia cada día), 4 minijuegos (se desbloquean por nivel) y ruleta gratis diaria.
// Jugar gasta energía y da experiencia (sube de nivel). Por ahora solo funciona Atrapa Pelotas.
// PENDING: el progreso (mejor puntaje, ruleta y caso del día) vive en memoria; más adelante se guarda en la cuenta.
// =========================================================
const DAILY = [
  { t: "¡Alguien escondió el tesoro entre las margaritas!", s: "Sigue el aroma olfateando las 3 pistas secretas.", clues: ["🌼", "🍀", "🦋"], title: "Pico Sabueso" },
  { t: "¡Una galleta desapareció del jardín!", s: "Huele las 3 huellas misteriosas.", clues: ["🐾", "🍂", "🪵"], title: "Nariz Dorada" },
  { t: "¡Hay un hueso enterrado cerca del columpio!", s: "Encuentra las 3 pistas bajo las hojas.", clues: ["🦴", "🌳", "🪨"], title: "Cazahuesos" },
];
const DET_REWARD = 150;
const GAMES = [
  { id: "pelotas",   n: "Atrapa Pelotas",    d: "¡Salta y esquiva obstáculos veloces en el patio!", tag: "Reflejos", c: "g", ic: "🥎", lv: 1 },
  { id: "chef",      n: "Chef Perruno",      d: "Arma deliciosos panqueques y snacks express.",     tag: "Creativo", c: "y", ic: "🍳", lv: 2, chip: "⭐ 5 Estrellas · Recetas" },
  { id: "laberinto", n: "Laberinto Patitas", d: "Guía a Max por el laberinto mágico.",              tag: "Lógica",   c: "p", ic: "🧩", lv: 3, chip: "⏱ Nivel 7 · 01:20" },
  { id: "ritmo",     n: "Ritmo Huellitas",   d: "Toca al compás alegre de las patitas sonoras.",    tag: "Ritmo",    c: "b", ic: "🎵", lv: 4, chip: "🔥 Combo x12 · Disco" },
];
const PRIZES = [{ l: "🪙20", c: 20, w: 3 }, { l: "🪙50", c: 50, w: 2 }, { l: "🎁", acc: 1, w: 1 }, { l: "🪙10", c: 10, w: 3 }, { l: "🪙100", c: 100, w: 1 }, { l: "🪙30", c: 30, w: 3 }];
const mj = { detDone: null, spinDay: null, best: 0, bests: {} };
const dayKey = () => new Date().toISOString().slice(0, 10);
const today = () => DAILY[Math.floor(Date.now() / 864e5) % DAILY.length];
const ENERGY_COST = 10;

function renderMj() {
  const d = today(), done = mj.detDone === dayKey();
  const src = stageSrc ? stageSrc.src : "assets/perrito.png";
  $("det").innerHTML = `
    <div class="det__tags"><span class="tg tg--p">🔍 MISIÓN DETECTIVE</span><span class="tg tg--y">✦ DOBLE GALLETA</span></div>
    <!-- PENDING: ilustración del caso en assets/detective.jpg -->
    <div class="det__img"><img class="det__bg" src="assets/detective.jpg" alt="" onerror="this.remove()"><img class="det__pet" src="${src}" alt=""><span class="det__case">CASO ACTIVO</span><span class="det__lv">🔍 Max ${game.energy}%</span></div>
    <p class="det__txt">${d.t}<br>${d.s}</p>
    <div class="det__chips"><span>${CK} +${DET_REWARD} galletas</span><span>🏆 ${d.title}</span></div>
    <button type="button" class="det__go" id="det-go"${done ? " disabled" : ""}>${done ? "¡Caso resuelto! Vuelve mañana" : "¡Comenzar Investigación! →"}</button>`;
  $("games").innerHTML = GAMES.map((g) => {
    const locked = game.level < g.lv;
    const chip = g.id === "pelotas" ? `${mj.best} pts · 3 vidas` : g.chip;
    return `<article class="gm gm--${g.c}${locked ? " is-locked" : ""}">
      ${locked ? '<span class="gm__lock">🔒</span>' : ""}<span class="gm__tag">${g.tag}</span><span class="gm__ic">${g.ic}</span>
      <h3>${g.n}</h3><p>${g.d}</p><span class="gm__chip">${chip}</span>
      <button type="button" class="gm__go" data-g="${g.id}">${locked ? "🔒 Nivel " + g.lv : "¡JUGAR! ▷"}</button></article>`;
  }).join("");
  const spun = mj.spinDay === dayKey();
  $("ruleta-txt").textContent = spun ? "Vuelve mañana por tu giro" : "¡Tienes 1 giro diario listo!";
  $("ruleta-btn").disabled = spun;
}
async function enterMj() { await loadStage(); renderMj(); renderHud(); }

// ---- ventana emergente ----
const modal = $("modal");
function openModal(html, cls) { modal.className = "modal " + (cls || ""); modal.innerHTML = html; modal.hidden = false; }
function closeModal() { holdLevelSign = false; modal.hidden = true; modal.innerHTML = ""; renderMj(); renderHud(); }
modal.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeModal(); });

$("games").addEventListener("click", (e) => {
  const b = e.target.closest(".gm__go");
  if (!b) return;
  const g = GAMES.find((x) => x.id === b.dataset.g);
  if (game.level < g.lv) return toast(`Se desbloquea en el nivel ${g.lv} 🔒`);
  if (game.energy < ENERGY_COST) return toast("Max está cansado 😴 Dale de comer primero");
  const play = { pelotas: playBalls, chef: playChef, laberinto: playMaze, ritmo: playRhythm }[g.id];
  if (play) play(); else toast("Próximamente");
});

// ---- Detective: encontrar las 3 pistas ----
$("det").addEventListener("click", (e) => {
  if (!e.target.closest("#det-go")) return;
  const d = today();
  let found = 0;
  openModal(`<div class="mcard"><h3>🔍 ${d.title}</h3><p>${d.s}</p>
    <div class="clues">${d.clues.map((c) => `<button type="button" class="clue" data-c="${c}">🌿</button>`).join("")}</div>
    <p id="clue-n">Pistas: 0/3</p><button type="button" class="det__go" data-close>Salir</button></div>`);
  modal.querySelectorAll(".clue").forEach((b) => b.addEventListener("click", () => {
    if (b.classList.contains("on")) return;
    b.classList.add("on"); b.textContent = b.dataset.c;
    $("clue-n").textContent = `Pistas: ${++found}/3`;
    if (found === 3) {
      game.coins += DET_REWARD; addXp(20); mj.detDone = dayKey(); stats.casos++;
      toast(`¡Caso resuelto! +${DET_REWARD} ${CK}`);
      setTimeout(closeModal, 1100);
    }
  }));
});

// ---- Atrapa Pelotas: mueve a Max y atrapa 🎾, esquiva 🪨 ----
// ===== AJUSTES DEL PRIMER NIVEL (Atrapa Pelotas) — cámbialos aquí =====
const BALLS_LEVEL = 1;      // el nivel del jugador que se completa jugando este juego
const BALLS_GOAL = 100;     // puntos para completar el nivel (cada 🥎 vale 10 pts → 10 pelotas). PENDING: ajustar la dificultad
function playBalls() {
  startRun();
  openModal(`<div class="bg" id="bg"><div class="bg__hud"><b id="bg-s">0 pts</b><b id="bg-l">❤️❤️❤️</b></div>
    <img class="bg__max" id="bg-max" src="${stageSrc ? stageSrc.src : "assets/perrito.png"}" alt=""><button type="button" class="bg__x" data-close aria-label="Salir">✕</button></div>`, "modal--game");
  const area = $("bg"), maxEl = $("bg-max");
  let mx = 0.5, score = 0, lives = 3, last = performance.now(), spawn = 0, items = [], run = true;
  const move = (e) => { const r = area.getBoundingClientRect(); mx = Math.max(0.08, Math.min(0.92, (e.clientX - r.left) / r.width)); };
  area.addEventListener("pointermove", move); area.addEventListener("pointerdown", move);
  const end = () => { run = false; finishGame("pelotas", area, score, playBalls); };
  (function frame(now) {
    if (!run || modal.hidden) return;
    const dt = Math.min(now - last, 50); last = now;
    const H = area.clientHeight;
    maxEl.style.left = mx * 100 + "%";
    spawn -= dt;
    if (spawn <= 0) {
      spawn = Math.max(380, 800 - score * 3);
      const bad = Math.random() < 0.3, el = document.createElement("span");
      el.className = "fall"; el.textContent = bad ? "🪨" : "🥎";
      area.appendChild(el);
      items.push({ el, x: 0.08 + Math.random() * 0.84, y: -30, bad, v: 0.18 + Math.random() * 0.1 + score / 4000 });
    }
    items = items.filter((it) => {
      it.y += it.v * dt;
      it.el.style.left = it.x * 100 + "%"; it.el.style.top = it.y + "px";
      const hit = it.y > H - 140 && it.y < H - 60 && Math.abs(it.x - mx) < 0.13;
      if (hit) {
        if (it.bad) { lives--; $("bg-l").textContent = "❤️".repeat(Math.max(lives, 0)) || "💔"; area.classList.add("hurt"); setTimeout(() => area.classList.remove("hurt"), 200); }
        else { score += 10; $("bg-s").textContent = score + " pts"; }
      }
      if (hit || it.y > H) { it.el.remove(); return false; }
      return true;
    });
    if (lives <= 0) return end();
    requestAnimationFrame(frame);
  })(last);
}

// =========================================================
// JUEGOS DE LOS NIVELES 2, 3 y 4  (PENDING: diseño final; estos son provisionales y funcionan)
//   Nivel 1 → Atrapa Pelotas   Nivel 2 → Chef Perruno   Nivel 3 → Laberinto Patitas   Nivel 4 → Ritmo Huellitas
// Cada juego, al cumplir su META, completa su nivel: sube el nivel, sale el letrero grande y se desbloquea el siguiente juego.
// AQUÍ CAMBIAS: la meta de cada juego (goal) y a qué nivel pertenece (lv). Las recompensas del letrero están en LEVEL_REWARD.
// =========================================================
const GAME_RULES = {
  pelotas:   { lv: BALLS_LEVEL, goal: BALLS_GOAL },   // 100 pts = 10 pelotas (ver BALLS_GOAL arriba)
  chef:      { lv: 2, goal: 60 },                      // 60 pts = acertar la mayoría de los ingredientes
  laberinto: { lv: 3, goal: 100 },                     // 100 pts = terminar los 2 laberintos
  ritmo:     { lv: 4, goal: 100 },                     // 100 pts = repetir 5 rondas de huellitas
};

// Al empezar cualquier juego: gasta energía y retiene el letrero de nivel hasta que el jugador toque un botón del final
function startRun() {
  holdLevelSign = true;
  game.energy -= ENERGY_COST;
  renderHud();
}

// Tarjeta del final (Continuar / Volver a jugar / Salir), igual para todos los juegos
function finishGame(id, area, score, replay) {
  const rules = GAME_RULES[id];
  const coins = Math.floor(score / 10);
  game.coins += coins;
  addXp(10 + Math.min(20, Math.floor(score / 20)));
  const metaLograda = score >= rules.goal && game.level === rules.lv;   // cumplir la meta completa el nivel
  if (metaLograda) addXp(100 - game.xp);
  mj.bests[id] = Math.max(mj.bests[id] || 0, score);
  if (id === "pelotas") mj.best = mj.bests[id];
  stats.juego++; taskEvent("juego");
  area.insertAdjacentHTML("beforeend", `<div class="mcard bg__end"><h3>${metaLograda ? "¡Nivel completado!" : "¡Fin del juego!"}</h3>
    <p>${score} pts · +${coins} ${CK} · +XP</p>
    <div class="bgend__btns">
      <button type="button" class="btn-continuar bgend__main" data-end="continuar"><span class="btn-continuar__label">CONTINUAR</span></button>
      <button type="button" class="bgend__alt" data-end="otra">↻ Volver a jugar</button>
      <button type="button" class="bgend__salir" data-end="salir">Salir</button>
    </div></div>`);
  area.querySelector(".bg__end").addEventListener("click", (e) => {
    const b = e.target.closest("[data-end]");
    if (!b) return;
    const act = b.dataset.end;
    holdLevelSign = false;
    flushLevelSign(() => {                // si subió de nivel, primero se ve el letrero grande
      closeModal();
      if (act === "salir") goTo("cuarto");
      else if (act === "otra") {
        if (game.energy < ENERGY_COST) toast(`${esc(petName || PET_NAME_DEFAULT)} está cansado 😴 Dale de comer primero`);
        else replay();
      }
    });
  });
}

// Pantalla base de los juegos nuevos: barra con puntos, texto de la ronda y botón ✕
function openGameShell(cls, title, extraHtml) {
  openModal(`<div class="bg gx ${cls}" id="gx"><div class="bg__hud"><b id="gx-s">0 pts</b><b id="gx-r">${title}</b></div>
    <button type="button" class="bg__x" data-close aria-label="Salir">✕</button>${extraHtml}</div>`, "modal--game");
  return $("gx");
}
const rnd = (n) => Math.floor(Math.random() * n);
const shuffle = (arr) => arr.map((v) => [Math.random(), v]).sort((x, y) => x[0] - y[0]).map((x) => x[1]);
const vibrate = (ms) => { if (settings.vibration && navigator.vibrate) navigator.vibrate(ms); };

// Sonidos cortitos (se apagan en Ajustes). PENDING: sonidos finales
let audioCtx = null;
function beep(freq, ms = 220) {
  if (!settings.sound) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const o = audioCtx.createOscillator(), g = audioCtx.createGain();
    o.type = "sine"; o.frequency.value = freq; g.gain.value = 0.08;
    o.connect(g); g.connect(audioCtx.destination);
    o.start(); o.stop(audioCtx.currentTime + ms / 1000);
  } catch (e) { /* sin sonido */ }
}

// ---------- NIVEL 2 · CHEF PERRUNO: memoriza la receta y ponla en orden ----------
// POR INVESTIGAR: confirma que cada ingrediente sea seguro para perros antes de entregar (o cámbialos).
// Para agregar un ingrediente: copia una línea ["emoji", "nombre"].
const CHEF_ITEMS = [["🥚", "Huevo"], ["🥛", "Leche"], ["🌾", "Harina"], ["🍌", "Banana"], ["🥕", "Zanahoria"], ["🍯", "Miel"]];
const CHEF_ROUNDS = 3;        // cuántas recetas
const CHEF_RECIPE_LEN = 3;    // ingredientes por receta
const CHEF_SHOW_MS = 2600;    // cuánto tiempo se ve la receta antes de taparla
async function playChef() {
  startRun();
  const area = openGameShell("gx--chef", `Receta 1/${CHEF_ROUNDS}`, `<p class="gx__msg" id="gx-msg"></p><div class="gx__recipe" id="gx-rec"></div><div class="gx__board" id="gx-board"></div>`);
  const msg = $("gx-msg"), rec = $("gx-rec"), board = $("gx-board");
  let score = 0;
  const alive = () => area.isConnected && !modal.hidden;
  for (let r = 1; r <= CHEF_ROUNDS; r++) {
    $("gx-r").textContent = `Receta ${r}/${CHEF_ROUNDS}`;
    const recipe = shuffle(CHEF_ITEMS).slice(0, CHEF_RECIPE_LEN);
    board.innerHTML = "";
    msg.textContent = "¡Memoriza la receta! 👀";
    rec.innerHTML = recipe.map(([e]) => `<span class="gx__slot is-show">${e}</span>`).join("");
    await sleep(CHEF_SHOW_MS); if (!alive()) return;
    rec.innerHTML = recipe.map(() => `<span class="gx__slot">?</span>`).join("");
    msg.textContent = "Ahora ponlos en el mismo orden";
    board.innerHTML = shuffle(CHEF_ITEMS).map(([e, n]) => `<button type="button" class="gx__item" data-e="${e}"><em>${e}</em><small>${n}</small></button>`).join("");
    const slots = rec.querySelectorAll(".gx__slot");
    for (let i = 0; i < recipe.length; i++) {
      let missed = false, ok = false;
      while (!ok) {
        const btn = await new Promise((res) => { board.onclick = (e) => { const b = e.target.closest(".gx__item"); if (b) res(b); }; });
        if (!alive()) return;
        if (btn.dataset.e === recipe[i][0]) {
          ok = true; score += missed ? 5 : 10;                       // sin errores = 10 pts; con un intento extra = 5 pts
          slots[i].textContent = recipe[i][0]; slots[i].classList.add("is-show", "is-ok");
          beep(520 + i * 120, 160); $("gx-s").textContent = `${score} pts`;
        } else {                                                     // sin castigo: solo se sacude y se puede volver a intentar
          missed = true; msg.textContent = "¡Casi! Prueba con otro 😊"; vibrate(60);
          btn.classList.remove("is-no"); void btn.offsetWidth; btn.classList.add("is-no");
        }
      }
      msg.textContent = i < recipe.length - 1 ? "¡Muy bien! Sigue…" : "";
    }
    msg.textContent = r < CHEF_ROUNDS ? "¡Receta lista! 🥞" : "¡Todo listo, chef! 👨‍🍳";
    await sleep(1000); if (!alive()) return;
  }
  board.innerHTML = "";
  finishGame("chef", area, score, playChef);
}

// ---------- NIVEL 3 · LABERINTO PATITAS: lleva a tu mascota hasta el hueso 🦴 ----------
// Cada laberinto es una lista de filas:  #=pared  .=camino  S=salida  E=llegada (hueso).
// Puedes editarlos o agregar más (copia uno y cambia los # y . — siempre debe haber un camino de S a E).
const MAZES = [
  ["#########", "#S....#.#", "#####.#.#", "#...#.#.#", "###.#.#.#", "#...#...#", "#.#####.#", "#......E#", "#########"],
  ["#########", "#S......#", "#######.#", "#.......#", "#.#######", "#.#.....#", "#.###.#.#", "#.....#E#", "#########"],
  ["#########", "#S....#.#", "#####.#.#", "#...#...#", "###.###.#", "#.....#.#", "#.#####.#", "#......E#", "#########"],
];
const MAZE_COUNT = 2;         // cuántos laberintos se juegan seguidos (se completa el nivel con los 2)
const MAZE_BONUS_SECS = 50;   // segundos para ganar puntos extra: cada laberinto da 50 pts + los segundos que sobren de este tiempo
async function playMaze() {
  startRun();
  const area = openGameShell("gx--maze", `Laberinto 1/${MAZE_COUNT}`, `<div class="maze" id="maze"></div>
    <div class="dpad" id="dpad"><button type="button" data-d="u" aria-label="Arriba">▲</button><button type="button" data-d="l" aria-label="Izquierda">◀</button><button type="button" data-d="d" aria-label="Abajo">▼</button><button type="button" data-d="r" aria-label="Derecha">▶</button></div>`);
  const src = stageSrc ? stageSrc.src : "assets/perrito.png";
  const order = shuffle(MAZES).slice(0, MAZE_COUNT);
  let score = 0;
  const alive = () => area.isConnected && !modal.hidden;
  for (let k = 0; k < order.length; k++) {
    $("gx-r").textContent = `Laberinto ${k + 1}/${order.length}`;
    const m = order[k], H = m.length, W = m[0].length;
    let px = 0, py = 0;
    m.forEach((row, y) => { const x = row.indexOf("S"); if (x >= 0) { px = x; py = y; } });
    const mz = $("maze");
    mz.style.setProperty("--w", W);
    mz.innerHTML = m.map((row, y) => [...row].map((c, x) => `<i class="mz mz--${c === "#" ? "w" : "p"}" data-x="${x}" data-y="${y}">${c === "E" ? "🦴" : ""}</i>`).join("")).join("");
    const cell = (x, y) => mz.children[y * W + x];
    const pet = document.createElement("img");
    pet.className = "mz__pet"; pet.src = src; pet.alt = "";
    cell(px, py).appendChild(pet);
    const t0 = performance.now();
    await new Promise((done) => {
      const step = (dx, dy) => {
        const nx = px + dx, ny = py + dy;
        if (m[ny] && m[ny][nx] && m[ny][nx] !== "#") {
          cell(px, py).classList.add("mz--trail");
          px = nx; py = ny; cell(px, py).appendChild(pet); beep(300 + (px + py) * 14, 70);
          if (m[py][px] === "E") { cleanup(); done(); }
        } else vibrate(30);
      };
      const dirs = { u: [0, -1], d: [0, 1], l: [-1, 0], r: [1, 0] };
      const onPad = (e) => { const b = e.target.closest("[data-d]"); if (b) step(...dirs[b.dataset.d]); };
      const keys = { ArrowUp: "u", ArrowDown: "d", ArrowLeft: "l", ArrowRight: "r" };
      const onKey = (e) => { if (keys[e.key]) { e.preventDefault(); step(...dirs[keys[e.key]]); } };
      let sx = 0, sy = 0;
      const onDown = (e) => { sx = e.clientX; sy = e.clientY; };
      const onUp = (e) => {                                         // deslizar el dedo también mueve
        const dx = e.clientX - sx, dy = e.clientY - sy;
        if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return;
        if (Math.abs(dx) > Math.abs(dy)) step(Math.sign(dx), 0); else step(0, Math.sign(dy));
      };
      const cleanup = () => { $("dpad").removeEventListener("click", onPad); document.removeEventListener("keydown", onKey); mz.removeEventListener("pointerdown", onDown); mz.removeEventListener("pointerup", onUp); clearInterval(watch); };
      const watch = setInterval(() => { if (!alive()) { cleanup(); done(); } }, 300);
      $("dpad").addEventListener("click", onPad); document.addEventListener("keydown", onKey);
      mz.addEventListener("pointerdown", onDown); mz.addEventListener("pointerup", onUp);
    });
    if (!alive()) return;
    const secs = Math.round((performance.now() - t0) / 1000);
    score += 50 + Math.max(0, MAZE_BONUS_SECS - secs);
    $("gx-s").textContent = `${score} pts`;
    $("gx-r").textContent = "¡Lo lograste! 🦴";
    await sleep(900); if (!alive()) return;
  }
  finishGame("laberinto", area, score, playMaze);
}

// ---------- NIVEL 4 · RITMO HUELLITAS: repite la secuencia de huellitas ----------
const RITMO_NOTES = [262, 330, 392, 523];                       // sonido de cada huellita
const RITMO_COLORS = ["#FF7A59", "#FFC933", "#4CD08B", "#5AA9FF"];
const RITMO_TARGET = 5;      // rondas para completar (cada ronda correcta = 20 pts → 5 rondas = 100 pts)
const RITMO_LIVES = 3;       // errores permitidos (al fallar se repite la misma secuencia)
const RITMO_SPEED = 650;     // ms entre huellitas (más bajo = más rápido)
async function playRhythm() {
  startRun();
  const pawSvg = '<svg viewBox="0 0 64 64" aria-hidden="true"><ellipse cx="14" cy="28" rx="6" ry="8" transform="rotate(-20 14 28)"/><ellipse cx="26" cy="16" rx="6" ry="8" transform="rotate(-8 26 16)"/><ellipse cx="40" cy="16" rx="6" ry="8" transform="rotate(8 40 16)"/><ellipse cx="52" cy="28" rx="6" ry="8" transform="rotate(20 52 28)"/><path d="M32 30c-9 0-18 9-18 17 0 6 5 9 10 9 3 0 5-1 8-1s5 1 8 1c5 0 10-3 10-9 0-8-9-17-18-17z"/></svg>';
  const area = openGameShell("gx--ritmo", `Ronda 1/${RITMO_TARGET}`, `<p class="gx__msg" id="gx-msg"></p><div class="pads" id="pads">${RITMO_COLORS.map((c, i) => `<button type="button" class="pad" data-i="${i}" style="--c:${c}" aria-label="Huellita ${i + 1}">${pawSvg}</button>`).join("")}</div><div class="gx__lives" id="gx-l">${"❤️".repeat(RITMO_LIVES)}</div>`);
  const pads = $("pads"), msg = $("gx-msg");
  const alive = () => area.isConnected && !modal.hidden;
  const flash = async (i, ms = RITMO_SPEED * 0.6) => { const b = pads.children[i]; b.classList.add("is-lit"); beep(RITMO_NOTES[i], ms); await sleep(ms); b.classList.remove("is-lit"); };
  let seq = [], lives = RITMO_LIVES, rounds = 0;
  pads.classList.add("is-wait");
  while (rounds < RITMO_TARGET && lives > 0) {
    if (seq.length === rounds) seq.push(rnd(4));                 // cada ronda agrega una huellita
    $("gx-r").textContent = `Ronda ${rounds + 1}/${RITMO_TARGET}`;
    msg.textContent = "Mira con atención… 👀";
    pads.classList.add("is-wait");
    await sleep(700); if (!alive()) return;
    for (const i of seq) { await flash(i); await sleep(RITMO_SPEED * 0.4); if (!alive()) return; }
    msg.textContent = "¡Tu turno! 🐾";
    pads.classList.remove("is-wait");
    let ok = true;
    for (let n = 0; n < seq.length && ok; n++) {
      const b = await new Promise((res) => { pads.onclick = (e) => { const x = e.target.closest(".pad"); if (x) res(x); }; });
      if (!alive()) return;
      const i = +b.dataset.i;
      flash(i, 250);
      if (i !== seq[n]) { ok = false; vibrate(80); }
    }
    pads.classList.add("is-wait");
    if (ok) { rounds++; $("gx-s").textContent = `${rounds * 20} pts`; msg.textContent = "¡Perfecto! ⭐"; }
    else { lives--; $("gx-l").textContent = "❤️".repeat(lives) || "💔"; msg.textContent = lives ? "¡Casi! Lo intentamos otra vez" : ""; }
    await sleep(900); if (!alive()) return;
  }
  finishGame("ritmo", area, rounds * 20, playRhythm);
}

// =========================================================
// LETRERO DE NIVEL NUEVO  ("¡Has alcanzado un nuevo nivel!")
// Aquí cambias las recompensas y los textos del letrero. El diseño está en styles.css → "LETRERO DE NIVEL".
// =========================================================
const LEVEL_REWARD = {
  coins: 200,              // galletitas que regala cada nivel nuevo
  coinsLabel: "galletitas",
  accessory: true,         // true = regala 1 accesorio al azar (queda puesto); false = no regala accesorio
};
const LEVEL_TEXT = {
  kicker: "¡Has alcanzado un nuevo nivel!",
  rewards: "Tus recompensas",
  // {nombre} se cambia por el nombre que le puso el jugador a su mascota
  closing: "¡Sigue así! Cuidas cada vez mejor a {nombre}",
  button: "¡GENIAL!",
};

function flushLevelSign(after) {
  if (!levelQueue.length) { if (after) after(); return; }
  showLevelSign(levelQueue.shift(), () => flushLevelSign(after));
}

function showLevelSign(level, done) {
  // 1) entregar recompensas
  game.coins += LEVEL_REWARD.coins;
  let accHtml = "";
  if (LEVEL_REWARD.accessory) {
    const ids = Object.keys(ACC_BY_ID);
    const a = ACC_BY_ID[ids[Math.floor(Math.random() * ids.length)]];
    savedLook[a.zona] = a.id;
    accHtml = `<div class="lvl__r"><span class="lvl__ic" style="background:${a.fondo};color:${a.color}">${ACC_ICONS[a.icono] || "🎁"}</span><b>${a.nombre}</b><em>Nuevo</em></div>`;
  }
  const unlocked = GAMES.filter((g) => g.lv === level);   // juegos que se abren con este nivel
  const unlockHtml = unlocked.map((g) => `<div class="lvl__r"><span class="lvl__ic lvl__ic--g">${g.ic}</span><b>Desbloqueaste ${g.n}</b><em>Juego</em></div>`).join("");
  renderHud();

  // 2) dibujar el letrero
  const box = $("levelup");
  const confetti = Array.from({ length: 22 }, (_, i) =>
    `<i style="--x:${Math.round(Math.random() * 100)}%;--d:${(Math.random() * 1.2).toFixed(2)}s;--c:${["#FFB22E", "#FF6A1F", "#5CF08F", "#6FB6FF", "#FF7AB6"][i % 5]}"></i>`).join("");
  box.innerHTML = `<div class="lvl__confetti" aria-hidden="true">${confetti}</div>
    <div class="lvl__card" role="dialog" aria-label="Nuevo nivel">
      <div class="lvl__ribbon">${LEVEL_TEXT.kicker}</div>
      <div class="lvl__star" aria-hidden="true">⭐</div>
      <h2 class="lvl__title">NIVEL <b>${level}</b></h2>
      <div class="lvl__rewards">
        <h3>${LEVEL_TEXT.rewards}</h3>
        <div class="lvl__r"><span class="lvl__ic lvl__ic--c">${CK}</span><b>${LEVEL_REWARD.coins} ${LEVEL_REWARD.coinsLabel}</b><em>+${LEVEL_REWARD.coins}</em></div>
        ${accHtml}${unlockHtml}
      </div>
      <p class="lvl__msg">${LEVEL_TEXT.closing.replace("{nombre}", `<b>${esc(petName || PET_NAME_DEFAULT)}</b>`)} 🐾</p>
      <button type="button" class="btn-continuar lvl__btn"><span class="btn-continuar__label">${LEVEL_TEXT.button}</span></button>
    </div>`;
  box.hidden = false;
  box.querySelector(".lvl__btn").addEventListener("click", () => { box.hidden = true; box.innerHTML = ""; if (done) done(); }, { once: true });
}

// ---- Ruleta diaria ----
$("ruleta-btn").addEventListener("click", () => {
  const slice = 360 / PRIZES.length;
  openModal(`<div class="mcard"><h3>🎲 Ruleta</h3><div class="wheel-box"><i class="wheel-pin">▼</i>
    <div class="wheel" id="wheel">${PRIZES.map((p, i) => `<span style="transform:translate(-50%,-50%) rotate(${i * slice + slice / 2}deg) translateY(-70px)">${p.l.replace("🪙", CK)}</span>`).join("")}</div></div>
    <button type="button" class="gira" id="spin">⟳ GIRAR</button><button type="button" class="det__go" data-close id="wheel-x">Cerrar</button></div>`);
  $("spin").addEventListener("click", () => {
    $("spin").disabled = true; $("wheel-x").hidden = true;
    mj.spinDay = dayKey();
    const bag = PRIZES.flatMap((p, i) => Array(p.w).fill(i));
    const i = bag[Math.floor(Math.random() * bag.length)], p = PRIZES[i];
    $("wheel").style.transform = `rotate(${360 * 5 + 360 - (i * slice + slice / 2)}deg)`;
    setTimeout(() => {
      if (p.acc) {
        const a = ACC_BY_ID[Object.keys(ACC_BY_ID)[Math.floor(Math.random() * Object.keys(ACC_BY_ID).length)]];
        savedLook[a.zona] = a.id;
        toast(`¡Ganaste ${a.nombre}! 🎁 Ya lo lleva Max`);
      } else { game.coins += p.c; toast(`¡Ganaste ${p.c} ${CK}!`); }
      renderHud();
      $("wheel-x").hidden = false;
    }, 4300);
  });
});

// =========================================================
// PANTALLAS: AJUSTES, PERFIL DE LA MASCOTA y GALLETITAS (tareas)
// Se abren desde la barra de arriba del cuarto:  ⚙ = ajustes · tocar nivel/foto = perfil · tocar las galletitas = tareas.
// QUÉ PUEDES CAMBIAR AQUÍ:
//   settings          los ajustes con los que EMPIEZA el juego (sonido, música, vibración, notificaciones)
//   TASKS             las 3 tareas para ganar galletitas (texto, cuántas veces, premio)  ·  TASKS_BONUS = premio extra por hacer las 3
//   LOGROS            las cosas que "ha descubierto" la mascota (perfil)
//   assets/musica.mp3 si pones una canción con ese nombre, suena en bucle cuando "Música" está activada
// =========================================================
function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

// ---- Ajustes (se guardan en el navegador para que no se pierdan al recargar) ----
const SETTINGS_KEY = "vidaDeMax.ajustes";
const settings = Object.assign(
  { sound: true, music: true, vibration: true, notifications: true },
  (() => { try { return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {}; } catch (e) { return {}; } })()
);
function saveSettings() { try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (e) { /* sin guardado */ } }

let musicEl = null;
function syncMusic() {
  if (!musicEl) { musicEl = new Audio("assets/musica.mp3"); musicEl.loop = true; musicEl.volume = 0.35; }   // PENDING: canción final
  if (settings.music) musicEl.play().catch(() => {}); else musicEl.pause();                                    // si no existe el archivo, no pasa nada
}
document.addEventListener("pointerdown", () => { if (settings.music) syncMusic(); }, { once: true });          // el navegador exige un toque para dar sonido

const SETTING_ROWS = [
  ["sound", "🔊", "Sonidos", "Los sonidos de los juegos"],
  ["music", "🎵", "Música", "La música de fondo"],
  ["vibration", "📳", "Vibración", "Vibra al tocar y al jugar"],
  ["notifications", "🔔", "Notificaciones", "Avisos para volver a jugar"],
];
let resetArmed = false;
function renderAjustes() {
  resetArmed = false;
  $("ajustes-body").innerHTML = `
    <div class="pcard">
      ${SETTING_ROWS.map(([k, ic, n, d]) => `<div class="setrow"><span class="setrow__ic">${ic}</span><div><b>${n}</b><small>${d}</small></div>
        <button type="button" class="sw${settings[k] ? " is-on" : ""}" role="switch" aria-checked="${!!settings[k]}" aria-label="${n}" data-set="${k}"><i></i></button></div>`).join("")}
    </div>
    <div class="pcard">
      <button type="button" class="setbtn" data-act="logout">🚪 Cerrar sesión</button>
      <button type="button" class="setbtn" data-act="reset">🔄 Empezar de nuevo</button>
      <!-- PENDING: textos de ayuda, privacidad y créditos -->
      <button type="button" class="setbtn" data-act="ayuda">❓ Ayuda y privacidad</button>
    </div>
    <p class="panel__foot">La vida de Max · versión de prueba</p>`;
}
$("ajustes-body").addEventListener("click", (e) => {
  const sw = e.target.closest("[data-set]");
  if (sw) {
    const k = sw.dataset.set;
    settings[k] = !settings[k]; saveSettings();
    sw.classList.toggle("is-on", settings[k]); sw.setAttribute("aria-checked", settings[k]);
    if (k === "music") syncMusic();
    if (k === "sound") beep(660, 120);
    if (k === "vibration") vibrate(40);
    return;
  }
  const b = e.target.closest("[data-act]");
  if (!b) return;
  if (b.dataset.act === "logout") goTo("inicio-sesion");
  else if (b.dataset.act === "ayuda") toast("Próximamente");
  else if (b.dataset.act === "reset") {
    if (!resetArmed) { resetArmed = true; b.textContent = "¿Seguro? Toca otra vez para empezar de nuevo"; setTimeout(() => { resetArmed = false; if (b.isConnected) b.textContent = "🔄 Empezar de nuevo"; }, 4000); }
    else location.reload();                       // todo el progreso vive en memoria: recargar = empezar de cero
  }
});

// ---- Tareas para ganar galletitas (se reinician cada día) ----
// PENDING: los premios y cuántas veces son provisionales; cámbialos aquí.
const TASKS = [
  { id: "pet",    ic: "🤗", txt: "Acaricia a tu mascota",   n: 5, reward: 30 },
  { id: "comida", ic: "🍖", txt: "Dale de comer",           n: 1, reward: 20 },
  { id: "juego",  ic: "🎮", txt: "Juega un minijuego",      n: 1, reward: 40 },
];
const TASKS_BONUS = 50;      // premio extra al reclamar las 3
const dayStr = () => new Date().toISOString().slice(0, 10);
const daily = { day: dayStr(), done: {}, claimed: {}, bonus: false };
function checkDay() { if (daily.day !== dayStr()) { daily.day = dayStr(); daily.done = {}; daily.claimed = {}; daily.bonus = false; } }
function taskEvent(type) {
  checkDay();
  daily.done[type] = (daily.done[type] || 0) + 1;
  if (activeScreen() === "galletas") renderGalletas();
}
function renderGalletas() {
  checkDay();
  const nClaimed = TASKS.filter((t) => daily.claimed[t.id]).length;
  const all = nClaimed === TASKS.length;
  $("galletas-body").innerHTML = `
    <div class="pcard saldo"><span class="saldo__ck">${CK}</span><div><small>Mis galletitas</small><b>${game.coins}</b></div></div>
    <h3 class="panel__h">Completa 3 cosas hoy</h3>
    ${TASKS.map((t) => {
      const d = Math.min(daily.done[t.id] || 0, t.n), ready = d >= t.n, got = daily.claimed[t.id];
      return `<div class="pcard task${got ? " is-got" : ""}"><span class="task__ic">${t.ic}</span>
        <div class="task__txt"><b>${t.txt}</b><small>${d}/${t.n}</small><i class="hud__xp"><u style="width:${(d / t.n) * 100}%"></u></i></div>
        <button type="button" class="task__btn" data-claim="${t.id}"${ready && !got ? "" : " disabled"}>${got ? "¡Listo!" : `+${t.reward} ${CK}`}</button></div>`;
    }).join("")}
    <div class="pcard task task--bonus${daily.bonus ? " is-got" : ""}"><span class="task__ic">🎁</span>
      <div class="task__txt"><b>¡Bonus por hacer las 3!</b><small>${nClaimed}/${TASKS.length} tareas reclamadas</small></div>
      <button type="button" class="task__btn" data-claim="bonus"${all && !daily.bonus ? "" : " disabled"}>${daily.bonus ? "¡Listo!" : `+${TASKS_BONUS} ${CK}`}</button></div>
    <p class="panel__foot">Las tareas se renuevan cada día.</p>`;
}
$("galletas-body").addEventListener("click", (e) => {
  const b = e.target.closest("[data-claim]");
  if (!b || b.disabled) return;
  const id = b.dataset.claim;
  if (id === "bonus") { daily.bonus = true; game.coins += TASKS_BONUS; toast(`¡Bonus! +${TASKS_BONUS} ${CK}`); }
  else { const t = TASKS.find((x) => x.id === id); daily.claimed[id] = true; game.coins += t.reward; toast(`¡Ganaste ${t.reward} ${CK}!`); }
  vibrate(40); renderHud(); renderGalletas();
});

// ---- Perfil de la mascota: nivel, foto, datos y lo que ha descubierto ----
const stP = makeStage($("perfil-pet"));
const LOGROS = [
  { ic: "🤗", n: "Primera caricia",     d: "Acaricia a tu mascota",            ok: () => stats.pet >= 1 },
  { ic: "🍖", n: "¡A comer!",           d: "Dale de comer por primera vez",    ok: () => stats.comida >= 1 },
  { ic: "🧥", n: "Estrenando look",     d: "Guarda un look en el vestuario",   ok: () => stats.look >= 1 },
  { ic: "📸", n: "Foto polaroid",       d: "Tómale una foto",                  ok: () => stats.foto >= 1 },
  { ic: "🎮", n: "A jugar",             d: "Termina un minijuego",             ok: () => stats.juego >= 1 },
  { ic: "🔍", n: "Detective",           d: "Resuelve un caso",                 ok: () => stats.casos >= 1 },
  { ic: "🎩", n: "Coleccionista",       d: "Usa 3 accesorios distintos",       ok: () => stats.accs.size >= 3 },
  { ic: "⭐", n: "¡Nivel 2!",           d: "Llega al nivel 2",                 ok: () => game.level >= 2 },
];
async function renderPerfil() {
  await loadStage();
  dressStage(stP, savedLook);
  const nombre = petName || PET_NAME_DEFAULT;
  const breed = Object.values(BREEDS).flat().find((b) => b.id === petBreedId);
  const found = LOGROS.filter((l) => l.ok()).length;
  const jug = petToys.map((id) => (JUGUETES.find((j) => j.id === id) || {}).nombre).filter(Boolean).join(", ");
  const cama = (CAMAS.find((c) => c.id === petBed) || {}).nombre;
  $("perfil-body").innerHTML = `
    <div class="pcard perfil__id"><h3>${esc(nombre)}</h3>
      <p>${breed ? esc(breed.nombre) : (petType === "gatito" ? "Gatito" : "Perrito")} · ${petGender === "hembra" ? "Hembra" : "Macho"}</p>
      <div class="perfil__lvl"><b>Nivel ${game.level}</b><i class="hud__xp"><u style="width:${game.xp}%"></u></i><small>${game.xp}/100 XP</small></div></div>
    <div class="pcard"><h4 class="panel__h">Sus datos</h4>
      <!-- POR INVESTIGAR: energía, tamaño y rasgo salen de la lista BREEDS (app.js), que es provisional -->
      <div class="datos">
        <div><small>Rasgo</small><b>${breed ? esc(breed.rasgo) : "—"}</b></div>
        <div><small>Energía</small><b>${breed ? esc(breed.energia) : "—"}</b></div>
        <div><small>Tamaño</small><b>${breed ? esc(breed.tamano) : "—"}</b></div>
        <div><small>Su camita</small><b>${cama ? esc(cama) : "—"}</b></div>
        <div class="datos__wide"><small>Sus juguetes</small><b>${jug ? esc(jug) : "—"}</b></div>
      </div></div>
    <div class="pcard"><h4 class="panel__h">Lo que hemos hecho juntos</h4>
      <div class="cuentas">
        <div><b>${stats.pet}</b><small>caricias</small></div><div><b>${stats.comida}</b><small>comidas</small></div>
        <div><b>${stats.foto}</b><small>fotos</small></div><div><b>${stats.juego}</b><small>juegos</small></div>
        <div><b>${stats.look}</b><small>looks</small></div></div></div>
    <div class="pcard"><h4 class="panel__h">Lo que ha descubierto · ${found}/${LOGROS.length}</h4>
      <div class="logros">${LOGROS.map((l) => `<div class="logro${l.ok() ? " is-on" : ""}"><span>${l.ok() ? l.ic : "🔒"}</span><b>${l.n}</b><small>${l.d}</small></div>`).join("")}</div></div>`;
}

// ---- Abrir y cerrar estas pantallas ----
const PANELS = ["ajustes", "perfil", "galletas"];
let panelFrom = "cuarto";
function activeScreen() { const s = document.querySelector(".screen.is-active"); return s ? s.dataset.screen : null; }
function openPanel(name) { const cur = activeScreen(); if (cur && !PANELS.includes(cur)) panelFrom = cur; goTo(name); }
document.addEventListener("click", (e) => {
  const o = e.target.closest("[data-open]");
  if (o) return openPanel(o.dataset.open);
  if (e.target.closest("[data-back]")) goTo(panelFrom);
});
document.addEventListener("keydown", (e) => {
  if ((e.key === "Enter" || e.key === " ") && e.target.matches("[data-open][role=button]")) { e.preventDefault(); openPanel(e.target.dataset.open); }
});
