// Selección de elementos del DOM
const contenedor = document.getElementById("detalle");

// Claves de la API (las mismas que usás en script.js)
const PUBLIC_KEY = "1fae034eb46827869d1d04f9a7f6984a";
const TS = 1;
const HASH = "cc81907b76b3ae78987499bb44584f36";

// Descripciones personalizadas por nombre
const descripciones = {
  "3-D Man": "Héroe con visión tridimensional y fuerza sobrehumana.",
  "A-Bomb (HAS)": "Rick Jones transformado en una criatura azul con fuerza descomunal.",
  "A.I.M.": "Organización de científicos dedicados a la creación de armas avanzadas.",
  "Aaron Stack": "También conocido como Machine Man, un androide con emociones humanas.",
  "Abomination (Emil Blonsky)": "Ex-agente que se convirtió en un monstruo tras exponerse a radiación gamma.",
  "Abomination (Ultimate)": "Versión alternativa y más poderosa del villano Abominación.",
  "Absorbing Man": "Villano capaz de absorber las propiedades de cualquier material que toca.",
  "Abyss": "Ser interdimensional con habilidades desconocidas.",
  "Abyss (Age of Apocalypse)": "Versión alternativa de Abyss en la línea temporal de Age of Apocalypse.",
  "Adam Destine": "Miembro de la familia Destine con poderes místicos heredados.",
  "Adam Warlock": "Ser artificial con increíbles poderes cósmicos, protector del universo.",
  "Aegis (Trey Rollins)": "Joven con una armadura mística que le otorga fuerza y resistencia.",
  "Aero (Aero)": "Heroína china con la capacidad de controlar el aire y los vientos.",
  "Agatha Harkness": "Bruja milenaria experta en magia, aliada y enemiga de los Vengadores.",
  "Agent Brand": "Agente de S.W.O.R.D., especializada en amenazas extraterrestres.",
  "Agent X (Nijo)": "Mercenario con habilidades regenerativas, similar a Deadpool.",
  "Agent Zero": "Mutante con inmunidad a olores y vibraciones, experto francotirador.",
  "Agents of Atlas": "Grupo de héroes clásicos reunidos para combatir amenazas ocultas.",
  "Aginar": "Miembro de los Eternos, con fuerza y longevidad sobrehumana.",
  "Air-Walker (Gabriel Lan)": "Antiguo heraldo de Galactus con poderes cósmicos avanzados."
};

// 🔹 Función auxiliar para renderizar el detalle
function renderDetalle(personaje) {
  const descripcion = descripciones[personaje.name] || personaje.description || "Sin descripción disponible.";
  const comics = personaje.comics?.available || 0;
  const series = personaje.series?.available || 0;
  const stories = personaje.stories?.available || 0;
  const events = personaje.events?.available || 0;

  contenedor.innerHTML = `
    <div class="detalle-container d-flex flex-wrap justify-content-center align-items-center gap-4 p-4">
      <div class="detalle-personaje text-center text-md-start">
        <img src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}"
             alt="${personaje.name}"
             class="img-fluid rounded shadow-lg mb-3 mb-md-0" style="max-width: 300px; height: auto;"/>
      </div>
      <div class="detalle-personaje flex-grow-1">
        <h2 class="text-danger mb-3">${personaje.name}</h2>
        <p class="lead">${descripcion}</p>
        <ul class="list-unstyled mt-4">
          <li><strong>Cómics:</strong> ${comics}</li>
          <li><strong>Series:</strong> ${series}</li>
          <li><strong>Historias:</strong> ${stories}</li>
          <li><strong>Eventos:</strong> ${events}</li>
        </ul>
      </div>
    </div>
    <button id="volver" class="btn btn-primary mt-4">← Volver a la lista</button>
  `;

  document.getElementById("volver").addEventListener("click", () => {
    window.location.href = "index.html";
  });
}

// 🔹 Primero revisamos si la URL trae un id
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (id) {
  // Cargar personaje por ID desde la API
  fetch(`https://gateway.marvel.com/v1/public/characters/${id}?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${HASH}`)
    .then(res => {
      if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
      return res.json();
    })
    .then(data => {
      if (data.data.results.length > 0) {
        renderDetalle(data.data.results[0]);
      } else {
        contenedor.innerHTML = `<p class="lead text-warning">No se encontró el personaje.</p>`;
      }
    })
    .catch(err => {
      console.error("Error al cargar personaje:", err);
      contenedor.innerHTML = `<p class="lead text-danger">Error al cargar el personaje. Intenta de nuevo.</p>`;
    });
} else {
  // Si no hay id en la URL, usamos localStorage como antes
  const personaje = JSON.parse(localStorage.getItem("personaje"));
  if (personaje) {
    renderDetalle(personaje);
  } else {
    contenedor.innerHTML = `
      <div class="text-center p-5">
        <p class="lead text-warning">No hay personaje seleccionado. Por favor, elige uno de la lista.</p>
        <button id="volver" class="btn btn-primary mt-3">← Volver a la lista</button>
      </div>
    `;
    document.getElementById("volver").addEventListener("click", () => {
      window.location.href = "index.html";
    });
  }
}