# DevHire - Developer Hiring Platform

A modern, responsive frontend application for connecting developers with recruiters. Built with React, Vite, Tailwind CSS, and React Router.

## 🎨 Features

### Role-Based Dashboards
- **Developer Dashboard**: Browse jobs, apply, track applications, manage resume
- **Recruiter Dashboard**: Post jobs, review applicants, manage hiring pipeline
- **Admin Dashboard**: Oversee users, jobs, and platform metrics

### UI/UX Highlights
- Clean, aesthetic design inspired by Linear, Notion, and Vercel
- Fully responsive mobile-first design
- Smooth animations and transitions
- Role-based navigation and protected routes
- Toast notifications for user feedback
- Modern component architecture

## 🚀 Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM v6
- **Icons**: Heroicons
- **Fonts**: Inter (Variable)
- **UI Components**: Headless UI

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## 🎯 Project Structure

```
src/
├── assets/              # Static assets (images, logos)
├── components/          # Reusable UI components
│   ├── ApplicantCard.jsx
│   ├── JobCard.jsx
│   ├── Loading.jsx
│   ├── Navbar.jsx
│   ├── ResumeUploader.jsx
│   ├── RoleSelector.jsx
│   ├── Sidebar.jsx
│   ├── StatusBadge.jsx
│   └── Toast.jsx
├── context/             # React Context (Auth)
│   └── AuthContext.jsx
├── data/                # Mock data
│   └── mockData.js
├── layouts/             # Layout components
│   ├── ProtectedLayout.jsx
│   └── PublicLayout.jsx
├── pages/               # Page components
│   ├── admin/           # Admin pages
│   ├── auth/            # Login/Register
│   ├── developer/       # Developer pages
│   ├── recruiter/       # Recruiter pages
│   ├── Landing.jsx
│   └── NotFound.jsx
├── App.jsx              # Main app with routing
├── index.css            # Global styles
└── main.jsx             # App entry point
```

## 🎨 Design System

### Colors
- **Primary**: `#6366F1` (Indigo-500)
- **Secondary**: `#8B5CF6` (Violet-500)
- **Background**: `#F9FAFB` (Light Gray)
- **Surface**: `#FFFFFF` (White)
- **Text Primary**: `#111827` (Gray-900)
- **Text Secondary**: `#6B7280` (Gray-500)
- **Border**: `#E5E7EB` (Gray-200)

### Typography
- **Font Family**: Inter Variable
- **Font Weights**: 400, 500, 600, 700

## 🔐 Authentication (Mock)

The authentication is currently mocked for UI demonstration purposes:

- Any email/password combination will work
- Select a role (Developer/Recruiter/Admin) during login
- The app will route you to the appropriate dashboard

### Testing Different Roles

**Login Page**: Choose from the dropdown:
- Developer → `/developer/dashboard`
- Recruiter → `/recruiter/dashboard`
- Admin → `/admin/dashboard`

## 📱 Pages Overview

### Public Pages
- `/` - Landing page with hero, features, and CTA
- `/login` - Login with role selection
- `/register` - Two-step registration (role selection → form)

### Developer Routes
- `/developer/dashboard` - Application tracking
- `/developer/jobs` - Browse and filter jobs
- `/developer/jobs/:id` - Job details with apply button
- `/developer/resume` - Resume upload

### Recruiter Routes
- `/recruiter/dashboard` - Job stats and recent applicants
- `/recruiter/jobs` - Manage job postings
- `/recruiter/jobs/new` - Create new job posting
- `/recruiter/jobs/:id` - View applicants for a job
- `/recruiter/applicants/:id` - Applicant details with status management

### Admin Routes
- `/admin/dashboard` - Platform metrics and activity
- `/admin/users` - User management (roles, status)
- `/admin/jobs` - Job oversight

## 🔄 Mock Data

All data is currently mocked in `src/data/mockData.js`:
- 5 sample jobs
- 4 sample applicants
- 5 sample users
- Dashboard statistics

## 🎯 Next Steps (Backend Integration)

When ready to integrate with a backend:

1. Replace mock data with API calls
2. Implement real authentication (JWT, OAuth, etc.)
3. Connect forms to actual endpoints
4. Add error handling and loading states
5. Implement real-time updates (WebSockets)
6. Add file upload functionality
7. Integrate email notifications

## 🎨 Customization

### Changing Theme Colors

Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: '#YOUR_COLOR',
      secondary: '#YOUR_COLOR',
      // ...
    }
  }
}
```

### Changing Fonts

Edit `tailwind.config.js` and `src/index.css`:
```js
fontFamily: {
  sans: ['Your Font', 'sans-serif'],
}
```

## 📝 License

MIT License - feel free to use this project for learning or portfolio purposes!

## 🤝 Contributing

This is a portfolio/demo project. Feel free to fork and customize for your own use!

---

Built with ❤️ using React, Vite, and Tailwind CSS
