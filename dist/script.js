/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

var _a;
const CLASS_LOADED = 'loaded';
const CLASS_MENU_OPENED = 'menu-opened';
let menuIsVisible = false;
function collapseMenu() {
    menuIsVisible = false;
    document.body.classList.remove(CLASS_MENU_OPENED);
}
function showMenu() {
    menuIsVisible = true;
    document.body.classList.add(CLASS_MENU_OPENED);
}
function toggleMenu() {
    if (menuIsVisible)
        collapseMenu();
    else
        showMenu();
}
function onEnterMain(iframe, fab, caption) {
    console.log('Entered');
    document.body.classList.add(CLASS_LOADED);
    iframe.classList.remove(CLASS_MENU_OPENED);
    fab.addEventListener('click', (event) => {
        toggleMenu();
    });
    collapseMenu();
}
function main() {
    const iframe = document.querySelector('.frame');
    const fab = document.querySelector('.fab');
    const caption = document.querySelector('.caption');
    if (iframe === null || fab === null || caption === null) {
        console.warn('Element not found');
        return;
    }
    let loadCount = 0;
    iframe.addEventListener('load', (event) => {
        console.log('Loaded');
        if (loadCount++ < 1)
            return;
        onEnterMain(iframe, fab, caption);
    });
    caption.addEventListener('click', (event) => {
        if (loadCount > 1) {
            onEnterMain(iframe, fab, caption);
        }
    });
}
(_a = navigator === null || navigator === void 0 ? void 0 : navigator.serviceWorker) === null || _a === void 0 ? void 0 : _a.register('/dka_ahen_mobile/dist/sw.js');
document.addEventListener('DOMContentLoaded', main);

/******/ })()
;