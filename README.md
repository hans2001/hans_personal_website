# Face Looker 👁️



https://github.com/user-attachments/assets/c8684ae4-3009-47cb-8ad4-0e7af65a608f



Generate a grid of face images with different gaze directions using AI, then use them to create an interactive face that follows the user's cursor in real-time.

![Demo](demo.gif)

## 🎯 Overview

This project has two parts:
1. **Python Script** - Generates hundreds of face images looking in different directions using Replicate's AI
2. **React Hook** - Makes those images interactive by displaying the right image based on cursor position

Perfect for creating engaging portfolio headers, interactive avatars, or fun UI elements!

## 📋 Prerequisites

- Python 3.7+
- Node.js (for React implementation)
- [Replicate API account](https://replicate.com/) (free tier available)
- A 512×512 photo of a face (your photo or any portrait)

## 🚀 Part 1: Generate Face Images

### Step 1: Setup

```bash
# Clone or download this repository
cd face_looker

# Create a virtual environment (recommended)
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Step 2: Get Your Replicate API Token

1. Sign up at [replicate.com](https://replicate.com/)
2. Go to your [account settings](https://replicate.com/account/api-tokens)
3. Copy your API token
4. Set it as an environment variable:

```bash
export REPLICATE_API_TOKEN=your_token_here
```

Or add it to your `.bashrc`/`.zshrc` for permanent use:

```bash
echo 'export REPLICATE_API_TOKEN=your_token_here' >> ~/.zshrc
source ~/.zshrc
```

### Step 3: Prepare Your Face Image

**Image Requirements:**
- Use a **512×512 pixel** image for best results
- Face should be centered and looking straight ahead
- Good lighting, clear features
- Neutral expression works best

**Where to put your image:**
1. **Any filename works!** You can use any name like `me.jpg`, `portrait.png`, `selfie.jpeg`, etc.
2. **Any location works!** You can put it in the project folder or anywhere on your computer
3. **Example file structure:**
   ```
   face_looker/
   ├── main.py
   ├── my_face.jpg          ← Your image can go here
   ├── requirements.txt
   └── README.md
   ```
   
   **Or anywhere else:**
   ```
   /Users/you/Pictures/portrait.png
   /path/to/any/folder/selfie.jpg
   ```

**Before running the script, make sure you have:**
- ✅ Set your `REPLICATE_API_TOKEN` environment variable
- ✅ Activated your virtual environment (if using one)
- ✅ Installed dependencies with `pip install -r requirements.txt`
- ✅ Your face image is in the project directory

### Step 4: Generate Your Face Grid

**Basic usage:**
```bash
# Any filename works!
python main.py --image ./my_face.jpg --out ./out
python main.py --image ./portrait.png --out ./out
python main.py --image /Users/you/Pictures/selfie.jpg --out ./out
```

**Custom grid density:**
```bash
# Smoother transitions (more images, longer generation time)
python main.py --image ./my_face.jpg --out ./out --step 2.5

# Faster generation (fewer images, less smooth)
python main.py --image ./my_face.jpg --out ./out --step 5
```

**Full options:**
```bash
python main.py \
  --image ./my_face.jpg \      # Input image path or URL
  --out ./out \                # Output directory
  --min -15 \                  # Minimum gaze value
  --max 15 \                   # Maximum gaze value
  --step 3 \                   # Step size (smaller = more images)
  --size 256 \                 # Output image size (256x256)
  --skip-existing              # Skip already generated images
```

### Understanding the Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `--min` | -15 | Minimum pupil position (left/up) |
| `--max` | 15 | Maximum pupil position (right/down) |
| `--step` | 3 | Grid spacing (smaller = smoother, more images) |
| `--size` | 256 | Output image dimensions (256×256) |

**Image count formula:** `((max - min) / step + 1)²`

Examples:
- `step=3` (default): 121 images (11×11 grid)
- `step=2.5`: 169 images (13×13 grid)
- `step=5`: 49 images (7×7 grid)

### Step 5: Output

The script generates:
- **Images:** `gaze_px{X}_py{Y}_256.webp` files
  - Example: `gaze_px0_py0_256.webp` (looking at center)
  - Example: `gaze_px15_py0_256.webp` (looking right)
  - Example: `gaze_px0_pym15_256.webp` (looking up)
- **CSV Index:** `index.csv` mapping filenames to coordinates

```
out/
  ├── gaze_px-15_py-15_256.webp
  ├── gaze_px-15_py-12_256.webp
  ├── ...
  ├── gaze_px15_py15_256.webp
  └── index.csv
```

## 🎨 Part 2: React Implementation

### Setup in Your React Project

1. **Copy the generated faces to your public folder:**

```bash
# Copy all face images to your React public folder
cp -r ./out/faces /path/to/your-react-app/public/faces
```

2. **Copy the React files to your project:**

```bash
# Copy the hook and component
cp useGazeTracking.js /path/to/your-react-app/src/hooks/
cp FaceTracker.jsx /path/to/your-react-app/src/components/
cp FaceTracker.css /path/to/your-react-app/src/components/
```

### Basic Usage

```jsx
import FaceTracker from './components/FaceTracker';

function App() {
  return (
    <div className="App">
      <h1>My Portfolio</h1>
      
      {/* Basic usage */}
      <FaceTracker />
      
      {/* With custom styling */}
      <FaceTracker 
        className="my-custom-class"
        basePath="/faces/"
      />
    </div>
  );
}
```

### Advanced Usage

```jsx
import FaceTracker from './components/FaceTracker';

function Header() {
  return (
    <header style={{ 
      height: '400px', 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ width: '300px', height: '300px' }}>
        <FaceTracker 
          basePath="/faces/"
          showDebug={process.env.NODE_ENV === 'development'}
        />
      </div>
    </header>
  );
}
```

### Using the Hook Directly

For more control, use the `useGazeTracking` hook directly:

```jsx
import { useRef, useEffect } from 'react';
import { useGazeTracking } from './hooks/useGazeTracking';

function CustomFaceComponent() {
  const containerRef = useRef(null);
  const { currentImage, isLoading, error } = useGazeTracking(
    containerRef, 
    '/faces/'
  );

  return (
    <div 
      ref={containerRef} 
      style={{ width: '400px', height: '400px', position: 'relative' }}
    >
      {currentImage && (
        <img 
          src={currentImage} 
          alt="Following face"
          style={{ 
            width: '100%', 
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50%'  // Make it circular!
          }}
        />
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}
```

### Configuration

If you change the generation parameters, update these constants in `useGazeTracking.js`:

```javascript
// Must match your generation parameters!
const P_MIN = -15;  // Same as --min
const P_MAX = 15;   // Same as --max
const STEP = 3;     // Same as --step
const SIZE = 256;   // Same as --size
```

## 🎛️ Customization

### Changing Image Directory

```jsx
<FaceTracker basePath="/assets/my-face/" />
```

### Adding Custom Styling

```css
/* FaceTracker.css */
.face-tracker {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: #f0f0f0;
  border-radius: 50%; /* Circular face */
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.face-image {
  user-select: none;
  pointer-events: none;
}

.face-debug {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-family: monospace;
  font-size: 12px;
}
```

### Performance Optimization

1. **Preload images** (optional):
```jsx
useEffect(() => {
  // Preload all face images
  const images = [];
  for (let py = -15; py <= 15; py += 3) {
    for (let px = -15; px <= 15; px += 3) {
      const img = new Image();
      img.src = `/faces/gaze_px${px}_py${py}_256.webp`;
      images.push(img);
    }
  }
}, []);
```

2. **Use fewer images** - Generate with larger `--step` value (e.g., `--step 5`)

## 📱 Mobile Support

The component automatically supports touch events! The face will follow finger movement on mobile devices.

## 🔧 Troubleshooting

### Images not generating?

**Check your API token:**
```bash
echo $REPLICATE_API_TOKEN
```

**Verify Replicate credits:**
- Check your account at [replicate.com/account](https://replicate.com/account)
- Free tier includes some credits, but may require payment for large batches

**Resume interrupted generation:**
```bash
python main.py --image ./my_face.jpg --out ./out --skip-existing
```

### Face not following cursor in React?

1. **Verify images are in the correct location:**
   - Check `public/faces/` directory exists
   - Confirm images have correct naming pattern

2. **Check browser console for errors:**
   - Missing images will show 404 errors
   - Path issues will show in network tab

3. **Verify configuration matches:**
   - `P_MIN`, `P_MAX`, `STEP` in `useGazeTracking.js` must match generation parameters

### Performance issues?

- Generate fewer images (use `--step 5` or higher)
- Reduce image size (use `--size 128`)
- Preload images (see Performance Optimization above)

## 📊 Cost Estimation

Replicate charges per second of GPU time (not per image). The `fofr/expression-editor` model typically uses a T4 GPU.

**Current Pricing (2024):**
- GPU cost: ~$0.000225/second (T4 GPU)
- Average processing time: ~5-10 seconds per image
- **Cost per image: ~$0.001 - $0.002**

**Estimated batch costs:**
- 49 images (step=5): ~$0.05 - $0.10
- 121 images (step=3, default): ~$0.12 - $0.24
- 169 images (step=2.5): ~$0.17 - $0.34

**Note:** Actual costs vary based on:
- Processing time per image (varies by image complexity)
- Current Replicate pricing
- GPU availability (may use different GPU tiers)

Check current pricing at [replicate.com/pricing](https://replicate.com/pricing) and the [model page](https://replicate.com/fofr/expression-editor) for exact rates.

## 🎯 Use Cases

- **Portfolio headers** - Make your about page more engaging
- **Interactive avatars** - Add personality to chat interfaces
- **Product demos** - Draw attention to important elements
- **Educational content** - Create attention-grabbing tutorials
- **Games** - Use as character faces or NPCs

## 📝 Examples

See the [examples](./examples) folder for:
- Full Next.js implementation
- TypeScript version
- Circular face mask
- Multiple faces on one page

## 🤝 Contributing

Contributions welcome! Feel free to:
- Add new features
- Improve documentation
- Share your implementations
- Report bugs

## 📄 License

MIT License - feel free to use in personal and commercial projects!

## 🙏 Credits

- Face generation powered by [Replicate](https://replicate.com/)
- Uses [fofr/expression-editor](https://replicate.com/fofr/expression-editor) model
- Created with ❤️ by Kylan

## 🔗 Links

- [Replicate API Docs](https://replicate.com/docs)
- [Expression Editor Model](https://replicate.com/fofr/expression-editor)

---

**Questions?** Open an issue or contact me on X @kylancodes

**Like this project?** Give it a ⭐ on GitHub!
