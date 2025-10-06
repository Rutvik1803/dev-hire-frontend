# DevHire - Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The app will open at `http://localhost:5173`

### 3. Explore the App

## 🎭 Testing Different User Roles

### Option 1: Use the Login Page
1. Go to `/login`
2. Select a role from the dropdown (Developer, Recruiter, or Admin)
3. Enter any email/password (it's mocked!)
4. Click "Sign In"

### Option 2: Direct Role Testing
Update `src/context/AuthContext.jsx` line 13:

```javascript
// Change from:
const [user, setUser] = useState(null);

// To test as Developer:
const [user, setUser] = useState({
  id: 1,
  name: 'Test Developer',
  email: 'dev@test.com',
  role: 'developer'
});

// To test as Recruiter:
const [user, setUser] = useState({
  id: 2,
  name: 'Test Recruiter',
  email: 'recruiter@test.com',
  role: 'recruiter'
});

// To test as Admin:
const [user, setUser] = useState({
  id: 3,
  name: 'Test Admin',
  email: 'admin@test.com',
  role: 'admin'
});
```

## 📱 Available Routes

### Developer Routes (Login as Developer)
- `/developer/dashboard` - Your applications
- `/developer/jobs` - Browse jobs
- `/developer/jobs/1` - View job details
- `/developer/resume` - Upload resume

### Recruiter Routes (Login as Recruiter)
- `/recruiter/dashboard` - Job statistics
- `/recruiter/jobs` - Manage your jobs
- `/recruiter/jobs/new` - Post new job
- `/recruiter/jobs/1` - View applicants
- `/recruiter/applicants/1` - Applicant details

### Admin Routes (Login as Admin)
- `/admin/dashboard` - Platform overview
- `/admin/users` - Manage users
- `/admin/jobs` - Manage all jobs

## 🎨 Features to Try

### As a Developer
✅ Browse and filter jobs by type and skills  
✅ View detailed job descriptions  
✅ Apply to jobs (mock)  
✅ Upload resume (mock)  
✅ Track application status  

### As a Recruiter
✅ Post new job listings  
✅ View all your job postings  
✅ See applicants for each job  
✅ Change applicant status  
✅ View applicant details and resume  

### As an Admin
✅ View platform statistics  
✅ Manage all users  
✅ Change user roles  
✅ Activate/deactivate users  
✅ Oversee all job postings  

## 🛠️ Customization Tips

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#YOUR_HEX_COLOR',
}
```

### Add More Mock Data
Edit `src/data/mockData.js` to add more jobs, users, or applicants.

### Modify Layouts
- Edit `src/components/Navbar.jsx` for navigation
- Edit `src/components/Sidebar.jsx` for dashboard menus
- Edit `src/layouts/ProtectedLayout.jsx` for authenticated pages

## 🐛 Troubleshooting

### Port Already in Use?
```bash
# Kill the process on port 5173
lsof -ti:5173 | xargs kill -9

# Or run on a different port
npm run dev -- --port 3000
```

### Styles Not Loading?
1. Make sure Tailwind CSS is installed: `npm install -D tailwindcss`
2. Check `tailwind.config.js` exists
3. Verify `@tailwind` directives in `src/index.css`

### Routes Not Working?
- Make sure you're logged in (use `/login` or modify AuthContext)
- Check that your user role matches the route (developer routes need developer role)

## 📦 Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🎯 What's Next?

This is a **UI-only** application. To make it production-ready:

1. **Backend Integration**
   - Set up REST API or GraphQL
   - Connect authentication (JWT, OAuth)
   - Implement real data fetching

2. **Add Features**
   - Real file uploads (resume, images)
   - Email notifications
   - Real-time updates
   - Advanced search and filters
   - Payment integration (if needed)

3. **Deploy**
   - Vercel: `vercel deploy`
   - Netlify: `netlify deploy`
   - Custom hosting: Upload `dist/` folder

---

## 🎉 Have Fun!

This is a complete, production-quality UI scaffold. Customize it, extend it, and make it your own!

**Questions?** Check the main README.md for detailed documentation.

