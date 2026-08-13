// Reveal-on-scroll for section labels + lineup + details
document.addEventListener("DOMContentLoaded", () => {
  const revealTargets = document.querySelectorAll(
    ".lineup, .details, .rsvp"
  );

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealTargets.forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = "translateY(24px)";
    el.style.transition = "opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)";
    io.observe(el);
  });

  // Ensure hero video actually starts on mobile Safari (muted autoplay)
  const heroVideo = document.querySelector(".hero__video");
  if (heroVideo) {
    heroVideo.play().catch(() => {
      /* Autoplay might be blocked until user interacts; ignore. */
    });
  }
});

