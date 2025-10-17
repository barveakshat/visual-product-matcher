# CLIP Service Deployment Script (PowerShell)
# This script deploys the CLIP service to Google Cloud Run

Write-Host "🚀 Deploying CLIP Service to Google Cloud Run..." -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

$PROJECT_ID = "product-matcher-475408"
$SERVICE_NAME = "clip-service"
$REGION = "us-central1"
$MEMORY = "2Gi"
$TIMEOUT = "300"

Write-Host "📦 Building and deploying from source..." -ForegroundColor Yellow
gcloud run deploy $SERVICE_NAME `
  --source . `
  --region=$REGION `
  --project=$PROJECT_ID `
  --memory=$MEMORY `
  --allow-unauthenticated `
  --timeout=$TIMEOUT `
  --max-instances=10 `
  --platform=managed

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Deployment complete!" -ForegroundColor Green
    Write-Host "🔗 Service URL:" -ForegroundColor Cyan
    gcloud run services describe $SERVICE_NAME `
      --region=$REGION `
      --project=$PROJECT_ID `
      --format="value(status.url)"
} else {
    Write-Host ""
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    Write-Host "Please check the error messages above." -ForegroundColor Red
}
