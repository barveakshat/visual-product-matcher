# Deploying CLIP Service to Google Cloud Run

## Prerequisites

1. **Google Cloud Account**: Sign up at https://cloud.google.com/free

   - Free tier includes: 2 million requests/month, 360,000 GB-seconds/month
   - Credit card required but won't be charged unless you upgrade

2. **Install Google Cloud CLI (gcloud)**:
   - Windows: Download from https://cloud.google.com/sdk/docs/install
   - Or use Cloud Shell (browser-based, no install needed)

## Quick Start: Deploy from Google Cloud Shell (Easiest)

**No installation required! Deploy directly from your browser:**

### 1. Open Cloud Shell
1. Go to https://console.cloud.google.com/
2. Sign in with your Google account
3. Click the **Activate Cloud Shell** icon (>_) in the top-right corner
4. Wait for the terminal to load (~10 seconds)

### 2. Clone Your Repository
```bash
git clone https://github.com/barveakshat/visual-product-matcher.git
cd visual-product-matcher/clip-service
```

### 3. Set Up Project (First Time Only)
```bash
# Create a new project
gcloud projects create visual-product-matcher-$(date +%s) --name="Visual Product Matcher"

# Set it as active (replace PROJECT_ID with the one created above)
gcloud config set project visual-product-matcher-XXXXXXXXXX

# Enable required APIs (takes ~1 minute)
gcloud services enable cloudbuild.googleapis.com run.googleapis.com artifactregistry.googleapis.com
```

**Or use existing project:**
```bash
# List your projects
gcloud projects list

# Set active project
gcloud config set project YOUR_PROJECT_ID
```

### 4. Deploy to Cloud Run (One Command)
```bash
gcloud run deploy clip-service \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 1 \
  --timeout 300 \
  --max-instances 5 \
  --min-instances 0
```

**When prompted:**
- "Please specify a region": Press Enter (uses us-central1)
- "Allow unauthenticated invocations": Type `y` and press Enter

### 5. Wait for Deployment
- Build time: 8-12 minutes (first time)
- You'll see progress: Uploading → Building → Deploying
- Final output will show your service URL

### 6. Test Your Service
```bash
# Get your service URL
SERVICE_URL=$(gcloud run services describe clip-service --region us-central1 --format 'value(status.url)')
echo $SERVICE_URL

# Test health endpoint
curl $SERVICE_URL/health

# Expected response:
# {"status":"healthy","model":"ViT-B/32","device":"cpu","embedding_size":512,"version":"1.0.0"}
```

### 7. Save Your URL
Copy the service URL from the output. You'll need it for backend configuration.

**Example URL:** `https://clip-service-abc123xyz-uc.a.run.app`

---

## Step-by-Step Deployment (Local Machine)

### 1. Set Up Google Cloud Project

```bash
# Login to Google Cloud
gcloud auth login

# Create a new project (or use existing)
gcloud projects create visual-product-matcher --name="Visual Product Matcher"

# Set the project as active
gcloud config set project visual-product-matcher

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
```

### 2. Build and Deploy from Local Machine

Navigate to your clip-service directory:

```bash
cd D:\Studies\Projects\HACKATHONS\Visual-product-matcher\clip-service
```

Deploy directly to Cloud Run (this will build and deploy in one command):

```bash
gcloud run deploy clip-service \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 1 \
  --timeout 300 \
  --max-instances 5 \
  --min-instances 0
```

**PowerShell users**: Use this format instead:

```powershell
gcloud run deploy clip-service `
  --source . `
  --platform managed `
  --region us-central1 `
  --allow-unauthenticated `
  --memory 2Gi `
  --cpu 1 `
  --timeout 300 `
  --max-instances 5 `
  --min-instances 0
```

### 3. Configuration Explanation

- `--source .`: Builds from current directory using Dockerfile
- `--memory 2Gi`: Allocates 2GB RAM (enough for CLIP model)
- `--cpu 1`: 1 vCPU (sufficient for inference)
- `--allow-unauthenticated`: Public access (required for your app)
- `--min-instances 0`: Scales to zero when idle (saves costs)
- `--max-instances 5`: Prevents runaway costs
- `--timeout 300`: 5-minute timeout for longer requests

### 4. First Deployment Process

The deployment will:

1. Upload your code to Google Cloud Build
2. Build the Docker image (8-12 minutes)
   - Downloads CLIP model (~350MB)
   - Installs PyTorch and dependencies
3. Push image to Artifact Registry
4. Deploy to Cloud Run
5. Provide your service URL

**Expected output:**

```
Building using Dockerfile and deploying container to Cloud Run service [clip-service]...
✓ Building and deploying... Done.
  ✓ Uploading sources...
  ✓ Building Container...
  ✓ Creating Revision...
  ✓ Routing traffic...
Service URL: https://clip-service-XXXXXXXXXX-uc.a.run.app
```

### 5. Test Your Deployment

```bash
# Get your service URL
gcloud run services describe clip-service --region us-central1 --format 'value(status.url)'

# Test health endpoint
curl https://clip-service-XXXXXXXXXX-uc.a.run.app/health

# Test image encoding
curl -X POST https://clip-service-XXXXXXXXXX-uc.a.run.app/encode_image \
  -F "file=@path/to/test-image.jpg"
```

### 6. Save Your Service URL

Copy the service URL (e.g., `https://clip-service-XXXXXXXXXX-uc.a.run.app`) - you'll need this for your backend configuration.

## Alternative: Deploy from GitHub

If you prefer deploying from your GitHub repo:

```bash
gcloud run deploy clip-service \
  --source https://github.com/barveakshat/visual-product-matcher \
  --source-dir clip-service \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 1
```

## Cost Estimation (Free Tier)

Google Cloud Run free tier includes:

- **2 million requests/month**: Free
- **360,000 GB-seconds/month**: With 2GB RAM, this is ~50 hours/month free
- **180,000 vCPU-seconds/month**: ~50 hours/month free

For a prototype/demo with moderate usage, you'll likely stay within free limits.

**After free tier:**

- $0.00002400 per GB-second (2GB = $0.000048/second)
- $0.00001000 per vCPU-second
- $0.40 per million requests

Example: 1000 requests/day, 2 seconds average = ~$3-5/month

## Monitoring and Logs

View logs in real-time:

```bash
gcloud run services logs read clip-service --region us-central1 --limit 50
```

Or use Cloud Console: https://console.cloud.google.com/run

## Updating Your Service

After making code changes:

```bash
cd clip-service
gcloud run deploy clip-service \
  --source . \
  --platform managed \
  --region us-central1
```

Cloud Run will automatically rebuild and redeploy (faster after first build, ~3-5 minutes).

## Troubleshooting

**Build timeout:**

- Increase build timeout: Add `--timeout 20m` to deploy command

**Memory issues:**

- If still OOM, increase to 4Gi: `--memory 4Gi` (paid tier)

**Cold start delays:**

- First request after idle: 10-30 seconds (model loading)
- Subsequent requests: Fast (<1 second)
- To reduce: Use `--min-instances 1` (keeps 1 instance warm, costs ~$10-15/month)

**Authentication errors:**

- Run `gcloud auth login` again
- Check project ID: `gcloud config get-value project`

## Next Steps

1. ✅ Deploy CLIP service to Cloud Run
2. Save the service URL (e.g., `https://clip-service-XXXXXXXXXX-uc.a.run.app`)
3. Deploy backend to Render/Cloud Run with `LOCAL_CLIP_URL` environment variable set to your CLIP service URL
4. Continue with MongoDB seeding and frontend deployment

## Region Selection

Available regions (choose nearest to your users):

- `us-central1` (Iowa) - Default, part of free tier
- `us-east1` (South Carolina)
- `europe-west1` (Belgium)
- `asia-northeast1` (Tokyo)

For free tier, use `us-central1`, `us-east1`, or `us-west1`.
