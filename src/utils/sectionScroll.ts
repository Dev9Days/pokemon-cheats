let activeScrollFrame: number | null = null;
let isProgrammaticScrolling = false;

export function isProgrammaticSectionScroll() {
  return isProgrammaticScrolling;
}

export function scrollToSection(id: string, onComplete?: () => void) {
  const element = document.getElementById(id);
  if (!element) return;

  if (activeScrollFrame !== null) {
    window.cancelAnimationFrame(activeScrollFrame);
    activeScrollFrame = null;
  }

  const startY = window.scrollY;
  const toolbar = document.querySelector<HTMLElement>(".toolbar");
  const toolbarOffset = toolbar && window.getComputedStyle(toolbar).position === "sticky" ? toolbar.offsetHeight : 0;
  const headerOffset = toolbarOffset + 10;
  const maxY = document.documentElement.scrollHeight - window.innerHeight;
  const targetY = Math.min(Math.max(0, startY + element.getBoundingClientRect().top - headerOffset), maxY);
  const distance = targetY - startY;
  const duration = 280;
  let startTime: number | null = null;
  isProgrammaticScrolling = true;

  function animate(now: number) {
    startTime ??= now;
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = -(Math.cos(Math.PI * progress) - 1) / 2;
    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      activeScrollFrame = window.requestAnimationFrame(animate);
    } else {
      activeScrollFrame = null;
      isProgrammaticScrolling = false;
      history.replaceState(null, "", `#${id}`);
      onComplete?.();
    }
  }

  activeScrollFrame = window.requestAnimationFrame(animate);
}
