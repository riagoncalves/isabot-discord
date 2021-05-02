import scroll from './controls/scroll';
import dropdown from './controls/dropdown';

const controls = {
  scroll,
  dropdown,
};

const common = {
  init() {
    console.log('%c| 🔧 Developed by riagoncalves.dev |', 'background: #111; color: #eee; border-radius:2px; padding:.75rem;');
    [...document.querySelectorAll('[data-control]')].forEach(module =>
      controls[module.getAttribute('data-control')]['init'](module),
    );
  },
};

if (typeof window !== 'undefined') {
  common.init();
}
