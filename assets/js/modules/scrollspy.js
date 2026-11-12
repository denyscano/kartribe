/**
 * Kartribe · scrollspy
 * Marca el enlace activo del menú según la sección visible.
 * Se activa automáticamente cuando existan las secciones reservadas.
 */

export function initScrollspy() {
  const links = Array.from(document.querySelectorAll('.site-nav__link[href^="#"]'));

  if (links.length === 0) return;

  const linksById = new Map();
  const sections = [];

  links.forEach(function (link) {
    const id = link.getAttribute("href").slice(1);

    if (!id || linksById.has(id)) return;

    const section = document.getElementById(id);

    if (!section) return;

    linksById.set(id, link);
    sections.push(section);
  });

  if (sections.length === 0) return;

  function setActive(id) {
    linksById.forEach(function (link, key) {
      const isActive = key === id;

      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  const visible = new Set();

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          visible.add(entry.target.id);
        } else {
          visible.delete(entry.target.id);
        }
      });

      let currentId = "";

      for (const section of sections) {
        if (visible.has(section.id)) {
          currentId = section.id;
          break;
        }
      }

      if (!currentId) {
        const header = document.querySelector("[data-site-header]");
        const offset = (header ? header.offsetHeight : 64) + 80;
        const scrollPosition = window.scrollY + offset;

        for (const section of sections) {
          if (section.offsetTop <= scrollPosition) {
            currentId = section.id;
          }
        }
      }

      setActive(currentId);
    },
    {
      rootMargin: "-30% 0px -55% 0px",
      threshold: 0
    }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
}
