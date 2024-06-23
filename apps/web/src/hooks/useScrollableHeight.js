import { useRef, useState, useCallback, useEffect } from "react";
import { ResizeObserver as PolyfillResizeObserver } from '@juggle/resize-observer';
import {
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";

const useScrollableHeight = () => {
  const scrollRef = useRef(null);
  const [scrollableHeight, setScrollableHeight] = useState(0);

  const resizeScrollableHeight = useCallback((entries) => {
    for (let entry of entries) {
      setScrollableHeight(entry.contentRect.height);
    }
  }, []);

  // useEffect(() => {
  //   const resizeObserver = new ResizeObserver((entries) => resizeScrollableHeight(entries));
  //   if (scrollRef.current) {
  //     resizeObserver.observe(scrollRef.current);
  //   }
  //   return () => resizeObserver.disconnect();
  // }, [resizeScrollableHeight]);

  useEffect(() => {
    const resizeObserver = new PolyfillResizeObserver((entries) => resizeScrollableHeight(entries));
    if (scrollRef.current) {
      resizeObserver.observe(scrollRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [resizeScrollableHeight]);

  const { scrollY } = useScroll();
  const negativeScrollY = useTransform(scrollY, [0, scrollableHeight], [0, -scrollableHeight]);

  const springPhysics = {
    damping: 22,
    mass: 0.1,
    stiffness: 200,
    bounce: 0.5,
    duration: 0.4,
    velocity: 100,
  };

  const springNegativeScrollY = useSpring(negativeScrollY, springPhysics);

  return { scrollRef, springNegativeScrollY };
};

export default useScrollableHeight;
