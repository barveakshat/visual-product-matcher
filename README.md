# 📸 Visual Product Matcher# 📸 Visual Product Matcher# Visual Product Matcher

A production-ready visual search system that finds similar products using AI-powered image embeddings. Upload an image and instantly discover visually similar products with high accuracy using OpenAI's CLIP model.A production-ready visual search system that finds similar products using AI-powered image embeddings. Upload an image and instantly discover visually similar products with high accuracy.A modern web application that uses AI-powered image similarity to find visually similar products from a catalog. Built with React (frontend), Node.js (backend), MongoDB (database), and Hugging Face API for image embeddings.

[![Node.js](https://img.shields.io/badge/Node.js-16+-green)](https://nodejs.org/)<img src="https://img.shields.io/badge/Node.js-16+-green" /> <img src="https://img.shields.io/badge/React-18+-blue" /> <img src="https://img.shields.io/badge/Python-3.8+-yellow" /> <img src="https://img.shields.io/badge/MongoDB-4.4+-success" /> <img src="https://img.shields.io/badge/CLIP-OpenAI-orange" />## Features

[![React](https://img.shields.io/badge/React-18+-blue)](https://reactjs.org/)

[![Python](https://img.shields.io/badge/Python-3.11+-yellow)](https://www.python.org/)## ✨ Features- Upload images or provide image URLs

[![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-success)](https://www.mongodb.com/)

[![CLIP](https://img.shields.io/badge/CLIP-OpenAI-orange)](https://github.com/openai/CLIP)- AI-powered visual similarity matching using Hugging Face

---- 🎯 **High-Accuracy Matching**: 512-dimensional CLIP embeddings for precise visual similarity- Responsive design for mobile and desktop

## 🌐 Live Deployment- ⚡ **Fast Search**: Sub-second search across thousands of products- Filter and sort results by category and similarity score

- **🎨 Frontend:** https://visual-product-matcher-app.vercel.app- 🖼️ **Multi-Format Support**: JPEG, PNG, WebP image uploads- Clean, modern UI with loading states and error handling

- **🔧 Backend API:** https://visual-product-matcher-backend-x8b6.onrender.com

- **🤖 CLIP Service:** https://clip-service-562950336705.us-central1.run.app- 🔒 **Production Ready**: Rate limiting, error handling, security best practices

- **📦 GitHub Repository:** https://github.com/barveakshat/visual-product-matcher

- 📊 **Scalable Architecture**: Microservices design with separate ML service## Tech Stack

---

- 🎨 **Modern UI**: Responsive React frontend with Tailwind CSS

## ✨ Features

- **Frontend**: React, Redux Toolkit, Tailwind CSS

- 🎯 **High-Accuracy Matching**: 512-dimensional CLIP embeddings for precise visual similarity

- ⚡ **Fast Search**: Sub-second search across thousands of products using cosine similarity## 🏗️ Architecture- **Backend**: Node.js, Express.js

- 🖼️ **Multi-Format Support**: JPEG, PNG, WebP image uploads

- 🔒 **Production Ready**: Rate limiting, error handling, security best practices- **Database**: MongoDB with Mongoose

- 📊 **Scalable Architecture**: Microservices design with separate ML service

- 🎨 **Modern UI**: Responsive React frontend with Tailwind CSS```````- **AI**: Hugging Face Inference API

- 🔍 **Category Filtering**: Browse products by Electronics, Fashion, Home, Accessories, Sports, Kitchen

- 📈 **Similarity Scores**: Visual percentage scores for each match (70-90% for close matches)┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐- **Image Processing**: Multer for uploads

---│ │ │ │ │ │

## 🏗️ Architecture│ React Frontend │─────▶│ Express API │─────▶│ CLIP Service │## Prerequisites

```│ (Port 3001)    │      │  (Port 5000)    │      │  (Port 3000)    │

┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐

│                 │      │                 │      │                 ││                 │      │                 │      │                 │Before running the application, ensure you have the following installed:

│  React Frontend │─────▶│  Express API    │─────▶│  CLIP Service   │

│  (Vercel)       │      │  (Render)       │      │  (Cloud Run)    │└─────────────────┘      └────────┬────────┘      └─────────────────┘

│                 │      │                 │      │                 │

└─────────────────┘      └────────┬────────┘      └─────────────────┘                                  │- Node.js (v16 or higher)

                                  │

                                  ▼                                  ▼- MongoDB (local installation or MongoDB Atlas)

                         ┌─────────────────┐

                         │                 │                         ┌─────────────────┐- npm or yarn

                         │  MongoDB Atlas  │

                         │  (Database)     │                         │                 │

                         │                 │

                         └─────────────────┘                         │  MongoDB        │## Setup Instructions

```

                         │  (Port 27017)   │

### Technology Stack

                         │                 │### 1. Clone the Repository

**Frontend (React)**

- React 18 with Redux Toolkit for state management └─────────────────┘

- Tailwind CSS for styling

- Axios for API calls``````bash

- Deployed on Vercel

git clone <repository-url>

**Backend (Node.js/Express)**

- Express.js with async/await error handling## 🚀 Quick Startcd visual-product-matcher

- Mongoose for MongoDB ODM

- Multer for file uploads```````

- Rate limiting and CORS configuration

- Deployed on Render### Prerequisites

**CLIP Service (Python/FastAPI)**### 2. Backend Setup

- FastAPI for high-performance API

- OpenAI CLIP ViT-B/32 model (via open-clip-torch)- Node.js 16+

- 512-dimensional embeddings

- Deployed on Google Cloud Run with 2GB RAM- Python 3.8+Navigate to the backend directory:

**Database (MongoDB Atlas)**- MongoDB 4.4+

- Cloud-hosted MongoDB

- Stores product metadata and embeddings- 2GB RAM minimum```bash

- Indexed for fast similarity search

cd backend

---

### Installation```

## 🎯 How It Works

1. **Clone and Install Dependencies**Install dependencies:

1. **Image Upload**: User uploads a product image through React frontend

1. **Embedding Generation**: Backend sends image to CLIP service`bash`bash

1. **CLIP Processing**: CLIP model (ViT-B/32) generates 512-dimensional embedding

1. **Similarity Search**: Backend computes cosine similarity against all products in MongoDB# Clone repositorynpm install

1. **Ranking**: Products ranked by similarity score (0-100%)

1. **Display**: Top matches displayed with images, names, prices, and scoresgit clone <your-repo-url>```

### Similarity Calculationcd Visual-product-matcher

`````javascript#### Configure Environment Variables

// Cosine similarity formula

similarity = (A · B) / (||A|| × ||B||)# Install backend dependencies



// Where:cd backendCreate a `.env` file in the `backend` directory with the following variables:

// A = uploaded image embedding (512 dimensions)

// B = product embedding (512 dimensions)npm install

// Result: 0.0 (no similarity) to 1.0 (identical)

```cp .env.example .env```env



**Typical Scores:**# MongoDB

- 90-100%: Nearly identical items

- 80-90%: Very similar (same product category)# Install frontend dependenciesMONGODB_URI=mongodb://localhost:27017/product-matcher

- 70-80%: Similar style/type

- Below 70%: Weak similaritycd ../frontend



---npm install# Hugging Face API



## 🚀 Quick Start (Local Development)cp .env.example .envHUGGINGFACE_API_KEY=your_huggingface_api_key_here



### PrerequisitesHUGGINGFACE_MODEL=google/vit-base-patch16-224



- Node.js 16+# Install CLIP service dependencies

- Python 3.11+

- MongoDB 4.4+ (or MongoDB Atlas account)cd ../clip-service# Server

- 2GB RAM minimum

pip install -r requirements.txtPORT=5000

### 1. Clone Repository

pip install git+https://github.com/openai/CLIP.git```

```bash

git clone https://github.com/barveakshat/visual-product-matcher.git````

cd visual-product-matcher

```#### Get Hugging Face API Key



### 2. Backend Setup2. **Configure Environment**



```bash1. Go to [Hugging Face](https://huggingface.co/)

cd backend

npm installEdit `backend/.env`:2. Sign up or log in to your account



# Create .env file```env3. Go to Settings → Access Tokens

cp .env.example .env

```USE_LOCAL_CLIP=true4. Create a new token with "Read" permissions



Edit `backend/.env`:MONGODB_URI=mongodb://localhost:27017/product-matcher5. Copy the token and paste it as `HUGGINGFACE_API_KEY` in your `.env` file

```env

NODE_ENV=development````

PORT=5000

MONGODB_URI=mongodb://localhost:27017/product-matcher#### Set up MongoDB

USE_LOCAL_CLIP=true

LOCAL_CLIP_URL=http://localhost:80803. **Start Services**

FRONTEND_URL=http://localhost:3000

```**Option A: Local MongoDB**



### 3. CLIP Service Setup````bash



```bash# Terminal 1: MongoDB- Install MongoDB on your system

cd ../clip-service

pip install -r requirements.txtmongod- Start MongoDB service

`````

- Use the default connection string: `mongodb://localhost:27017/product-matcher`

### 4. Frontend Setup

# Terminal 2: CLIP Service (Recommended for best accuracy)

```bash

cd ../frontendcd clip-service**Option B: MongoDB Atlas (Cloud)**

npm install

python service.py

# Create .env file

cp .env.example .env1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)

```

# Terminal 3: Backend2. Create a free cluster

Edit `frontend/.env`:

````envcd backend3. Get the connection string from "Connect" → "Connect your application"

REACT_APP_API_URL=http://localhost:5000/api

```npm run dev4. Replace `<password>` and `<database>` in the connection string



### 5. Seed Database5. Update `MONGODB_URI` in your `.env` file



```bash# Terminal 4: Frontend

cd ../backend

node scripts/seedProducts.jscd frontend#### Seed the Database

````

npm start

### 6. Start All Services

````You have multiple options to populate the database with products:

**Terminal 1 - CLIP Service:**

```bash

cd clip-service

python -m uvicorn service:app --host 0.0.0.0 --port 80804. **Seed Database****Option 1: External API Data (Recommended)** 🌟

````

**Terminal 2 - Backend:**

`bash`bashGet real products from external APIs:

cd backend

npm startcd backend

````

node scripts/seedProducts.js```bash

**Terminal 3 - Frontend:**

```bash```# Fake Store API (20 real products)

cd frontend

npm startnpm run seed:api

````

5. **Access Application**

Open http://localhost:3000 in your browser! 🎉

# DummyJSON (choose number of products, up to 100+)

---

Open http://localhost:3001 in your browsernode scripts/seed-from-dummyjson.js 30

## ☁️ Production Deployment

````````

### Deploy CLIP Service to Google Cloud Run

## 📖 Documentation

```bash

cd clip-service**Option 2: Manual/Local Scripts**



# Deploy to Cloud Run- **[Production Deployment Guide](./PRODUCTION_DEPLOYMENT.md)** - Complete deployment instructions

gcloud run deploy clip-service \

  --source . \- **[Production Checklist](./PRODUCTION_CHECKLIST.md)** - Pre-deployment verificationUse pre-configured local product data:

  --platform managed \

  --region us-central1 \- **[API Documentation](#api-endpoints)** - API reference

  --allow-unauthenticated \

  --memory 2Gi \```````bash

  --cpu 1 \

  --timeout 300## 🔧 Configuration# Quick seeding (15 products)

```

npm run seed:quick

### Deploy Backend to Render

### Environment Variables

1. Go to https://render.com/dashboard

2. Click **"New +"** → **"Web Service"**# Standard seeding (25 products)

3. Connect GitHub repo: `barveakshat/visual-product-matcher`

4. Configure:**Backend (.env)**npm run seed

   - **Root Directory:** `backend`

   - **Build Command:** `npm install````env

   - **Start Command:** `npm start`

   - **Environment Variables:**NODE_ENV=development# Large dataset (60 products with validation)

     ```

     NODE_ENV=productionPORT=5000npm run seed:50plus

     PORT=10000

     MONGODB_URI=<your-mongodb-atlas-uri>MONGODB_URI=mongodb://localhost:27017/product-matcher```

     USE_LOCAL_CLIP=true

     LOCAL_CLIP_URL=https://clip-service-xxxxx.run.appUSE_LOCAL_CLIP=true

     FRONTEND_URL=https://your-app.vercel.app

     ```LOCAL_CLIP_URL=http://localhost:3000**Clear Database:**



### Deploy Frontend to VercelFRONTEND_URL=http://localhost:3001



1. Go to https://vercel.com/new``````bash

2. Import: `barveakshat/visual-product-matcher`

3. Configure:# Clear all products

   - **Root Directory:** `frontend`

   - **Framework:** Create React App**Frontend (.env)**npm run db:clear

   - **Environment Variable:**

     - `REACT_APP_API_URL` = `https://your-backend.onrender.com/api````env



---REACT_APP_API_URL=http://localhost:5000/api# Clear and reseed



## 📊 API EndpointsNODE_ENV=developmentnpm run db:reset          # 25 products



### Health Check```npm run db:reset:50       # 60 products

```

GET /healthnpm run db:reset:api      # 20 from Fake Store API

Response: {"status":"ok","timestamp":"..."}

```## 🎯 API Endpoints```



### Get All Products

```

GET /api/products?category=Electronics&limit=20&page=1### Health CheckAll seeding scripts automatically generate ML embeddings using the Hugging Face API.

Response: {"success":true,"data":[...]}

``````http



### Upload & Match ProductGET /health### 3. Frontend Setup

```

POST /api/upload```````

Content-Type: multipart/form-data

Body: {image: File, name: String, category: String, price: Number}Navigate to the frontend directory:

Response: {"success":true,"data":{product, matches:[...]}}

```### Upload and Search



### Find Similar Products`http`bash

```

POST /api/matchPOST /api/products/search/visualcd ../frontend

Content-Type: multipart/form-data

Body: {image: File}Content-Type: multipart/form-data```

Response: {"success":true,"data":{matches:[...]}}

```{Install dependencies:



---"image": <file>



## 🧪 Testing}```bash



### Test CLIP Service```npm install

```bash

curl https://clip-service-562950336705.us-central1.run.app/health```

# Expected: {"status":"healthy","model":"ViT-B/32","device":"cpu","embedding_size":512}

```### Get All Products



### Test Backend````http### 4. Running the Application

```bash

curl https://visual-product-matcher-backend-x8b6.onrender.com/healthGET /api/products

# Expected: {"status":"ok","timestamp":"..."}

``````#### Start Backend Server



---



## 📁 Project Structure### Get Product by IDIn the `backend` directory:



``````http

visual-product-matcher/

├── frontend/               # React frontendGET /api/products/:id```bash

│   ├── src/

│   │   ├── components/    # React components```npm run dev

│   │   ├── features/      # Redux slices

│   │   └── services/      # API services````

│   └── package.json

│## 🧪 Testing

├── backend/               # Node.js/Express backend

│   ├── controllers/      # Route controllersThe backend will start on `http://localhost:5000`

│   ├── models/           # Mongoose schemas

│   ├── routes/           # API routes### Test Health Endpoints

│   ├── services/         # ML service integration

│   └── scripts/          # Database seeding#### Start Frontend Development Server

│

├── clip-service/         # Python FastAPI CLIP service````bash

│   ├── service.py        # FastAPI app

│   ├── Dockerfile        # Cloud Run deployment# BackendIn the `frontend` directory:

│   └── requirements.txt

│curl http://localhost:5000/health

└── README.md

``````bash



---# CLIP Servicenpm start



## 🔒 Security Featurescurl http://localhost:3000/health```



- ✅ Rate limiting (100 requests per 15 minutes)````

- ✅ CORS configuration for specific origins

- ✅ Input validation and sanitizationThe frontend will start on `http://localhost:3000`

- ✅ File upload restrictions (max 5MB, images only)

- ✅ Error handling without exposing internals### Test Visual Search



---### 5. Access the Application



## 📊 Project Stats````bash



- **Database**: 54 products with embeddingscurl -X POST http://localhost:5000/api/products/search/visual \Open your browser and go to `http://localhost:3000`

- **Embedding Dimensions**: 512

- **Model Size**: ~350MB (CLIP ViT-B/32)  -F "image=@/path/to/test-image.jpg"

- **Typical Similarity**: 70-90% for close matches

- **Inference Time**: ~500ms per image (CPU)```## API Documentation



---



## 👨‍💻 Author## 🔒 Security Features### POST /api/upload



**Akshat Barve**

- GitHub: [@barveakshat](https://github.com/barveakshat)

- Repository: [visual-product-matcher](https://github.com/barveakshat/visual-product-matcher)- ✅ Rate limiting (100 requests / 15 min)Upload an image file or provide an image URL.



---- ✅ Upload rate limiting (20 uploads / 15 min)



## 🙏 Acknowledgments- ✅ File size validation (10MB max)**Request:**



- **OpenAI CLIP**: For the powerful vision-language model- ✅ File type validation (JPEG, PNG, WebP)

- **open-clip-torch**: For the PyTorch implementation

- **MongoDB Atlas**: For free database hosting- ✅ CORS protection- File upload: `multipart/form-data` with `image` field

- **Vercel**: For free frontend hosting

- **Render**: For free backend hosting- ✅ Input sanitization- URL: `application/json` with `{ "imageUrl": "https://..." }`

- **Google Cloud**: For Cloud Run CLIP service hosting

- ✅ Error handling & logging

---

**Response:**

**⭐ Star this repository if you found it helpful!**

## 📊 Performance

Made with ❤️ using React, Node.js, Python, and OpenAI CLIP

```json

| Metric | Value |{

|--------|-------|  "image_url": "http://localhost:5000/uploads/filename.jpg",

| **Search Speed** | < 2 seconds |  "status": "success"

| **CLIP Inference (CPU)** | 200-500ms |}

| **CLIP Inference (GPU)** | 50-100ms |```

| **Embedding Dimensions** | 512 (high quality) |

| **Similarity Accuracy** | 70-90% for similar items |### POST /api/match



## 🛠️ Tech StackFind similar products based on an image URL.



### Frontend**Request:**

- React 18

- Redux Toolkit```json

- Tailwind CSS{

- Axios  "image_url": "http://localhost:5000/uploads/filename.jpg"

}

### Backend```

- Node.js & Express

- MongoDB & Mongoose**Response:**

- Multer (file uploads)

- Express Rate Limit```json

[

### ML Service  {

- Python FastAPI    "productId": "60d5ecb74b24c72b8c8b4567",

- PyTorch    "name": "Wireless Bluetooth Headphones",

- OpenAI CLIP    "category": "Electronics",

- Pillow (image processing)    "image_url": "https://...",

    "similarityScore": 0.85

## 📁 Project Structure  }

]

````````

Visual-product-matcher/

├── backend/### GET /api/products

│ ├── config/ # Configuration files

│ ├── controllers/ # Request handlersGet all products (without embeddings for performance).

│ ├── middleware/ # Custom middleware

│ ├── models/ # MongoDB schemas**Response:**

│ ├── routes/ # API routes

│ ├── scripts/ # Utility scripts```json

│ ├── services/ # Business logic[

│ └── server.js # Entry point {

├── frontend/ "productId": "60d5ecb74b24c72b8c8b4567",

│ ├── public/ # Static files "name": "Wireless Bluetooth Headphones",

│ └── src/ "category": "Electronics",

│ ├── components/ # React components "image_url": "https://..."

│ ├── features/ # Redux slices }

│ ├── pages/ # Page components]

│ └── App.js # Main component```

├── clip-service/

│ ├── service.py # FastAPI CLIP service### GET /api/products/:id

│ └── requirements.txt # Python dependencies

└── README.mdGet detailed information about a specific product.

````

**Response:**

## 🐛 Troubleshooting

```json

### CLIP Service Not Running{

  "productId": "60d5ecb74b24c72b8c8b4567",

```bash  "name": "Wireless Bluetooth Headphones",

# Check if port 3000 is in use  "category": "Electronics",

lsof -i :3000  # Mac/Linux  "image_url": "https://...",

netstat -ano | findstr :3000  # Windows  "embedding": [0.1, 0.2, ...],

  "metadata": {}

# Restart service}

cd clip-service```

python service.py

```## Project Structure



### Poor Similarity Results```

visual-product-matcher/

Ensure:├── backend/

1. CLIP service is running│   ├── models/

2. `USE_LOCAL_CLIP=true` in backend `.env`│   │   └── Product.js

3. Database seeded with CLIP embeddings│   ├── routes/

│   │   └── api.js

```bash│   ├── services/

cd backend│   │   └── huggingface.js

node scripts/clearDatabase.js│   ├── scripts/

node scripts/seedProducts.js│   │   └── seed.js

```│   ├── uploads/          # Uploaded images

│   ├── server.js

### MongoDB Connection Error│   ├── package.json

│   └── .env

```bash├── frontend/

# Check MongoDB status│   ├── src/

mongod --version│   │   ├── components/

│   │   │   ├── ImageUpload.js

# Start MongoDB│   │   │   ├── ProductList.js

mongod  # or: brew services start mongodb-community│   │   │   ├── ProductCard.js

```│   │   │   ├── FilterBar.js

│   │   │   ├── LoadingSpinner.js

## 🚢 Production Deployment│   │   │   └── ErrorMessage.js

│   │   ├── features/

See [PRODUCTION_DEPLOYMENT.md](./PRODUCTION_DEPLOYMENT.md) for detailed instructions.│   │   │   └── productSlice.js

│   │   ├── App.js

### Quick Deploy with PM2│   │   ├── index.js

│   │   ├── store.js

```bash│   │   └── index.css

# Install PM2│   ├── public/

npm install -g pm2│   ├── package.json

│   └── tailwind.config.js

# Start all services└── README.md

cd backend```

pm2 start npm --name "api" -- start

## Troubleshooting

cd ../clip-service

pm2 start service.py --name "clip" --interpreter python3### Common Issues



# Save configuration1. **Hugging Face API Errors**

pm2 save

pm2 startup   - Ensure your API key is valid and has the correct permissions

```   - Check your API usage limits on Hugging Face



## 📈 Monitoring2. **MongoDB Connection Issues**



```bash   - Verify MongoDB is running (if local)

# View all logs   - Check connection string and credentials (if Atlas)

pm2 logs   - Ensure network access if using Atlas



# Monitor resources3. **Image Upload Issues**

pm2 monit

   - Check file size limits (5MB max)

# Check status   - Ensure correct file types (images only)

pm2 status

```4. **CORS Errors**

   - Backend is configured to allow requests from frontend

## 🤝 Contributing   - Ensure both servers are running on correct ports



1. Fork the repository### Development Tips

2. Create feature branch (`git checkout -b feature/AmazingFeature`)

3. Commit changes (`git commit -m 'Add AmazingFeature'`)- Use browser developer tools to inspect network requests

4. Push to branch (`git push origin feature/AmazingFeature`)- Check server logs for detailed error messages

5. Open Pull Request- Test API endpoints directly using tools like Postman



## 📝 License## Contributing



MIT License - see LICENSE file for details1. Fork the repository

2. Create a feature branch

## 🙏 Acknowledgments3. Make your changes

4. Test thoroughly

- **OpenAI CLIP** - Image embedding model5. Submit a pull request

- **MongoDB** - Database

- **FastAPI** - CLIP service framework## License

- **Express.js** - Backend framework

- **React** - Frontend frameworkThis project is licensed under the MIT License.


## 📞 Support

- 📧 Email: support@example.com
- 💬 Issues: [GitHub Issues](your-repo/issues)
- 📖 Docs: [Documentation](./docs)

---

**Made with ❤️ using AI-powered visual search**

**Version:** 1.0.0 | **Status:** ✅ Production Ready
````
