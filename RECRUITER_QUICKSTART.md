# 🚀 Quick Start Guide - Recruiter Dashboard

## Run the Application

### Terminal 1 - Backend
```bash
cd ../devhire-backend
npm run dev
```
✅ Backend running on `http://localhost:4000`

### Terminal 2 - Frontend
```bash
npm run dev
```
✅ Frontend running on `http://localhost:5173`

---

## Testing Workflow

### 1️⃣ Login as Recruiter
- Navigate to: `http://localhost:5173/login`
- Use your recruiter credentials
- Should redirect to `/recruiter/dashboard`

### 2️⃣ Dashboard Overview
**URL:** `/recruiter/dashboard`

**What to verify:**
- ✅ Stats cards show real numbers (jobs posted, total applicants, in review, hired)
- ✅ "Recent Job Posts" section shows your last 3 jobs
- ✅ "Recent Applicants" section shows last 5 applications
- ✅ All links are clickable and navigate correctly

### 3️⃣ View All Jobs
**URL:** `/recruiter/jobs`

**Actions to test:**
- ✅ Click "View Applicants" (eye icon) → Goes to job applicants page
- ✅ Click "Edit" (pencil icon) → Goes to edit job page
- ✅ Click "Delete" (trash icon) → Confirms and deletes job

### 4️⃣ Create New Job
**URL:** `/recruiter/jobs/new`

**Test flow:**
1. Fill in all required fields
2. Add skills (comma-separated)
3. Click "Post Job"
4. Should see success toast
5. Redirects to jobs list

### 5️⃣ Edit Job
**URL:** `/recruiter/jobs/edit/:id`

**Test flow:**
1. Form pre-fills with existing job data
2. Modify any fields
3. Click "Update Job"
4. Should see success toast
5. Redirects to jobs list

### 6️⃣ View Job Applicants
**URL:** `/recruiter/jobs/:id/applicants`

**What to verify:**
- ✅ Job details shown at top
- ✅ Applicant count is correct
- ✅ Status filter buttons work (All, Applied, In Review, Accepted, Rejected)
- ✅ Applicant cards show name, email, experience, skills
- ✅ Click on card → Goes to applicant details

### 7️⃣ View Applicant Details
**URL:** `/recruiter/applicants/:id`

**What to verify:**
- ✅ Full applicant profile displayed
- ✅ Contact information (email, phone)
- ✅ Skills list shown
- ✅ Cover letter displayed (if provided)
- ✅ Social links work (LinkedIn, GitHub)
- ✅ Resume link opens in new tab

**Test status update:**
1. Click any status button (Applied, In Review, Accepted, Rejected)
2. Button should highlight
3. Toast notification appears
4. Status updates in the UI
5. Go back and verify status persists

---

## 🔍 Key Features Checklist

### Dashboard Features
- [ ] Stats show real data
- [ ] Recent jobs clickable
- [ ] Recent applicants clickable
- [ ] "Post New Job" button works
- [ ] "Manage Applications" button works

### Job Management
- [ ] View all posted jobs
- [ ] Create new job
- [ ] Edit existing job
- [ ] Delete job with confirmation
- [ ] Jobs persist after refresh

### Application Management
- [ ] View all applications for a job
- [ ] Filter by status
- [ ] View applicant details
- [ ] Update application status
- [ ] Status changes persist
- [ ] Email applicant works
- [ ] Resume download works

### Error Handling
- [ ] Loading spinners appear during fetches
- [ ] Error toasts show on failure
- [ ] Success toasts show on success
- [ ] Empty states display correctly
- [ ] 404 page for invalid routes

---

## 📡 API Endpoints Reference

| Feature | Endpoint | Method |
|---------|----------|--------|
| Dashboard Stats | `/api/recruiter/dashboard/stats` | GET |
| Recent Apps | `/api/recruiter/applications/recent?limit=5` | GET |
| My Jobs | `/api/jobs/my/jobs` | GET |
| Job Details | `/api/jobs/:id` | GET |
| Job Applicants | `/api/jobs/:id/applications` | GET |
| Applicant Details | `/api/applications/:id` | GET |
| Update Status | `/api/applications/:id/status` | PATCH |
| Update Job | `/api/jobs/:id` | PUT |
| Delete Job | `/api/jobs/:id` | DELETE |

---

## 🐛 Common Issues

### "Cannot connect to server"
- **Check:** Is backend running?
- **Check:** Is it on `http://localhost:4000`?
- **Fix:** Start backend with `npm run dev`

### "Please log in to view jobs"
- **Check:** Are you logged in?
- **Check:** Is token in localStorage?
- **Fix:** Log out and log back in

### "You do not have permission"
- **Check:** Are you logged in as recruiter?
- **Check:** User role in database
- **Fix:** Use recruiter account

### Resume link shows 404
- **Check:** Does resume file exist in backend?
- **Check:** Is path correct in applicant data?
- **Fix:** Upload resume for test applicant

---

## 📊 Sample Test Data

### Create Test Job
```
Title: Senior React Developer
Company: Tech Corp
Location: San Francisco, CA
Type: Full-time
Salary: $120k - $160k
Skills: React, TypeScript, Node.js, GraphQL
Description: We are looking for an experienced React developer...
```

### Expected Application States
- **APPLIED** - New application, not yet reviewed
- **IN_REVIEW** - Recruiter is reviewing
- **ACCEPTED** - Candidate accepted/hired
- **REJECTED** - Candidate rejected

---

## ✅ Success Criteria

Your recruiter dashboard is working correctly if:

1. ✅ All pages load without errors
2. ✅ Data appears on dashboard
3. ✅ Can create new job
4. ✅ Can edit existing job
5. ✅ Can delete job
6. ✅ Can view applicants
7. ✅ Can change application status
8. ✅ Status changes persist after refresh
9. ✅ Navigation works correctly
10. ✅ Toast notifications appear

---

## 🎉 You're All Set!

The recruiter dashboard is fully integrated and ready to use. All features are working with real backend APIs.

**Next Focus:** Developer Dashboard Integration (if needed)
