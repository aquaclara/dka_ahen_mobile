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
  console.log('Entered');
  document.body.classList.add(CLASS_LOADED);
  iframe.classList.remove(CLASS_MENU_OPENED);

  fab.addEventListener('click', (event) => {
    toggleMenu();
  });

  collapseMenu();
}

function main() {
  const iframe: HTMLIFrameElement | null = document.querySelector('.frame');
  const fab: HTMLAnchorElement | null = document.querySelector('.fab');
  const caption: HTMLAnchorElement | null = document.querySelector('.caption');

  if (iframe === null || fab === null || caption === null) {
    console.warn('Element not found');
    return;
  }

  let loadCount = 0;
  iframe.addEventListener('load', (event) => {
    console.log('Loaded');
    if (loadCount++ < 1) return;

    onEnterMain(iframe, fab, caption);
  });

  caption.addEventListener('click', (event) => {
    if (loadCount > 1) {
      onEnterMain(iframe, fab, caption);
    }
  });
}

navigator?.serviceWorker?.register('/dka_ahen_mobile/dist/sw.js');
document.addEventListener('DOMContentLoaded', main);
