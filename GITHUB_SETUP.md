# GitHub Repository Setup Guide

## Prerequisites

Make sure you have Git installed on your system:

**macOS:**
```bash
# Install Xcode Command Line Tools (if not already installed)
xcode-select --install
```

**Verify Git installation:**
```bash
git --version
```

## Step 1: Initialize Git Repository

If Git is installed, run these commands in your terminal:

```bash
cd /Users/kat/tactical-tic-tac-toe

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Tactical Tic-Tac-Toe 7x7 game with Semrush Intergalactic Design System"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `tactical-tic-tac-toe` (or your preferred name)
   - **Description**: "Tactical Tic-Tac-Toe 7x7 game built with Semrush Intergalactic Design System"
   - **Visibility**: Choose Public or Private
   - **DO NOT** check "Initialize this repository with a README" (we already have one)
5. Click **"Create repository"**

## Step 3: Connect Local Repository to GitHub

After creating the repository on GitHub, you'll see instructions. Run these commands:

**Using HTTPS:**
```bash
git remote add origin https://github.com/YOUR_USERNAME/tactical-tic-tac-toe.git
git branch -M main
git push -u origin main
```

**Using SSH (if you have SSH keys set up):**
```bash
git remote add origin git@github.com:YOUR_USERNAME/tactical-tic-tac-toe.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 4: Verify Upload

1. Go to your repository on GitHub
2. Verify that all files are uploaded:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md`
   - `design-tokens.tokens.json`
   - `extract-tokens.js`
   - Other project files

## Optional: Using GitHub CLI

If you have GitHub CLI installed:

```bash
# Install GitHub CLI (macOS)
brew install gh

# Authenticate
gh auth login

# Create repository and push in one command
gh repo create tactical-tic-tac-toe --public --source=. --remote=origin --push
```

## Troubleshooting

### Git is not installed
- **macOS**: Install Xcode Command Line Tools: `xcode-select --install`
- **Linux**: `sudo apt-get install git` (Ubuntu/Debian) or `sudo yum install git` (CentOS/RHEL)
- **Windows**: Download from [git-scm.com](https://git-scm.com/download/win)

### Authentication Issues
- For HTTPS: GitHub now requires a Personal Access Token instead of passwords
  - Create one at: https://github.com/settings/tokens
  - Use it as your password when prompted
- For SSH: Set up SSH keys at: https://github.com/settings/keys

### Large File Warnings
If `design-tokens.tokens.json` (425KB) causes issues, you can:
- Use Git LFS: `git lfs install && git lfs track "*.tokens.json"`
- Or add it to `.gitignore` if you don't need to track it

## Files Included in Repository

✅ **Source Files:**
- `index.html` - Main HTML file
- `styles.css` - Styles using Semrush Intergalactic Design System
- `script.js` - Game logic

✅ **Design Tokens:**
- `design-tokens.tokens.json` - Design tokens from Figma
- `design-tokens.css` - Generated CSS variables
- `design-tokens-summary.json` - Token summary
- `extract-tokens.js` - Token extraction script

✅ **Configuration:**
- `package.json` - Node.js dependencies
- `vite.config.js` - Vite configuration
- `.gitignore` - Git ignore rules

✅ **Documentation:**
- `README.md` - Project documentation
- `GITHUB_SETUP.md` - This file

❌ **Excluded (via .gitignore):**
- `node_modules/` - Dependencies (should be installed via npm)
- `.DS_Store` - macOS system files

## Next Steps After Upload

1. **Enable GitHub Pages** (if you want to host the game):
   - Go to repository Settings → Pages
   - Select source branch (main)
   - Select folder (/root)
   - Save
   - Your game will be available at: `https://YOUR_USERNAME.github.io/tactical-tic-tac-toe/`

2. **Add topics/tags** to your repository for better discoverability

3. **Add a license** file (MIT, Apache, etc.)

4. **Set up GitHub Actions** for automated testing (optional)

## Questions?

If you encounter any issues, check:
- GitHub Documentation: https://docs.github.com
- Git Documentation: https://git-scm.com/doc

