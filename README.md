# BCI Marketplace

A modern e-commerce platform built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **TypeScript**: Full type safety for better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **React Query**: Efficient data fetching and caching
- **Framer Motion**: Smooth animations and transitions
- **Heroicons**: Beautiful, consistent icons
- **Zustand**: Lightweight state management

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Deployment**: Google Cloud Platform

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bci-marketplace.git
cd bci-marketplace
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=your_api_url_here
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your_ga_id_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
bci-marketplace/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Next.js pages
│   ├── styles/        # Global styles and CSS
│   └── utils/         # Utility functions
├── public/            # Static assets
├── config/            # Configuration files
├── package.json       # Dependencies and scripts
├── next.config.js     # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
└── tsconfig.json      # TypeScript configuration
```

## 🚀 Deployment

### Google Cloud Platform

1. Install Google Cloud SDK
2. Initialize your project:
```bash
gcloud init
```

3. Deploy to Google Cloud Run:
```bash
gcloud run deploy bci-marketplace --source .
```

### Environment Variables

Set up the following environment variables in Google Cloud:

- `NEXT_PUBLIC_API_URL`: Your API endpoint
- `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`: Google Analytics ID
- `DATABASE_URL`: Database connection string (if applicable)

## 🧪 Testing

Run the test suite:
```bash
npm test
# or
yarn test
```

Run tests in watch mode:
```bash
npm run test:watch
# or
yarn test:watch
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 🌐 Domain Configuration

The project is configured for `BCIMarketplace.com`. Update the following files for your domain:

1. `next.config.js` - Add your domain to the images.domains array
2. `public/manifest.json` - Update the name and short_name
3. `src/pages/_document.tsx` - Update meta tags

## 📱 PWA Features

The project includes Progressive Web App features:

- Service Worker for offline functionality
- Web App Manifest for app-like experience
- Responsive design for all devices

## 🔧 Customization

### Colors

Update the color scheme in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your primary colors
      },
      secondary: {
        // Your secondary colors
      },
    },
  },
}
```

### Fonts

Update fonts in `tailwind.config.js` and `src/styles/globals.css`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@bcimarketplace.com or create an issue in the GitHub repository.

## 🔗 Links

- [Website](https://bcimarketplace.com)
- [Documentation](https://docs.bcimarketplace.com)
- [API Documentation](https://api.bcimarketplace.com)

---

Built with ❤️ for BCI Marketplace 