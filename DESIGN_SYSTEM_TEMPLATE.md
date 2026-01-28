# Design System Template

This document outlines the reusable design patterns extracted from the scheduler template. Use this as a reference for consistent styling across projects.

## Color Palette

### Background Colors
- **Primary Background**: `bg-slate-50` or `bg-gradient-to-b from-white via-slate-50 to-slate-100`
- **Card Background**: `bg-white`
- **Secondary Background**: `bg-slate-100`

### Text Colors
- **Primary Text**: `text-slate-900`
- **Secondary Text**: `text-slate-600`
- **Muted Text**: `text-slate-500`
- **Tertiary Text**: `text-slate-400`

### Accent Colors
- **Success/Active**: `bg-emerald-500`, `text-green-600`
- **Info**: `bg-sky-500`, `bg-blue-600`
- **Warning**: `bg-amber-500`, `text-amber-600`
- **Error**: `bg-rose-500`, `text-red-600`
- **Highlight**: `bg-indigo-500`

## Typography

### Font Family
- **Primary**: Inter (`font-family: 'Inter', ui-sans-serif, system-ui`)
- **Fallback**: `ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto`

### Font Sizes
- **Hero/Display**: `text-4xl sm:text-5xl lg:text-6xl`
- **Heading 1**: `text-3xl sm:text-4xl`
- **Heading 2**: `text-2xl sm:text-3xl`
- **Heading 3**: `text-xl sm:text-2xl`
- **Body Large**: `text-base sm:text-lg`
- **Body**: `text-sm`
- **Small**: `text-xs`

### Font Weights
- **Semibold**: `font-semibold` (headings)
- **Medium**: `font-medium` (buttons, labels)
- **Normal**: `font-normal` (body text)

## Shadows

### Layered Shadow System
Use this for cards, buttons, and elevated surfaces:

```css
shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]
```

### Shadow Variations
- **Light Shadow**: `shadow-sm`
- **Medium Shadow**: `shadow-md`
- **Large Shadow**: Use the layered shadow above

## Border Radius

- **Small**: `rounded-lg` (8px)
- **Medium**: `rounded-xl` (12px)
- **Large**: `rounded-2xl` (16px)
- **Extra Large**: `rounded-3xl` (24px)
- **Full**: `rounded-full` (circular)

## Borders & Rings

- **Subtle Border**: `border border-slate-200`
- **Light Border**: `border border-slate-100`
- **Ring Border**: `ring-1 ring-black/5` or `ring-1 ring-white/10`
- **Focus Ring**: `focus:ring-2 focus:ring-slate-900/10`

## Buttons

### Primary Button
```html
<button class="inline-flex hover:bg-black transition text-sm font-medium text-white bg-slate-900 rounded-xl pt-3 pr-5 pb-3 pl-5 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] gap-2 items-center justify-center">
  Button Text
</button>
```

### Secondary Button
```html
<button class="inline-flex gap-2 hover:bg-slate-50 transition text-sm font-medium text-slate-900 bg-white rounded-xl pt-3 pr-5 pb-3 pl-5 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] items-center justify-center">
  Button Text
</button>
```

### Ghost Button
```html
<button class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 transition">
  Button Text
</button>
```

## Cards

### Standard Card
```html
<div class="bg-white rounded-3xl shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] ring-1 ring-black/5 p-6">
  Card Content
</div>
```

### Bordered Card
```html
<div class="bg-white rounded-xl border border-slate-200 p-4">
  Card Content
</div>
```

## Animations

### Fade Slide In Animation

Add this to your CSS or component:

```css
@keyframes fadeSlideIn {
  0% {
    opacity: 0;
    transform: translateY(30px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0px);
  }
}
```

### Animation Classes
- **Instant**: `[animation:fadeSlideIn_0.5s_ease-out_0.1s_both]`
- **Delayed**: `[animation:fadeSlideIn_0.5s_ease-out_0.2s_both]`
- **More Delayed**: `[animation:fadeSlideIn_0.5s_ease-out_0.3s_both]`

Use different delays (0.1s, 0.2s, 0.3s, 0.4s, 0.5s, 0.6s) to create staggered entrance effects.

### Scroll-Triggered Animations

Add this script to enable animations on scroll:

```javascript
// Inject CSS for paused/running states
const style = document.createElement("style");
style.textContent = `
  .animate-on-scroll { animation-play-state: paused !important; }
  .animate-on-scroll.animate { animation-play-state: running !important; }
`;
document.head.appendChild(style);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });

document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});
```

## Background Effects

### Gradient Background
```html
<div class="fixed -z-10 mix-blend-multiply top-0 right-0 bottom-0 left-0">
  <div class="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-100"></div>
  <div class="absolute -top-24 right-[-10%] h-72 w-72 rounded-full bg-gradient-to-tr from-indigo-200 to-sky-200 blur-3xl opacity-70"></div>
  <div class="bg-gradient-to-tr from-fuchsia-200 to-rose-200 opacity-60 w-72 h-72 rounded-full absolute bottom-0 left-[-10%] blur-3xl"></div>
</div>
```

## Form Elements

### Input Field
```html
<input
  type="text"
  placeholder="Placeholder text"
  class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-slate-900 bg-white"
/>
```

### Input with Icon
```html
<div class="relative">
  <svg class="absolute left-3 top-3 h-5 w-5 text-slate-400">...</svg>
  <input
    type="text"
    placeholder="Search..."
    class="w-full pl-10 pr-4 py-3 border border-slate-200 bg-slate-50 rounded-lg text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-300"
  />
</div>
```

## Badges & Pills

### Status Badge
```html
<div class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600 shadow-sm">
  <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
  Active Status
</div>
```

## Layout & Spacing

### Container
```html
<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  Content
</div>
```

### Spacing Scale
- **Tight**: `gap-2` or `gap-3`
- **Normal**: `gap-4` or `gap-6`
- **Relaxed**: `gap-8` or `gap-10`
- **Extra Relaxed**: `gap-12` or `gap-14`

### Section Padding
- **Mobile**: `py-8` or `py-12`
- **Desktop**: `py-16` or `py-20`

## Responsive Breakpoints

- **sm**: 640px (small tablets)
- **md**: 768px (tablets)
- **lg**: 1024px (laptops)
- **xl**: 1280px (desktops)

## Best Practices

1. **Consistency**: Use the same shadow, border radius, and spacing throughout
2. **Hierarchy**: Use size and weight to establish visual hierarchy
3. **Transitions**: Add `transition` class to interactive elements
4. **Accessibility**: Maintain sufficient color contrast (slate-900 on white)
5. **Responsiveness**: Use responsive text sizes (text-base sm:text-lg)
6. **Performance**: Use `antialiased` class for smoother text rendering
7. **Animations**: Stagger animations for sequential elements (0.1s increments)

## Quick Copy Classes

### Text Styles
- Hero: `text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900`
- Subtitle: `text-base sm:text-lg text-slate-600`
- Body: `text-sm text-slate-700`

### Container
- Standard: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`

### Grid Layout
- Two Column: `grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center`
- Three Column: `grid grid-cols-1 md:grid-cols-3 gap-6`

### Flexbox
- Center: `flex items-center justify-center`
- Between: `flex items-center justify-between`
- With Gap: `flex items-center gap-4`
