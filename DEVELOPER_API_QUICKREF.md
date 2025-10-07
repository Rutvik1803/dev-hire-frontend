# DevHire Backend API - Complete Integration Guide for Frontend

## 🎯 Overview

This document provides **everything** you need to integrate the DevHire backend APIs into your frontend application. The backend supports **two user types**: **Recruiters** and **Developers**, each with their own dashboard and features.

---

## 📋 Table of Contents

1. [Base Configuration](#-base-configuration)
2. [Authentication APIs](#-authentication-apis)
3. [Recruiter Dashboard APIs](#-recruiter-dashboard-apis)
4. [Developer Dashboard APIs](#-developer-dashboard-apis)
5. [Job APIs (Public & Protected)](#-job-apis)
6. [TypeScript Interfaces](#-typescript-interfaces)
7. [React Integration Examples](#-react-integration-examples)
8. [Error Handling](#-error-handling)
9. [Testing Guide](#-testing-guide)

---

## 🔧 Base Configuration

### **Backend Server**
```
Base URL: http://localhost:4000
```

### **CORS Configuration**
The backend accepts requests from:
```
Frontend URL: http://localhost:5173
```

### **Authentication**
All protected routes require JWT token in header:
```http
Authorization: Bearer {accessToken}
```

### **Response Format**
All responses follow this structure:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": []
}
```

---

## 🔐 Authentication APIs

### 1. Register User

**Endpoint:** `POST /api/auth/register`  
**Access:** Public  
**Description:** Create a new user account (Developer or Recruiter)

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "DEVELOPER"  // or "RECRUITER"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "email": "john@example.com",
      "name": "John Doe",
      "role": "DEVELOPER"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 2. Login

**Endpoint:** `POST /api/auth/login`  
**Access:** Public  
**Description:** Authenticate user and get tokens

**Request:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "email": "john@example.com",
      "name": "John Doe",
      "role": "DEVELOPER"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 3. Refresh Token

**Endpoint:** `POST /api/auth/refresh`  
**Access:** Public  
**Description:** Get new access token using refresh token

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 4. Logout

**Endpoint:** `POST /api/auth/logout`  
**Access:** Protected  
**Description:** Invalidate refresh token

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Request:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Logout successful",
  "data": null
}
```

---

## 💼 Recruiter Dashboard APIs

### 1. Get Recruiter Dashboard Statistics

**Endpoint:** `GET /api/recruiter/dashboard/stats`  
**Access:** Protected (Recruiter only)  
**Description:** Get overview statistics for recruiter dashboard

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "message": "Dashboard statistics retrieved successfully",
  "data": {
    "totalJobs": 15,
    "activeJobs": 12,
    "totalApplications": 156,
    "newApplications": 23,
    "recentActivity": {
      "newApplicationsThisWeek": 23,
      "interviewsScheduled": 8
    }
  }
}
```

---

### 2. Get All Recruiter Applications

**Endpoint:** `GET /api/recruiter/applications`  
**Access:** Protected (Recruiter only)  
**Description:** Get all applications across all jobs with filters

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
- `status` (optional): Filter by status - `APPLIED`, `IN_REVIEW`, `ACCEPTED`, `REJECTED`
- `limit` (optional): Results per page (default: 50)
- `offset` (optional): Skip records (default: 0)
- `sort` (optional): Sort order - `asc` or `desc` (default: `desc`)

**Example Request:**
```
GET /api/recruiter/applications?status=APPLIED&limit=20&offset=0&sort=desc
```

**Response:**
```json
{
  "success": true,
  "message": "Applications retrieved successfully",
  "data": {
    "data": [
      {
        "id": 1,
        "jobId": 5,
        "status": "APPLIED",
        "coverLetter": "I am interested in...",
        "appliedDate": "2024-01-15T10:30:00Z",
        "updatedDate": "2024-01-15T10:30:00Z",
        "job": {
          "id": 5,
          "title": "Senior Full Stack Developer",
          "companyName": "Tech Corp"
        },
        "applicant": {
          "id": 3,
          "name": "Jane Smith",
          "email": "jane@example.com"
        }
      }
    ],
    "total": 156,
    "limit": 20,
    "offset": 0
  }
}
```

---

### 3. Get Recent Applications

**Endpoint:** `GET /api/recruiter/applications/recent`  
**Access:** Protected (Recruiter only)  
**Description:** Get recent applications (last 30 days)

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
- `limit` (optional): Number of results (default: 10, max: 20)

**Response:**
```json
{
  "success": true,
  "message": "Recent applications retrieved successfully",
  "data": [
    {
      "id": 1,
      "status": "APPLIED",
      "appliedDate": "2024-01-20T14:00:00Z",
      "job": {
        "title": "Backend Developer",
        "companyName": "StartupXYZ"
      },
      "applicant": {
        "name": "Jane Smith",
        "email": "jane@example.com"
      }
    }
  ]
}
```

---

### 4. Get Applications for Specific Job

**Endpoint:** `GET /api/jobs/:jobId/applications`  
**Access:** Protected (Recruiter only)  
**Description:** Get all applications for a specific job

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "message": "Applications retrieved successfully",
  "data": [
    {
      "id": 1,
      "status": "APPLIED",
      "coverLetter": "...",
      "appliedDate": "2024-01-15T10:30:00Z",
      "applicant": {
        "id": 3,
        "name": "Jane Smith",
        "email": "jane@example.com",
        "resumeUrl": "/uploads/resumes/jane-resume.pdf",
        "experience": 5,
        "skills": ["JavaScript", "React", "Node.js"]
      }
    }
  ]
}
```

---

### 5. Get Application by ID

**Endpoint:** `GET /api/applications/:applicationId`  
**Access:** Protected  
**Description:** Get detailed information about a specific application

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "message": "Application retrieved successfully",
  "data": {
    "id": 1,
    "jobId": 5,
    "status": "APPLIED",
    "coverLetter": "I am very interested...",
    "notes": "Strong candidate",
    "appliedDate": "2024-01-15T10:30:00Z",
    "updatedDate": "2024-01-15T10:30:00Z",
    "job": {
      "id": 5,
      "title": "Senior Full Stack Developer",
      "companyName": "Tech Corp",
      "location": "Remote"
    },
    "applicant": {
      "id": 3,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "resumeUrl": "/uploads/resumes/jane-resume.pdf",
      "experience": 5,
      "skills": ["JavaScript", "React", "Node.js"],
      "linkedinUrl": "https://linkedin.com/in/janesmith",
      "githubUrl": "https://github.com/janesmith"
    }
  }
}
```

---

### 6. Update Application Status

**Endpoint:** `PATCH /api/applications/:applicationId/status`  
**Access:** Protected (Recruiter only)  
**Description:** Update the status of an application

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request:**
```json
{
  "status": "IN_REVIEW",  // APPLIED, IN_REVIEW, ACCEPTED, REJECTED
  "notes": "Good candidate, moving to next round"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application status updated successfully",
  "data": {
    "id": 1,
    "status": "IN_REVIEW",
    "notes": "Good candidate, moving to next round",
    "updatedDate": "2024-01-16T09:00:00Z"
  }
}
```

---

### 7. Create Job

**Endpoint:** `POST /api/jobs`  
**Access:** Protected (Recruiter only)  
**Description:** Create a new job posting

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request:**
```json
{
  "title": "Senior Full Stack Developer",
  "companyName": "Tech Corp",
  "location": "Remote",
  "jobType": "FULL_TIME",  // FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP
  "salaryRange": "$100k - $150k",
  "requiredSkills": ["JavaScript", "React", "Node.js", "PostgreSQL"],
  "description": "We are looking for an experienced full stack developer..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Job created successfully",
  "data": {
    "id": 5,
    "title": "Senior Full Stack Developer",
    "companyName": "Tech Corp",
    "location": "Remote",
    "jobType": "FULL_TIME",
    "salaryRange": "$100k - $150k",
    "requiredSkills": ["JavaScript", "React", "Node.js", "PostgreSQL"],
    "description": "We are looking for...",
    "recruiterId": 1,
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z",
    "recruiter": {
      "id": 1,
      "name": "John Recruiter",
      "email": "john@techcorp.com"
    }
  }
}
```

---

### 8. Get My Jobs

**Endpoint:** `GET /api/jobs/my/jobs`  
**Access:** Protected (Recruiter only)  
**Description:** Get all jobs posted by the logged-in recruiter

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "message": "Jobs retrieved successfully",
  "data": [
    {
      "id": 5,
      "title": "Senior Full Stack Developer",
      "companyName": "Tech Corp",
      "location": "Remote",
      "jobType": "FULL_TIME",
      "salaryRange": "$100k - $150k",
      "requiredSkills": ["JavaScript", "React", "Node.js"],
      "description": "...",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

### 9. Update Job

**Endpoint:** `PUT /api/jobs/:id`  
**Access:** Protected (Recruiter only - job owner)  
**Description:** Update a job posting

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request:**
```json
{
  "title": "Senior Full Stack Developer (Updated)",
  "companyName": "Tech Corp",
  "location": "Remote",
  "jobType": "FULL_TIME",
  "salaryRange": "$120k - $160k",
  "requiredSkills": ["JavaScript", "React", "Node.js", "TypeScript"],
  "description": "Updated description..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Job updated successfully",
  "data": {
    "id": 5,
    "title": "Senior Full Stack Developer (Updated)",
    // ... updated fields
  }
}
```

---

### 10. Delete Job

**Endpoint:** `DELETE /api/jobs/:id`  
**Access:** Protected (Recruiter only - job owner)  
**Description:** Delete a job posting (also deletes all applications)

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "message": "Job deleted successfully",
  "data": null
}
```

---

## 👨‍💻 Developer Dashboard APIs

### 1. Get Developer Dashboard Statistics

**Endpoint:** `GET /api/developer/dashboard/stats`  
**Access:** Protected (Developer only)  
**Description:** Get overview statistics for developer dashboard

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "message": "Dashboard statistics retrieved successfully",
  "data": {
    "appliedJobs": 15,
    "inReview": 8,
    "interviews": 3,
    "offers": 2,
    "recentActivity": {
      "newResponsesThisWeek": 5,
      "upcomingInterviews": 3
    }
  }
}
```

---

### 2. Get All Developer Applications

**Endpoint:** `GET /api/developer/applications`  
**Access:** Protected (Developer only)  
**Description:** Get all applications submitted by the developer

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
- `status` (optional): Filter by status - `APPLIED`, `IN_REVIEW`, `ACCEPTED`, `REJECTED`
- `limit` (optional): Results per page (default: 50)
- `offset` (optional): Skip records (default: 0)
- `sort` (optional): Sort order - `asc` or `desc` (default: `desc`)

**Example Request:**
```
GET /api/developer/applications?status=APPLIED&limit=10&offset=0
```

**Response:**
```json
{
  "success": true,
  "message": "Applications retrieved successfully",
  "data": {
    "data": [
      {
        "id": 1,
        "status": "APPLIED",
        "coverLetter": "I am excited to apply...",
        "appliedDate": "2024-01-15T10:30:00Z",
        "updatedDate": "2024-01-15T10:30:00Z",
        "job": {
          "id": 5,
          "title": "Senior Full Stack Developer",
          "companyName": "Tech Corp",
          "location": "Remote",
          "jobType": "FULL_TIME"
        }
      }
    ],
    "total": 15,
    "limit": 10,
    "offset": 0
  }
}
```

---

### 3. Get Recent Applications

**Endpoint:** `GET /api/developer/applications/recent`  
**Access:** Protected (Developer only)  
**Description:** Get recent applications (last 30 days)

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Query Parameters:**
- `limit` (optional): Number of results (default: 10, max: 20)

**Response:**
```json
{
  "success": true,
  "message": "Recent applications retrieved successfully",
  "data": [
    {
      "id": 1,
      "status": "IN_REVIEW",
      "appliedDate": "2024-01-20T14:00:00Z",
      "job": {
        "title": "Backend Developer",
        "companyName": "StartupXYZ",
        "location": "San Francisco, CA"
      }
    }
  ]
}
```

---

### 4. Apply to Job

**Endpoint:** `POST /api/jobs/:jobId/apply`  
**Access:** Protected (Requires authentication)  
**Description:** Submit an application for a job

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request:**
```json
{
  "coverLetter": "I am very excited to apply for this position because..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "data": {
    "id": 1,
    "jobId": 5,
    "applicantId": 3,
    "status": "APPLIED",
    "coverLetter": "I am very excited...",
    "appliedDate": "2024-01-15T10:30:00Z",
    "job": {
      "id": 5,
      "title": "Senior Full Stack Developer",
      "companyName": "Tech Corp"
    }
  }
}
```

**Error (Already Applied):**
```json
{
  "success": false,
  "message": "You have already applied to this job",
  "errors": []
}
```

---

### 5. Check Application Status

**Endpoint:** `GET /api/jobs/:jobId/application-status`  
**Access:** Protected (Developer only)  
**Description:** Check if developer has applied to a specific job

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response (Has Applied):**
```json
{
  "success": true,
  "message": "Application status retrieved",
  "data": {
    "hasApplied": true,
    "application": {
      "id": 1,
      "status": "IN_REVIEW",
      "appliedDate": "2024-01-18T09:00:00Z"
    }
  }
}
```

**Response (Not Applied):**
```json
{
  "success": true,
  "message": "Application status retrieved",
  "data": {
    "hasApplied": false,
    "application": null
  }
}
```

---

### 6. Withdraw Application

**Endpoint:** `DELETE /api/applications/:applicationId`  
**Access:** Protected (Developer only)  
**Description:** Withdraw/delete an application

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "message": "Application withdrawn successfully",
  "data": {
    "message": "Application withdrawn successfully"
  }
}
```

**Error (Cannot Withdraw):**
```json
{
  "success": false,
  "message": "Cannot withdraw application with status ACCEPTED",
  "errors": []
}
```

**Note:** Cannot withdraw applications with status `ACCEPTED` or `REJECTED`

---

### 7. Get Developer Profile

**Endpoint:** `GET /api/developer/profile`  
**Access:** Protected (Developer only)  
**Description:** Get developer's profile information

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile retrieved successfully",
  "data": {
    "id": 3,
    "email": "john@example.com",
    "name": "John Doe",
    "role": "DEVELOPER",
    "experience": 5,
    "skills": ["JavaScript", "React", "Node.js", "TypeScript", "PostgreSQL"],
    "resumeUrl": "/uploads/resumes/john-resume-1234567890.pdf",
    "linkedinUrl": "https://linkedin.com/in/johndoe",
    "githubUrl": "https://github.com/johndoe",
    "phone": "+1234567890",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z"
  }
}
```

---

### 8. Update Developer Profile

**Endpoint:** `PATCH /api/developer/profile`  
**Access:** Protected (Developer only)  
**Description:** Update developer profile information

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Request (all fields optional):**
```json
{
  "experience": 6,
  "skills": ["JavaScript", "React", "Node.js", "TypeScript", "Python"],
  "linkedinUrl": "https://linkedin.com/in/johndoe",
  "githubUrl": "https://github.com/johndoe",
  "phone": "+1234567890"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 3,
    "email": "john@example.com",
    "name": "John Doe",
    "experience": 6,
    "skills": ["JavaScript", "React", "Node.js", "TypeScript", "Python"],
    "linkedinUrl": "https://linkedin.com/in/johndoe",
    "githubUrl": "https://github.com/johndoe",
    "phone": "+1234567890"
  }
}
```

---

### 9. Upload Resume

**Endpoint:** `POST /api/developer/resume/upload`  
**Access:** Protected (Developer only)  
**Description:** Upload resume file (PDF or DOC/DOCX)

**Headers:**
```
Authorization: Bearer {accessToken}
Content-Type: multipart/form-data
```

**Request (Form Data):**
```
resume: <file>
```

**File Constraints:**
- Accepted formats: PDF, DOC, DOCX
- Maximum size: 5MB
- Replaces existing resume if any

**Response:**
```json
{
  "success": true,
  "message": "Resume uploaded successfully",
  "data": {
    "resumeUrl": "/uploads/resumes/resume-1234567890-abc123.pdf",
    "fileName": "John_Doe_Resume.pdf",
    "fileSize": 245678,
    "message": "Resume uploaded and saved successfully"
  }
}
```

**Error (Invalid File Type):**
```json
{
  "success": false,
  "message": "Only PDF and DOC/DOCX files are allowed",
  "errors": []
}
```

---

### 10. Get Resume Details

**Endpoint:** `GET /api/developer/resume`  
**Access:** Protected (Developer only)  
**Description:** Get information about uploaded resume

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "message": "Resume details retrieved successfully",
  "data": {
    "resumeUrl": "/uploads/resumes/resume-1234567890-abc123.pdf",
    "fileName": "John_Doe_Resume.pdf",
    "uploadedAt": "2024-01-10T12:00:00Z"
  }
}
```

**Response (No Resume):**
```json
{
  "success": true,
  "message": "No resume found",
  "data": null
}
```

---

### 11. Delete Resume

**Endpoint:** `DELETE /api/developer/resume`  
**Access:** Protected (Developer only)  
**Description:** Delete uploaded resume

**Headers:**
```
Authorization: Bearer {accessToken}
```

**Response:**
```json
{
  "success": true,
  "message": "Resume deleted successfully",
  "data": {
    "message": "Resume deleted successfully"
  }
}
```

**Note:** Deletes file from server and removes URL from database

---

## 💼 Job APIs (Public & Protected)

### 1. Get All Jobs

**Endpoint:** `GET /api/jobs`  
**Access:** Public  
**Description:** Get all available job postings

**Response:**
```json
{
  "success": true,
  "message": "Jobs retrieved successfully",
  "data": [
    {
      "id": 5,
      "title": "Senior Full Stack Developer",
      "companyName": "Tech Corp",
      "location": "Remote",
      "jobType": "FULL_TIME",
      "salaryRange": "$100k - $150k",
      "requiredSkills": ["JavaScript", "React", "Node.js"],
      "description": "We are looking for...",
      "createdAt": "2024-01-15T10:00:00Z",
      "updatedAt": "2024-01-15T10:00:00Z",
      "recruiter": {
        "id": 1,
        "name": "John Recruiter",
        "email": "john@techcorp.com"
      }
    }
  ]
}
```

---

### 2. Get Job by ID

**Endpoint:** `GET /api/jobs/:id`  
**Access:** Public  
**Description:** Get detailed information about a specific job

**Response:**
```json
{
  "success": true,
  "message": "Job retrieved successfully",
  "data": {
    "id": 5,
    "title": "Senior Full Stack Developer",
    "companyName": "Tech Corp",
    "location": "Remote",
    "jobType": "FULL_TIME",
    "salaryRange": "$100k - $150k",
    "requiredSkills": ["JavaScript", "React", "Node.js", "PostgreSQL"],
    "description": "We are looking for an experienced developer...",
    "recruiterId": 1,
    "createdAt": "2024-01-15T10:00:00Z",
    "updatedAt": "2024-01-15T10:00:00Z",
    "recruiter": {
      "id": 1,
      "name": "John Recruiter",
      "email": "john@techcorp.com"
    }
  }
}
