# 🎨 Visual Product Matcher - Frontend

React-based user interface for visual product matching with Redux state management.

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── api/             # API client (NEW!)
│   │   ├── client.js    # Axios instance with config
│   │   └── endpoints.js # API method definitions
│   ├── components/      # React components
│   ├── features/        # Redux slices
│   │   └── productSlice.js
│   ├── store/           # Redux store
│   ├── App.js           # Root component
│   └── index.js         # Entry point
├── .env.development     # Development environment variables
├── .env.production      # Production environment variables
└── package.json
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Configure Environment

The project now uses **environment-based API configuration** instead of proxy middleware.

**For development:**

Create `.env.development`:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

**For production:**

Create `.env.production`:

```env
REACT_APP_API_URL=https://your-api-domain.com/api
REACT_APP_ENV=production
```

### 3. Start Development Server

```bash
npm start
```

The app will be available at: `http://localhost:3000`

## 🔄 What Changed (Restructuring)

### ❌ Old Approach (Proxy-based)

**Problems:**

- Unreliable proxy middleware
- 404 errors when frontend tries to reach backend
- Configuration complexity
- Hard to debug

**Old files:**

- `src/setupProxy.js` (removed/backed up)
- Direct API calls to `/api/*` paths

### ✅ New Approach (Environment-based)

**Benefits:**

- Direct API calls with explicit base URL
- No proxy middleware required
- Works in development and production
- Easy to configure per environment
- Better error handling and logging

**New structure:**

```javascript
// src/api/client.js
const API_BASE_URL = process.env.REACT_APP_API_URL;
const apiClient = axios.create({ baseURL: API_BASE_URL });

// src/api/endpoints.js
export const uploadProductImage = async (file, name) => {
  return await apiClient.post("/upload", formData);
};
```

## 📡 API Integration

### API Client (`src/api/client.js`)

Centralized axios instance with:

- Base URL from environment variable
- 30-second timeout
- Request/response interceptors
- Automatic logging with emojis (📤📥❌)
- Error handling

### API Endpoints (`src/api/endpoints.js`)

All API methods in one place:

```javascript
import { uploadProductImage, findSimilarProducts } from "./api/endpoints";

// Upload file
const result = await uploadProductImage(file, "Product Name");

// Find matches
const matches = await findSimilarProducts(imageUrl);
```

**Available methods:**

- `healthCheck()` - Check API status
- `uploadProductImage(file, name)` - Upload image file
- `uploadProductUrl(imageUrl, name)` - Upload image URL
- `findSimilarProducts(imageUrl)` - Find similar products
- `getAllProducts()` - Get all products
- `getProductById(id)` - Get single product
- `deleteProduct(id)` - Delete product

## 🏪 Redux State Management

### Product Slice (`src/features/productSlice.js`)

**State:**

```javascript
{
  uploadedImage: null,
  matchedProducts: [],
  allProducts: [],
  loading: false,
  error: null,
  filters: {
    category: 'all',
    sortBy: 'similarity'
  }
}
```

**Async Actions:**

- `uploadImage(data)` - Upload image and generate embedding
- `matchProducts(imageUrl)` - Find similar products
- `fetchProducts()` - Get all products

**Sync Actions:**

- `setFilters(filters)` - Update filters
- `clearError()` - Clear error message
- `resetUpload()` - Reset upload state

### Usage in Components

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, matchProducts } from './features/productSlice';

function MyComponent() {
  const dispatch = useDispatch();
  const { loading, error, matchedProducts } = useSelector(state => state.products);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', 'My Product');

    const result = await dispatch(uploadImage(formData)).unwrap();
    await dispatch(matchProducts(result.data.image_url));
  };

  return (/* ... */);
}
```

## 🎨 Components

### Expected Components (customize as needed)

- **UploadForm**: Handle image upload (file or URL)
- **ProductCard**: Display product with image and similarity
- **ProductGrid**: Grid layout of matched products
- **FilterBar**: Filter and sort controls
- **ErrorAlert**: Display error messages
- **LoadingSpinner**: Loading indicator

## 🔧 Configuration Files

### `.env.development`

```env
# Backend API URL for local development
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### `.env.production`

```env
# Backend API URL for production
REACT_APP_API_URL=https://api.yourapp.com/api
REACT_APP_ENV=production
```

### `package.json` Scripts

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}
```

## 🧪 Testing

### Test API Connection

1. Start backend server (port 5000)
2. Start frontend dev server (port 3000)
3. Open browser console
4. Look for API connection logs:
   ```
   🔧 API Base URL: http://localhost:5000/api
   📤 POST /upload
   📥 201 /upload
   ```

### Test Upload Flow

```javascript
// In browser console
import api from "./api/endpoints";

// Test health
await api.healthCheck();

// Test upload
const formData = new FormData();
formData.append("image", fileInput.files[0]);
await api.uploadProductImage(fileInput.files[0], "Test");
```

## 🚨 Troubleshooting

### Network Error / Cannot Connect to Backend

**Symptoms:**

- Console shows: `❌ No response from server: Network Error`
- Requests timeout

**Solutions:**

1. Verify backend is running on port 5000
2. Check `.env.development` has correct `REACT_APP_API_URL`
3. Ensure no typos in environment variable name (must start with `REACT_APP_`)
4. Restart development server after changing `.env` files

### CORS Error

**Symptoms:**

- Console shows: `Access to XMLHttpRequest at 'http://localhost:5000/api/...' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Solutions:**

1. Verify backend `cors.js` allows `http://localhost:3000`
2. Check backend is using cors middleware
3. Ensure backend CORS config includes `credentials: true`

### 404 Not Found

**Symptoms:**

- API calls return 404
- Correct endpoint but wrong path

**Solutions:**

1. Check API base URL is correct (should end with `/api`, no trailing slash)
2. Verify endpoint path doesn't duplicate `/api` (already in base URL)
3. Check backend routes are registered correctly

### Environment Variables Not Loading

**Symptoms:**

- `process.env.REACT_APP_API_URL` is undefined
- App uses default URL instead of configured URL

**Solutions:**

1. Ensure file is named `.env.development` (not `.env.dev` or `.env.local`)
2. Restart development server (changes to `.env` require restart)
3. Variable must start with `REACT_APP_` prefix
4. Check for typos in variable name

### Redux State Not Updating

**Symptoms:**

- Actions dispatch but state doesn't change
- Console shows successful API call but UI doesn't update

**Solutions:**

1. Check Redux DevTools to see state changes
2. Verify action is properly dispatched with `await dispatch(action).unwrap()`
3. Ensure component is using `useSelector` correctly
4. Check reducer is handling action cases

## 📦 Dependencies

### Core

- `react`: UI library
- `react-dom`: React rendering
- `react-router-dom`: Routing
- `@reduxjs/toolkit`: State management
- `react-redux`: React-Redux bindings

### API & Data

- `axios`: HTTP client

### UI (add as needed)

- `@mui/material`: Material UI components
- `styled-components`: Styled components
- `react-icons`: Icon library

## 🏗️ Build for Production

### 1. Configure Production Environment

Create `.env.production`:

```env
REACT_APP_API_URL=https://your-production-api.com/api
REACT_APP_ENV=production
```

### 2. Build

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### 3. Test Production Build Locally

```bash
npm install -g serve
serve -s build -l 3000
```

### 4. Deploy

Upload `build/` folder contents to:

- **Netlify**: Drag and drop `build/` folder
- **Vercel**: Connect GitHub repo, auto-deploy
- **AWS S3 + CloudFront**: Upload to S3, configure CloudFront
- **Firebase Hosting**: `firebase deploy`

## 🔒 Security Best Practices

### Environment Variables

- ✅ **DO:** Use `REACT_APP_` prefix for public variables
- ✅ **DO:** Keep production URLs in `.env.production`
- ❌ **DON'T:** Store API keys in frontend (use backend proxy)
- ❌ **DON'T:** Commit `.env` files to Git (add to `.gitignore`)

### API Calls

- ✅ **DO:** Validate data before sending to API
- ✅ **DO:** Handle errors gracefully
- ✅ **DO:** Show user-friendly error messages
- ❌ **DON'T:** Trust user input without validation
- ❌ **DON'T:** Expose sensitive error details to users

## 📈 Performance Optimization

### Code Splitting

Use React lazy loading:

```javascript
const ProductGrid = React.lazy(() => import("./components/ProductGrid"));
```

### Memoization

Prevent unnecessary re-renders:

```javascript
const MemoizedProductCard = React.memo(ProductCard);
```

### Image Optimization

- Use appropriate image formats (WebP, AVIF)
- Lazy load images off-screen
- Compress images before upload

### Bundle Size

Check bundle size:

```bash
npm run build
npx source-map-explorer build/static/js/*.js
```

## 📝 Development Guidelines

### Adding New API Endpoints

1. Add method to `src/api/endpoints.js`:

   ```javascript
   export const newEndpoint = async (data) => {
     const response = await apiClient.post("/new-endpoint", data);
     return response.data;
   };
   ```

2. Use in Redux slice or component:
   ```javascript
   import { newEndpoint } from "../api/endpoints";
   const result = await newEndpoint(data);
   ```

### Adding New Redux Actions

1. Create async thunk in slice:

   ```javascript
   export const newAction = createAsyncThunk(
     "products/newAction",
     async (data, { rejectWithValue }) => {
       try {
         return await newEndpoint(data);
       } catch (error) {
         return rejectWithValue(error.message);
       }
     }
   );
   ```

2. Add reducer cases:
   ```javascript
   .addCase(newAction.pending, (state) => { state.loading = true; })
   .addCase(newAction.fulfilled, (state, action) => { /* update state */ })
   .addCase(newAction.rejected, (state, action) => { state.error = action.payload; })
   ```

## 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## 📄 License

MIT

## 👥 Contributors

Your team here

## 📞 Support

For issues and questions, please open an issue on GitHub.
