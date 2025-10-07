# Job Posting API Integration Documentation

This document describes the job posting and fetching API integration for the DevHire frontend application.

## Base URL
```
http://localhost:4000/api
```

## Authentication
Protected routes require JWT token in Authorization header:
```
Authorization: Bearer <accessToken>
```

---

## 📁 Files Created/Updated

### New Files

1. **`src/services/jobService.js`** - Job API service layer
   - `createJob()` - Create new job posting
   - `getAllJobs()` - Get all jobs (public)
   - `getJobById()` - Get single job by ID
   - `getMyJobs()` - Get recruiter's jobs
   - `updateJob()` - Update job posting
   - `deleteJob()` - Delete job posting
   - Job type conversion utilities

### Updated Files

2. **`src/pages/recruiter/NewJob.jsx`**
   - Integrated with `createJob()` API
   - Form validation
   - Skills parsing (comma-separated)
   - Error handling with toast notifications
   - Loading states

3. **`src/pages/recruiter/Jobs.jsx`**
   - Integrated with `getMyJobs()` API
   - Delete functionality
   - Empty state handling
   - Loading states
   - Real-time job list updates

4. **`src/pages/developer/Jobs.jsx`**
   - Integrated with `getAllJobs()` API
   - Search and filter functionality
   - Loading states
   - Error handling

5. **`src/pages/developer/JobDetails.jsx`**
   - Integrated with `getJobById()` API
   - Dynamic job details display
   - Loading states
   - Error handling

6. **`src/components/JobCard.jsx`**
   - Updated to handle both old and new data structures
   - Job type conversion
   - Skills display with overflow handling

---

## 🔌 API Endpoints Integrated

### 1. Create Job (POST /api/jobs)

**Access Level:** RECRUITER ONLY

**Service Function:**
```javascript
import { createJob } from '../services/jobService';

const jobData = {
  title: "Senior Full Stack Developer",
  companyName: "Tech Solutions Inc",
  location: "San Francisco, CA (Remote)",
  jobType: "FULL_TIME", // FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP
  salaryRange: "$120,000 - $150,000",
  requiredSkills: ["JavaScript", "React", "Node.js"],
  description: "Job description..."
};

const newJob = await createJob(jobData);
```

**Where Used:**
- `src/pages/recruiter/NewJob.jsx` - Create new job form

**Response:**
```javascript
{
  status: "success",
  message: "Job posted successfully",
  data: {
    id: 1,
    title: "...",
    companyName: "...",
    // ... full job object
  }
}
```

---

### 2. Get All Jobs (GET /api/jobs)

**Access Level:** PUBLIC

**Service Function:**
```javascript
import { getAllJobs } from '../services/jobService';

const jobs = await getAllJobs();
// Returns array of all jobs
```

**Where Used:**
- `src/pages/developer/Jobs.jsx` - Browse all jobs page

**Response:**
```javascript
{
  status: "success",
  message: "Jobs retrieved successfully",
  data: [ /* array of jobs */ ]
}
```

---

### 3. Get Single Job (GET /api/jobs/:id)

**Access Level:** PUBLIC

**Service Function:**
```javascript
import { getJobById } from '../services/jobService';

const job = await getJobById(jobId);
```

**Where Used:**
- `src/pages/developer/JobDetails.jsx` - Job details page

**Response:**
```javascript
{
  status: "success",
  message: "Job retrieved successfully",
  data: { /* job object */ }
}
```

---

### 4. Get My Jobs (GET /api/jobs/my/jobs)

**Access Level:** RECRUITER ONLY

**Service Function:**
```javascript
import { getMyJobs } from '../services/jobService';

const myJobs = await getMyJobs();
```

**Where Used:**
- `src/pages/recruiter/Jobs.jsx` - Recruiter's job listings

**Response:**
```javascript
{
  status: "success",
  message: "Your jobs retrieved successfully",
  data: [ /* array of recruiter's jobs */ ]
}
```

---

### 5. Delete Job (DELETE /api/jobs/:id)

**Access Level:** RECRUITER ONLY

**Service Function:**
```javascript
import { deleteJob } from '../services/jobService';

await deleteJob(jobId);
```

**Where Used:**
- `src/pages/recruiter/Jobs.jsx` - Delete button

---

## 📊 Data Structure

### Job Object (Backend Response)
```javascript
{
  id: 1,
  title: "Senior Full Stack Developer",
  companyName: "Tech Solutions Inc",
  location: "San Francisco, CA (Remote)",
  jobType: "FULL_TIME", // Backend format
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

### Job Type Conversion

**Backend Format → Frontend Display:**
- `FULL_TIME` → `"Full-time"`
- `PART_TIME` → `"Part-time"`
- `CONTRACT` → `"Contract"`
- `INTERNSHIP` → `"Internship"`

**Utility Functions:**
```javascript
import { 
  convertJobType, 
  convertJobTypeToFrontend 
} from '../services/jobService';

// Convert frontend to backend
const backendType = convertJobType('Full-time'); // "FULL_TIME"

// Convert backend to frontend
const frontendType = convertJobTypeToFrontend('FULL_TIME'); // "Full-time"
```

---

## 🎯 Features Implemented

### For Recruiters

✅ **Post New Job**
- Form with all required fields
- Skills input (comma-separated)
- Validation before submission
- Success/error notifications
- Auto-redirect after success

✅ **View My Jobs**
- List of all posted jobs
- Job details in table/card format
- Empty state for no jobs
- Loading states

✅ **Delete Job**
- Delete confirmation dialog
- Optimistic UI updates
- Error handling

### For Developers

✅ **Browse All Jobs**
- View all available jobs
- Search by title/company
- Filter by job type
- Filter by required skills
- Empty state for no results

✅ **View Job Details**
- Complete job information
- Required skills display
- Company information
- Apply button (UI only for now)

---

## 🔧 Usage Examples

### 1. Create a New Job (Recruiter)

```javascript
// In NewJob component
import { createJob } from '../../services/jobService';

const handleSubmit = async (e) => {
  e.preventDefault();
  
  const jobData = {
    title: formData.title,
    companyName: formData.companyName,
    location: formData.location,
    jobType: formData.jobType, // "FULL_TIME", etc.
    salaryRange: formData.salaryRange,
    requiredSkills: formData.skills.split(',').map(s => s.trim()),
    description: formData.description,
  };
  
  try {
    await createJob(jobData);
    // Success handling
  } catch (error) {
    // Error handling
  }
};
```

### 2. Fetch and Display Jobs (Developer)

```javascript
// In Jobs component
import { getAllJobs } from '../../services/jobService';

const [jobs, setJobs] = useState([]);

useEffect(() => {
  const fetchJobs = async () => {
    try {
      const data = await getAllJobs();
      setJobs(data);
    } catch (error) {
      // Error handling
    }
  };
  
  fetchJobs();
}, []);
```

### 3. Delete a Job (Recruiter)

```javascript
// In Jobs component
import { deleteJob } from '../../services/jobService';

const handleDeleteJob = async (jobId) => {
  if (!window.confirm('Are you sure?')) return;
  
  try {
    await deleteJob(jobId);
    setJobs(jobs.filter(job => job.id !== jobId));
    // Success notification
  } catch (error) {
    // Error handling
  }
};
```

---

## ⚠️ Error Handling

All API calls include comprehensive error handling:

| Status Code | Scenario | User Message |
|-------------|----------|--------------|
| 0 | Network error | "Cannot connect to server. Please try again later." |
| 400 | Bad request | "Please check all required fields." / Specific validation error |
| 401 | Unauthorized | "Please log in to [action]." |
| 403 | Forbidden | "You do not have permission to perform this action." |
| 404 | Not found | "Job not found." |

### Error Display

All errors are displayed using the Toast component:

```javascript
setToast({
  type: 'error',
  message: errorMessage,
});
```

---

## 🎨 UI States

### Loading State
```javascript
{loading && <Loading />}
```

### Empty State
```javascript
{jobs.length === 0 && (
  <div>No jobs available</div>
)}
```

### Error State
```javascript
{toast && (
  <Toast 
    message={toast.message} 
    type={toast.type} 
    onClose={() => setToast(null)} 
  />
)}
```

---

## 🔐 Authentication

All protected routes automatically include the access token:

```javascript
// Handled by api.js utility
const accessToken = localStorage.getItem('accessToken');
if (accessToken) {
  config.headers['Authorization'] = `Bearer ${accessToken}`;
}
```

### Recruiter-Only Endpoints

- `POST /api/jobs` - Create job
- `GET /api/jobs/my/jobs` - Get my jobs
- `DELETE /api/jobs/:id` - Delete job

### Public Endpoints

- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get single job

---

## ✅ Testing Checklist

### Recruiter Tests

- [ ] Login as recruiter
- [ ] Navigate to "Post New Job"
- [ ] Fill in all job details
- [ ] Add comma-separated skills
- [ ] Submit form
- [ ] Verify job appears in "My Jobs"
- [ ] Delete a job
- [ ] Confirm deletion

### Developer Tests

- [ ] Login as developer
- [ ] Navigate to "Browse Jobs"
- [ ] Verify all jobs are displayed
- [ ] Use search functionality
- [ ] Filter by job type
- [ ] Filter by skill
- [ ] Click on a job card
- [ ] View job details
- [ ] Test "Apply Now" button

### Error Tests

- [ ] Try to create job without auth token
- [ ] Try to access recruiter endpoints as developer
- [ ] Create job with invalid data
- [ ] Create job with missing required fields
- [ ] Test network error scenarios

---

## 🚀 Future Enhancements

- [ ] Edit job functionality
- [ ] Job application submission
- [ ] Application tracking
- [ ] Job search with advanced filters
- [ ] Job bookmarking/favorites
- [ ] Email notifications for new jobs
- [ ] Job expiration handling
- [ ] Analytics for recruiters

---

## 🐛 Troubleshooting

### "Cannot connect to server"
**Solution:** Ensure backend is running on `http://localhost:4000`

### "You do not have permission"
**Solution:** 
- Check user role (RECRUITER vs DEVELOPER)
- Verify authentication token is valid

### Jobs not appearing
**Solution:**
- Check browser console for errors
- Verify API response in Network tab
- Ensure backend database has jobs

### Skills not displaying correctly
**Solution:**
- Ensure skills are entered as comma-separated values
- Check that `requiredSkills` is an array in API response

---

## 📝 Code Examples

### Complete NewJob Form Handler

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setToast(null);

  try {
    const skillsArray = formData.skills
      .split(',')
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);

    if (skillsArray.length === 0) {
      setToast({
        type: 'error',
        message: 'Please enter at least one required skill.',
      });
      setLoading(false);
      return;
    }

    const jobData = {
      title: formData.title,
      companyName: formData.companyName,
      location: formData.location,
      jobType: formData.jobType,
      salaryRange: formData.salaryRange,
      requiredSkills: skillsArray,
      description: formData.description,
    };

    await createJob(jobData);

    setToast({
      type: 'success',
      message: 'Job posted successfully! Redirecting...',
    });

    setTimeout(() => {
      navigate('/recruiter/jobs');
    }, 1500);
  } catch (error) {
    let errorMessage = 'Failed to post job. Please try again.';

    if (error.status === 400) {
      errorMessage = error.message || 'Please check all required fields.';
    } else if (error.status === 401) {
      errorMessage = 'Please log in to post a job.';
    } else if (error.status === 403) {
      errorMessage = 'You do not have permission to post jobs.';
    }

    setToast({
      type: 'error',
      message: errorMessage,
    });
    setLoading(false);
  }
};
```

---

## 📞 Support

For issues or questions:
1. Check browser console for errors
2. Verify backend API is running
3. Check network tab for API responses
4. Review authentication token validity
