/* ================================================
   SERVER MIGRATION PRESENTATION — MAIN JS
   GSAP ScrollTrigger + Chart.js
   ================================================ */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Chart from 'chart.js/auto';

gsap.registerPlugin(ScrollTrigger);

// ---- PROGRESS BAR ----
function initProgressBar() {
  const progressBar = document.getElementById('progressBar');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  });
}

// ---- NAVIGATION ----
function initNavigation() {
  const nav = document.getElementById('nav');
  const links = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section');

  // Show nav after hero
  ScrollTrigger.create({
    trigger: '#background',
    start: 'top 80%',
    onEnter: () => nav.classList.add('visible'),
    onLeaveBack: () => nav.classList.remove('visible'),
  });

  // Active link tracking
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveLink(section.id),
      onEnterBack: () => setActiveLink(section.id),
    });
  });

  function setActiveLink(id) {
    links.forEach((link) => {
      link.classList.toggle('active', link.dataset.section === id);
    });
  }

  // Smooth scroll on click
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ---- HERO ANIMATIONS ----
function initHeroAnimations() {
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from('.hero-badge', { opacity: 0, y: 30, duration: 0.8, delay: 0.3 })
    .from('.title-line', { opacity: 0, y: 60, duration: 0.8, stagger: 0.15 }, '-=0.4')
    .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.7 }, '-=0.3')
    .from('.stat-item', { opacity: 0, y: 30, duration: 0.6, stagger: 0.1 }, '-=0.3')
    .from('.scroll-indicator', { opacity: 0, duration: 0.8 }, '-=0.2');

  // Fade out scroll indicator on scroll
  gsap.to('.scroll-indicator', {
    opacity: 0,
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: '30% top',
      scrub: true,
    },
  });

  // Parallax hero content
  gsap.to('.hero-content', {
    yPercent: -30,
    opacity: 0.3,
    scrollTrigger: {
      trigger: '#hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
    },
  });
}

// ---- REVEAL ANIMATIONS ----
function initRevealAnimations() {
  // Reveal Up
  gsap.utils.toArray('.reveal-up').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  // Reveal Left
  gsap.utils.toArray('.reveal-left').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });

  // Reveal Right
  gsap.utils.toArray('.reveal-right').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      x: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  });
}

// ---- SERVICE LIST ANIMATION ----
function initServiceListAnimation() {
  const items = document.querySelectorAll('.service-item');

  ScrollTrigger.create({
    trigger: '#analysis',
    start: 'top 60%',
    onEnter: () => {
      items.forEach((item, i) => {
        setTimeout(() => {
          item.classList.add('visible');
        }, i * 80);
      });
    },
  });
}

// ---- RESOURCE BARS ANIMATION ----
function initResourceBars() {
  const bars = document.querySelectorAll('.bar-fill');

  ScrollTrigger.create({
    trigger: '.resource-summary',
    start: 'top 75%',
    onEnter: () => {
      bars.forEach((bar) => {
        const width = bar.dataset.width;
        bar.style.width = `${width}%`;
        bar.classList.add('animated');
      });
    },
  });
}

// ---- CHARTS ----
function initCharts() {
  // Chart defaults
  Chart.defaults.color = '#a0a0b8';
  Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.06)';
  Chart.defaults.font.family = "'Inter', sans-serif";

  initDiskChart();
  initRamChart();
  initCostChart();
}

function initDiskChart() {
  const ctx = document.getElementById('diskChart');
  if (!ctx) return;

  let chartInstance = null;

  ScrollTrigger.create({
    trigger: ctx,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Elasticsearch', 'Logstash', 'Kibana', 'MySQL', 'Supervisor', 'PHP 7.4-FPM', 'Cronjob', 'Filebeat', 'Nginx', 'Redis'],
          datasets: [{
            label: 'Memory Usage (GB)',
            data: [22.6, 2.25, 0.9, 0.55, 0.1, 0.09, 0.055, 0.055, 0.018, 0.005],
            backgroundColor: [
              'rgba(254, 202, 87, 0.7)',
              'rgba(0, 206, 201, 0.7)',
              'rgba(253, 121, 168, 0.7)',
              'rgba(255, 107, 107, 0.7)',
              'rgba(108, 92, 231, 0.7)',
              'rgba(162, 155, 254, 0.7)',
              'rgba(85, 239, 196, 0.7)',
              'rgba(72, 219, 251, 0.7)',
              'rgba(99, 110, 114, 0.7)',
              'rgba(55, 239, 196, 0.7)',
            ],
            borderColor: [
              'rgba(254, 202, 87, 1)',
              'rgba(0, 206, 201, 1)',
              'rgba(253, 121, 168, 1)',
              'rgba(255, 107, 107, 1)',
              'rgba(108, 92, 231, 1)',
              'rgba(162, 155, 254, 1)',
              'rgba(85, 239, 196, 1)',
              'rgba(72, 219, 251, 1)',
              'rgba(99, 110, 114, 1)',
              'rgba(55, 239, 196, 1)',
            ],
            borderWidth: 1,
            borderRadius: 6,
          }],
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1500,
            easing: 'easeOutQuart',
          },
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: 'rgba(10, 10, 15, 0.9)',
              titleColor: '#f0f0f5',
              bodyColor: '#a0a0b8',
              borderColor: 'rgba(108, 92, 231, 0.3)',
              borderWidth: 1,
              cornerRadius: 8,
              padding: 12,
              callbacks: {
                label: (ctx) => `${ctx.raw} GB`,
              },
            },
          },
          scales: {
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.04)' },
              ticks: { font: { size: 11 } },
              title: { display: true, text: 'Gigabytes (GB)', font: { size: 11 } },
            },
            y: {
              grid: { display: false },
              ticks: { font: { size: 11, family: "'JetBrains Mono', monospace" } },
            },
          },
        },
      });
    },
  });
}

function initRamChart() {
  const ctx = document.getElementById('ramChart');
  if (!ctx) return;

  ScrollTrigger.create({
    trigger: ctx,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Elasticsearch', 'Logstash', 'Kibana', 'MySQL', 'PHP 7.4-FPM', 'Supervisor', 'Cronjob', 'Filebeat', 'Nginx', 'Redis'],
          datasets: [
            {
              label: 'Min (GB)',
              data: [22.3, 2.2, 0.632, 0.528, 0.076, 0.1, 0.011, 0.055, 0.018, 0.005],
              backgroundColor: 'rgba(0, 206, 201, 0.6)',
              borderColor: 'rgba(0, 206, 201, 1)',
              borderWidth: 1,
              borderRadius: 4,
            },
            {
              label: 'Max (GB)',
              data: [22.9, 2.3, 1.2, 0.574, 0.111, 0.1, 0.099, 0.055, 0.018, 0.005],
              backgroundColor: 'rgba(255, 107, 107, 0.6)',
              borderColor: 'rgba(255, 107, 107, 1)',
              borderWidth: 1,
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1500,
            easing: 'easeOutQuart',
            delay: (context) => context.dataIndex * 100,
          },
          plugins: {
            legend: {
              position: 'top',
              labels: { padding: 16, usePointStyle: true, pointStyle: 'circle' },
            },
            tooltip: {
              backgroundColor: 'rgba(10, 10, 15, 0.9)',
              titleColor: '#f0f0f5',
              bodyColor: '#a0a0b8',
              borderColor: 'rgba(108, 92, 231, 0.3)',
              borderWidth: 1,
              cornerRadius: 8,
              padding: 12,
              callbacks: {
                label: (ctx) => `${ctx.dataset.label}: ${ctx.raw} GB`,
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { font: { size: 10, family: "'JetBrains Mono', monospace" } },
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.04)' },
              ticks: { font: { size: 11 } },
              title: { display: true, text: 'RAM (GB)', font: { size: 11 } },
            },
          },
        },
      });
    },
  });
}

function initCostChart() {
  const ctx = document.getElementById('costChart');
  if (!ctx) return;

  ScrollTrigger.create({
    trigger: ctx,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Plan A\n(Instance Baru)', 'Plan B\n(Perpanjang)'],
          datasets: [
            {
              label: 'VPS / Server',
              data: [3676806, 11373846],
              backgroundColor: ['rgba(108, 92, 231, 0.7)', 'rgba(0, 206, 201, 0.7)'],
              borderColor: ['rgba(108, 92, 231, 1)', 'rgba(0, 206, 201, 1)'],
              borderWidth: 1,
              borderRadius: 8,
            },
            {
              label: 'Domain',
              data: [236666, 236666],
              backgroundColor: ['rgba(162, 155, 254, 0.7)', 'rgba(72, 219, 251, 0.7)'],
              borderColor: ['rgba(162, 155, 254, 1)', 'rgba(72, 219, 251, 1)'],
              borderWidth: 1,
              borderRadius: 8,
            },
            {
              label: 'Email SMTP',
              data: [263000, 263000],
              backgroundColor: ['rgba(253, 121, 168, 0.7)', 'rgba(254, 202, 87, 0.7)'],
              borderColor: ['rgba(253, 121, 168, 1)', 'rgba(254, 202, 87, 1)'],
              borderWidth: 1,
              borderRadius: 8,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: {
            duration: 1500,
            easing: 'easeOutQuart',
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: { padding: 16, usePointStyle: true, pointStyle: 'circle', font: { size: 11 } },
            },
            tooltip: {
              backgroundColor: 'rgba(10, 10, 15, 0.9)',
              titleColor: '#f0f0f5',
              bodyColor: '#a0a0b8',
              borderColor: 'rgba(108, 92, 231, 0.3)',
              borderWidth: 1,
              cornerRadius: 8,
              padding: 12,
              callbacks: {
                label: (ctx) => {
                  const val = ctx.raw.toLocaleString('id-ID');
                  return `${ctx.dataset.label}: Rp ${val}`;
                },
              },
            },
          },
          scales: {
            x: {
              stacked: true,
              grid: { display: false },
              ticks: { font: { size: 12, weight: 600 } },
            },
            y: {
              stacked: true,
              grid: { color: 'rgba(255, 255, 255, 0.04)' },
              ticks: {
                font: { size: 10 },
                callback: (val) => `Rp ${(val / 1000000).toFixed(1)}jt`,
              },
            },
          },
        },
      });
    },
  });
}

// ---- PLAN CARDS HOVER GLOW ----
function initPlanCardEffects() {
  const cards = document.querySelectorAll('.plan-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// ---- COUNTER ANIMATION ----
function initCounterAnimation() {
  // No complex counter needed; stats are mostly text
}

// ---- INIT ----
document.addEventListener('DOMContentLoaded', () => {
  initProgressBar();
  initNavigation();
  initHeroAnimations();
  initRevealAnimations();
  initServiceListAnimation();
  initResourceBars();
  initCharts();
  initPlanCardEffects();
  initCounterAnimation();
});
