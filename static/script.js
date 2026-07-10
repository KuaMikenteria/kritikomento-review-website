// ===== SCROLL FADE-IN (Intersection Observer) =====
document.addEventListener("DOMContentLoaded", function () {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );
  if (prefersReducedMotion.matches) {
    // If reduced motion is preferred, make all elements visible immediately
    document.querySelectorAll(".fade-in-item").forEach((el) => {
      el.classList.add("visible");
    });
    return;
  }

  const elements = document.querySelectorAll(".fade-in-item");

  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // stop observing once visible
        }
      });
    },
    {
      threshold: 0.12, // trigger when 12% of element is visible
      rootMargin: "0px 0px -30px 0px", // slight offset for better timing
    },
  );

  elements.forEach((el, index) => {
    // Stagger delay: each card fades slightly after the previous one
    el.style.transitionDelay = index * 0.07 + "s";
    observer.observe(el);
  });
});
