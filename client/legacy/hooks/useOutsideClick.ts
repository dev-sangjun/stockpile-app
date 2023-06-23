import { RefObject, useEffect, useRef } from "react";

const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  handler?: () => void
): RefObject<T> => {
  const ref = useRef<T>(null);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const element = event?.target as Node;
      if (!handler || !element) return;
      if (ref && ref.current && !ref.current.contains(element)) {
        handler();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [ref, handler]);
  return ref;
};

export default useOutsideClick;
