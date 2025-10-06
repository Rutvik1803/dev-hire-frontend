# Authentication API Integration - Quick Start

## 🎯 What Was Done

Successfully integrated authentication APIs into your DevHire frontend application with the following features:

### ✅ Created Files

1. **`src/utils/api.js`** - Core API utility with error handling
2. **`src/services/authService.js`** - Authentication service layer
3. **`API_INTEGRATION.md`** - Complete documentation

### ✅ Updated Files

1. **`src/context/AuthContext.jsx`** - Now uses real API calls
2. **`src/pages/auth/Login.jsx`** - Integrated with login API
3. **`src/pages/auth/Register.jsx`** - Integrated with signup API

## 🚀 Features Implemented

- ✅ User registration (Sign up) with API integration
- ✅ User login with API integration
- ✅ Proper error handling (400, 401, 409 status codes)
- ✅ Loading states during API calls
- ✅ Toast notifications for success/error messages
- ✅ Access token storage in localStorage
- ✅ HttpOnly cookie support for refresh tokens
- ✅ Session persistence across page refreshes
- ✅ Role-based navigation after login/signup
- ✅ Password validation (minimum 6 characters)
- ✅ Logout functionality

## 🔧 How to Use

### Prerequisites
Make sure your backend server is running on `http://localhost:4000`

### Start the Frontend
```bash
npm run dev
```

### Test the Integration

1. **Register a new user:**
   - Go to `/register`
   - Select role (Developer or Recruiter)
   - Fill in the form
   - Submit → You'll be redirected to your dashboard

2. **Login:**
   - Go to `/login`
   - Select role (Developer, Recruiter, or Admin)
   - Enter credentials
   - Submit → You'll be redirected to your dashboard

3. **Session persistence:**
   - After login, refresh the page
   - You should stay logged in

## 📝 API Endpoints Used

### Sign Up
```
POST http://localhost:4000/api/auth/signup
Body: { email, name, password, role }
```

### Login
```
POST http://localhost:4000/api/auth/login
Body: { email, password, role }
```

## 🔐 Token Management

- **Access Token:** Stored in `localStorage.accessToken`
- **Refresh Token:** Stored in HttpOnly cookie (automatic)
- **User Data:** Stored in `localStorage.user`

## 💡 Usage in Components

```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, login, register, logout, isAuthenticated } = useAuth();
  
  // Access user info
  console.log(user.name, user.email, user.role);
  
  // Check authentication
  if (isAuthenticated) {
    // User is logged in
  }
  
  // Login
  await login(email, password, role);
  
  // Register
  await register(name, email, password, role);
  
  // Logout
  logout();
}
```

## 🔍 Making API Requests

```javascript
import { get, post, put, del } from '../utils/api';

// All requests automatically include:
// - Authorization header with access token
// - credentials: 'include' for cookies
// - Error handling

const data = await get('/api/jobs');
const newJob = await post('/api/jobs', { title: 'Developer' });
const updated = await put('/api/jobs/123', { title: 'New Title' });
await del('/api/jobs/123');
```

## 🐛 Error Handling

The integration handles all common errors:

- **Network errors** - "Cannot connect to server"
- **400 errors** - Validation errors
- **401 errors** - Invalid credentials
- **409 errors** - User already exists

All errors are displayed to users via toast notifications.

## 📚 Documentation

For complete documentation, see **`API_INTEGRATION.md`**

## ✨ Next Steps

1. Ensure backend is running
2. Test registration flow
3. Test login flow
4. Test logout functionality
5. Check session persistence

## 🆘 Troubleshooting

**Can't connect to server?**
- Check backend is running on port 4000
- Check CORS is configured correctly

**CORS errors?**
- Backend must allow credentials
- Backend must whitelist frontend origin

**Token not working?**
- Check localStorage in DevTools
- Verify Authorization header is being sent

## 🎉 Success!

Your authentication is now fully integrated with the backend API. Users can:
- Sign up as Developer or Recruiter
- Login with proper credentials
- Stay logged in across page refreshes
- See appropriate error messages
- Navigate to role-specific dashboards
