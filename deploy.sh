#!/bin/bash

# BCI Marketplace Deployment Script

echo "🚀 Deploying BCI Marketplace to Google Cloud..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the application
echo "🔨 Building application..."
npm run build

# Deploy to Google Cloud
echo "☁️ Deploying to Google Cloud App Engine..."
gcloud app deploy --quiet

# Get the deployment URL
DEPLOYMENT_URL=$(gcloud app describe --format="value(defaultHostname)")

echo "✅ Deployment complete!"
echo "🌐 Your application is live at: https://$DEPLOYMENT_URL"
echo "🔗 Google Cloud Console: https://console.cloud.google.com/project/bci-marketplace-2024"

# Open in browser
echo "🌍 Opening in browser..."
gcloud app browse 