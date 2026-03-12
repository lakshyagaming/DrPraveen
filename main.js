// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar && navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = mobileMenu.classList.contains('open') ? 'rotate(45deg) translate(5px, 6px)' : '';
    spans[1].style.opacity = mobileMenu.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = mobileMenu.classList.contains('open') ? 'rotate(-45deg) translate(5px, -6px)' : '';
  });
  document.querySelectorAll('.mobile-menu a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = ''; spans[1].style.opacity = '1'; spans[2].style.transform = '';
    });
  });
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObs.observe(el));

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');
    document.querySelectorAll('.faq-q').forEach(b => {
      b.classList.remove('open');
      b.nextElementSibling?.classList.remove('open');
    });
    if (!isOpen) { btn.classList.add('open'); answer?.classList.add('open'); }
  });
});

// Appointment form handler
const apptForm = document.getElementById('appointmentForm');
if (apptForm) {
  apptForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = apptForm.querySelector('[type=submit]');
    btn.textContent = 'Booking...'; btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Book Appointment';
      btn.disabled = false;
      const success = document.querySelector('.form-success');
      if (success) { success.style.display = 'block'; apptForm.reset(); }
      setTimeout(() => { if (success) success.style.display = 'none'; }, 5000);
    }, 1200);
  });
}

// Contact form handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('[type=submit]');
    btn.textContent = 'Sending...'; btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message'; btn.disabled = false;
      const success = document.querySelector('.form-success');
      if (success) { success.style.display = 'block'; contactForm.reset(); }
      setTimeout(() => { if (success) success.style.display = 'none'; }, 5000);
    }, 1000);
  });
}

// Active nav link highlight based on current page
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});

// Animate stat counters on hero (home only)
function animateCount(el, target, duration = 1500) {
  let start = 0;
  const step = (target / duration) * 16;
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target + (el.dataset.suffix || ''); clearInterval(timer); return; }
    el.textContent = Math.floor(start) + (el.dataset.suffix || '');
  }, 16);
}
document.querySelectorAll('[data-count]').forEach(el => {
  const obs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCount(el, parseInt(el.dataset.count)); obs.disconnect(); }
  });
  obs.observe(el);
});
