# Resume Upload Fix - Multipart Boundary Issue

## 🐛 Problem
When uploading resume files, the API was returning:
```
POST http://localhost:4000/api/developer/resume/upload 500 (Internal Server Error)
{"status":"error","message":"Multipart: Boundary not found"}
```

## 🔍 Root Cause
The issue was in `src/utils/api.js` where we were **manually setting** `Content-Type: multipart/form-data` header for file uploads.

When uploading files with `FormData`, the browser needs to **automatically set** the `Content-Type` header with the correct **boundary parameter**, which looks like:
```
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
```

By manually setting `Content-Type: multipart/form-data`, we were overriding the browser's automatic boundary generation, causing the server to not find the boundary delimiter.

## ✅ Solution

### 1. Updated `src/utils/api.js`

**Changed the `apiRequest` function to detect FormData:**
```javascript
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;

  // Check if body is FormData (for file uploads)
  const isFormData = options.body instanceof FormData;

  const config = {
    ...options,
    headers: {
      // Don't set Content-Type for FormData - let browser set it with boundary
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
    credentials: 'include',
  };

  // ... rest of the code
};
```

**Changed the `post` helper to not stringify FormData:**
```javascript
export const post = (endpoint, data, options = {}) => {
  // Don't stringify FormData
  const body = data instanceof FormData ? data : JSON.stringify(data);
  
  return apiRequest(endpoint, {
    ...options,
    method: 'POST',
    body,
  });
};
```

### 2. Updated `src/services/developerService.js`

**Removed manual Content-Type header:**
```javascript
export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  // Don't set Content-Type header - let browser handle it with boundary
  const response = await post('/api/developer/resume/upload', formData);
  return response.data;
};
```

## 🎯 How It Works Now

1. **Create FormData:**
   ```javascript
   const formData = new FormData();
   formData.append('resume', file);
   ```

2. **Pass to post() helper:**
   ```javascript
   const response = await post('/api/developer/resume/upload', formData);
   ```

3. **api.js detects FormData:**
   - Sees that `data instanceof FormData` is `true`
   - **Does NOT set** `Content-Type` header
   - **Does NOT call** `JSON.stringify()`

4. **Browser automatically sets:**
   ```
   Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
   ```

5. **Server receives correct multipart data with boundary** ✅

## 🧪 Testing

**Test the resume upload:**
1. Go to `/developer/resume`
2. Select a PDF file (< 5MB)
3. File should upload successfully
4. Check Network tab:
   - Request Headers should show: `Content-Type: multipart/form-data; boundary=...`
   - Response should be: `200 OK` with resume data

**Expected Request Headers:**
```
Authorization: Bearer eyJhbGc...
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Resume uploaded successfully",
  "data": {
    "resumeUrl": "/uploads/resumes/1_1696680000.pdf",
    "fileName": "John_Doe_Resume.pdf",
    "fileSize": 245760,
    "uploadedAt": "2025-10-07T15:45:00Z"
  }
}
```

## 📝 Key Takeaways

### ❌ Don't Do This (Wrong)
```javascript
// Wrong - manually setting Content-Type for FormData
const formData = new FormData();
formData.append('file', file);

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'multipart/form-data', // ❌ Missing boundary!
  },
  body: formData,
});
```

### ✅ Do This (Correct)
```javascript
// Correct - let browser set Content-Type with boundary
const formData = new FormData();
formData.append('file', file);

fetch(url, {
  method: 'POST',
  // No Content-Type header! Browser will set it automatically
  body: formData,
});
```

## 🎉 Result

Resume upload now works correctly! The server can properly parse the multipart data with the boundary delimiter.

---

**Fixed:** October 7, 2025  
**Issue:** Multipart boundary not found  
**Status:** ✅ Resolved  
**Files Modified:** 
- `src/utils/api.js` (2 changes)
- `src/services/developerService.js` (1 change)
