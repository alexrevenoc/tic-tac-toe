#!/bin/bash

# Script to set up GitHub repository for Tactical Tic-Tac-Toe

echo "🚀 Setting up GitHub repository for Tactical Tic-Tac-Toe..."

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    echo "   macOS: Install Xcode Command Line Tools: xcode-select --install"
    exit 1
fi

# Initialize git repository if not already initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
else
    echo "✅ Git repository already initialized"
fi

# Add all files
echo "📝 Adding files to git..."
git add .

# Create initial commit
echo "💾 Creating initial commit..."
git commit -m "Initial commit: Tactical Tic-Tac-Toe 7x7 game with Semrush Intergalactic Design System"

echo ""
echo "✅ Repository setup complete!"
echo ""
echo "📋 Next steps to push to GitHub:"
echo ""
echo "1. Create a new repository on GitHub:"
echo "   - Go to https://github.com/new"
echo "   - Create a new repository (don't initialize with README)"
echo ""
echo "2. Add the remote and push:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "Or if you want to use SSH:"
echo "   git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""

