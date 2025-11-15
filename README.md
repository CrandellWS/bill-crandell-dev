# Bill Crandell - Developer Blog

Personal developer blog showcasing projects and documenting progress in AI-assisted development.

**Live Site:** [https://crandellws.github.io/bill-crandell-dev/](https://crandellws.github.io/bill-crandell-dev/)

## Overview

This blog serves as a public-facing portfolio and progress documentation system, complementing my private daily logs. Built with Next.js 14 and deployed to GitHub Pages.

## Features

- **Project Showcase** - Featured projects with live demos and GitHub links
- **Blog Posts** - Development updates, technical insights, and project launches
- **Auto-Generation** - Convert daily logs to blog posts automatically
- **Dark Mode** - Beautiful dark theme with toggle support
- **Responsive Design** - Mobile-first, works on all devices
- **SEO Optimized** - Meta tags, semantic HTML, fast loading
- **Static Export** - Deployed to GitHub Pages via Actions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Markdown**: gray-matter + remark
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: GitHub Pages (GitHub Actions)

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/CrandellWS/bill-crandell-dev.git
cd bill-crandell-dev
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This creates an optimized static export in the `out` directory.

## Usage

### Creating Blog Posts

#### Auto-Generate from Daily Log

```bash
npm run generate-post 2025-11-14
```

This reads your daily log from `~/growth-tracking/daily/2025-11/2025-11-14.md` and generates a blog post in `posts/`.

The script extracts:
- Work accomplishments
- Learning insights
- Impact statements
- Relevant tags

#### Manual Blog Post

Create a new markdown file in `posts/`:

```markdown
---
title: "Your Post Title"
date: "2025-11-14"
excerpt: "Brief description of the post"
tags: ["nextjs", "typescript", "ai-development"]
---

Your post content here...
```

### Creating Project Pages

#### Interactive Script

```bash
npm run new-project
```

Follow the prompts to create a new project page.

#### Manual Project Page

Create a new markdown file in `posts/projects/`:

```markdown
---
title: "Project Name"
description: "Short project description"
tags: ["nextjs", "typescript"]
githubUrl: "https://github.com/user/repo"
liveUrl: "https://example.com"
featured: true
---

# Project Name

Full project details...
```

## Deployment

### GitHub Pages Setup

1. **Enable GitHub Pages**:
   - Go to repository Settings > Pages
   - Source: GitHub Actions

2. **Push to Main Branch**:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

3. **Automatic Deployment**:
   - GitHub Actions workflow triggers automatically
   - Site builds and deploys to GitHub Pages
   - Available at `https://crandellws.github.io/bill-crandell-dev/`

### Environment Configuration

The site automatically detects the environment:
- **Development**: `basePath` is empty (runs on localhost:3000)
- **Production**: `basePath` is `/bill-crandell-dev` (GitHub Pages)

## Project Structure

```
bill-crandell-dev/
├── app/
│   ├── page.tsx              # Home page (latest posts)
│   ├── layout.tsx            # Root layout with Header/Footer
│   ├── projects/
│   │   ├── page.tsx          # Projects index
│   │   └── [slug]/page.tsx   # Individual project page
│   ├── blog/
│   │   ├── page.tsx          # Blog archive
│   │   └── [slug]/page.tsx   # Individual blog post
│   └── about/page.tsx        # About page
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Site footer
│   ├── ProjectCard.tsx       # Project card component
│   └── BlogPostCard.tsx      # Blog post card component
├── lib/
│   ├── posts.ts              # Blog post utilities
│   └── projects.ts           # Project utilities
├── posts/
│   ├── *.md                  # Blog posts
│   └── projects/
│       └── *.md              # Project pages
├── scripts/
│   ├── generate-post.js      # Auto-generate posts from daily logs
│   └── new-project.js        # Create new project pages
├── public/
│   └── images/               # Static images
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Pages deployment
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── package.json              # Dependencies and scripts
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run generate-post YYYY-MM-DD` - Generate blog post from daily log
- `npm run new-project` - Create new project page interactively
- `npm run lint` - Run ESLint

## Content Guidelines

### Blog Posts

- Focus on technical insights and learnings
- Include metrics and concrete results
- Add code examples where relevant
- Use tags for discoverability
- Keep excerpts concise (1-2 sentences)

### Project Pages

- Clear feature descriptions
- Tech stack details
- Live demo and GitHub links
- Screenshots when possible
- Mark featured projects for homepage display

## Design System

### Colors

- **Background**: `#0f172a` (slate-950)
- **Cards**: `#1e293b` (slate-800)
- **Borders**: `#334155` (slate-700)
- **Primary Text**: `#e2e8f0` (slate-100)
- **Secondary Text**: `#94a3b8` (slate-400)
- **Accent**: `#3b82f6` (blue-500)
- **Success**: `#10b981` (green-500)

### Typography

- **Headings**: Bold, white
- **Body**: Regular, slate-300
- **Code**: Monospace, green-400
- **Links**: Blue-400, hover blue-300

## Development Philosophy

This blog demonstrates **AI-speed development** principles:
- Parallel team orchestration
- Same-day conception to deployment
- Zero TypeScript errors
- Comprehensive documentation
- 70% faster development through intelligent work distribution

## Contributing

This is a personal blog, but suggestions and improvements are welcome! Feel free to open an issue or submit a pull request.

## License

MIT License - See LICENSE file for details

## Contact

- **GitHub**: [@CrandellWS](https://github.com/CrandellWS)
- **Blog**: [https://crandellws.github.io/bill-crandell-dev/](https://crandellws.github.io/bill-crandell-dev/)

---

**Built with Next.js 14 and AI-assisted development**

Demonstrating that AI-speed development delivers both velocity AND quality. Same-day builds, zero errors, comprehensive docs.
