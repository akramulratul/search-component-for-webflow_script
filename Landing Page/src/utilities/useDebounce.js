import { useEffect, useState } from "react";

const DEFAULT_DELAY_IN_MS = 500;

function useDebounce(value, delay = DEFAULT_DELAY_IN_MS) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
