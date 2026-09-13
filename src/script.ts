import './styles.scss';

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

function addEventListeners(
  iframe: HTMLIFrameElement,
  overlay: HTMLDivElement,
  fab: HTMLAnchorElement,
) {
  let loadCount = 0;
  iframe.addEventListener('load', () => {
    if (loadCount++ === 0) return;
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
  const iframe: HTMLIFrameElement | null = document.querySelector('.frame');
  const overlay: HTMLDivElement | null = document.querySelector('.overlay');
  const fab: HTMLAnchorElement | null = document.querySelector('.fab');

  if (iframe === null || overlay === null || fab === null) {
    console.warn('Element not found');
    return;
  }

  addEventListeners(iframe, overlay, fab);
}

document.addEventListener('DOMContentLoaded', main);
