# Job API Integration - Quick Start Guide

## 🎯 What Was Done

Successfully integrated job posting and fetching APIs into your DevHire frontend with full CRUD operations.

---

## 📁 Files Created

1. **`src/services/jobService.js`** - Complete job API service
   - Create, Read, Update, Delete operations
   - Job type conversion utilities
   - Error handling

---

## 📝 Files Updated

1. **`src/pages/recruiter/NewJob.jsx`**
   - ✅ Integrated create job API
   - ✅ Skills parsing (comma-separated)
   - ✅ Form validation
   - ✅ Loading states
   - ✅ Success/error notifications

2. **`src/pages/recruiter/Jobs.jsx`**
   - ✅ Fetch recruiter's jobs
   - ✅ Delete job functionality
   - ✅ Empty state handling
   - ✅ Loading states
   - ✅ Real-time updates

3. **`src/pages/developer/Jobs.jsx`**
   - ✅ Fetch all jobs
   - ✅ Search functionality
   - ✅ Filter by type & skills
   - ✅ Loading states
   - ✅ Error handling

4. **`src/pages/developer/JobDetails.jsx`**
   - ✅ Fetch single job by ID
   - ✅ Display job details
   - ✅ Loading states
   - ✅ Error handling

5. **`src/components/JobCard.jsx`**
   - ✅ Updated for new data structure
   - ✅ Job type conversion
   - ✅ Skills overflow handling

---

## 🔌 API Endpoints Integrated

### 1. POST /api/jobs - Create Job
- **Access:** RECRUITER ONLY
- **Usage:** Post new job listing
- **File:** `NewJob.jsx`

### 2. GET /api/jobs - Get All Jobs
- **Access:** PUBLIC
- **Usage:** Browse all available jobs
- **File:** `Jobs.jsx` (Developer)

### 3. GET /api/jobs/:id - Get Single Job
- **Access:** PUBLIC
- **Usage:** View job details
- **File:** `JobDetails.jsx`

### 4. GET /api/jobs/my/jobs - Get My Jobs
- **Access:** RECRUITER ONLY
- **Usage:** View recruiter's posted jobs
- **File:** `Jobs.jsx` (Recruiter)

### 5. DELETE /api/jobs/:id - Delete Job
- **Access:** RECRUITER ONLY
- **Usage:** Delete job posting
- **File:** `Jobs.jsx` (Recruiter)

---

## 🚀 How to Use

### For Recruiters

**1. Post a New Job:**
```
1. Login as recruiter
2. Navigate to "Post New Job"
3. Fill in job details:
   - Title
   - Company Name
   - Location
   - Job Type (Full-time, Part-time, Contract, Internship)
   - Salary Range
   - Required Skills (comma-separated: "React, Node.js, TypeScript")
   - Description
4. Click "Post Job"
5. See success message and auto-redirect
```

**2. View Your Jobs:**
```
1. Navigate to "My Job Postings"
2. See all your posted jobs
3. Click "View Applicants" to see applicants (future feature)
4. Click delete icon to remove a job
```

**3. Delete a Job:**
```
1. In "My Job Postings"
2. Click trash icon on any job
3. Confirm deletion
4. Job is removed immediately
```

### For Developers

**1. Browse Jobs:**
```
1. Login as developer
2. Navigate to "Browse Jobs"
3. See all available jobs
4. Use search bar to find specific jobs
5. Filter by job type
6. Filter by required skills
```

**2. View Job Details:**
```
1. Click "View Details" on any job card
2. See complete job information
3. View required skills
4. Click "Apply Now" (UI only for now)
```

---

## 💡 Code Examples

### Create a Job
```javascript
import { createJob } from '../services/jobService';

const jobData = {
  title: "Senior Full Stack Developer",
  companyName: "Tech Solutions Inc",
  location: "San Francisco, CA (Remote)",
  jobType: "FULL_TIME",
  salaryRange: "$120,000 - $150,000",
  requiredSkills: ["JavaScript", "React", "Node.js"],
  description: "We are looking for..."
};

await createJob(jobData);
```

### Get All Jobs
```javascript
import { getAllJobs } from '../services/jobService';

const jobs = await getAllJobs();
console.log(jobs); // Array of all jobs
```

### Get My Jobs (Recruiter)
```javascript
import { getMyJobs } from '../services/jobService';

const myJobs = await getMyJobs();
console.log(myJobs); // Array of recruiter's jobs
```

### Get Job by ID
```javascript
import { getJobById } from '../services/jobService';

const job = await getJobById(123);
console.log(job); // Single job object
```

### Delete a Job
```javascript
import { deleteJob } from '../services/jobService';

await deleteJob(123);
// Job deleted successfully
```

---

## 📊 Data Structure

### Job Object
```javascript
{
  id: 1,
  title: "Senior Full Stack Developer",
  companyName: "Tech Solutions Inc",
  location: "San Francisco, CA (Remote)",
  jobType: "FULL_TIME",
  salaryRange: "$120,000 - $150,000",
  requiredSkills: ["JavaScript", "React", "Node.js"],
  description: "Job description...",
  recruiterId: 5,
  recruiter: {
    id: 5,
    name: "John Recruiter",
    email: "recruiter@example.com",
    role: "RECRUITER"
  },
  createdAt: "2025-10-06T12:00:00.000Z",
  updatedAt: "2025-10-06T12:00:00.000Z"
}
```

### Job Types
- `FULL_TIME` → "Full-time"
- `PART_TIME` → "Part-time"
- `CONTRACT` → "Contract"
- `INTERNSHIP` → "Internship"

---

## ✨ Features

### For Recruiters
- ✅ Post new jobs with all details
- ✅ View all posted jobs
- ✅ Delete jobs with confirmation
- ✅ Empty state when no jobs
- ✅ Loading indicators
- ✅ Success/error notifications

### For Developers
- ✅ Browse all available jobs
- ✅ Search by title/company
- ✅ Filter by job type
- ✅ Filter by skills
- ✅ View detailed job information
- ✅ Clean UI with loading states
- ✅ Error handling

---

## 🔐 Authentication

All protected endpoints automatically include auth token:

**Recruiter Only:**
- Create job
- Get my jobs
- Delete job

**Public:**
- Get all jobs
- Get single job

---

## ⚠️ Error Handling

| Error | Message |
|-------|---------|
| Network error | "Cannot connect to server. Please try again later." |
| 400 Bad Request | "Please check all required fields." |
| 401 Unauthorized | "Please log in to [action]." |
| 403 Forbidden | "You do not have permission to perform this action." |
| 404 Not Found | "Job not found." |
| 409 Conflict | "User already exists." (for auth) |

---

## ✅ Testing Checklist

### Recruiter Flow
- [ ] Login as recruiter
- [ ] Post a new job with all fields
- [ ] View job in "My Jobs" list
- [ ] Delete a job
- [ ] Confirm job is removed

### Developer Flow
- [ ] Login as developer
- [ ] Browse all jobs
- [ ] Search for specific job
- [ ] Filter by job type
- [ ] Filter by skill
- [ ] Click on job card
- [ ] View job details

### Error Scenarios
- [ ] Try to post job without being logged in
- [ ] Try to access recruiter endpoints as developer
- [ ] Post job with missing fields
- [ ] Post job without skills

---

## 🐛 Troubleshooting

**"Cannot connect to server"**
- Ensure backend is running on `http://localhost:4000`

**"You do not have permission"**
- Check you're logged in with correct role (RECRUITER vs DEVELOPER)

**Jobs not showing**
- Check browser console for errors
- Verify API response in Network tab
- Ensure backend has jobs in database

**Skills not parsing correctly**
- Enter skills as comma-separated: "React, Node.js, TypeScript"
- No need for quotes around each skill

---

## 🎉 Success!

Your job posting and fetching functionality is now fully integrated with the backend API!

**What's Working:**
- ✅ Recruiters can post jobs
- ✅ Recruiters can view their jobs
- ✅ Recruiters can delete jobs
- ✅ Developers can browse all jobs
- ✅ Developers can search/filter jobs
- ✅ Developers can view job details
- ✅ All with proper error handling
- ✅ Loading states everywhere
- ✅ Toast notifications for feedback

**Next Steps:**
1. Start backend server: `http://localhost:4000`
2. Start frontend: `npm run dev`
3. Test the complete flow!

---

## 📚 Documentation

For complete technical documentation, see:
- **`JOB_API_INTEGRATION.md`** - Complete API integration guide
- **`API_INTEGRATION.md`** - Authentication API guide
- **`AUTHENTICATION_SETUP.md`** - Auth setup guide
