import { useEffect, useState } from "react";

const useToast = (show: boolean, timeout = 2000) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, [show, timeout]);
  return { isVisible };
};

export default useToast;
