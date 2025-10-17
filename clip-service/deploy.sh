#!/bin/bash

# CLIP Service Deployment Script
# This script deploys the CLIP service to Google Cloud Run

echo "🚀 Deploying CLIP Service to Google Cloud Run..."
echo "================================================"

PROJECT_ID="product-matcher-475408"
SERVICE_NAME="clip-service"
REGION="us-central1"
MEMORY="2Gi"
TIMEOUT="300"

echo "📦 Building and deploying from source..."
gcloud run deploy $SERVICE_NAME \
  --source . \
  --region=$REGION \
  --project=$PROJECT_ID \
  --memory=$MEMORY \
  --allow-unauthenticated \
  --timeout=$TIMEOUT \
  --max-instances=10 \
  --platform=managed

echo ""
echo "✅ Deployment complete!"
echo "🔗 Service URL:"
gcloud run services describe $SERVICE_NAME \
  --region=$REGION \
  --project=$PROJECT_ID \
  --format="value(status.url)"
