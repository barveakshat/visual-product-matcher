# Troubleshooting /api/match 500 Error

## Current Situation

- ✅ `/api/upload` works - Image uploads successfully
- ❌ `/api/match` fails - Returns 500 error
- Both endpoints call the same `getImageEmbedding()` function

## Possible Causes

### 1. **Query Image URL Issue** (Most Likely)
The match endpoint receives an `image_url` from the frontend and tries to fetch it. The error might be:
- The image URL is not accessible from Render's server
- CORS or network issues fetching the image
- Invalid/expired image URL

### 2. **CLIP Service Still Has NumPy Issue**
- The upload worked by chance or with a different image
- CLIP service needs another restart

### 3. **MongoDB Query Issue**
- Could be failing when fetching products from database
- Empty embedding array issue

## Quick Diagnosis

### Check Render Logs (PRIORITY)

1. Go to Render Dashboard: https://dashboard.render.com/
2. Click on `visual-product-matcher-backend`
3. Click "Logs" tab
4. Look for the actual error message from `/api/match`

**What to look for:**
```
[ERROR] Match error: ...
[ERROR] CLIP service error: ...
```

### Check Frontend Network Tab

In the browser console:
1. Open Network tab
2. Find the failed `match` request
3. Click on it → Go to "Payload" tab
4. Check what `image_url` is being sent

**Expected format:**
```json
{
  "image_url": "https://visual-product-matcher-backend-x8b6.onrender.com/uploads/1234567890.jpg"
}
```

### Test the Match Endpoint Directly

```powershell
# Test with a known good image URL
$body = @{
    image_url = "https://visual-product-matcher-backend-x8b6.onrender.com/uploads/<some-existing-image>.jpg"
} | ConvertTo-Json

curl -X POST `
  -H "Content-Type: application/json" `
  -d $body `
  https://visual-product-matcher-backend-x8b6.onrender.com/api/match
```

## Solution Path

### If it's Image URL Issue:

**Problem:** Frontend is sending an invalid or inaccessible image URL

**Fix Options:**

1. **Use the uploaded file directly** (Recommended)
   - After upload, the backend should return the image URL
   - Frontend should use that URL for matching
   - Ensure CORS allows Render to fetch its own URLs

2. **Send the image as base64**
   - Frontend converts image to base64
   - Send in the match request
   - Backend decodes and processes

3. **Use the uploaded file path**
   - Backend saves the last uploaded image ID
   - Match endpoint uses that ID

### If it's Still CLIP Service Issue:

**Restart Render Backend:**

```bash
# Option 1: Manual Deploy
1. Go to: https://dashboard.render.com/
2. Select: visual-product-matcher-backend
3. Click: "Manual Deploy" → "Clear build cache & deploy"

# Option 2: Git Push
git commit --allow-empty -m "Force redeploy"
git push
```

**Verify CLIP Service:**

```powershell
# Test the CLIP service directly
curl https://clip-service-562950336705.us-central1.run.app/health
```

### If it's MongoDB Issue:

Check if products exist:
```powershell
# Test the products endpoint
curl https://visual-product-matcher-backend-x8b6.onrender.com/api/products
```

## Immediate Actions

### 1. Check Render Logs NOW ⚡

This will show the exact error message. Go to:
https://dashboard.render.com/ → visual-product-matcher-backend → Logs

### 2. Check Frontend Payload

What `image_url` is being sent in the `/api/match` request?

### 3. Test CLIP Health

```powershell
curl https://clip-service-562950336705.us-central1.run.app/health
```

## Expected Render Log Output

### If Working:
```
🔗 Processing image URL: https://...
🧠 Generating embedding...
✅ Generated embedding (512 dimensions)
Comparing against 50 products...
Top match: 87.45%
```

### If Broken (Image URL Issue):
```
🔗 Processing image URL: https://...
[ERROR] Failed to fetch image: ECONNREFUSED
[ERROR] Match error: Error: Failed to fetch image
```

### If Broken (CLIP Issue):
```
🔗 Processing image URL: https://...
🧠 Generating embedding...
[ERROR] CLIP service error: Numpy is not available
[ERROR] Match error: Error: CLIP service error
```

## Next Steps

1. **Share the Render logs** - The exact error message will tell us what's wrong
2. **Check the image_url** being sent - Is it valid?
3. **Verify CLIP health** - Is the service actually working?

Once you provide the Render logs, I can give you the exact fix!
