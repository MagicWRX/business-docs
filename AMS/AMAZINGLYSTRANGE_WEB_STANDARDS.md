# AMAZINGLYSTRANGE Web Standards

## 📋 Overview

This standardizes web development practices for Amazingly Strange LLC, ensuring accessible, performant, and maintainable websites. Covers HTML, CSS, JavaScript, SEO, and performance best practices.

## 🏗️ HTML Standards

### Document Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Amazingly Strange | [Page Title]</title>
    <!-- Meta tags for SEO -->
    <meta name="description" content="[Page description]">
    <meta name="keywords" content="[relevant keywords]">
    <meta name="author" content="Amazingly Strange LLC">
    <!-- Open Graph for social sharing -->
    <meta property="og:title" content="[Page title]">
    <meta property="og:description" content="[Page description]">
    <meta property="og:image" content="[Image URL]">
    <meta property="og:url" content="[Page URL]">
    <!-- Favicon -->
    <link rel="icon" href="/favicon.ico" type="image/x-icon">
</head>
<body>
    <!-- Skip to main content for accessibility -->
    <a href="#main" class="skip-link">Skip to main content</a>
    <main id="main">
        <!-- Page content -->
    </main>
</body>
</html>
```

### Semantic HTML
- Use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Avoid generic `<div>` when semantic elements apply
- Use heading hierarchy (h1 → h2 → h3, etc.)

### Accessibility
- Alt text for all images: `<img src="image.jpg" alt="Descriptive text">`
- Keyboard navigation support
- Color contrast ratios: 4.5:1 for normal text, 3:1 for large text
- ARIA labels where needed: `<button aria-label="Close menu">×</button>`

## 🎨 CSS Standards

### ITCSS Architecture (Followed)
```
1-settings/     /* Variables, fonts */
├── _variables.css
└── fonts.css

2-generic/      /* Reset, normalize */
├── global.css
└── base.css

3-elements/     /* HTML elements */
├── typography.css
└── paragraph.css

4-objects/      /* Layout patterns */
├── layout.css
└── image-container.css

5-components/   /* UI components */
├── navbar.css
├── blog.css
└── gallery.css

6-utilities/    /* Helpers, responsive */
└── responsive-mobile.css
```

### Naming Conventions
- BEM methodology: `.block__element--modifier`
- Example: `.navbar__link--active`
- Utility classes: `.text-center`, `.hidden`

### Responsive Design
- Mobile-first approach
- Breakpoints: 768px (tablet), 1024px (desktop)
- Use `rem` for font sizes, `em` for spacing

### Performance
- Minimize CSS: Combine files, remove unused styles
- Use CSS Grid and Flexbox for layouts
- Avoid `@import` in production

## 🔧 JavaScript Standards

### ES6+ Features
- Use `const`/`let` instead of `var`
- Arrow functions: `const func = () => {}`
- Template literals: `` `Hello ${name}` ``
- Destructuring: `const {prop} = obj`

### Module Pattern
```javascript
// firebase-config.js
export const config = { /* ... */ };
export default app;
```

### Error Handling
```javascript
try {
    // Code that might fail
} catch (error) {
    console.error('Error:', error);
    // User-friendly error message
}
```

### Performance
- Use `requestAnimationFrame` for animations
- Debounce/throttle event handlers
- Lazy load images and scripts

## 🔍 SEO Standards

### On-Page SEO
- Unique title tags (< 60 characters)
- Meta descriptions (< 160 characters)
- H1 tag once per page, descriptive
- URL structure: `/pages/descriptive-name.html`
- Internal linking with descriptive anchor text

### Technical SEO
- XML sitemap: `sitemap.xml`
- Robots.txt: Allow all crawlers
- Page speed: < 3 seconds load time
- Mobile-friendly design
- HTTPS enabled

### Content SEO
- Keyword research and natural usage
- Image alt text with keywords
- Structured data (JSON-LD) for games/apps
- Regular content updates

## 📱 Performance Standards

### Core Web Vitals
- Largest Contentful Paint (LCP): < 2.5s
- First Input Delay (FID): < 100ms
- Cumulative Layout Shift (CLS): < 0.1

### Optimization Techniques
- Image compression and WebP format
- Font loading optimization (font-display: swap)
- Minimize HTTP requests
- Use CDN for assets (Firebase Storage)
- Cache static assets

### Monitoring
- Google PageSpeed Insights
- Lighthouse audits
- Firebase Performance Monitoring

## 🔐 Security Standards

### Content Security Policy
```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' https://www.gstatic.com https://cdn.jsdelivr.net;
    style-src 'self' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' https://firebasestorage.googleapis.com;
">
```

### Firebase Security Rules
- Authenticated users only for admin functions
- Public read for blog content
- Secure file uploads

### Input Validation
- Sanitize user inputs
- Escape HTML in dynamic content
- Use prepared statements for database queries

## 🧪 Testing Standards

### Manual Testing
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile device testing
- Accessibility testing (WAVE, axe)

### Automated Testing
- HTML validation
- CSS linting
- JavaScript syntax checking
- Link checking

### Performance Testing
- Page load times
- Image optimization
- Bundle size analysis

## 📚 Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [Google Web Fundamentals](https://developers.google.com/web/fundamentals)
- [Web.dev](https://web.dev/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [SEO Best Practices](https://developers.google.com/search/docs)