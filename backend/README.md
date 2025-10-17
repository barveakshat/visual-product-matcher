# 🎯 Visual Product Matcher - Backend

AI-powered visual product matching system using computer vision and deep learning embeddings.

## 📁 Project Structure

```
backend/
├── config/              # Configuration files
│   ├── database.js      # MongoDB connection
│   ├── cors.js          # CORS configuration
│   └── multer.js        # File upload configuration
├── controllers/         # Route handlers
│   ├── upload.controller.js
│   ├── product.controller.js
│   └── match.controller.js
├── middleware/          # Custom middleware
│   ├── errorHandler.js
│   ├── logger.js
│   └── validateRequest.js
├── models/              # Mongoose models
│   └── Product.js
├── routes/              # API routes
│   └── api.js
├── services/            # Business logic
│   └── ml-service.js
├── uploads/             # Uploaded images
├── .env.example         # Environment variables template
└── server.js            # Application entry point
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

**Required environment variables:**

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/product-matcher

# Hugging Face API
HUGGINGFACE_API_KEY=your_api_key_here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000
```

### 3. Start MongoDB

Ensure MongoDB is running locally:

```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### 4. Run the Server

**Development mode (with auto-reload):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

The server will be available at: `http://localhost:5000`

## 📡 API Endpoints

### Health Check

```
GET /health
```

Returns server health status.

### Test API

```
GET /api/test
```

Returns API availability status.

### Upload Product

```
POST /api/upload
```

**Body (multipart/form-data):**

- `image`: Image file (optional)
- `imageUrl`: Image URL (optional)
- `name`: Product name (optional)

**Response:**

```json
{
  "success": true,
  "message": "Product uploaded successfully",
  "data": {
    "id": "product_id",
    "name": "Product Name",
    "image_url": "/uploads/filename.jpg",
    "embedding_length": 1000
  }
}
```

### Find Similar Products

```
POST /api/match
```

**Body:**

```json
{
  "image_url": "http://example.com/image.jpg"
}
```

**Response:**

```json
{
  "success": true,
  "query_image": "http://example.com/image.jpg",
  "count": 10,
  "data": [
    {
      "id": "product_id",
      "name": "Product Name",
      "image_url": "/uploads/filename.jpg",
      "similarity": 0.95,
      "similarity_percentage": "95.00"
    }
  ]
}
```

### Get All Products

```
GET /api/products
```

### Get Product by ID

```
GET /api/products/:id
```

### Delete Product

```
DELETE /api/products/:id
```

## 🧠 Machine Learning

### Model

- **Model:** `google/vit-base-patch16-224` (Vision Transformer)
- **Provider:** Hugging Face Inference API
- **Embedding Size:** 1000 dimensions
- **Similarity Metric:** Cosine similarity

### How It Works

1. **Image Upload:** User uploads an image (file or URL)
2. **Embedding Generation:** Image is processed by ViT model to generate a 1000-dimensional feature vector
3. **Storage:** Embedding is stored in MongoDB along with product metadata
4. **Similarity Search:** Query image is compared against all stored embeddings using cosine similarity
5. **Results:** Top 10 most similar products are returned, sorted by similarity score

## 🛠️ Architecture

### MVC Pattern

- **Models:** Data structure definitions (Mongoose schemas)
- **Controllers:** Handle HTTP requests and responses
- **Services:** Business logic and external API calls
- **Middleware:** Request processing pipeline (logging, validation, error handling)
- **Config:** Application configuration (database, CORS, file upload)

### Error Handling

Centralized error handling with:

- Custom `AppError` class for operational errors
- Mongoose error handlers (CastError, ValidationError)
- Multer error handlers (file size, file type)
- Development/production error responses

### Logging

Request/response logging with:

- Request method, URL, timestamp
- Response status with emoji indicators (✅ 2xx, ⚠️ 4xx, ❌ 5xx)
- Response duration in milliseconds

## 📦 Dependencies

### Core

- `express`: Web framework
- `mongoose`: MongoDB ODM
- `dotenv`: Environment variables
- `cors`: Cross-origin resource sharing

### File Upload

- `multer`: Multipart form data handling

### ML Integration

- `axios`: HTTP client for Hugging Face API
- `mime-types`: MIME type detection

### Development

- `nodemon`: Auto-reload on file changes

## 🧪 Testing

### Manual Testing

**Test health endpoint:**

```bash
curl http://localhost:5000/health
```

**Test API endpoint:**

```bash
curl http://localhost:5000/api/test
```

**Upload image:**

```bash
curl -X POST http://localhost:5000/api/upload \
  -F "image=@path/to/image.jpg" \
  -F "name=Test Product"
```

**Find matches:**

```bash
curl -X POST http://localhost:5000/api/match \
  -H "Content-Type: application/json" \
  -d '{"image_url":"http://localhost:5000/uploads/filename.jpg"}'
```

## 🚨 Troubleshooting

### MongoDB Connection Error

**Problem:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**

1. Ensure MongoDB is installed and running
2. Check MongoDB URI in `.env` file
3. Verify MongoDB port (default: 27017)

### Hugging Face API Error

**Problem:** `401 Unauthorized` or `403 Forbidden`

**Solution:**

1. Verify `HUGGINGFACE_API_KEY` in `.env`
2. Check API key is valid and has sufficient quota
3. Visit https://huggingface.co/settings/tokens to generate a new key

### File Upload Error

**Problem:** `LIMIT_FILE_SIZE` error

**Solution:**

1. File exceeds 5MB limit
2. Reduce image size or compress before uploading

### CORS Error

**Problem:** Frontend can't reach backend

**Solution:**

1. Ensure `FRONTEND_URL` is set correctly in `.env`
2. Check `backend/config/cors.js` allows your frontend origin
3. Verify frontend is using correct API base URL

## 📝 Development Guidelines

### Adding New Endpoints

1. Create controller in `controllers/`
2. Add route in `routes/api.js`
3. Add validation middleware in `middleware/validateRequest.js`
4. Test endpoint manually
5. Document in this README

### Adding New Models

1. Create schema in `models/`
2. Define validation rules
3. Add indexes for frequently queried fields
4. Export model

### Error Handling Best Practices

- Use `AppError` for operational errors
- Always use `next(error)` in async controllers
- Provide meaningful error messages
- Include error context in development mode

## 🔒 Security

### Current Measures

- CORS configuration limiting origins
- File upload validation (type, size)
- MongoDB connection with authentication support
- Environment variable for sensitive data
- Request logging for audit trail

### Production Recommendations

- Enable MongoDB authentication
- Use HTTPS only
- Add rate limiting (e.g., express-rate-limit)
- Implement authentication/authorization
- Add input sanitization
- Enable security headers (helmet)

## 📈 Performance

### Optimization Tips

- **Database:** Add indexes on frequently queried fields
- **File Uploads:** Consider cloud storage (AWS S3, Cloudinary) for production
- **Embeddings:** Cache embeddings to reduce API calls
- **Matching:** Implement vector database (Pinecone, Weaviate) for faster similarity search at scale

## 🌐 Deployment

### Environment Variables

Set the following in production:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
HUGGINGFACE_API_KEY=your_production_key
FRONTEND_URL=https://your-frontend-domain.com
```

### Deployment Platforms

- **Heroku:** Easy deployment with Procfile
- **AWS EC2:** Full control, requires configuration
- **DigitalOcean:** App Platform or Droplet
- **Vercel/Netlify:** Not recommended for backend (serverless limitations)

## 📄 License

MIT

## 👥 Contributors

Your team here

## 📞 Support

For issues and questions, please open an issue on GitHub.
