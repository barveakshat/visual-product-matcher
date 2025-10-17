# Quick Fix: Restart Render Service

## Problem
The backend on Render is still getting errors from the CLIP service even though we deployed a fix. The error shows:
```
CLIP service error: { detail: 'Failed to encode image: Numpy is not available' }
```

## Root Cause
The Render backend service needs to be restarted to clear any cached connections or old instance references to the CLIP service. Even though the CLIP service was updated with the NumPy fix, Render might still be hitting an old revision or have stale connections.

## Solution

### Option 1: Manual Restart (Fastest)
1. Go to your Render dashboard: https://dashboard.render.com/
2. Navigate to your backend service: `visual-product-matcher-backend`
3. Click **"Manual Deploy"** → **"Clear build cache & deploy"**
   - OR simply click **"Manual Deploy"** → **"Deploy latest commit"**

This will restart the backend service with fresh connections to the CLIP service.

### Option 2: Force Redeploy via Git (If option 1 doesn't work)
Make a small change and push to trigger redeployment:

```bash
# Add a comment to trigger rebuild
echo "# Updated: $(date)" >> backend/README.md
git add backend/README.md
git commit -m "chore: Trigger Render redeploy for CLIP fix"
git push
```

### Option 3: Check Cloud Run Revisions
Ensure traffic is routed to the new revision:

```bash
# Check current traffic split
gcloud run services describe clip-service \
  --region=us-central1 \
  --project=product-matcher-475408 \
  --format="value(status.traffic)"
```

If needed, manually route all traffic to the new revision:

```bash
gcloud run services update-traffic clip-service \
  --region=us-central1 \
  --project=product-matcher-475408 \
  --to-revisions=clip-service-00002-zmm=100
```

## Verification Steps

After restarting Render:

1. **Check Render Logs**:
   - Go to Render dashboard → Logs
   - Look for successful CLIP service calls (should show 200 status)

2. **Test via Frontend**:
   - Open: https://visual-product-matcher-app.vercel.app
   - Upload an image
   - Should successfully return similar products

3. **Test Backend API Directly**:
   ```bash
   curl -X POST https://visual-product-matcher-backend-x8b6.onrender.com/api/upload \
     -F "image=@test-image.jpg"
   ```

## Expected Result

After restart, the backend logs should show:
```
✅ Generated embedding (512 dimensions)
🔍 Finding similar products...
✅ Found X similar products
```

Instead of:
```
❌ CLIP service error: Failed to encode image: Numpy is not available
```

## Timeline
- **Issue detected**: October 17, 2025 ~11:30 UTC
- **CLIP fix deployed**: October 17, 2025 11:14 UTC (revision clip-service-00002-zmm)
- **Action needed**: Restart Render backend to use fixed CLIP service

---

**Note**: The CLIP service itself is working correctly. The issue is that Render needs to restart to establish fresh connections to the updated service.
