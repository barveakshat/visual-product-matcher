# 📸 Visual Product Matcher# Visual Product Matcher

A production-ready visual search system that finds similar products using AI-powered image embeddings. Upload an image and instantly discover visually similar products with high accuracy.A modern web application that uses AI-powered image similarity to find visually similar products from a catalog. Built with React (frontend), Node.js (backend), MongoDB (database), and Hugging Face API for image embeddings.

<img src="https://img.shields.io/badge/Node.js-16+-green" /> <img src="https://img.shields.io/badge/React-18+-blue" /> <img src="https://img.shields.io/badge/Python-3.8+-yellow" /> <img src="https://img.shields.io/badge/MongoDB-4.4+-success" /> <img src="https://img.shields.io/badge/CLIP-OpenAI-orange" />## Features

## ✨ Features- Upload images or provide image URLs

- AI-powered visual similarity matching using Hugging Face

- 🎯 **High-Accuracy Matching**: 512-dimensional CLIP embeddings for precise visual similarity- Responsive design for mobile and desktop

- ⚡ **Fast Search**: Sub-second search across thousands of products- Filter and sort results by category and similarity score

- 🖼️ **Multi-Format Support**: JPEG, PNG, WebP image uploads- Clean, modern UI with loading states and error handling

- 🔒 **Production Ready**: Rate limiting, error handling, security best practices

- 📊 **Scalable Architecture**: Microservices design with separate ML service## Tech Stack

- 🎨 **Modern UI**: Responsive React frontend with Tailwind CSS

- **Frontend**: React, Redux Toolkit, Tailwind CSS

## 🏗️ Architecture- **Backend**: Node.js, Express.js

- **Database**: MongoDB with Mongoose

```````- **AI**: Hugging Face Inference API

┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐- **Image Processing**: Multer for uploads

│                 │      │                 │      │                 │

│  React Frontend │─────▶│  Express API    │─────▶│  CLIP Service   │## Prerequisites

│  (Port 3001)    │      │  (Port 5000)    │      │  (Port 3000)    │

│                 │      │                 │      │                 │Before running the application, ensure you have the following installed:

└─────────────────┘      └────────┬────────┘      └─────────────────┘

                                  │- Node.js (v16 or higher)

                                  ▼- MongoDB (local installation or MongoDB Atlas)

                         ┌─────────────────┐- npm or yarn

                         │                 │

                         │  MongoDB        │## Setup Instructions

                         │  (Port 27017)   │

                         │                 │### 1. Clone the Repository

                         └─────────────────┘

``````bash

git clone <repository-url>

## 🚀 Quick Startcd visual-product-matcher

```````

### Prerequisites

### 2. Backend Setup

- Node.js 16+

- Python 3.8+Navigate to the backend directory:

- MongoDB 4.4+

- 2GB RAM minimum```bash

cd backend

### Installation```

1. **Clone and Install Dependencies**Install dependencies:

`bash`bash

# Clone repositorynpm install

git clone <your-repo-url>```

cd Visual-product-matcher

#### Configure Environment Variables

# Install backend dependencies

cd backendCreate a `.env` file in the `backend` directory with the following variables:

npm install

cp .env.example .env```env

# MongoDB

# Install frontend dependenciesMONGODB_URI=mongodb://localhost:27017/product-matcher

cd ../frontend

npm install# Hugging Face API

cp .env.example .envHUGGINGFACE_API_KEY=your_huggingface_api_key_here

HUGGINGFACE_MODEL=google/vit-base-patch16-224

# Install CLIP service dependencies

cd ../clip-service# Server

pip install -r requirements.txtPORT=5000

pip install git+https://github.com/openai/CLIP.git```

````

#### Get Hugging Face API Key

2. **Configure Environment**

1. Go to [Hugging Face](https://huggingface.co/)

Edit `backend/.env`:2. Sign up or log in to your account

```env3. Go to Settings → Access Tokens

USE_LOCAL_CLIP=true4. Create a new token with "Read" permissions

MONGODB_URI=mongodb://localhost:27017/product-matcher5. Copy the token and paste it as `HUGGINGFACE_API_KEY` in your `.env` file

````

#### Set up MongoDB

3. **Start Services**

**Option A: Local MongoDB**

````bash

# Terminal 1: MongoDB- Install MongoDB on your system

mongod- Start MongoDB service

- Use the default connection string: `mongodb://localhost:27017/product-matcher`

# Terminal 2: CLIP Service (Recommended for best accuracy)

cd clip-service**Option B: MongoDB Atlas (Cloud)**

python service.py

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)

# Terminal 3: Backend2. Create a free cluster

cd backend3. Get the connection string from "Connect" → "Connect your application"

npm run dev4. Replace `<password>` and `<database>` in the connection string

5. Update `MONGODB_URI` in your `.env` file

# Terminal 4: Frontend

cd frontend#### Seed the Database

npm start

```You have multiple options to populate the database with products:



4. **Seed Database****Option 1: External API Data (Recommended)** 🌟



```bashGet real products from external APIs:

cd backend

node scripts/seedProducts.js```bash

```# Fake Store API (20 real products)

npm run seed:api

5. **Access Application**

# DummyJSON (choose number of products, up to 100+)

Open http://localhost:3001 in your browsernode scripts/seed-from-dummyjson.js 30

````

## 📖 Documentation

**Option 2: Manual/Local Scripts**

- **[Production Deployment Guide](./PRODUCTION_DEPLOYMENT.md)** - Complete deployment instructions

- **[Production Checklist](./PRODUCTION_CHECKLIST.md)** - Pre-deployment verificationUse pre-configured local product data:

- **[API Documentation](#api-endpoints)** - API reference

```````bash

## 🔧 Configuration# Quick seeding (15 products)

npm run seed:quick

### Environment Variables

# Standard seeding (25 products)

**Backend (.env)**npm run seed

```env

NODE_ENV=development# Large dataset (60 products with validation)

PORT=5000npm run seed:50plus

MONGODB_URI=mongodb://localhost:27017/product-matcher```

USE_LOCAL_CLIP=true

LOCAL_CLIP_URL=http://localhost:3000**Clear Database:**

FRONTEND_URL=http://localhost:3001

``````bash

# Clear all products

**Frontend (.env)**npm run db:clear

```env

REACT_APP_API_URL=http://localhost:5000/api# Clear and reseed

NODE_ENV=developmentnpm run db:reset          # 25 products

```npm run db:reset:50       # 60 products

npm run db:reset:api      # 20 from Fake Store API

## 🎯 API Endpoints```



### Health CheckAll seeding scripts automatically generate ML embeddings using the Hugging Face API.

```http

GET /health### 3. Frontend Setup

```````

Navigate to the frontend directory:

### Upload and Search

`http`bash

POST /api/products/search/visualcd ../frontend

Content-Type: multipart/form-data```

{Install dependencies:

"image": <file>

}```bash

```npm install

```

### Get All Products

````http### 4. Running the Application

GET /api/products

```#### Start Backend Server



### Get Product by IDIn the `backend` directory:

```http

GET /api/products/:id```bash

```npm run dev

````

## 🧪 Testing

The backend will start on `http://localhost:5000`

### Test Health Endpoints

#### Start Frontend Development Server

````bash

# BackendIn the `frontend` directory:

curl http://localhost:5000/health

```bash

# CLIP Servicenpm start

curl http://localhost:3000/health```

````

The frontend will start on `http://localhost:3000`

### Test Visual Search

### 5. Access the Application

````bash

curl -X POST http://localhost:5000/api/products/search/visual \Open your browser and go to `http://localhost:3000`

  -F "image=@/path/to/test-image.jpg"

```## API Documentation



## 🔒 Security Features### POST /api/upload



- ✅ Rate limiting (100 requests / 15 min)Upload an image file or provide an image URL.

- ✅ Upload rate limiting (20 uploads / 15 min)

- ✅ File size validation (10MB max)**Request:**

- ✅ File type validation (JPEG, PNG, WebP)

- ✅ CORS protection- File upload: `multipart/form-data` with `image` field

- ✅ Input sanitization- URL: `application/json` with `{ "imageUrl": "https://..." }`

- ✅ Error handling & logging

**Response:**

## 📊 Performance

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

````

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
