/**
 * Kartribe · menú de navegación
 * Panel móvil accesible: apertura/cierre, Escape, overlay,
 * bloqueo de scroll, trampa de foco y cierre al cambiar a desktop.
 */

const DESKTOP_QUERY = "(min-width: 768px)";

export function initMenu() {
  const header = document.querySelector("[data-site-header]");
  const toggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-site-nav]");
  const overlay = document.querySelector("[data-menu-overlay]");

  if (!header || !toggle || !nav || !overlay) return;

  const desktop = window.matchMedia(DESKTOP_QUERY);
  let isOpen = false;
  let lastFocused = null;

  function setExpanded(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }

  function openMenu() {
    if (isOpen || desktop.matches) return;

    isOpen = true;
    lastFocused = document.activeElement;

    nav.classList.add("is-open");
    overlay.classList.add("is-open");
    document.documentElement.classList.add("has-menu-open");
    header.classList.add("is-menu-open");
    setExpanded(true);

    const firstLink = nav.querySelector(".site-nav__link, .site-nav__cta");

    window.requestAnimationFrame(function () {
      if (firstLink) firstLink.focus({ preventScroll: true });
    });
  }

  function closeMenu(options) {
    const restoreFocus = !options || options.restoreFocus !== false;

    if (!isOpen) return;

    isOpen = false;

    nav.classList.remove("is-open");
    overlay.classList.remove("is-open");
    document.documentElement.classList.remove("has-menu-open");
    header.classList.remove("is-menu-open");
    setExpanded(false);

    if (restoreFocus) {
      const target = lastFocused instanceof HTMLElement && lastFocused !== document.body
        ? lastFocused
        : toggle;

      target.focus({ preventScroll: true });
    }
  }

  function getFocusable() {
    return [
      toggle,
      ...nav.querySelectorAll("a[href], button:not([disabled])")
    ];
  }

  toggle.addEventListener("click", function () {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener("click", function () {
    closeMenu();
  });

  nav.addEventListener("click", function (event) {
    const link = event.target.closest("a");

    if (link && !desktop.matches) {
      closeMenu({ restoreFocus: false });
    }
  });

  document.addEventListener("keydown", function (event) {
    if (!isOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== "Tab") return;

    const focusable = getFocusable();

    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus({ preventScroll: true });
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus({ preventScroll: true });
    }
  });

  function onBreakpointChange(event) {
    if (event.matches) {
      closeMenu({ restoreFocus: false });
    }
  }

  if (typeof desktop.addEventListener === "function") {
    desktop.addEventListener("change", onBreakpointChange);
  } else if (typeof desktop.addListener === "function") {
    desktop.addListener(onBreakpointChange);
  }
}
