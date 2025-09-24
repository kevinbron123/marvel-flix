// Elementos clave del DOM
const $personajes = document.getElementById("personajes");
const $loader = document.getElementById("loader");
const $error = document.getElementById("error");

// Claves de la API (Mantener ocultas en un entorno real, pero aquí están para la demo)
const PUBLIC_KEY = "1fae034eb46827869d1d04f9a7f6984a";
const TS = 1;
const HASH = "cc81907b76b3ae78987499bb44584f36";
const endpoint = `https://gateway.marvel.com/v1/public/characters?ts=${TS}&apikey=${PUBLIC_KEY}&hash=${HASH}`;

/**
 * Función para cargar los personajes de Marvel.
 * Usa async/await para una sintaxis más limpia.
 */
async function cargarPersonajes() {
    // 1. Mostrar estado de carga y ocultar el resto
    $loader.classList.remove("hidden");
    $personajes.classList.add("hidden");
    $error.classList.add("hidden");

    try {
        const res = await fetch(endpoint);
        
        // Manejo de errores de HTTP (ej. 404, 500)
        if (!res.ok) {
            throw new Error(`API error: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();
        const personajes = data.data.results;
        
        // 2. Ocultar loader y mostrar resultados
        $loader.classList.add("hidden");
        $personajes.classList.remove("hidden");

        // 3. Renderizar cada tarjeta de personaje
        personajes.forEach(personaje => {
            const $col = document.createElement("div");
            $col.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "mb-4");

            // Generar el HTML de la tarjeta (usa template literals)
            $col.innerHTML = `
                <div class="card h-100 bg-dark text-white shadow-sm personaje-card">
                  <img src="${personaje.thumbnail.path}.${personaje.thumbnail.extension}"
                       class="card-img-top"
                       alt="${personaje.name}">
                  <div class="card-body text-center">
                    <h5 class="card-title">${personaje.name}</h5>
                  </div>
                </div>
            `;

            // 4. Agregar la lógica de clic para la navegación
            $col.onclick = () => {
                // Guardar todo el objeto del personaje en LocalStorage antes de navegar
                localStorage.setItem("personaje", JSON.stringify(personaje));
                window.location.href = "detalle.html";
            };

            $personajes.appendChild($col);
        });

    } catch (err) {
        // 5. Mostrar mensaje de error si algo falla
        $loader.classList.add("hidden");
        $error.classList.remove("hidden");
        console.error("Error al cargar personajes:", err);
    }
}

// Iniciar la carga de datos al cargar el script
cargarPersonajes();