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

    # Deploy to GitHub Pages
    echo "📤 Deploying to GitHub Pages..."
    npx gh-pages -d dist -b gh-pages

    if [ $? -eq 0 ]; then
        echo "🎉 Deployment successful!"
        echo "🌐 Your site should be available at: https://fakhrymubarak.github.io"
    else
        echo "❌ Deployment failed!"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi
