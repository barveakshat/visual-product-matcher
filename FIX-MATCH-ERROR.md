# URGENT FIX: /api/match 500 Error - Invalid Image URL

## 🔍 Root Cause Identified

The error is caused by the frontend sending an **invalid image URL** to the backend's `/api/match` endpoint.

### The Problem Flow:

1. ✅ User uploads image → Backend saves it to `/uploads/filename.jpg`
2. ✅ Backend returns relative URL: `/uploads/filename.jpg`
3. ❌ Frontend converts it to: `http://localhost:5000/uploads/filename.jpg` (WRONG!)
4. ❌ Frontend sends this URL to `/api/match`
5. ❌ Backend tries to fetch from `http://localhost:5000` (doesn't exist on Render)
6. ❌ Error: Cannot fetch image → 500 Internal Server Error

### The Bug Location

**File:** `frontend/src/components/ImageUpload.js` (Line 78)

**Broken Code:**
```javascript
if (imageUrl.startsWith('/')) {
  imageUrl = `http://localhost:5000${imageUrl}`;
}
```

**Fixed Code:**
```javascript
if (imageUrl.startsWith('/')) {
  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  imageUrl = `${API_BASE_URL}${imageUrl}`;
}
```

## ✅ Fix Applied

I've already fixed the code! Now we need to:

1. **Verify Vercel Environment Variable** (CRITICAL)
2. **Redeploy Frontend to Vercel**
3. **Test the Fix**

---

## 🚀 Step 1: Verify Vercel Environment Variable

### Go to Vercel Dashboard

1. Open: https://vercel.com/dashboard
2. Select project: `visual-product-matcher-app`
3. Go to: **Settings** → **Environment Variables**

### Check REACT_APP_API_URL

**Expected Value:**
```
https://visual-product-matcher-backend-x8b6.onrender.com/api
```

**If it's wrong or missing:**

1. Add/Edit the environment variable:
   - **Name:** `REACT_APP_API_URL`
   - **Value:** `https://visual-product-matcher-backend-x8b6.onrender.com/api`
   - **Environment:** Production ✅, Preview ✅, Development ✅

2. Click **Save**

---

## 🚀 Step 2: Commit and Push Changes

```powershell
# Commit the fix
cd d:\Studies\Projects\HACKATHONS\Visual-product-matcher
git add frontend/src/components/ImageUpload.js
git commit -m "fix: Use dynamic backend URL for image matching instead of hardcoded localhost"
git push
```

---

## 🚀 Step 3: Verify Vercel Auto-Deployment

After pushing:

1. Go to Vercel Dashboard: https://vercel.com/dashboard
2. Click on your project: `visual-product-matcher-app`
3. Go to **Deployments** tab
4. Wait for the new deployment to complete (usually 1-2 minutes)
5. Look for status: ✅ **Ready**

---

## 🧪 Step 4: Test the Fix

### Test on Production

1. Open: https://visual-product-matcher-app.vercel.app
2. Upload an image (file or URL)
3. Check browser console:

**Expected Output:**
```
✅ Upload result: {success: true, data: {image_url: '/uploads/...'}}
✅ Matching products with: https://visual-product-matcher-backend-x8b6.onrender.com/api/uploads/...
✅ POST /api/match 200 OK
```

**Should NOT see:**
```
❌ Matching products with: http://localhost:5000/uploads/...
❌ POST /api/match 500 (Internal Server Error)
```

---

## 📊 What This Fix Does

### Before Fix:
```
Frontend: "Image uploaded! URL is /uploads/123.jpg"
Frontend: "Converting to http://localhost:5000/uploads/123.jpg"
Frontend: → POST /api/match { image_url: "http://localhost:5000/uploads/123.jpg" }
Backend:  "Let me fetch http://localhost:5000/uploads/123.jpg"
Backend:  ❌ "Cannot connect to localhost:5000" → 500 error
```

### After Fix:
```
Frontend: "Image uploaded! URL is /uploads/123.jpg"
Frontend: "Converting to https://visual-product-matcher-backend-x8b6.onrender.com/api/uploads/123.jpg"
Frontend: → POST /api/match { image_url: "https://.../uploads/123.jpg" }
Backend:  "Let me fetch https://visual-product-matcher-backend-x8b6.onrender.com/api/uploads/123.jpg"
Backend:  ✅ "Fetched image successfully, generating embedding..." → 200 OK
```

---

## 🔧 Alternative: Manual Vercel Redeploy

If Vercel doesn't auto-deploy:

### Option 1: Trigger from Dashboard
1. Go to Vercel Dashboard
2. Click **Deployments**
3. Click the latest deployment's **"..."** menu
4. Select **Redeploy**

### Option 2: Force Git Push
```powershell
git commit --allow-empty -m "Trigger Vercel redeploy"
git push
```

---

## 🎯 Expected Results After Fix

1. ✅ Upload image → Success
2. ✅ Generate embeddings → Success  
3. ✅ Match products → Success (200 OK)
4. ✅ Display similar products
5. ✅ No 500 errors in console

---

## 🐛 If Still Not Working

### Check Vercel Deployment Logs

1. Go to Vercel Dashboard → Deployments
2. Click latest deployment
3. Check **Build Logs** for errors
4. Check **Function Logs** (if any)

### Check Vercel Environment Variables Again

Make sure:
```
REACT_APP_API_URL = https://visual-product-matcher-backend-x8b6.onrender.com/api
```

**Common Mistakes:**
- ❌ Missing `/api` at the end
- ❌ HTTP instead of HTTPS
- ❌ Trailing slash
- ❌ Wrong domain name

### Check Browser Console

Open DevTools → Network tab:
- Find the `/match` request
- Check **Payload** → What `image_url` is being sent?
- Should be: `https://visual-product-matcher-backend-x8b6.onrender.com/api/uploads/...`

---

## 📝 Summary

**Problem:** Frontend was hardcoding `localhost:5000` for image URLs, causing backend to fail fetching images

**Solution:** Use dynamic `REACT_APP_API_URL` environment variable from Vercel

**Action Required:**
1. ✅ Code fixed (already done)
2. 🔄 Commit and push to GitHub
3. ⏳ Wait for Vercel auto-deployment
4. ✅ Verify environment variable in Vercel
5. 🧪 Test on production

**Time to Fix:** 3-5 minutes (code commit + Vercel redeploy)
