/**
 * Kartribe · galería (#galeria)
 * Carrusel por grupos sobre scroll-snap nativo:
 * - Deslizar con el dedo: lo resuelve el propio scroll del navegador.
 * - Flechas laterales y puntos: saltan de grupo en grupo.
 * - Teclado: ← / → cambian de grupo, Inicio / Fin van al primero / último.
 * El nº de fotos por grupo se lee de la variable CSS --galeria-per-view.
 */

const ROOT_SELECTOR = "[data-galeria]";

export function initGaleria() {
  document.querySelectorAll(ROOT_SELECTOR).forEach(setupGaleria);
}

function setupGaleria(root) {
  if (root.dataset.galeriaReady === "true") return;

  const viewport = root.querySelector("[data-galeria-viewport]");
  const slides = Array.from(root.querySelectorAll("[data-galeria-slide]"));
  const prevButton = root.querySelector("[data-galeria-prev]");
  const nextButton = root.querySelector("[data-galeria-next]");
  const dotsContainer = root.querySelector("[data-galeria-dots]");
  const status = root.querySelector("[data-galeria-status]");

  if (!viewport || slides.length === 0) return;

  root.dataset.galeriaReady = "true";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let perView = 1;
  let pageCount = 1;
  let currentPage = 0;
  let dots = [];
  let ticking = false;
  let pendingOffset = null;
  let pendingTimer = 0;

  function readPerView() {
    const value = parseInt(getComputedStyle(root).getPropertyValue("--galeria-per-view"), 10);
    return Number.isFinite(value) && value > 0 ? value : 1;
  }

  function getMaxScroll() {
    return viewport.scrollWidth - viewport.clientWidth;
  }

  function getStep() {
    return slides.length > 1
      ? slides[1].offsetLeft - slides[0].offsetLeft
      : viewport.clientWidth;
  }

  function getPageOffset(page) {
    const firstIndex = Math.min(page * perView, slides.length - 1);
    const offset = slides[firstIndex].offsetLeft - slides[0].offsetLeft;
    return Math.min(offset, getMaxScroll());
  }

  function getPageFromScroll() {
    if (viewport.scrollLeft >= getMaxScroll() - 2) return pageCount - 1;

    const index = Math.round(viewport.scrollLeft / getStep());
    return Math.min(Math.round(index / perView), pageCount - 1);
  }

  function buildDots() {
    if (!dotsContainer) return;

    dotsContainer.replaceChildren();
    dots = [];

    for (let page = 0; page < pageCount; page += 1) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "galeria__dot";
      dot.setAttribute("aria-label", `Ir al grupo ${page + 1} de ${pageCount}`);
      dot.addEventListener("click", function () {
        goToPage(page);
      });
      dotsContainer.appendChild(dot);
      dots.push(dot);
    }

    dotsContainer.hidden = pageCount < 2;
  }

  function updateStatus() {
    if (!status) return;

    const first = Math.min(currentPage * perView, slides.length - perView) + 1;
    const last = Math.min(first + perView - 1, slides.length);
    const range = first === last ? `Foto ${first}` : `Fotos ${first} a ${last}`;

    status.textContent = `${range} de ${slides.length}`;
  }

  function updateControls() {
    const scrollLeft = viewport.scrollLeft;
    const maxScroll = getMaxScroll();

    if (prevButton) prevButton.setAttribute("aria-disabled", String(scrollLeft <= 1));
    if (nextButton) nextButton.setAttribute("aria-disabled", String(scrollLeft >= maxScroll - 1));

    dots.forEach(function (dot, page) {
      const isActive = page === currentPage;

      dot.classList.toggle("is-active", isActive);

      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
  }

  function goToPage(page) {
    const target = Math.max(0, Math.min(page, pageCount - 1));
    const offset = getPageOffset(target);

    // Mientras dura el scroll suave no recalculamos el grupo activo,
    // para que los puntos intermedios no parpadeen.
    pendingOffset = offset;
    window.clearTimeout(pendingTimer);
    pendingTimer = window.setTimeout(function () {
      pendingOffset = null;
      syncFromScroll();
    }, 800);

    viewport.scrollTo({
      left: offset,
      behavior: reducedMotion.matches ? "auto" : "smooth"
    });

    if (target !== currentPage) {
      currentPage = target;
      updateStatus();
    }

    updateControls();
  }

  function syncFromScroll() {
    ticking = false;

    if (pendingOffset !== null) {
      if (Math.abs(viewport.scrollLeft - pendingOffset) > 2) {
        updateControls();
        return;
      }

      pendingOffset = null;
      window.clearTimeout(pendingTimer);
    }

    const page = getPageFromScroll();

    if (page !== currentPage) {
      currentPage = page;
      updateStatus();
    }

    updateControls();
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(syncFromScroll);
  }

  function layout() {
    const nextPerView = readPerView();
    const nextPageCount = Math.max(1, Math.ceil(slides.length / nextPerView));
    const firstVisible = currentPage * perView;

    perView = nextPerView;

    if (nextPageCount !== pageCount || dots.length === 0) {
      pageCount = nextPageCount;
      buildDots();
    }

    currentPage = Math.min(Math.floor(firstVisible / perView), pageCount - 1);
    viewport.scrollTo({ left: getPageOffset(currentPage), behavior: "auto" });
    updateStatus();
    updateControls();
  }

  function onKeydown(event) {
    if (event.altKey || event.ctrlKey || event.metaKey) return;

    const keyActions = {
      ArrowLeft: currentPage - 1,
      ArrowRight: currentPage + 1,
      Home: 0,
      End: pageCount - 1
    };

    if (!(event.key in keyActions)) return;

    event.preventDefault();
    goToPage(keyActions[event.key]);
  }

  if (prevButton) {
    prevButton.addEventListener("click", function () {
      goToPage(currentPage - 1);
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", function () {
      goToPage(currentPage + 1);
    });
  }

  viewport.addEventListener("scroll", onScroll, { passive: true });
  viewport.addEventListener("scrollend", syncFromScroll);
  root.addEventListener("keydown", onKeydown);

  if (typeof ResizeObserver === "function") {
    new ResizeObserver(function () {
      window.requestAnimationFrame(layout);
    }).observe(viewport);
  } else {
    window.addEventListener("resize", layout);
  }

  if (prevButton) prevButton.hidden = false;
  if (nextButton) nextButton.hidden = false;

  layout();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGaleria);
} else {
  initGaleria();
}
