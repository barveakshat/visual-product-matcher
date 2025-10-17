# CLIP Image Encoder Service

BentoML service for encoding images into 512-dimensional CLIP embeddings for visual similarity matching.

## Features

- ✅ **512-dimensional embeddings** (vs 5-dim from Hugging Face)
- ✅ **Fast local inference** (no API calls)
- ✅ **Production-ready** (BentoML framework)
- ✅ **GPU support** (auto-detects CUDA)
- ✅ **Normalized embeddings** (ready for cosine similarity)

## Setup

### 1. Install Dependencies

```bash
cd clip-service

# Option A: Using pip
pip install -r requirements.txt

# Option B: Using conda (recommended)
conda create -n clip-service python=3.10
conda activate clip-service
pip install -r requirements.txt
```

### 2. Install CLIP

```bash
pip install git+https://github.com/openai/CLIP.git
```

### 3. Download Model (First Time)

```bash
# This downloads ViT-B/32 model (~350MB)
python -c "import clip; import torch; clip.load('ViT-B/32', device='cpu')"
```

## Usage

### Start Service

```bash
# Development mode (with auto-reload)
bentoml serve service:svc --port 3000 --reload

# Production mode
bentoml serve service:svc --port 3000
```

Expected output:

```
Starting production HTTP BentoServer from "service:svc"
Service loaded successfully
✅ CLIP model loaded successfully on cpu
   Model: ViT-B/32
   Output dimensions: 512
Uvicorn running on http://0.0.0.0:3000
Application startup complete
```

### Test Service

```bash
# Health check
curl http://localhost:3000/health

# Encode image
curl -X POST http://localhost:3000/encode_image \
  -F "image=@/path/to/image.jpg"
```

### Python Client

```python
import requests

# Encode image
with open('image.jpg', 'rb') as f:
    response = requests.post(
        'http://localhost:3000/encode_image',
        files={'image': f}
    )

embedding = response.json()
print(f"Embedding dimensions: {len(embedding)}")  # 512
```

## API Endpoints

### POST /encode_image

Encode image to 512-dim CLIP embedding.

**Request:**

- Content-Type: multipart/form-data
- Body: `image` (file, JPEG/PNG/etc.)

**Response:**

```json
[0.123, -0.456, 0.789, ..., 0.234]  // 512 numbers
```

### GET /health

Health check endpoint.

**Response:**

```json
{
  "status": "healthy",
  "model": "ViT-B/32",
  "device": "cpu",
  "embedding_size": 512
}
```

## Integration with Backend

The backend automatically uses this service when `USE_LOCAL_CLIP=true` in `.env`:

```env
USE_LOCAL_CLIP=true
LOCAL_CLIP_URL=http://localhost:3000
```

## Performance

- **CPU:** ~100-200ms per image
- **GPU:** ~20-50ms per image
- **Memory:** ~2GB (model + overhead)

## Troubleshooting

### Port already in use

```bash
bentoml serve service:svc --port 3001
```

Update backend `.env`:

```env
LOCAL_CLIP_URL=http://localhost:3001
```

### CUDA out of memory

Edit `service.py`, force CPU:

```python
self.device = "cpu"
```

### Module not found: clip

```bash
pip install git+https://github.com/openai/CLIP.git
```

### Module not found: bentoml

```bash
pip install bentoml
```

## Model Information

- **Model:** OpenAI CLIP ViT-B/32
- **Input:** RGB images (any size, auto-resized)
- **Output:** 512-dimensional normalized embedding
- **Training:** 400M image-text pairs
- **Use Case:** Visual similarity, image search, zero-shot classification

## License

CLIP model: MIT License (OpenAI)
BentoML: Apache 2.0 License
