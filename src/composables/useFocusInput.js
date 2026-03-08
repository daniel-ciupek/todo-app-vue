import { nextTick } from 'vue';

export function useFocusInput(inputRef) {
  const focusInput = () => {
    nextTick(() => {
      inputRef.value?.focus();
    });
  };

  return {
    focusInput,
  };
}
