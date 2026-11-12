/**
 * Kartribe · año dinámico del copyright.
 */

export function initFooter() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}
