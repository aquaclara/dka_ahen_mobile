/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

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
    const overlay = document.querySelector('.overlay');
    const fab = document.querySelector('.fab');
    const caption = document.querySelector('.caption');
    if (iframe === null || overlay === null || fab === null || caption === null) {
        console.warn('Element not found');
        return;
    }
    let loadCount = 0;
    iframe.addEventListener('load', (event) => {
        console.log('Loaded');
        if (loadCount++ != 1)
            return;
        onEnterMain(iframe, fab, caption);
    });
    overlay.addEventListener('click', (event) => {
        iframe.src = 'https://dka-hero.me/top.html';
        overlay.remove();
        onEnterMain(iframe, fab, caption);
    });
}
document.addEventListener('DOMContentLoaded', main);

/******/ })()
;