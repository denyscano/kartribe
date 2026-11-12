/**
 * Kartribe · navegación del slider de circuitos del hero.
 */

export function initTrackSlider() {
  const slider = document.querySelector("[data-track-slider]");
  if (!slider) return;

  const slides = [...slider.querySelectorAll("[data-track-slide]")];
  const current = slider.querySelector("[data-track-current]");
  if (slides.length < 2 || !current) return;

  let activeIndex = 0;
  let touchStartX = null;

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.hidden = !isActive;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    slider.querySelectorAll("[data-track-go]").forEach((dot, dotIndex) => {
      const isActive = dotIndex === activeIndex;
      dot.classList.toggle("is-active", isActive);
      dot.setAttribute("aria-current", String(isActive));
    });

    current.textContent = String(activeIndex + 1).padStart(2, "0");
  }

  slider.addEventListener("click", (event) => {
    const target = event.target.closest("[data-track-go], [data-track-prev], [data-track-next]");
    if (!target || !slider.contains(target)) return;

    if (target.hasAttribute("data-track-go")) {
      showSlide(Number(target.dataset.trackGo));
    } else if (target.hasAttribute("data-track-prev")) {
      showSlide(activeIndex - 1);
    } else {
      showSlide(activeIndex + 1);
    }
  });

  slider.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(activeIndex - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(activeIndex + 1);
    }
  });

  slider.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  slider.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) < 40) return;
    showSlide(activeIndex + (distance < 0 ? 1 : -1));
  }, { passive: true });

  showSlide(0);
}
