# 🎨 Portfolio Website Frontend

`This is the frontend for my personal portfolio website, built with Next.js, TypeScript, and Tailwind CSS.`
`It provides public pages for blogs, projects, and about section, as well as a secure dashboard for the portfolio owner.`

## 🚀 Features
### 🌍 Public Pages (Accessible to All Visitors)

`Landing Page (Home) – Quick introduction and navigation.`

`About Me Section – Personal details, skills, and experience.`

`Projects Showcase – List of personal projects with live/demo links.`

### Blog Pages

`All Blogs page using ISR (Incremental Static Regeneration).`

`Single Blog pages with ISR + getStaticPaths + revalidate.`

### 🔑 Private Pages (Owner Only)

* Authentication

* * JWT-based login system.

* * Secure storage of tokens in browser (localStorage/cookies).

* * Dashboard (Owner-only access)

* * Manage blogs (Create, Edit, Delete).

* * Manage projects (Create, Edit, Delete).

* * View content dynamically.

#### ✨ Bonus Enhancements

* * Rich Text Editor (React Quill) for blogs/projects.

* * Polished UI/UX – interactive cards, animations, skeleton loaders.

* * Toast Notifications with react-hot-toast.

* * Error Handling – proper validation, clear error messages, and feedback for success/failure.

### 🛠️ Tech Stack

* * Framework: Next.js 13+ (App Router)

* * Language: TypeScript

* * Styling: Tailwind CSS

* * State Management: Redux Toolkit (or Zustand)

* * Notifications: react-hot-toast

* * API Integration: REST APIs from Express + Prisma backend

#### 📡 Pages & Routes
* Public Pages

`/ → Landing/Home`

`/about → About Me`

`/projects → Project Showcase`

`/blogs → All Blogs (ISR)`

`/blogs/[id] → Single Blog (ISR)`

`Private (Owner Only)`

`/login → Owner login`

`/dashboard → Dashboard home`

`/dashboard/blogs → Manage blogs`

`/dashboard/projects → Manage projects`

#### ✅ Error Handling & Validation

* * Form validation with proper error messages (e.g., invalid email, required fields).

* * Unauthorized requests redirect to login.

* * Success/error feedback via react-hot-toast.

* * 404 handled with custom not-found.tsx.

### 🏃‍♂️ Getting Started
#### 1️⃣ Clone Repository
`git clone` [https://github.com/sakibbiswas/next-portfolio-frontend]
`cd portfolio-frontend`

#### 🧩 Author

##### Sazzadur Rahman Sakib
###### Fullsatack Developer
📧 [sakibsakib99880@gmail.com]
🌐 [https://next-portfolio-frontend-gold.vercel.app]