/**
 * Kartribe · estado del header
 * Añade una clase al hacer scroll para reforzar el cristal.
 */

export function initHeader() {
  const header = document.querySelector("[data-site-header]");

  if (!header) return;

  let ticking = false;

  function update() {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
}
