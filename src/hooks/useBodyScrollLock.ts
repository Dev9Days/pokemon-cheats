import { useEffect } from "react";

export function useBodyScrollLock(isLocked: boolean, scrollYOverride?: number | null) {
  useEffect(() => {
    if (!isLocked) return;

    const scrollY = scrollYOverride ?? window.scrollY;
    const bodyStyle = document.body.style;
    const rootStyle = document.documentElement.style;
    const previousBodyOverflow = bodyStyle.overflow;
    const previousBodyPosition = bodyStyle.position;
    const previousBodyTop = bodyStyle.top;
    const previousBodyWidth = bodyStyle.width;
    const previousRootOverflow = rootStyle.overflow;

    rootStyle.overflow = "hidden";
    bodyStyle.overflow = "hidden";
    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.width = "100%";

    return () => {
      rootStyle.overflow = previousRootOverflow;
      bodyStyle.overflow = previousBodyOverflow;
      bodyStyle.position = previousBodyPosition;
      bodyStyle.top = previousBodyTop;
      bodyStyle.width = previousBodyWidth;
      window.scrollTo(window.scrollX, scrollY);
    };
  }, [isLocked]);
}
