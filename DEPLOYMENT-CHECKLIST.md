# 🚀 Quick Deployment Checklist

## ✅ Pre-Deployment (DONE)

- [x] MongoDB Atlas setup complete
- [x] Code prepared for cloud deployment
- [x] CORS updated for Vercel/Render
- [x] Environment templates created

---

## 📝 Deployment Steps

### Step 1: Push to GitHub

```bash
cd d:\Studies\Projects\HACKATHONS\Visual-product-matcher
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/visual-product-matcher.git
git push -u origin main
```

---

### Step 2: Deploy CLIP Service (Render)

1. Go to https://render.com → New Web Service
2. Connect GitHub repo
3. **Root Directory**: `clip-service`
4. **Environment**: Python 3
5. **Build Command**:
   ```
   pip install --upgrade pip && pip install -r requirements.txt && pip install git+https://github.com/openai/CLIP.git && python -c "import clip; import torch; clip.load('ViT-B/32', device='cpu')"
   ```
6. **Start Command**: `uvicorn service:app --host 0.0.0.0 --port $PORT`
7. Add env var: `PORT=8000`
8. Deploy (wait 5-10 min)
9. **Save URL**: `https://______.onrender.com`

---

### Step 3: Deploy Backend (Render)

1. Render → New Web Service
2. Connect same repo
3. **Root Directory**: `backend`
4. **Environment**: Node
5. **Build**: `npm install`
6. **Start**: `node server.js`
7. **Environment Variables**:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=<paste your MongoDB Atlas connection string>
   USE_LOCAL_CLIP=true
   LOCAL_CLIP_URL=<paste CLIP service URL from Step 2>
   FRONTEND_URL=https://your-app.vercel.app
   ```
8. Deploy (wait 3-5 min)
9. **Save URL**: `https://______.onrender.com`

---

### Step 4: Seed Database

1. Render Dashboard → Backend Service → Shell
2. Run: `node scripts/seedProducts.js`
3. Wait for completion (~5 min)

---

### Step 5: Deploy Frontend (Vercel)

1. Go to https://vercel.com → New Project
2. Import GitHub repo
3. **Root Directory**: `frontend`
4. **Framework**: Create React App
5. **Build**: `npm run build`
6. **Output**: `build`
7. **Environment Variable**:
   ```
   REACT_APP_API_URL=<paste backend URL from Step 3>/api
   ```
8. Deploy (wait 2-3 min)
9. **Save URL**: `https://______.vercel.app`

---

### Step 6: Update Backend CORS

1. Render Dashboard → Backend → Environment
2. Update `FRONTEND_URL` to your Vercel URL
3. Save (auto-redeploys)

---

## 🎉 DONE!

Your app is live at your Vercel URL!

**Note**: First load takes 30-60 seconds (free tier cold start)

---

## 📋 Your URLs

Fill these in as you deploy:

- **Frontend**: https://_________________.vercel.app
- **Backend**: https://_________________.onrender.com
- **CLIP Service**: https://_________________.onrender.com
- **Database**: MongoDB Atlas

---

## 🧪 Test Deployment

1. Visit your Vercel URL
2. Upload an image
3. Wait 30-60 sec (first time)
4. See results!

---

**Need detailed instructions?** See DEPLOYMENT.md
