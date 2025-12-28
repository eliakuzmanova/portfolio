# Portfolio Website

A modern, responsive portfolio website built with Next.js 14, featuring multi-language support (English, German, Bulgarian), stunning animations, and a unique design.

## Features

- 🌍 **Multi-language Support**: English, German, and Bulgarian
- 🎨 **Modern Design**: Unique, eye-catching UI with smooth animations
- 📱 **Fully Responsive**: Optimized for all device sizes
- ⚡ **Performance**: Built with Next.js 14 App Router
- 🎭 **Animations**: Smooth transitions using Framer Motion
- 🎯 **Best Practices**: Clean code following industry standards

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **i18n**: next-intl
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Update Personal Information

1. **Contact Information**: Edit `components/Contact.tsx` to update email, LinkedIn, and GitHub links.

2. **Projects**: Modify the project data in `messages/[locale].json` under `projects.items`.

3. **Skills**: Update skills in `components/Skills.tsx`.

4. **About Section**: Edit the about text in `messages/[locale].json` under `about`.

### Styling

- Colors: Modify `tailwind.config.ts` to change the color scheme
- Animations: Adjust animation settings in component files
- Layout: Update component layouts in the `components/` directory

## Project Structure

```
├── app/
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
├── components/
│   ├── Navigation.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Skills.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── messages/
│   ├── en.json
│   ├── de.json
│   └── bg.json
├── i18n.ts
├── middleware.ts
└── ...
```

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Vercel will automatically detect Next.js and deploy

## License

MIT

## Support

For questions or issues, please open an issue on GitHub.

