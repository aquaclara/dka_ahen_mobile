const CLASS_LOADED = 'loaded';
const CLASS_MENU_OPENED = 'menu-opened';
const FIT_WIDTHS = [350, 420, 600];
const FIT_KEY = 'fit';
const FIT_MARGIN = 16;
const SPLASH_WIDTH = 600;

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

function loadFit(): number {
  try {
    const stored = Number(localStorage.getItem(FIT_KEY));
    if (FIT_WIDTHS.includes(stored)) return stored;
  } catch {}
  return FIT_WIDTHS[1];
}

function saveFit(width: number) {
  try {
    localStorage.setItem(FIT_KEY, String(width));
  } catch {}
}

function applySplashScale() {
  const scale = Math.min(
    1,
    document.documentElement.clientWidth / SPLASH_WIDTH,
  );
  document.body.style.setProperty('--splash-scale', String(scale));
}

function applyFit(width: number, fit: HTMLButtonElement) {
  const scale = document.documentElement.clientWidth / (width + FIT_MARGIN);
  document.body.style.setProperty('--fit', `${width + FIT_MARGIN}px`);
  document.body.style.setProperty('--scale', String(scale));
  fit.textContent = `幅 ${width}`;
}

function addEventListeners(
  iframe: HTMLIFrameElement,
  overlay: HTMLButtonElement,
  fab: HTMLButtonElement,
  scrim: HTMLButtonElement,
  fit: HTMLButtonElement,
) {
  let loadCount = 0;
  let fitWidth = loadFit();
  applySplashScale();
  applyFit(fitWidth, fit);

  iframe.addEventListener('load', () => {
    if (loadCount++ === 0) return;
    onEnterMain(fab);
  });

  fab.addEventListener('click', () => {
    toggleMenu(fab);
  });

  scrim.addEventListener('click', () => {
    collapseMenu(fab);
  });

  fit.addEventListener('click', () => {
    const next = (FIT_WIDTHS.indexOf(fitWidth) + 1) % FIT_WIDTHS.length;
    fitWidth = FIT_WIDTHS[next];
    applyFit(fitWidth, fit);
    saveFit(fitWidth);
  });

  window.addEventListener('resize', () => {
    applySplashScale();
    applyFit(fitWidth, fit);
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
  const scrim: HTMLButtonElement | null = document.querySelector('.scrim');
  const fit: HTMLButtonElement | null = document.querySelector('.fit');

  if (
    iframe === null ||
    overlay === null ||
    fab === null ||
    scrim === null ||
    fit === null
  ) {
    console.warn('Element not found');
    return;
  }

  addEventListeners(iframe, overlay, fab, scrim, fit);
}

document.addEventListener('DOMContentLoaded', main);
