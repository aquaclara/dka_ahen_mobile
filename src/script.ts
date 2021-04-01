import './styles.scss';

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

function onEnterMain(iframe: HTMLIFrameElement, fab: HTMLAnchorElement) {
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

  if (iframe === null || fab === null) return;

  let loadCount = 0;
  iframe.addEventListener('load', (event) => {
    if (loadCount++ < 1) return;

    onEnterMain(iframe, fab);
  });
}

document.addEventListener('DOMContentLoaded', main);
