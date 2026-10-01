/* ==========================================================================
   Ragul S — Portfolio Script (Premium Enhancement Pass)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initYear();
  initScrollProgress();
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initReveals();
  initCounters();
  initSkillBars();
  initTypingEffect();
  initTilt();
  initMagneticButtons();
  initRipple();
  initContactForm();
  initBackToTop();
});

/* ---------- Loading screen ---------- */
function initLoader(){
  const loader = document.getElementById('loader');
  const progress = document.getElementById('loaderProgress');
  if(!loader || !progress) return;

  let value = 0;
  const interval = setInterval(() => {
    value += Math.random() * 18;
    if(value >= 100){
      value = 100;
      clearInterval(interval);
      setTimeout(() => loader.classList.add('hidden'), 250);
    }
    progress.style.width = value + '%';
  }, 140);

  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 900);
  });
}

/* ---------- Footer year ---------- */
function initYear(){
  const el = document.getElementById('year');
  if(el) el.textContent = new Date().getFullYear();
}

/* ---------- Scroll progress bar ---------- */
function initScrollProgress(){
  const bar = document.getElementById('scrollProgress');
  if(!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

/* ---------- Navbar: floating glass pill, hide/show, active link ---------- */
function initNavbar(){
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('[data-nav]');
  const sections = Array.from(links).map(l => document.querySelector(l.getAttribute('href')));
  if(!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;

    navbar.classList.toggle('scrolled', current > 40);

    if(current > lastScroll && current > 200){
      navbar.classList.add('nav-hidden');
    } else {
      navbar.classList.remove('nav-hidden');
    }
    lastScroll = current;

    let activeIndex = 0;
    sections.forEach((sec, i) => {
      if(sec && sec.getBoundingClientRect().top <= 140) activeIndex = i;
    });
    links.forEach(l => l.classList.remove('active'));
    if(links[activeIndex]) links[activeIndex].classList.add('active');
  }, { passive: true });
}

/* ---------- Mobile menu: full-screen glass, staggered links ---------- */
function initMobileMenu(){
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('mobileMenu');
  if(!hamburger || !menu) return;

  const links = menu.querySelectorAll('[data-nav-mobile]');
  const sections = Array.from(links).map(l => document.querySelector(l.getAttribute('href')));

  function open(){
    menu.classList.add('open');
    hamburger.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    updateActive();
  }
  function close(){
    menu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  function updateActive(){
    let activeIndex = 0;
    sections.forEach((sec, i) => { if(sec && sec.getBoundingClientRect().top <= 140) activeIndex = i; });
    links.forEach(l => l.classList.remove('active'));
    if(links[activeIndex]) links[activeIndex].classList.add('active');
  }

  hamburger.addEventListener('click', () => {
    if(menu.classList.contains('open')) close(); else open();
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(close, 250);
    });
  });
}

/* ---------- Smooth scroll for in-page anchors ---------- */
function initSmoothScroll(){
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const targetId = this.getAttribute('href');
      if(targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if(!target) return;
      e.preventDefault();
      const offset = 100;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ---------- Scroll reveal via IntersectionObserver ---------- */
function initReveals(){
  const elements = document.querySelectorAll('[data-reveal]');
  if(!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ---------- Number counters ---------- */
function initCounters(){
  const counters = document.querySelectorAll('.counter');
  if(!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10) || 0;
      const duration = 1400;
      const start = performance.now();

      function tick(now){
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if(progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ---------- Skill progress bars ---------- */
function initSkillBars(){
  const cards = document.querySelectorAll('.skill-card');
  if(!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  cards.forEach(card => observer.observe(card));
}

/* ---------- Typing effect for hero tagline ---------- */
function initTypingEffect(){
  const el = document.getElementById('typingText');
  if(!el) return;

  const phrases = [
    'Learning by Building.',
    'Growing Through Real-World AI Projects.',
    'Turning Ideas Into Working Systems.'
  ];

  let phraseIndex = 0, charIndex = 0, deleting = false;

  function step(){
    const current = phrases[phraseIndex];

    if(!deleting){
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if(charIndex === current.length){
        deleting = true;
        setTimeout(step, 1600);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if(charIndex === 0){
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    const speed = deleting ? 35 : 55;
    setTimeout(step, speed);
  }

  step();
}

/* ---------- Card tilt on mouse move ---------- */
function initTilt(){
  const cards = document.querySelectorAll('[data-tilt]');
  if(!cards.length || window.matchMedia('(hover: none)').matches) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const rotateX = (-y * 6).toFixed(2);
      const rotateY = (x * 6).toFixed(2);
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* ---------- Magnetic buttons ---------- */
function initMagneticButtons(){
  const buttons = document.querySelectorAll('[data-magnetic]');
  if(!buttons.length || window.matchMedia('(hover: none)').matches) return;

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
    });
  });
}

/* ---------- Button ripple effect ---------- */
function initRipple(){
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e){
      const rect = this.getBoundingClientRect();
      const rippleEl = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      rippleEl.classList.add('ripple');
      rippleEl.style.width = rippleEl.style.height = size + 'px';
      rippleEl.style.left = (e.clientX - rect.left - size / 2) + 'px';
      rippleEl.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(rippleEl);
      setTimeout(() => rippleEl.remove(), 650);
    });
  });
}

/* ---------- Contact form: validation + Web3Forms email delivery ---------- */
function initContactForm(){
  const form = document.getElementById('contactForm');
  if(!form) return;

  const note = document.getElementById('formNote');
  const submitBtn = document.getElementById('submitBtn');
  const stateIdle = submitBtn.querySelector('.state-idle');
  const stateLoading = submitBtn.querySelector('.state-loading');
  const stateSuccess = submitBtn.querySelector('.state-success');

  const fields = {
    name: { input: document.getElementById('fname'), error: document.getElementById('errName') },
    email: { input: document.getElementById('femail'), error: document.getElementById('errEmail') },
    subject: { input: document.getElementById('fsubject'), error: document.getElementById('errSubject') },
    message: { input: document.getElementById('fmessage'), error: document.getElementById('errMessage') }
  };

  function setState(state){
    stateIdle.hidden = state !== 'idle';
    stateLoading.hidden = state !== 'loading';
    stateSuccess.hidden = state !== 'success';
    submitBtn.classList.toggle('is-success', state === 'success');
    submitBtn.disabled = state === 'loading';
  }

  function validateField(key){
    const { input, error } = fields[key];
    const wrapper = input.closest('.form-field');
    let message = '';

    if(!input.value.trim()){
      message = 'This field is required.';
    } else if(key === 'email'){
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailPattern.test(input.value.trim())) message = 'Enter a valid email address.';
    } else if(key === 'message' && input.value.trim().length < 10){
      message = 'Message should be at least 10 characters.';
    }

    wrapper.classList.toggle('invalid', Boolean(message));
    error.textContent = message;
    return !message;
  }

  Object.keys(fields).forEach(key => {
    fields[key].input.addEventListener('blur', () => validateField(key));
    fields[key].input.addEventListener('input', () => {
      if(fields[key].input.closest('.form-field').classList.contains('invalid')) validateField(key);
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const allValid = Object.keys(fields).map(validateField).every(Boolean);
    if(!allValid){
      note.textContent = 'Please fix the highlighted fields.';
      note.className = 'form-note error';
      return;
    }

    setState('loading');
    note.textContent = '';
    note.className = 'form-note';

    // Build the payload from the form itself so the hidden access_key in the HTML is the single source of truth
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.name = fields.name.input.value.trim();
    payload.email = fields.email.input.value.trim();
    payload.message = fields.message.input.value.trim();
    payload.subject = 'New portfolio message: ' + fields.subject.input.value.trim();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      // Web3Forms returns JSON like { success: true|false, message: "..." }
      let result = null;
      try { result = await response.json(); } catch (_) { /* non-JSON response */ }

      if(!response.ok || !result || result.success !== true){
        throw new Error((result && result.message) || 'Delivery failed');
      }

      setState('success');
      note.textContent = `Thanks, ${payload.name.split(' ')[0]} — your message is on its way to my inbox. I'll reply soon.`;
      note.className = 'form-note success';
      form.reset();
      setTimeout(() => setState('idle'), 3000);

    } catch (err) {
      setState('idle');
      note.textContent = 'Something went wrong sending that. Please email ragulsekar777@gmail.com directly instead.';
      note.className = 'form-note error';
    } finally {
      clearTimeout(timeout);
    }
  });
}

/* ---------- Back to top ---------- */
function initBackToTop(){
  const btn = document.getElementById('backToTop');
  if(!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
