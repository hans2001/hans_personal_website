# Core Web Vitals Verification Guide

Core Web Vitals are key metrics Google uses to measure user experience on your site. Here's how to verify and optimize them.

## What are Core Web Vitals?

Three main metrics:

1. **LCP (Largest Contentful Paint)** - Loading performance
   - Good: < 2.5 seconds
   - Needs improvement: 2.5 - 4 seconds
   - Poor: > 4 seconds

2. **FID (First Input Delay)** - Interactivity
   - Good: < 100 milliseconds
   - Needs improvement: 100 - 300 ms
   - Poor: > 300 ms

3. **CLS (Cumulative Layout Shift)** - Visual stability
   - Good: < 0.1
   - Needs improvement: 0.1 - 0.25
   - Poor: > 0.25

## How to Verify

### Method 1: Google Search Console (Recommended)

1. **Set up Google Search Console** (if not already done)
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add your property: `https://chaksingho.com`

2. **Check Core Web Vitals Report**
   - Navigate to: Experience → Core Web Vitals
   - Review mobile and desktop scores
   - Data updates within 28 days

### Method 2: PageSpeed Insights

1. **Test your site**
   - Go to [PageSpeed Insights](https://pagespeed.web.dev/)
   - Enter your URL: `https://chaksingho.com`
   - Click "Analyze"

2. **Review results**
   - Check Core Web Vitals scores
   - Review opportunities for improvement
   - Test both mobile and desktop

### Method 3: Chrome DevTools (Real User Monitoring)

1. **Open Chrome DevTools**
   - Press F12 or Right-click → Inspect

2. **Open Lighthouse**
   - Go to the "Lighthouse" tab
   - Select "Performance"
   - Choose "Desktop" or "Mobile"
   - Click "Analyze page load"

3. **Review Core Web Vitals**
   - Check the Performance score
   - Review specific metrics
   - See optimization opportunities

### Method 4: Chrome User Experience Report (CrUX)

- Visit: [Chrome User Experience Report](https://developers.google.com/web/tools/chrome-user-experience-report)
- Search for your domain
- View real-world Core Web Vitals data

## Optimization Tips

### For LCP (Loading Performance)

- ✅ Optimize images (already done - using WebP format)
- ✅ Use `loading="lazy"` for images below the fold (already implemented)
- ✅ Minimize render-blocking resources
- ✅ Use efficient image formats (WebP, AVIF)
- ✅ Enable Vercel's image optimization (automatic)

### For FID (Interactivity)

- ✅ Minimize JavaScript execution time
- ✅ Break up long tasks
- ✅ Use code splitting (Vite handles this automatically)
- ✅ Reduce third-party script impact
- ✅ Optimize React component rendering

### For CLS (Layout Stability)

- ✅ Set explicit width/height on images (check your images)
- ✅ Reserve space for dynamic content
- ✅ Avoid inserting content above existing content
- ✅ Use `transform` animations instead of properties that trigger layout

## Current Status Check

To check your current Core Web Vitals:

1. **Run PageSpeed Insights** on your live site
2. **Review the report** for each metric
3. **Address any "Poor" or "Needs Improvement" issues**
4. **Re-test** after making changes

## Quick Win Checklist

- [ ] Run PageSpeed Insights test
- [ ] Review LCP score (target: < 2.5s)
- [ ] Review FID score (target: < 100ms)
- [ ] Review CLS score (target: < 0.1)
- [ ] Fix any critical issues
- [ ] Re-test to verify improvements

## Additional Resources

- [Web Vitals Extension](https://chrome.google.com/webstore/detail/web-vitals/ahfhijdlegdabablpippeagghigmibma) - Real-time metrics in Chrome
- [Web.dev Measure Tool](https://web.dev/measure/) - Comprehensive site analysis
- [Vercel Analytics](https://vercel.com/docs/analytics) - Built-in performance monitoring




