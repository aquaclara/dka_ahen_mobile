/******/ (() => { // webpackBootstrap
/******/ 	"use strict";


const CLASS_LOADED = "loaded";
const CLASS_MENU_OPENED = "menu-opened";
function collapseMenu(fab) {
  document.body.classList.remove(CLASS_MENU_OPENED);
  fab.setAttribute("aria-expanded", "false");
}
function toggleMenu(fab) {
  const opened = document.body.classList.toggle(CLASS_MENU_OPENED);
  fab.setAttribute("aria-expanded", String(opened));
}
function onEnterMain(fab) {
  document.body.classList.add(CLASS_LOADED);
  collapseMenu(fab);
}
function addEventListeners(iframe, overlay, fab) {
  let loadCount = 0;
  iframe.addEventListener("load", () => {
    if (loadCount++ === 0) return;
    onEnterMain(fab);
  });
  fab.addEventListener("click", () => {
    toggleMenu(fab);
  });
  overlay.addEventListener("click", () => {
    iframe.src = "https://dka-hero.me/top.html";
    onEnterMain(fab);
    overlay.remove();
  });
}
function main() {
  const iframe = document.querySelector(".frame");
  const overlay = document.querySelector(".overlay");
  const fab = document.querySelector(".fab");
  if (iframe === null || overlay === null || fab === null) {
    console.warn("Element not found");
    return;
  }
  addEventListeners(iframe, overlay, fab);
}
document.addEventListener("DOMContentLoaded", main);

/******/ })()
;