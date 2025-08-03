# BCIMarketplace

A modern e-commerce platform built with Next.js, TypeScript, and Tailwind CSS, deployed on Google Cloud Platform.

## 🌟 Features

- **Modern UI/UX**: Built with Tailwind CSS and Framer Motion for smooth animations
- **TypeScript**: Full type safety throughout the application
- **Responsive Design**: Mobile-first approach with responsive components
- **State Management**: Zustand for efficient state management
- **Data Fetching**: React Query for optimized data fetching and caching
- **Component Library**: Headless UI and Heroicons for accessible components

## 🚀 Live Demo

**Production URL**: https://bci-marketplace-2024.uc.r.appspot.com

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Data Fetching**: React Query
- **UI Components**: Headless UI, Heroicons
- **Deployment**: Google Cloud App Engine

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/agi-developr/BCIMarketplace.git
   cd BCIMarketplace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
BCIMarketplace/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Next.js pages and API routes
│   ├── styles/        # Global styles and Tailwind config
│   └── utils/         # Utility functions and helpers
├── public/            # Static assets
├── app.yaml          # Google Cloud App Engine configuration
├── Dockerfile        # Docker configuration
└── package.json      # Dependencies and scripts
```

## 🚀 Deployment

### Google Cloud App Engine

This project is configured for deployment on Google Cloud App Engine.

**Deploy to production:**
```bash
gcloud app deploy
```

**View logs:**
```bash
gcloud app logs tail -s default
```

**Open in browser:**
```bash
gcloud app browse
```

### Environment Variables

Create a `.env.local` file for local development:
```env
NODE_ENV=development
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 🔧 Configuration

### Google Cloud Setup

1. **Install Google Cloud CLI**
   ```bash
   # macOS
   brew install google-cloud-sdk
   ```

2. **Authenticate**
   ```bash
   gcloud auth login
   ```

3. **Set project**
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

## 📊 Performance

- **Lighthouse Score**: Optimized for performance, accessibility, and SEO
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Bundle Size**: Optimized with Next.js automatic code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ilia Prihodko** - [@agi-developr](https://github.com/agi-developr)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for the deployment platform
- Google Cloud Platform for hosting
- Tailwind CSS for the utility-first CSS framework

---

⭐ **Star this repository if you found it helpful!** 