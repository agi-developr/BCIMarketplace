# BCI Marketplace Deployment Guide

## 🚀 Current Status

✅ **Project Created**: BCI Marketplace Next.js application  
✅ **Google Cloud Project**: `bci-marketplace-2024`  
✅ **App Engine**: Deployed and running at `https://bci-marketplace-2024.uc.r.appspot.com`  
✅ **Git Repository**: Local repository ready for GitHub  

## 📋 Next Steps

### 1. GitHub Repository Setup

Run these commands to create the GitHub repository:

```bash
# Authenticate with GitHub (choose HTTPS when prompted)
gh auth login --web

# Create the repository
gh repo create bci-marketplace --public --description "BCI Marketplace - A modern e-commerce platform" --source=. --remote=origin --push
```

### 2. Domain Configuration (BCIMarketplace.com)

#### A. Google Cloud Domain Mapping

1. **Add Custom Domain**:
   ```bash
   gcloud app domain-mappings create bcimarketplace.com
   ```

2. **Verify Domain Ownership**:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Navigate to App Engine > Settings > Custom Domains
   - Add `bcimarketplace.com` and `www.bcimarketplace.com`
   - Follow the verification process

#### B. GoDaddy DNS Configuration

Update your GoDaddy DNS settings for `BCIMarketplace.com`:

1. **A Record**:
   - Name: `@`
   - Value: `216.239.32.21` (Google's IP)
   - TTL: `3600`

2. **CNAME Record**:
   - Name: `www`
   - Value: `ghs.googlehosted.com`
   - TTL: `3600`

3. **TXT Record** (for domain verification):
   - Name: `@`
   - Value: `google-site-verification=YOUR_VERIFICATION_CODE`
   - TTL: `3600`

### 3. Environment Variables

Create a `.env.local` file for local development:

```env
NEXT_PUBLIC_API_URL=https://api.bcimarketplace.com
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
NEXT_PUBLIC_SITE_URL=https://bcimarketplace.com
```

### 4. Continuous Deployment

Set up automatic deployment from GitHub:

1. **Enable Cloud Build**:
   ```bash
   gcloud services enable cloudbuild.googleapis.com
   ```

2. **Connect GitHub Repository**:
   - Go to Cloud Build > Triggers
   - Create a new trigger
   - Connect your GitHub repository
   - Set trigger to deploy on push to main branch

### 5. SSL Certificate

Google Cloud automatically provides SSL certificates for custom domains.

### 6. Monitoring and Analytics

1. **Google Analytics**:
   - Create a Google Analytics 4 property
   - Add the tracking code to your application

2. **Google Cloud Monitoring**:
   - Enable monitoring in Google Cloud Console
   - Set up alerts for uptime and performance

## 🔧 Development Commands

```bash
# Local development
npm run dev

# Build for production
npm run build

# Deploy to Google Cloud
gcloud app deploy

# View logs
gcloud app logs tail -s default

# Open in browser
gcloud app browse
```

## 🌐 URLs

- **Production**: https://bci-marketplace-2024.uc.r.appspot.com
- **Custom Domain**: https://bcimarketplace.com (after DNS setup)
- **Google Cloud Console**: https://console.cloud.google.com/project/bci-marketplace-2024

## 📞 Support

For deployment issues:
1. Check Google Cloud Console logs
2. Verify DNS settings in GoDaddy
3. Ensure domain verification is complete

## 🔄 CI/CD Pipeline

The project includes:
- `cloudbuild.yaml` for automated builds
- `app.yaml` for App Engine configuration
- `Dockerfile` for containerized deployment

## 🎯 Next Features to Implement

1. **Authentication System**
2. **Product Database**
3. **Payment Integration**
4. **Admin Dashboard**
5. **Search Functionality**
6. **Shopping Cart**
7. **Order Management**

---

**Project Status**: ✅ Deployed and Running  
**Next Action**: Set up GitHub repository and configure custom domain 