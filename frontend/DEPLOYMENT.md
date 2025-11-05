# Deployment Guide for Yuki Cui's Portfolio

This guide covers deploying your portfolio website to various platforms.

## 🚀 Option 1: Vercel (Recommended - Easiest & Best Performance)

Vercel is the best choice for React/Vite projects. It offers:
- ✅ Free tier with generous limits
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Instant deployments from Git
- ✅ Zero configuration needed

### Quick Deploy (Recommended)

1. **Push to GitHub** (if not already):
   ```bash
   git add .
   git commit -m "Add portfolio website"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "Add New Project"
   - Select your repository
   - **Root Directory**: Set to `frontend`
   - **Framework Preset**: Vite (auto-detected)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - Click "Deploy"

3. **Done!** Your site will be live at `your-project.vercel.app`

### Manual Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to frontend directory
cd frontend

# Deploy
vercel

# For production
vercel --prod
```

## 🌐 Option 2: Netlify

Netlify is another excellent option with similar features:

1. **Push to GitHub**
2. Go to [netlify.com](https://netlify.com)
3. Sign up and click "Add new site" → "Import an existing project"
4. Select your GitHub repo
5. **Build settings**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
6. Click "Deploy site"

## 📦 Option 3: GitHub Pages

For a free static site hosting:

1. **Install gh-pages**:
   ```bash
   cd frontend
   npm install --save-dev gh-pages
   ```

2. **Update package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/face_looker"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

## 🔧 Configuration Files

### Vercel Configuration (Already Created)

The `vercel.json` file is already configured for your project:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite
- SPA routing: All routes redirect to `index.html`

### Environment Variables

If you need environment variables (e.g., API keys):
1. In Vercel: Project Settings → Environment Variables
2. Add variables for Production, Preview, and Development
3. Access them in code: `import.meta.env.VITE_YOUR_VAR`

## 🎯 Best Practices

1. **Custom Domain**: 
   - Vercel: Project Settings → Domains → Add your domain
   - Free SSL certificate automatically provided

2. **Continuous Deployment**:
   - Every push to `main` branch auto-deploys
   - Preview deployments for PRs

3. **Performance**:
   - Vercel automatically optimizes images
   - Global CDN ensures fast loading worldwide

## 📝 Pre-Deployment Checklist

- [ ] Test build locally: `npm run build`
- [ ] Verify `dist/` folder is generated
- [ ] Check all images/assets are in `public/` folder
- [ ] Test the preview: `npm run preview`
- [ ] Ensure all links work
- [ ] Check mobile responsiveness

## 🐛 Troubleshooting

**Build fails:**
- Check Node.js version (Vercel uses Node 18+ by default)
- Verify all dependencies are in `package.json`

**404 errors on routes:**
- Make sure `vercel.json` has the rewrite rule (already configured)

**Images not loading:**
- Ensure images are in `public/` folder
- Use absolute paths: `/faces/image.webp` not `./faces/image.webp`

## 📊 Platform Comparison

| Feature | Vercel | Netlify | GitHub Pages |
|---------|--------|---------|--------------|
| Free Tier | ✅ Excellent | ✅ Good | ✅ Limited |
| Auto Deploy | ✅ Yes | ✅ Yes | ⚠️ Manual |
| Custom Domain | ✅ Free | ✅ Free | ✅ Free |
| CDN | ✅ Global | ✅ Global | ⚠️ Limited |
| SSL | ✅ Auto | ✅ Auto | ✅ Auto |
| Performance | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

**Recommendation**: Use **Vercel** for the best experience!

