/**
 * Kartribe · punto de entrada
 * Solo importa e inicializa los módulos de comportamiento.
 */

import { initHeader } from "./modules/header.js";
import { initMenu } from "./modules/menu.js";
import { initScrollspy } from "./modules/scrollspy.js";

function init() {
  initHeader();
  initMenu();
  initScrollspy();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
