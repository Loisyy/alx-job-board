# HireHub - Interactive Job Board SPA

A modern, responsive job board application built with React, TypeScript, and Tailwind CSS.

## Features

✨ **Core Features**
- Browse and search job listings
- Filter by category, location, and experience level
- View detailed job information
- Apply for jobs with resume upload
- Responsive design for all devices
- Full keyboard navigation support
- Screen reader accessible

🎨 **Tech Stack**
- React 18 with TypeScript
- React Router for navigation
- Context API for state management
- Tailwind CSS for styling
- Mock API with simulated delays

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

1. Clone the repository
```bash
git clone <https://github.com/Loisyy/alx-job-board.git>
cd hirehub
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure
```
src/
├── components/
│   ├── common/          # Reusable components
│   ├── jobs/            # Job-related components
│   └── layout/          # Layout components
├── pages/               # Page components
├── context/             # Context API providers
├── api/                 # API functions
├── data/                # Mock data
├── types/               # TypeScript types
└── utils/               # Helper functions
```

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## Accessibility

This application follows WCAG 2.1 Level AA guidelines:
- Semantic HTML
- ARIA labels and landmarks
- Keyboard navigation
- Focus management
- Screen reader support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome)

## License

## Optional Enhancements (if time permits)

Add animations with Framer Motion
Implement local storage for saved jobs
Add pagination for job listings
Implement actual file upload to a backend
Add unit tests with Jest and React Testing Library