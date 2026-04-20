---
description: How to create a scrolly-telling modern presentation website with Vite, GSAP, Lenis, and Chart.js
---

# Building a Scrolly-Telling Presentation Website

This workflow outlines the steps to build a modern, animated presentation website with a dark aesthetic and glassmorphism styling, similar to the Server Migration Presentation. 
The core technologies include **Vite**, **Vanilla JS**, **GSAP (ScrollTrigger)**, **Lenis (Smooth Scroll)**, and **Chart.js**.

## 1. Setup Project & Dependencies

Run the following commands to initialize the project and install all required libraries:

```bash
// turbo
npm create vite@latest . -- --template vanilla
npm install gsap lenis chart.js
npm install -D vite
```

## 2. Project Structure

Create the essential foundational files:
- `index.html`: The main presentation structure containing semantic HTML sections.
- `style.css`: All styling, CSS variables, typography, and glassmorphism effects.
- `main.js`: Initialization of Lenis smooth scrolling, GSAP animations, and Chart.js instances.

## 3. Styling Foundation (`style.css`)

### CSS Variables (Dark Aesthetic)
Define modern css variables for a consistent dark UI:

```css
:root {
  --bg-main: #0a0a0f;
  --bg-card: rgba(20, 20, 25, 0.6);
  --bg-glass: rgba(255, 255, 255, 0.03);
  
  --text-primary: #f0f0f5;
  --text-secondary: #a0a0b8;
  --text-muted: #707080;
  
  --accent-primary: #6c5ce7;
  --accent-secondary: #00cec9;
  
  --border-color: rgba(255, 255, 255, 0.08);
  --border-glow: rgba(108, 92, 231, 0.4);
  
  --radius-lg: 16px;
  --radius-md: 12px;
}
```

### Layout Consistency (100dvh Sections)
Ensure each `<section>` scales correctly, especially for mobile browsers (where the address bar hides/shows). Use `padding` for spacing instead of `align-items: center` to ensure tall content flows naturally and the scroll length is uniform.

```css
.section {
  min-height: 100dvh;
  padding: 100px clamp(20px, 5vw, 80px);
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
```

## 4. Initialization (`main.js`)

### Wait for DOM Content
Ensure all scripts run after the DOM is fully loaded.
```javascript
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initAnimations();
  // ...other init functions
});
```

### Smooth Scrolling (Lenis)
Initialize Lenis and sync with GSAP ticker for perfectly smooth scroll-based animations.

```javascript
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis;
function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}
```

### GSAP Animations
Use `ScrollTrigger` to track active sections and trigger animations:
- **Reveal Elements**: Staggered reveals (`.reveal-up`, `.reveal-left`) for grids and content sections.
- **Parallax Effects**: Make backgrounds or hero text move at different speeds using `scrub: 1.5`.
- **Navigation Navbar**: Fade in the top navbar only after scrolling past the Hero section.

### Interactive Components

Build critical presentation features:
- **Hero Section**: Centered layout, large gradient text, parallax scroll indicators.
- **Glassmorphism Cards**: Transparent backgrounds (`rgba`), slight borders (`--border-color`), hover glow effects (`border-color: var(--border-glow); transform: translateY(-2px)`).
- **Sticky Navigation**: Top navigation with glassmorphism that tracks active sections using `ScrollTrigger`.
- **Scroll Progress Bar**: A fixed bar (`position: fixed; top: 0; left: 0; h: 3px`) at the top indicating scroll progress by calculating `scrollTop / documentHeight`.

## 5. Visualizing Data (`Chart.js`)

Initialize charts with dark layouts and custom tooltips, triggered to animate only when scrolled into view using `ScrollTrigger`.

```javascript
import Chart from 'chart.js/auto';

Chart.defaults.color = '#a0a0b8';
Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.06)';
Chart.defaults.font.family = "'Inter', sans-serif";

ScrollTrigger.create({
  trigger: '#myChartCanvas',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    new Chart(ctx, { /* options */ });
  }
});
```
