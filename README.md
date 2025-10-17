# Employee Management System

A modern React + TypeScript application for managing employee candidates with LinkedIn integration and ATS scoring.

## 🚀 Features

- **Resume Matching**: Upload and match resumes against job descriptions
- **LinkedIn Integration**: Find candidates directly from LinkedIn
- **ATS Scoring**: Calculate Applicant Tracking System scores
- **Modern UI**: Built with React, TypeScript, and TailwindCSS
- **Real-time Search**: Fast candidate search and filtering

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: TailwindCSS, PostCSS
- **Icons**: Lucide React
- **Backend API**: FastAPI (EC2 hosted)
- **Database**: Supabase

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Husainbw786/frontend-fast.git
cd frontend-fast

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🌐 API Endpoints

The application connects to: `http://ec2-15-207-107-54.ap-south-1.compute.amazonaws.com:8000`

- `/api/v1/health` - Health check
- `/api/v1/match-resumes` - Match resumes to job descriptions
- `/api/v1/find-candidates` - Find LinkedIn candidates
- `/api/v1/calculate-ats-score` - Calculate ATS scores

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Deploy automatically on every push to main

### Manual Build
```bash
npm run build
npm run preview
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
