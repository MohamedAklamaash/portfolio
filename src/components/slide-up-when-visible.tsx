import { motion, useAnimation, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface SlideUpWhenVisibleProps {
  threshold?: number;
  children: React.ReactNode;
}

const SlideUpWhenVisible: React.FC<SlideUpWhenVisibleProps> = ({
  children,
  threshold,
}) => {
  const controls = useAnimation();
  const prefersReduced = useReducedMotion();
  // triggerOnce so revealed content never re-hides; rootMargin reveals it just
  // before it scrolls into view to avoid a visible pop at the fold.
  const [ref, inView] = useInView({
    threshold: threshold ?? 0.15,
    triggerOnce: true,
    rootMargin: "0px 0px -10% 0px",
  });

  useEffect(() => {
    // Reduced-motion users (and the no-IntersectionObserver fallback) get the
    // content shown immediately rather than stuck at opacity:0.
    if (prefersReduced || inView) {
      controls.start("visible");
    }
  }, [controls, inView, prefersReduced]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={prefersReduced ? "visible" : "hidden"}
      transition={{ duration: 0.4 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default SlideUpWhenVisible;
