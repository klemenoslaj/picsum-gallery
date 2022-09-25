import { useRef, useEffect } from 'react';

interface VisibilityStore {
  readonly setIsVisible: (visible: boolean) => void;
  readonly unobserve: () => void;
}

const observerOptions = { root: null, rootMargin: '50%', threshold: 1.0 };
const store = new WeakMap<Element, VisibilityStore>();
let rootObserver: IntersectionObserver | undefined;
let amount: number = 0;

const useElementOnScreen = (onChange: (visible: boolean) => void) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = (rootObserver ??= new IntersectionObserver((entries) => {
      for (let entry of entries) {
        const storedValue = store.get(entry.target);

        if (!storedValue) {
          throw new Error('Unexpected state: target of IntersectionObserver was not seen before.');
        }

        storedValue.setIsVisible(entry.isIntersecting);
      }
    }, observerOptions));

    const container = containerRef.current;

    if (!container) {
      return;
    }

    const observerApi = {
      setIsVisible: onChange,
      unobserve: () => {
        if (!amount) {
          return;
        }

        store.delete(container);
        observer.unobserve(container);

        if (--amount === 0) {
          observer.disconnect();
          rootObserver = undefined;
        }
      },
    };

    amount++;
    observer.observe(container);
    store.set(container, observerApi);
    return observerApi.unobserve;
  }, []);

  return [containerRef] as const;
};

export default useElementOnScreen;
