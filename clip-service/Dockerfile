# Use Python 3.11 slim image for smaller size
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Pre-download CLIP model during build to avoid runtime download
RUN python -c "import clip; clip.load('ViT-B/32', device='cpu')"

# Copy application code
COPY . .

# Set environment variables
ENV PORT=8080
ENV PYTHONUNBUFFERED=1

# Expose port (Cloud Run will inject PORT env var)
EXPOSE 8080

# Run the application
CMD uvicorn service:app --host 0.0.0.0 --port ${PORT}
