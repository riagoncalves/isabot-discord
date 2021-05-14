export default {
  init(el) {
    const btn = el.querySelector('.user-dropdown');
    const dropdownMenu = el.querySelector('.user-dropdown-menu');
    const arrowDown = btn.querySelector('.arrow-down');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle('active');
      if(arrowDown) arrowDown.classList.toggle('active');
    });

    window.addEventListener('click', (e) => {
      e.stopPropagation();
      if (dropdownMenu.classList.contains('active')) {
        dropdownMenu.classList.toggle('active');
        if(arrowDown) arrowDown.classList.toggle('active');
      }
    });
  },
};
