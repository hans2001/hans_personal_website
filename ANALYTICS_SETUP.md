# Analytics Setup Guide

This guide covers how to add analytics to your portfolio site. Choose one of the options below.

## Option 1: Google Analytics 4 (GA4) - Recommended for comprehensive analytics

### Steps:

1. **Create a Google Analytics account**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new property (GA4)

2. **Get your Measurement ID**
   - After creating a property, you'll get a Measurement ID like `G-XXXXXXXXXX`

3. **Add to your site**
   - Create a new file: `frontend/public/gtag.js`
   - Add the following content:

```javascript
// Google Analytics
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'YOUR_MEASUREMENT_ID'); // Replace with your ID
```

4. **Update index.html**
   - Add this before the closing `</head>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_MEASUREMENT_ID"></script>
<script src="/gtag.js"></script>
```

## Option 2: Plausible Analytics - Privacy-friendly alternative

### Steps:

1. **Sign up for Plausible**
   - Go to [plausible.io](https://plausible.io/)
   - Create an account and add your domain

2. **Add to index.html**
   - Add this before the closing `</head>` tag:

```html
<!-- Plausible Analytics -->
<script defer data-domain="hans-ho.vercel.app" src="https://plausible.io/js/script.js"></script>
```

**Benefits of Plausible:**
- Privacy-friendly (GDPR compliant, no cookies)
- Simple dashboard
- Lightweight (~1KB)
- Open source

## Option 3: Vercel Analytics (if using Vercel)

If you're using Vercel, you can use their built-in analytics:

1. **Install the package:**
   ```bash
   cd frontend
   npm install @vercel/analytics
   ```

2. **Add to main.jsx:**
   ```javascript
   import { Analytics } from '@vercel/analytics/react'
   
   // In your App component or root component:
   <Analytics />
   ```

## Recommendation

For a portfolio site, **Plausible** is recommended because:
- Privacy-friendly (no cookie banners needed)
- Simple and clean
- Fast loading
- Good free tier for personal sites

If you need detailed Google Search Console integration, use **Google Analytics 4**.

