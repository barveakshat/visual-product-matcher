# 🚀 Deployment Guide - Vercel + Render

## Prerequisites

✅ MongoDB Atlas setup complete (connection string ready)
✅ GitHub account
✅ Render account (free tier)
✅ Vercel account (free tier)

---

## Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
cd d:\Studies\Projects\HACKATHONS\Visual-product-matcher
git init
git add .
git commit -m "Prepare for deployment"

# Create a new repository on GitHub
# Go to github.com → New Repository
# Name: visual-product-matcher
# Keep it public or private

# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/visual-product-matcher.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy CLIP Service to Render

1. **Go to Render Dashboard**

   - Visit: https://render.com
   - Sign up/login with GitHub

2. **Create New Web Service**

   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `visual-product-matcher`

3. **Configure CLIP Service**

   - **Name**: `visual-matcher-clip` (or your preferred name)
   - **Root Directory**: `clip-service`
   - **Environment**: `Python 3`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Build Command**:
     ```bash
     pip install --upgrade pip && pip install -r requirements.txt && pip install git+https://github.com/openai/CLIP.git && python -c "import clip; import torch; clip.load('ViT-B/32', device='cpu')"
     ```
   - **Start Command**: `uvicorn service:app --host 0.0.0.0 --port $PORT`
   - **Instance Type**: `Free`

4. **Add Environment Variables**

   - `PORT` = `8000`
   - `PYTHONUNBUFFERED` = `1`

5. **Deploy**

   - Click "Create Web Service"
   - Wait 5-10 minutes for first deployment
   - ⚠️ CLIP model download takes time (~350MB)

6. **Save the URL**
   - Copy your CLIP service URL
   - Example: `https://visual-matcher-clip.onrender.com`

---

## Step 3: Deploy Backend to Render

1. **Create New Web Service**

   - Click "New +" → "Web Service"
   - Select your repository: `visual-product-matcher`

2. **Configure Backend**

   - **Name**: `visual-matcher-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Region**: Same as CLIP service
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`

3. **Add Environment Variables** ⚠️ IMPORTANT

   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<YOUR_MONGODB_ATLAS_CONNECTION_STRING>
   USE_LOCAL_CLIP=true
   LOCAL_CLIP_URL=https://visual-matcher-clip.onrender.com
   HUGGINGFACE_API_KEY=your_key_here
   FRONTEND_URL=https://your-app.vercel.app
   ```

   Replace:

   - `MONGODB_URI`: Your actual MongoDB Atlas connection string
   - `LOCAL_CLIP_URL`: Your CLIP service URL from Step 2
   - `FRONTEND_URL`: Will update after Vercel deployment

4. **Deploy**

   - Click "Create Web Service"
   - Wait 3-5 minutes

5. **Save the URL**

   - Copy your backend URL
   - Example: `https://visual-matcher-backend.onrender.com`

6. **Test Backend**
   - Visit: `https://visual-matcher-backend.onrender.com/health`
   - Should return: `{"status":"ok",...}`

---

## Step 4: Seed the Database

1. **Go to Render Dashboard**

   - Click on `visual-matcher-backend`
   - Click "Shell" tab (opens terminal)

2. **Run Seed Script**
   ```bash
   node scripts/seedProducts.js
   ```
   - Wait 5-10 minutes
   - Should see: "✅ Seeding completed: 54 products"

---

## Step 5: Deploy Frontend to Vercel

1. **Go to Vercel Dashboard**

   - Visit: https://vercel.com
   - Sign up/login with GitHub

2. **Import Project**

   - Click "Add New..." → "Project"
   - Select your repository: `visual-product-matcher`

3. **Configure Project**

   - **Framework Preset**: `Create React App`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

4. **Add Environment Variables**

   - Key: `REACT_APP_API_URL`
   - Value: `https://visual-matcher-backend.onrender.com/api`
   - (Use your actual backend URL from Step 3)

5. **Deploy**

   - Click "Deploy"
   - Wait 2-3 minutes

6. **Save the URL**
   - Copy your Vercel URL
   - Example: `https://visual-product-matcher.vercel.app`

---

## Step 6: Update Backend CORS

1. **Go to Render Dashboard**

   - Click on `visual-matcher-backend`
   - Go to "Environment" tab

2. **Update FRONTEND_URL**

   - Find `FRONTEND_URL` variable
   - Update value to your Vercel URL
   - Example: `https://visual-product-matcher.vercel.app`
   - Click "Save Changes"

3. **Backend will auto-redeploy** (takes 2-3 minutes)

---

## 🎉 Deployment Complete!

Your app is now live at:

- **Frontend**: https://your-app.vercel.app
- **Backend**: https://your-backend.onrender.com
- **CLIP**: https://your-clip.onrender.com
- **Database**: MongoDB Atlas

---

## ⚠️ Important Notes

### Free Tier Limitations

- **Render Free**: Services sleep after 15 min of inactivity
- **First request**: Takes 30-60 seconds to wake up
- **Subsequent requests**: Fast

### How to Keep Services Awake (Optional)

Use a service like UptimeRobot or Cron-job.org to ping your endpoints every 10 minutes:

- `https://your-backend.onrender.com/health`
- `https://your-clip.onrender.com/health`

---

## 🧪 Testing Your Deployment

1. **Visit your Vercel URL**
2. **Upload a product image**
3. **Wait 30-60 seconds** (first time - services waking up)
4. **See matched products!**

---

## 🔄 How to Update

### Frontend Changes

```bash
git add .
git commit -m "Update frontend"
git push
# Vercel auto-deploys in 1-2 minutes
```

### Backend Changes

```bash
git add .
git commit -m "Update backend"
git push
# Render auto-deploys in 3-5 minutes
```

---

## 📊 Monitoring

### Check Logs

- **Render**: Dashboard → Service → Logs
- **Vercel**: Dashboard → Project → Deployments → View Function Logs

### Check Service Status

- Backend: `https://your-backend.onrender.com/health`
- CLIP: `https://your-clip.onrender.com/health`

---

## 🆘 Troubleshooting

### Services not responding

- Wait 60 seconds (cold start)
- Check Render logs for errors
- Verify environment variables are set

### CORS errors

- Check `FRONTEND_URL` in backend environment
- Ensure it matches your Vercel URL exactly

### Database connection errors

- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
- Verify database user credentials

### CLIP service fails

- Check if build completed successfully
- Model download can take 10+ minutes
- Check logs for Python errors

---

## 💰 Cost Summary

| Service             | Free Tier    | Limits                                   |
| ------------------- | ------------ | ---------------------------------------- |
| Vercel              | ✅ Free      | Unlimited deployments                    |
| Render (2 services) | ✅ Free      | 750 hours/month each, sleeps after 15min |
| MongoDB Atlas       | ✅ Free      | 512MB storage                            |
| **Total**           | **$0/month** | Good for portfolio/demo                  |

---

## 🚀 Next Steps

1. Share your app with the world!
2. Add your own product images
3. Customize the UI
4. Consider upgrading to paid tier for production use

---

**Need help?** Check the logs first, then review this guide again.
