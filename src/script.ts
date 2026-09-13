const CLASS_LOADED = 'loaded';
const CLASS_MENU_OPENED = 'menu-opened';

function collapseMenu(fab: HTMLButtonElement) {
  document.body.classList.remove(CLASS_MENU_OPENED);
  fab.setAttribute('aria-expanded', 'false');
}

function toggleMenu(fab: HTMLButtonElement) {
  const opened = document.body.classList.toggle(CLASS_MENU_OPENED);
  fab.setAttribute('aria-expanded', String(opened));
}

function onEnterMain(fab: HTMLButtonElement) {
  document.body.classList.add(CLASS_LOADED);
  collapseMenu(fab);
}

function addEventListeners(
  iframe: HTMLIFrameElement,
  overlay: HTMLButtonElement,
  fab: HTMLButtonElement,
) {
  let loadCount = 0;
  iframe.addEventListener('load', () => {
    if (loadCount++ === 0) return;
    onEnterMain(fab);
  });

  fab.addEventListener('click', () => {
    toggleMenu(fab);
  });

  overlay.addEventListener('click', () => {
    iframe.src = 'https://dka-hero.me/top.html';
    onEnterMain(fab);
    overlay.remove();
  });
}

function main() {
  const iframe: HTMLIFrameElement | null = document.querySelector('.frame');
  const overlay: HTMLButtonElement | null = document.querySelector('.overlay');
  const fab: HTMLButtonElement | null = document.querySelector('.fab');

  if (iframe === null || overlay === null || fab === null) {
    console.warn('Element not found');
    return;
  }

  addEventListeners(iframe, overlay, fab);
}

document.addEventListener('DOMContentLoaded', main);
