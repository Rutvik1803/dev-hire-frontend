# API Integration Documentation

This document describes the authentication API integration for the DevHire frontend application.

## Base URL
```
http://localhost:4000
```

## File Structure

### New Files Created

1. **`src/utils/api.js`** - Core API utility functions
   - Generic API request handler with error handling
   - HTTP method helpers (GET, POST, PUT, DELETE)
   - Automatic token management
   - Cookie credentials support

2. **`src/services/authService.js`** - Authentication service layer
   - Sign up function
   - Login function
   - Logout function
   - Token management utilities

### Updated Files

3. **`src/context/AuthContext.jsx`** - Authentication context
   - Integrated with real API calls
   - Persistent user session (localStorage)
   - Loading states
   - Error handling

4. **`src/pages/auth/Login.jsx`** - Login page
   - API integration with error handling
   - Loading states
   - Toast notifications for errors/success
   - Proper role-based navigation

5. **`src/pages/auth/Register.jsx`** - Registration page
   - API integration with error handling
   - Password validation
   - Loading states
   - Toast notifications for errors/success
   - Proper role-based navigation

## API Endpoints

### 1. Sign Up

**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "password123",
  "role": "DEVELOPER" // or "RECRUITER"
}
```

**Success Response (201):**
```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "DEVELOPER"
    },
    "accessToken": "eyJhbGci..."
  }
}
```

**Error Responses:**
- `400` - Validation errors (missing fields, invalid email, short password, invalid role)
- `409` - User already exists

**Sets HttpOnly Cookie:** `refreshToken`

---

### 2. Login

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "DEVELOPER" // or "RECRUITER" or "ADMIN"
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "John Doe",
      "role": "DEVELOPER"
    },
    "accessToken": "eyJhbGci..."
  }
}
```

**Error Responses:**
- `400` - Validation errors (missing fields, invalid email)
- `401` - Invalid credentials or role mismatch

**Sets HttpOnly Cookie:** `refreshToken`

---

## Implementation Details

### Authentication Flow

1. **User Registration:**
   - User selects role (Developer/Recruiter)
   - Fills in registration form
   - Frontend validates password match and length
   - API call to `/api/auth/signup`
   - On success: Store access token and user data, redirect to dashboard

2. **User Login:**
   - User enters email, password, and selects role
   - API call to `/api/auth/login`
   - On success: Store access token and user data, redirect to dashboard

3. **Session Persistence:**
   - Access token stored in `localStorage`
   - User data stored in `localStorage`
   - Refresh token stored in HttpOnly cookie (automatic)
   - On page reload, user session is restored from localStorage

4. **Logout:**
   - Clear access token from localStorage
   - Clear user data from localStorage
   - Refresh token cookie cleared by backend

### Token Management

- **Access Token:** Stored in `localStorage` as `accessToken`
- **Refresh Token:** Stored in HttpOnly cookie (handled by backend)
- **Authorization Header:** Automatically added to all API requests: `Authorization: Bearer <accessToken>`
- **Credentials:** All requests include `credentials: 'include'` for cookie support

### Error Handling

The application handles various error scenarios:

| Status Code | Scenario | User Message |
|-------------|----------|--------------|
| 0 | Network error | "Cannot connect to server. Please try again later." |
| 400 | Bad request | Specific validation error or "Please check your input fields." |
| 401 | Unauthorized | "Invalid credentials or role mismatch." |
| 409 | Conflict | "An account with this email already exists." |

### State Management

**AuthContext provides:**
```javascript
{
  user: {
    id: number,
    name: string,
    email: string,
    role: 'developer' | 'recruiter' | 'admin'
  } | null,
  login: (email, password, role) => Promise<user>,
  register: (name, email, password, role) => Promise<user>,
  logout: () => void,
  isAuthenticated: boolean,
  loading: boolean
}
```

## Usage Examples

### Making Authenticated Requests

```javascript
import { get, post, put, del } from '../utils/api';

// GET request
const jobs = await get('/api/jobs');

// POST request with data
const newJob = await post('/api/jobs', {
  title: 'Senior Developer',
  description: 'We are hiring...',
});

// PUT request
const updated = await put('/api/jobs/123', {
  title: 'Updated Title',
});

// DELETE request
await del('/api/jobs/123');
```

### Using Auth Context

```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    try {
      await login('user@example.com', 'password123', 'developer');
      // Success - user is now logged in
    } catch (error) {
      // Handle error
      console.error(error.message);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <p>Welcome, {user.name}!</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

## Testing

### Prerequisites
1. Backend server running on `http://localhost:4000`
2. Database properly configured and migrated

### Test Scenarios

#### 1. Registration
- [ ] Register as Developer with valid data
- [ ] Register as Recruiter with valid data
- [ ] Try to register with existing email (should show error)
- [ ] Try to register with invalid email format
- [ ] Try to register with short password (< 6 chars)
- [ ] Try to register with mismatched passwords

#### 2. Login
- [ ] Login as Developer with correct credentials
- [ ] Login as Recruiter with correct credentials
- [ ] Login as Admin with correct credentials
- [ ] Try to login with wrong password
- [ ] Try to login with wrong role
- [ ] Try to login with non-existent email

#### 3. Session Persistence
- [ ] Login and refresh page (should stay logged in)
- [ ] Login, close tab, reopen (should stay logged in)
- [ ] Logout (should clear session)

#### 4. Navigation
- [ ] After login as Developer, redirects to `/developer/dashboard`
- [ ] After login as Recruiter, redirects to `/recruiter/dashboard`
- [ ] After login as Admin, redirects to `/admin/dashboard`

## Security Considerations

1. **Access Token Storage:** Stored in localStorage (consider using memory storage for enhanced security in production)
2. **Refresh Token:** Stored in HttpOnly cookie (not accessible to JavaScript)
3. **CORS:** Ensure backend allows credentials from frontend origin
4. **HTTPS:** Use HTTPS in production for secure cookie transmission
5. **Token Expiration:** Implement token refresh logic when needed

## Future Enhancements

- [ ] Implement token refresh logic
- [ ] Add password strength indicator
- [ ] Add email verification flow
- [ ] Add "Forgot Password" functionality
- [ ] Implement OAuth providers (Google, GitHub)
- [ ] Add rate limiting on frontend
- [ ] Add CAPTCHA for bot prevention
- [ ] Implement 2FA (Two-Factor Authentication)

## Troubleshooting

### Issue: "Cannot connect to server"
- **Solution:** Ensure backend server is running on `http://localhost:4000`

### Issue: "CORS error"
- **Solution:** Configure backend to allow credentials and the frontend origin

### Issue: User stays logged in after logout
- **Solution:** Clear browser localStorage manually or check logout implementation

### Issue: Token not being sent with requests
- **Solution:** Verify `credentials: 'include'` is set in fetch config

## Environment Variables

For production, consider adding:

```env
VITE_API_BASE_URL=https://api.devhire.com
```

Then update `src/utils/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';
```
