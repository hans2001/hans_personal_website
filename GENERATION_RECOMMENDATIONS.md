# Face Image Generation Recommendations

## 🎯 Best ROI Recommendation: **Step 4.0**

### Recommended Parameters
```bash
python main.py \
  --image ./yuki_img.jpeg \
  --out ./out \
  --step 4.0 \
  --size 256 \
  --skip-existing
```

**Results:**
- **64 images** (8×8 grid)
- **Estimated cost:** $0.06 - $0.13
- **Smoothness:** Good (smooth enough for professional portfolio)
- **File size:** ~50-100KB per image (manageable)

### Why Step 4.0?

1. **Cost-Effective**: Only $0.06-0.13 vs $0.12-0.24 for step 3.0
2. **Smooth Enough**: 8×8 grid provides smooth cursor tracking
3. **Fast Loading**: 64 images load quickly on web
4. **Professional Quality**: Good balance for portfolio site

## 📊 Comparison Table

| Step | Images | Grid | Cost (Low) | Cost (High) | Smoothness | Recommendation |
|------|--------|------|------------|-------------|------------|----------------|
| **3.0** | 121 | 11×11 | $0.12 | $0.24 | Excellent | ⭐⭐⭐ (if budget allows) |
| **4.0** | 64 | 8×8 | $0.06 | $0.13 | Good | ⭐⭐⭐⭐⭐ **BEST ROI** |
| 5.0 | 49 | 7×7 | $0.05 | $0.10 | Moderate | ⭐⭐⭐ (budget option) |
| 6.0 | 36 | 6×6 | $0.04 | $0.07 | Lower | ⭐⭐ (too choppy) |

## 🖼️ Image Quality Settings

### Input Image (yuki_img.jpeg)
- ✅ **400×400 pixels** - Perfect! Square format, good resolution
- ✅ **JPEG format** - Compatible with model
- ✅ **No resizing needed** - Model accepts this size

### Output Settings
- **Size: 256×256** - Optimal for web
  - Good quality for portfolio
  - Fast loading (small file size)
  - Sharp on most screens
  - Standard web resolution

### Alternative Options (if you want higher quality)
- **Size: 512×512** - Higher quality, larger files
  - Use if you want ultra-sharp images
  - Files will be 2-3x larger
  - Still acceptable web performance

## 💰 Cost Breakdown

### Step 4.0 (Recommended)
- **64 images** × $0.001-0.002 per image
- **Total: $0.06 - $0.13**
- **Processing time:** ~5-10 minutes (with rate limiting)

### If You Want Smoother Animation
- **Step 3.0:** 121 images = $0.12 - $0.24
- **Step 2.5:** 169 images = $0.17 - $0.34 (very smooth but expensive)

## 🚀 Generation Command

```bash
# Activate virtual environment
source .venv/bin/activate

# Load API token from .env
export $(grep -v '^#' .env | xargs)

# Generate with recommended settings
python main.py \
  --image ./yuki_img.jpeg \
  --out ./out \
  --step 4.0 \
  --size 256 \
  --skip-existing
```

## 📝 Frontend Configuration

After generation, update the frontend hook to match:

**File:** `frontend/src/hooks/useGazeTracking.js`

```javascript
const STEP = 4.0;  // Change from 3 to 4.0
```

## ✅ Pre-Generation Checklist

- [ ] Image is 400×400 (✓ already good)
- [ ] Have Replicate API token in `.env`
- [ ] Have sufficient credit (~$0.10-0.15)
- [ ] Virtual environment activated
- [ ] Ready to wait ~5-10 minutes for generation

## 🎨 Final Recommendation

**Use Step 4.0 with 256×256 output size**

This gives you:
- Professional quality animation
- Smooth cursor tracking
- Low cost ($0.06-0.13)
- Fast website loading
- Perfect for portfolio showcase

