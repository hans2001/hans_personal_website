#!/bin/bash
# Generate face images with step 2.0 (ultra smooth - 256 images)

echo "🎨 Generating face images with Step 2.0..."
echo "📊 Will create 256 images (16×16 grid)"
echo "💰 Estimated cost: $0.26 - $0.51"
echo "⏱️  Estimated time: ~42 minutes (with rate limiting)"
echo ""

# Activate virtual environment
source .venv/bin/activate

# Load environment variables
export $(grep -v '^#' .env | xargs)

# Generate images
python main.py \
  --image ./yuki_img.jpeg \
  --out ./out \
  --step 2.0 \
  --size 256 \
  --skip-existing

echo ""
echo "✅ Generation complete!"
echo "📁 Images saved to: ./out/"
echo ""
echo "Next steps:"
echo "1. Copy images to frontend: cp -r ./out/*.webp frontend/public/faces/"
echo "2. Commit and push to deploy to Vercel"

