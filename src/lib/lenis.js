let instance = null;

export const setLenis = (lenis) => {
  instance = lenis;
};

export const getLenis = () => instance;

export const scrollTo = (target, options = {}) => {
  if (instance) {
    instance.scrollTo(target, { duration: 1.4, ...options });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  el?.scrollIntoView?.({ behavior: 'smooth' });
};
