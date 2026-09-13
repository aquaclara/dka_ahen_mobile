/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

const CLASS_LOADED = 'loaded';
const CLASS_MENU_OPENED = 'menu-opened';
function collapseMenu() {
    document.body.classList.remove(CLASS_MENU_OPENED);
}
function toggleMenu() {
    document.body.classList.toggle(CLASS_MENU_OPENED);
}
function onEnterMain() {
    document.body.classList.add(CLASS_LOADED);
    collapseMenu();
}
function addEventListeners(iframe, overlay, fab) {
    let loadCount = 0;
    iframe.addEventListener('load', () => {
        if (loadCount++ === 0)
            return;
        onEnterMain();
    });
    fab.addEventListener('click', () => {
        toggleMenu();
    });
    overlay.addEventListener('click', () => {
        iframe.src = 'https://dka-hero.me/top.html';
        onEnterMain();
        overlay.remove();
    });
}
function main() {
    const iframe = document.querySelector('.frame');
    const overlay = document.querySelector('.overlay');
    const fab = document.querySelector('.fab');
    if (iframe === null || overlay === null || fab === null) {
        console.warn('Element not found');
        return;
    }
    addEventListeners(iframe, overlay, fab);
}
document.addEventListener('DOMContentLoaded', main);

/******/ })()
;