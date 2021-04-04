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
  if (menuIsVisible) collapseMenu();
  else showMenu();
}

function onEnterMain(
  iframe: HTMLIFrameElement,
  fab: HTMLAnchorElement,
  caption: HTMLAnchorElement
) {
  console.debug('Entered');
  document.body.classList.add(CLASS_LOADED);
  iframe.classList.remove(CLASS_MENU_OPENED);

  collapseMenu();
}

function addEventListeners(
  iframe: HTMLIFrameElement,
  overlay: HTMLDivElement,
  fab: HTMLAnchorElement,
  caption: HTMLAnchorElement
) {
  let loadCount = 0;
  iframe.addEventListener('load', (event) => {
    console.debug('Loaded');
    if (loadCount++ != 1) return;

    onEnterMain(iframe, fab, caption);
  });

  fab.addEventListener('click', (event: MouseEvent) => {
    console.debug('Fab clicked');
    toggleMenu();
  });

  overlay.addEventListener('click', (event: MouseEvent) => {
    console.debug('Overlay clicked');
    iframe.src = 'https://dka-hero.me/top.html';
    onEnterMain(iframe, fab, caption);
    overlay.remove();
  });
}

function main() {
  const iframe: HTMLIFrameElement | null = document.querySelector('.frame');
  const overlay: HTMLDivElement | null = document.querySelector('.overlay');
  const fab: HTMLAnchorElement | null = document.querySelector('.fab');
  const caption: HTMLAnchorElement | null = document.querySelector('.caption');

  if (iframe === null || overlay === null || fab === null || caption === null) {
    console.warn('Element not found');
    return;
  }

  addEventListeners(iframe, overlay, fab, caption);
}

document.addEventListener('DOMContentLoaded', main);
