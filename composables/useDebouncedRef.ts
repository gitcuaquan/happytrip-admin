import { ref, customRef } from 'vue';

const debounce = (fn: (...args: any[]) => void, delay = 0) => {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const useDebouncedRef = (initialValue: any, delay: number) => {
  const state = ref(initialValue);
  const debouncedRef = customRef((track, trigger) => ({
    get() {
      track();
      return state.value;
    },
    set: debounce(value => {
      state.value = value;
      trigger();
    }, delay),
  }));
  return debouncedRef;
};

export default useDebouncedRef;