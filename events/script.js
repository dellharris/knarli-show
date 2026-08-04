// ══════════════════════════════════════════
//  GATE — Pierce the Chrome Heart to Enter
// ══════════════════════════════════════════
(function () {
  const gate      = document.getElementById('gate');
  const heartWrap = document.getElementById('heartWrap');
  const flyArrow  = document.getElementById('flyArrow');
  const launcher  = document.getElementById('arrowLauncher');
  if (!gate) return;

  // Lock scroll while gate is active
  document.body.style.overflow = 'hidden';

  let fired = false;

  function pierce() {
    if (fired) return;
    fired = true;
    gate.classList.add('fired');

    // ─ 1. Calculate launch trajectory ─
    const lRect = launcher.getBoundingClientRect();
    const hRect = heartWrap.getBoundingClientRect();
    // Start from the tip of the launcher arrow (rightmost ~82%)
    const sx = lRect.left + lRect.width  * 0.82;
    const sy = lRect.top  + lRect.height * 0.5;
    // End at center of heart
    const ex = hRect.left + hRect.width  * 0.5;
    const ey = hRect.top  + hRect.height * 0.48;
    const dx = ex - sx;
    const dy = ey - sy;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    const dist  = Math.sqrt(dx * dx + dy * dy) + 20; // +20 to fully embed

    // ─ 2. Snap fly arrow to launcher tip, aimed at heart ─
    flyArrow.style.left      = sx + 'px';
    flyArrow.style.top       = (sy - 14) + 'px';
    flyArrow.style.transform = `rotate(${angle}deg)`;
    flyArrow.style.opacity   = '1';

    // ─ 3. Fire: translate along arrow axis toward heart ─
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        flyArrow.style.transition = `transform 0.26s linear`;
        flyArrow.style.transform  = `rotate(${angle}deg) translateX(${dist}px)`;
      });
    });

    // ─ 4. Impact ─
    setTimeout(() => {
      flyArrow.style.opacity = '0';

      // Flash + embed arrow
      heartWrap.classList.add('flashing');
      heartWrap.classList.add('hit');

      // Open wound
      const wound = document.getElementById('wound');
      if (wound) wound.setAttribute('r', '5');

      // Blood drips (staggered, JS-animated via transition)
      setTimeout(() => {
        document.getElementById('svgBlood').style.opacity = '1';
        const drips = [
          { id: 'bd0', h: 64, d: 70  },
          { id: 'bd1', h: 52, d: 190 },
          { id: 'bd2', h: 58, d: 340 },
          { id: 'bd3', h: 44, d: 130 },
          { id: 'bd4', h: 76, d: 460 },
        ];
        drips.forEach(({ id, h, d }) => {
          setTimeout(() => {
            const el = document.getElementById(id);
            if (!el) return;
            el.style.transition = `height 1.3s ease-in`;
            el.setAttribute('height', h);
          }, d);
        });
        heartWrap.classList.add('cracked');
      }, 100);

    }, 250);

    // ─ 5. Dissolve gate, free scroll ─
    setTimeout(() => gate.classList.add('unlocking'), 2200);
    setTimeout(() => {
      gate.remove();
      document.body.style.overflow = '';
    }, 3300);
  }

  // Fire on click / tap / Enter / Space
  gate.addEventListener('click', pierce);
  gate.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') pierce();
  });

  // Mouse parallax on heart
  gate.addEventListener('mousemove', e => {
    if (fired) return;
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    heartWrap.style.transform =
      `translate(${(e.clientX - cx) / cx * 14}px, ${(e.clientY - cy) / cy * 10}px)`;
  });
  gate.addEventListener('mouseleave', () => {
    if (!fired) heartWrap.style.transform = '';
  });
})();

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

