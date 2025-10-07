# Developer Dashboard - Quick Testing Guide

## 🚀 Quick Start

### 1. Prerequisites
- ✅ Backend server running on `http://localhost:4000`
- ✅ Frontend server running on `http://localhost:5173`
- ✅ Database connected and migrations run
- ✅ At least one job posted by a recruiter

### 2. Test User Account
Create a developer account or use existing:
```
Email: developer@test.com
Password: Test@123
Role: DEVELOPER
```

---

## 📋 Test Scenarios

### Scenario 1: Dashboard Overview
**Path:** `/developer/dashboard`

**Test Steps:**
1. Login as developer
2. Navigate to Dashboard
3. **Expected:** See 4 stat cards (Applied Jobs, In Review, Interviews, Offers)
4. **Expected:** See "Recent Applications" section
5. **Expected:** See "Browse Jobs" and "Update Resume" quick action cards

**API Calls:**
- `GET /api/developer/dashboard/stats`
- `GET /api/developer/applications/recent?limit=5`

**Success Criteria:**
- [ ] Stats load from backend
- [ ] Recent applications displayed (if any)
- [ ] Empty state shown if no applications
- [ ] Loading spinner appears while fetching
- [ ] Error toast shown if API fails

---

### Scenario 2: Browse and Apply to Jobs
**Path:** `/developer/jobs` → `/developer/jobs/:id`

**Test Steps:**
1. Click "Browse Jobs" from dashboard
2. **Expected:** See list of all available jobs
3. Search for "developer" in search box
4. **Expected:** Filtered results appear
5. Select a job type filter (e.g., "Full-time")
6. **Expected:** Jobs filtered by type
7. Click on a job card to view details
8. **Expected:** Job details page loads
9. Click "Apply Now" button
10. **Expected:** Cover letter modal opens
11. Write cover letter (at least 10 characters)
12. Click "Submit Application"
13. **Expected:** Success toast appears
14. **Expected:** "Apply Now" changes to "Applied" badge
15. Refresh page
16. **Expected:** Still shows "Applied" badge

**API Calls:**
- `GET /api/jobs` (browse jobs)
- `GET /api/jobs/:id` (job details)
- `GET /api/jobs/:id/application-status` (check if applied)
- `POST /api/jobs/:id/apply` (submit application)

**Success Criteria:**
- [ ] Jobs load from backend
- [ ] Search and filters work
- [ ] Job details display correctly
- [ ] Application status checked on page load
- [ ] Cover letter modal opens
- [ ] Application submits successfully
- [ ] Cannot apply twice (shows "Applied" badge)
- [ ] Success toast appears

---

### Scenario 3: View and Manage Applications
**Path:** `/developer/applications`

**Test Steps:**
1. Click "My Applications" from sidebar
2. **Expected:** See all submitted applications
3. Search for a job title
4. **Expected:** Results filtered
5. Select status filter "Applied"
6. **Expected:** Only APPLIED status applications shown
7. Click "View Job" on an application
8. **Expected:** Navigate to job details page
9. Return to My Applications
10. Click "Withdraw" on an APPLIED application
11. **Expected:** Confirmation dialog appears
12. Confirm withdrawal
13. **Expected:** Application removed from list
14. **Expected:** Success toast appears

**API Calls:**
- `GET /api/developer/applications` (all applications)
- `GET /api/developer/applications?status=APPLIED` (filtered)
- `DELETE /api/applications/:id` (withdraw)

**Success Criteria:**
- [ ] All applications load
- [ ] Search works correctly
- [ ] Status filter works
- [ ] Can view job details
- [ ] Can withdraw APPLIED/IN_REVIEW applications
- [ ] Cannot withdraw ACCEPTED/REJECTED applications
- [ ] Confirmation dialog appears
- [ ] Success toast after withdrawal

---

### Scenario 4: Upload Resume
**Path:** `/developer/resume`

**Test Steps:**
1. Click "My Resume" from sidebar
2. **Expected:** See "No resume uploaded yet" (if first time)
3. Click "Choose File" or drag and drop
4. Select a PDF file (< 5MB)
5. **Expected:** File preview appears
6. File automatically uploads
7. **Expected:** Success toast appears
8. **Expected:** Resume status shows "Resume uploaded and active"
9. **Expected:** See file details (name, size, upload date)
10. Click "View Resume"
11. **Expected:** Resume opens in new tab
12. Click "Delete" button
13. **Expected:** Confirmation dialog appears
14. Confirm deletion
15. **Expected:** Resume removed
16. **Expected:** Success toast appears

**API Calls:**
- `GET /api/developer/resume` (get resume details)
- `POST /api/developer/resume/upload` (upload resume)
- `DELETE /api/developer/resume` (delete resume)

**Success Criteria:**
- [ ] Resume details load
- [ ] File upload works
- [ ] Only PDF/DOC/DOCX accepted
- [ ] Files > 5MB rejected
- [ ] Resume details displayed after upload
- [ ] Can download/view resume
- [ ] Can delete resume
- [ ] Confirmation dialogs appear

---

### Scenario 5: Error Handling
**Test Steps:**
1. Stop backend server
2. Try to load dashboard
3. **Expected:** Error toast "Cannot connect to server"
4. Start backend server
5. Try to apply to same job twice
6. **Expected:** Error toast "You have already applied to this job"
7. Try to upload 10MB file
8. **Expected:** Error toast "File size exceeds 5MB"
9. Try to upload .txt file
10. **Expected:** Error toast "Only PDF and DOC/DOCX files are allowed"

**Success Criteria:**
- [ ] Network errors handled gracefully
- [ ] Duplicate application prevented (409)
- [ ] File size validation works
- [ ] File type validation works
- [ ] All errors show user-friendly messages

---

## 🎯 Expected API Responses

### Dashboard Stats
```json
{
  "success": true,
  "data": {
    "appliedJobs": 15,
    "inReview": 8,
    "interviews": 3,
    "offers": 1
  }
}
```

### Recent Applications
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "jobId": 5,
      "status": "APPLIED",
      "appliedDate": "2025-10-07T10:30:00Z",
      "job": {
        "id": 5,
        "title": "Senior Developer",
        "companyName": "Tech Corp"
      }
    }
  ]
}
```

### Application Status (Not Applied)
```json
{
  "success": true,
  "data": {
    "hasApplied": false,
    "application": null
  }
}
```

### Application Status (Applied)
```json
{
  "success": true,
  "data": {
    "hasApplied": true,
    "application": {
      "id": 1,
      "status": "IN_REVIEW",
      "appliedDate": "2025-10-07T10:30:00Z"
    }
  }
}
```

### Apply Success
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "id": 1,
    "jobId": 5,
    "status": "APPLIED",
    "coverLetter": "I am excited...",
    "appliedDate": "2025-10-07T10:30:00Z"
  }
}
```

### Resume Upload Success
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

---

## 🐛 Common Issues & Solutions

### Issue 1: "Cannot connect to server"
**Solution:**
- Check if backend is running on port 4000
- Check CORS settings in backend
- Verify `VITE_API_BASE_URL` in `.env`

### Issue 2: "Unauthorized" error
**Solution:**
- Check if JWT token is valid
- Try logging out and logging in again
- Check `Authorization` header in network tab

### Issue 3: Resume upload fails
**Solution:**
- Check file size (must be < 5MB)
- Check file type (PDF, DOC, DOCX only)
- Check `uploads/resumes/` directory exists in backend
- Check multer configuration in backend

### Issue 4: Applications not showing
**Solution:**
- Check if applications exist in database
- Verify `applicant_id` matches logged-in user ID
- Check API response in network tab

### Issue 5: Cannot withdraw application
**Solution:**
- Check application status (can only withdraw APPLIED/IN_REVIEW)
- Verify application belongs to logged-in user
- Check if application still exists in database

---

## ✅ Testing Checklist

Use this checklist to verify all features:

### Dashboard
- [ ] Stats load correctly
- [ ] Recent applications display
- [ ] Empty state when no applications
- [ ] Quick action cards work
- [ ] Loading state appears
- [ ] Error handling works

### Jobs
- [ ] All jobs display
- [ ] Search works
- [ ] Filters work (type, skills)
- [ ] Job details load
- [ ] Can navigate between jobs

### Job Application
- [ ] Application status checked
- [ ] "Apply Now" shows for new jobs
- [ ] "Applied" badge shows for applied jobs
- [ ] Cover letter modal opens
- [ ] Cover letter required validation
- [ ] Application submits successfully
- [ ] Cannot apply twice
- [ ] Success toast appears

### My Applications
- [ ] All applications load
- [ ] Search by title/company works
- [ ] Status filter works
- [ ] Application cards display correctly
- [ ] Can view job from application
- [ ] Can withdraw APPLIED applications
- [ ] Cannot withdraw ACCEPTED/REJECTED
- [ ] Confirmation dialogs work
- [ ] Cover letter displays

### Resume
- [ ] Resume details load
- [ ] Upload works (PDF)
- [ ] Upload works (DOC/DOCX)
- [ ] File validation works (size)
- [ ] File validation works (type)
- [ ] Resume info displays after upload
- [ ] Can view/download resume
- [ ] Can delete resume
- [ ] Confirmation for delete
- [ ] Empty state when no resume

### Error Handling
- [ ] Network errors handled
- [ ] 404 errors handled
- [ ] 409 duplicate errors handled
- [ ] 400 validation errors handled
- [ ] 413 file size errors handled
- [ ] All errors show user-friendly messages
- [ ] Toast notifications work

### UI/UX
- [ ] Loading spinners appear
- [ ] Buttons disable during actions
- [ ] Button text changes during loading
- [ ] Empty states display correctly
- [ ] Confirmation dialogs appear
- [ ] Navigation works
- [ ] Sidebar highlights active page
- [ ] Mobile responsive

---

## 🎉 Success!

If all checklist items pass, the Developer Dashboard is **fully functional** and ready for production! 🚀

---

**Testing Date:** _____________  
**Tester:** _____________  
**Backend Version:** _____________  
**Frontend Version:** _____________  
**Status:** [ ] Pass [ ] Fail  
**Notes:** _____________
