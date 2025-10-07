# 🗺️ Recruiter Dashboard - Complete Flow Map

## 📍 Navigation Flow

```
Login → Recruiter Dashboard
           |
           ├─→ My Job Postings (/recruiter/jobs)
           |      |
           |      ├─→ Post New Job (/recruiter/jobs/new)
           |      |      └─→ Form Submit → API → Success → Back to Jobs List
           |      |
           |      ├─→ Edit Job (/recruiter/jobs/edit/:id)
           |      |      └─→ Load Existing → Modify → API → Success → Back to Jobs List
           |      |
           |      ├─→ View Applicants (/recruiter/jobs/:id/applicants)
           |      |      |
           |      |      └─→ Applicant Details (/recruiter/applicants/:id)
           |      |             |
           |      |             ├─→ Update Status → API → Success Toast
           |      |             ├─→ Schedule Interview
           |      |             ├─→ Send Email → Opens Mail Client
           |      |             └─→ Download Resume → Opens PDF
           |      |
           |      └─→ Delete Job → Confirm → API → Success → Refresh List
           |
           └─→ Recent Applications
                  └─→ Click Application → Applicant Details
```

---

## 🔄 API Integration Map

### Dashboard Page
```
Component: RecruiterDashboard
    |
    ├─→ useEffect (on mount)
    |       |
    |       ├─→ getDashboardStats()
    |       |     └─→ GET /api/recruiter/dashboard/stats
    |       |           └─→ { jobsPosted, totalApplicants, inReview, hired }
    |       |
    |       ├─→ getMyJobs()
    |       |     └─→ GET /api/jobs/my/jobs
    |       |           └─→ [ { id, title, companyName, ... }, ... ]
    |       |
    |       └─→ getRecentApplications(5)
    |             └─→ GET /api/recruiter/applications/recent?limit=5
    |                   └─→ [ { id, applicant: {...}, job: {...} }, ... ]
    |
    └─→ Display in UI (Stats Cards, Recent Jobs, Recent Applicants)
```

### Job Applicants Page
```
Component: JobApplicants
    |
    ├─→ useEffect (on mount)
    |       |
    |       ├─→ getJobById(jobId)
    |       |     └─→ GET /api/jobs/:id
    |       |           └─→ { id, title, companyName, location, ... }
    |       |
    |       └─→ getJobApplications(jobId)
    |             └─→ GET /api/jobs/:id/applications
    |                   └─→ { data: [...], count: 15 }
    |
    ├─→ Status Filter (client-side)
    |       └─→ Filter applications array by status
    |
    └─→ Display Applicant Cards
```

### Applicant Details Page
```
Component: ApplicantDetails
    |
    ├─→ useEffect (on mount)
    |       └─→ getApplicationById(applicationId)
    |             └─→ GET /api/applications/:id
    |                   └─→ {
    |                         id, status, coverLetter,
    |                         applicant: { name, email, skills, ... },
    |                         job: { title, companyName, ... }
    |                       }
    |
    ├─→ Status Button Click
    |       └─→ updateApplicationStatus(applicationId, newStatus, note)
    |             └─→ PATCH /api/applications/:id/status
    |                   └─→ { status, updatedDate }
    |                         └─→ Update local state
    |                               └─→ Show success toast
    |
    └─→ Display Full Profile
```

### Edit Job Page
```
Component: EditJob
    |
    ├─→ useEffect (on mount)
    |       └─→ getJobById(jobId)
    |             └─→ GET /api/jobs/:id
    |                   └─→ { id, title, companyName, ... }
    |                         └─→ Populate form fields
    |
    ├─→ Form Submit
    |       └─→ updateJob(jobId, formData)
    |             └─→ PUT /api/jobs/:id
    |                   └─→ { id, title, ... updated data }
    |                         └─→ Show success toast
    |                               └─→ Navigate to /recruiter/jobs
    |
    └─→ Cancel Button
            └─→ Navigate to /recruiter/jobs (no API call)
```

---

## 📊 State Management Flow

### Dashboard Component
```javascript
State:
  - stats: { jobsPosted, totalApplicants, inReview, hired }
  - recentJobs: [ {...}, {...}, {...} ]
  - recentApplicants: [ {...}, {...}, {...} ]
  - loading: boolean
  - error: string
  - showToast: boolean

Lifecycle:
  1. Component mounts
  2. Set loading = true
  3. Fetch data (parallel)
  4. Set state with data
  5. Set loading = false
  6. Render UI
```

### JobApplicants Component
```javascript
State:
  - job: { id, title, ... }
  - applications: [ {...}, {...} ]
  - filteredApplications: [ {...}, {...} ]
  - statusFilter: 'ALL' | 'APPLIED' | 'IN_REVIEW' | 'ACCEPTED' | 'REJECTED'
  - loading: boolean
  - error: string

Lifecycle:
  1. Component mounts → Fetch job & applications
  2. User selects filter → Update filteredApplications
  3. User clicks applicant → Navigate to details
```

### ApplicantDetails Component
```javascript
State:
  - application: { id, status, applicant: {...}, job: {...} }
  - status: string (current status)
  - loading: boolean
  - updating: boolean
  - toast: { message, type }

Lifecycle:
  1. Component mounts → Fetch application details
  2. User clicks status button
  3. Set updating = true
  4. Call API to update status
  5. Update local status state
  6. Show success toast
  7. Set updating = false
```

---

## 🎨 UI Component Hierarchy

```
RecruiterDashboard
├── Stats Cards (4)
│   ├── Jobs Posted Card
│   ├── Total Applicants Card
│   ├── In Review Card
│   └── Hired Card
├── Recent Jobs Section
│   └── Job Cards (3) → Link to JobApplicants
├── Recent Applicants Section
│   └── Applicant Cards (5) → Link to ApplicantDetails
└── Quick Actions
    ├── Post New Job Button
    └── Manage Applications Button

JobApplicants
├── Back Button
├── Job Info Header
│   ├── Job Details
│   └── Edit Job Button
├── Status Filter Bar
│   └── Filter Buttons (5)
└── Applicants Grid
    └── Applicant Cards (many) → Link to ApplicantDetails

ApplicantDetails
├── Back Button
├── Applicant Profile Card
│   ├── Name & Status Badge
│   ├── Contact Info
│   ├── Skills Tags
│   └── Cover Letter
├── Status Management Card
│   └── Status Buttons (4)
└── Actions Card
    ├── Schedule Interview Button
    ├── Send Email Button
    └── Download Resume Button

EditJob
├── Back Button
├── Form
│   ├── Job Title Input
│   ├── Company Name Input
│   ├── Location Input
│   ├── Job Type Select
│   ├── Salary Range Input
│   ├── Skills Input
│   └── Description Textarea
└── Buttons
    ├── Update Job Button
    └── Cancel Button
```

---

## 🔐 Authentication Flow

```
User Opens App
    |
    ├─→ No Token → Redirect to /login
    |
    └─→ Has Token
            |
            ├─→ Token Expired → Redirect to /login
            |
            └─→ Token Valid
                    |
                    ├─→ Role: RECRUITER → Allow Access
                    |
                    └─→ Role: DEVELOPER → 403 Forbidden
```

### Token Management
```
Login
  └─→ POST /api/auth/login
        └─→ Response: { accessToken, user }
              └─→ localStorage.setItem('accessToken', token)
                    └─→ localStorage.setItem('user', JSON.stringify(user))

API Calls
  └─→ Get token from localStorage
        └─→ Add to Authorization header
              └─→ Make request

Logout
  └─→ POST /api/auth/logout
        └─→ localStorage.clear()
              └─→ Redirect to /login
```

---

## 🎯 Error Handling Flow

```
API Call
    |
    ├─→ Success (200-299)
    |     └─→ Process data → Update state → Show success toast
    |
    ├─→ Client Error (400-499)
    |     |
    |     ├─→ 400 Bad Request → Show validation error
    |     ├─→ 401 Unauthorized → Redirect to login
    |     ├─→ 403 Forbidden → Show permission error
    |     └─→ 404 Not Found → Show not found message
    |
    ├─→ Server Error (500-599)
    |     └─→ Show generic error message
    |
    └─→ Network Error
          └─→ Show "Cannot connect to server" message
```

---

## 📈 Performance Optimization

### Parallel API Calls
```javascript
// Dashboard - Fetch all data at once
const [statsData, jobsData, applicantsData] = await Promise.all([
  getDashboardStats(),
  getMyJobs(),
  getRecentApplications(5)
]);
```

### Conditional Rendering
```javascript
// Show loading spinner
if (loading) return <Loading />;

// Show error state
if (error) return <ErrorMessage />;

// Show empty state
if (applications.length === 0) return <EmptyState />;

// Show data
return <ApplicationsList />;
```

### Client-Side Filtering
```javascript
// Filter applications without API call
const filteredApplications = applications.filter(app => 
  statusFilter === 'ALL' || app.status === statusFilter
);
```

---

## 🎊 Complete Feature Matrix

| Feature | Component | API Endpoint | Method | Status |
|---------|-----------|--------------|--------|--------|
| Dashboard Stats | Dashboard | `/api/recruiter/dashboard/stats` | GET | ✅ |
| Recent Jobs | Dashboard | `/api/jobs/my/jobs` | GET | ✅ |
| Recent Apps | Dashboard | `/api/recruiter/applications/recent` | GET | ✅ |
| List Jobs | Jobs | `/api/jobs/my/jobs` | GET | ✅ |
| Create Job | NewJob | `/api/jobs` | POST | ✅ |
| Edit Job | EditJob | `/api/jobs/:id` | PUT | ✅ |
| Delete Job | Jobs | `/api/jobs/:id` | DELETE | ✅ |
| Job Details | JobApplicants | `/api/jobs/:id` | GET | ✅ |
| Job Apps | JobApplicants | `/api/jobs/:id/applications` | GET | ✅ |
| App Details | ApplicantDetails | `/api/applications/:id` | GET | ✅ |
| Update Status | ApplicantDetails | `/api/applications/:id/status` | PATCH | ✅ |

---

## 🚀 Deployment Checklist

### Before Deploying
- [ ] All API endpoints tested
- [ ] Error handling verified
- [ ] Loading states working
- [ ] Responsive design checked
- [ ] Cross-browser tested
- [ ] No console errors
- [ ] Environment variables set
- [ ] API base URL configured

### Production Considerations
- [ ] Enable HTTPS
- [ ] Set secure cookies
- [ ] Add rate limiting
- [ ] Enable CORS properly
- [ ] Add monitoring/logging
- [ ] Optimize bundle size
- [ ] Add error tracking (Sentry)
- [ ] Enable caching where appropriate

---

**Complete Integration Map**  
**Last Updated:** October 7, 2025  
**Status:** Production Ready ✅
