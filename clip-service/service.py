import torch
import clip
from PIL import Image
import io
import logging
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import uvicorn

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

logger.info("Loading CLIP model...")
device = "cuda" if torch.cuda.is_available() else "cpu"

try:
    model, preprocess = clip.load("ViT-B/32", device=device)
    model.eval()
    logger.info(f"✅ CLIP model loaded successfully on {device}")
    logger.info(f"   Model: ViT-B/32")
    logger.info(f"   Output dimensions: 512")
except Exception as e:
    logger.error(f"Failed to load CLIP model: {e}")
    raise

app = FastAPI(
    title="CLIP Image Encoder Service",
    description="Production-ready CLIP image embedding service",
    version="1.0.0"
)

@app.post("/encode_image")
async def encode_image(file: UploadFile = File(...)):
    """
    Encode image to CLIP embedding vector
    
    Args:
        file: Uploaded image file (JPEG, PNG, etc.)
        
    Returns:
        JSON: 512-dimensional embedding vector (L2-normalized for cosine similarity)
    
    Raises:
        HTTPException: If image processing fails
    """
    try:
        if file.content_type not in ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']:
            raise HTTPException(
                status_code=400,
                detail=f"Unsupported file type: {file.content_type}. Use JPEG, PNG, or WebP"
            )
        
        image_bytes = await file.read()
        
        if len(image_bytes) == 0:
            raise HTTPException(status_code=400, detail="Empty file uploaded")
        
        if len(image_bytes) > 10 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="File too large (max 10MB)")
        
        image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        
        img_tensor = preprocess(image).unsqueeze(0).to(device)
        
        with torch.no_grad():
            image_features = model.encode_image(img_tensor)
            image_features = image_features / image_features.norm(dim=-1, keepdim=True)
        
        embedding = image_features.cpu().numpy()[0].tolist()
        
        return JSONResponse(content=embedding)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error encoding image: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to encode image: {str(e)}"
        )

@app.get("/health")
async def health():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model": "ViT-B/32",
        "device": device,
        "embedding_size": 512,
        "version": "1.0.0"
    }

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "service": "CLIP Image Encoder",
        "version": "1.0.0",
        "endpoints": {
            "encode": "/encode_image (POST)",
            "health": "/health (GET)",
            "docs": "/docs"
        }
    }

if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(
        app, 
        host="0.0.0.0", 
        port=port,
        log_level="info"
    )

