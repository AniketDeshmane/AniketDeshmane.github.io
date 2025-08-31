# Angular Portfolio - Aniket Deshmane

A professional portfolio website built with Angular 18, showcasing software engineering expertise in C#, Angular, AWS, and full-stack development.

## Tech Stack

- **Framework**: Angular 18
- **Styling**: Tailwind CSS with custom design system
- **Icons**: ng-icons (Lucide icons)
- **Animations**: Tailwind CSS animations
- **Build Tool**: Angular CLI
- **Type Safety**: TypeScript

## Features

- ✨ Modern, responsive design with dark theme
- 🎨 Custom animated cursor
- 🔄 Flip card animations for skills showcase
- 📱 Mobile-responsive layout
- ⚡ Performance optimized with lazy loading
- 🎯 Smooth scroll navigation
- 💼 Professional experience timeline
- 🛠️ Interactive skill cards
- 📧 Contact section with multiple channels

## Project Structure

```
angular-portfolio/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── hero/
│   │   │   ├── experience-timeline/
│   │   │   ├── skill-cards/
│   │   │   ├── contact/
│   │   │   ├── custom-cursor/
│   │   │   └── ui/
│   │   │       ├── button/
│   │   │       ├── card/
│   │   │       └── badge/
│   │   ├── pages/
│   │   │   ├── index/
│   │   │   └── not-found/
│   │   ├── utils/
│   │   ├── app.component.ts
│   │   └── app.routes.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── public/
├── angular.json
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd angular-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:4200
```

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Development

### Commands

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run watch` - Build and watch for changes
- `npm test` - Run unit tests
- `npm run lint` - Run linting

### Component Architecture

The application uses Angular's standalone components architecture for better tree-shaking and performance. All components are:
- Standalone
- Lazy-loaded where appropriate
- Type-safe with TypeScript
- Styled with Tailwind CSS utilities

### Styling

The project uses a custom design system built on top of Tailwind CSS with:
- HSL color variables for easy theming
- Custom animations and keyframes
- Responsive utilities
- Dark mode support

## Features Overview

### Hero Section
- Animated gradient text
- Social media links
- Smooth scroll navigation
- Call-to-action buttons

### Experience Timeline
- Visual timeline with animated dots
- Current position indicator
- Detailed job descriptions
- Responsive layout

### Skills Showcase
- Interactive flip cards
- Categorized skills
- Color-coded categories
- Smooth animations

### Contact Section
- Multiple contact methods
- Direct action buttons
- Professional presentation
- Responsive grid layout

## Performance Optimizations

- Lazy loading of routes
- Optimized bundle sizes
- Tailwind CSS purging
- Efficient change detection
- Minimal dependencies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private and proprietary.

## Author

**Aniket Deshmane**
- Software Engineer
- Specializing in C#, Angular, AWS
- Location: Mumbai, Maharashtra, India