export default {
  init(el) {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      try {
        window.scrollTo({
          'behavior': 'smooth',
          'left': 0,
          'top': document.querySelector(`.${el.dataset.scroll}`).offsetTop,
        });
      }
      catch (error) {
        console.log(error);
      }
    });
  },
};
