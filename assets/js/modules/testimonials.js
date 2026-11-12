/**
 * Kartribe · envío local de opiniones
 */

export function initTestimonials() {
  const form = document.querySelector("[data-opiniones-form]");
  const list = document.querySelector("[data-opiniones-list]");
  const status = document.querySelector("[data-opiniones-status]");

  if (!form || !list || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const nombre = String(formData.get("nombre") || "").trim();
    const opinion = String(formData.get("opinion") || "").trim();
    const valoracion = Number(formData.get("valoracion"));

    if (!nombre || !opinion) {
      status.textContent = "Escribe tu nombre y tu opinión antes de publicar.";
      return;
    }

    const item = document.createElement("li");
    item.className = "opiniones__item";

    const rating = document.createElement("p");
    rating.className = "opiniones__item-rating";
    rating.setAttribute("aria-label", `${valoracion} de 5 estrellas`);
    rating.textContent = `${"★".repeat(valoracion)}${"☆".repeat(5 - valoracion)}`;

    const author = document.createElement("h3");
    author.className = "opiniones__item-name";
    author.textContent = nombre;

    const message = document.createElement("p");
    message.className = "opiniones__item-text";
    message.textContent = opinion;

    item.append(rating, author, message);
    list.prepend(item);
    list.hidden = false;
    form.reset();
    status.textContent = "Tu opinión se ha publicado correctamente.";
  });
}
