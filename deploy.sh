#!/bin/bash

# Deploy script for GitHub Pages
# This script ensures the correct base path is used for deployment

echo "🚀 Starting deployment to GitHub Pages..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf dist

# Build the project
echo "🔨 Building project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"

    # If a custom domain is provided as an argument, use it
    CUSTOM_DOMAIN=$1

    if [ -n "$CUSTOM_DOMAIN" ]; then
        echo "📝 Setting up custom domain: $CUSTOM_DOMAIN"
        echo "$CUSTOM_DOMAIN" > dist/CNAME
    else
        echo "⚠️ No custom domain provided. Deploying to default github.io domain."
        echo "💡 Tip: Pass your domain as an argument: ./deploy.sh yourdomain.com"
    fi

    # Deploy to GitHub Pages
    echo "📤 Deploying to GitHub Pages..."
    npx gh-pages -d dist -b gh-pages

    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful!"
        if [ -n "$CUSTOM_DOMAIN" ]; then
            echo "🌐 Your site should be available at: https://$CUSTOM_DOMAIN"
        else
            echo "🌐 Your site should be available at: https://fakhrymubarak.github.io"
        fi
    else
        echo "❌ Deployment failed!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi
