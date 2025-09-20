// Smooth scrolling for in-page links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Download with confirmation
    document.querySelectorAll('.download-btn').forEach(button => {
      button.addEventListener('click', function() {
        const file = this.getAttribute('data-file');
        if (confirm("Do you want to download the PDF?")) {
          const link = document.createElement('a');
          link.href = file;
          link.download = file.split('/').pop();
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      });
    });

    // “Our Services” section look dynamic.
    const cards = document.querySelectorAll('.service-card');
    const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `cardFadeUp 0.8s ease-out ${i * 0.2}s forwards`;
    }
  });
}, { threshold: 0.2 });

cards.forEach(card => {
  card.style.opacity = '0';
  observer.observe(card);
});

//Background image moves slightly as the user scrolls.
// In javascript.js
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  let offset = window.scrollY * 0.4;
  hero.style.backgroundPositionY = `${offset}px`;
});
// In javascript.js
const canvas = document.getElementById('goldParticles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
for (let i = 0; i < 50; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2,
    speedY: Math.random() * 0.5 + 0.2
  });
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'gold';
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
    p.y += p.speedY;
    if (p.y > canvas.height) p.y = 0;
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();
// Apply glow effect on tap for mobile users
function enableTapGlow(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.addEventListener('touchstart', () => {
      el.classList.add('glow');
      setTimeout(() => el.classList.remove('glow'), 1000); // remove after animation
    });
  });
}

// Enable for menu links, footer icons, service cards, and buttons
enableTapGlow('nav ul li a');
enableTapGlow('.footer-icons a');
enableTapGlow('.service-card');
enableTapGlow('.btn');
enableTapGlow('.download-btn');
