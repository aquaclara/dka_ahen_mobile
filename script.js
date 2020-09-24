document.addEventListener('DOMContentLoaded', () => {
  const iframe = document.getElementById('frame');
  const fab = document.getElementById('fab');
  const caption = document.getElementById('caption');
  let menuIsVisible = false;

  function collapseMenu() {
    menuIsVisible = false;
    iframe.classList.remove('with-menu');
    fab.classList.remove('right');
  }

  function showMenu() {
    menuIsVisible = true;
    iframe.classList.add('with-menu');
    fab.classList.add('right');
  }

  let loadCount = 0;
  iframe.onload = (event) => {
    if (loadCount++ < 1) return;
    iframe.classList.add('loaded');
    caption.classList.add('loaded');
    document.querySelector('#caption .description').remove();
    iframe.classList.remove('with-menu');
    iframe.onload = null;
    fab.style['opacity'] = '1';

    fab.onclick = (event) => {
      if (menuIsVisible) collapseMenu();
      else showMenu();
    };

    collapseMenu();
  };
});
