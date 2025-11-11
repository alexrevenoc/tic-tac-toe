# Tactical Tic-Tac-Toe 7x7

A tactical variation of the classic Tic-Tac-Toe game built with HTML, CSS, and JavaScript, using the Semrush Intergalactic Design System.

## Game Overview

Tactical Tic-Tac-Toe 7x7 is a variation of the classic Tic-Tac-Toe game played on a 7x7 grid. Each player starts with 15 health points (HP). The objective is to reduce the opponent's HP to zero while maintaining at least one HP yourself.

## Game Rules

- **Grid Size**: The game is played on a 7x7 board
- **Health Points (HP)**: Each player starts with 15 HP
- **Turn-Based Gameplay**: Players take turns placing their marks (X or O) on the board
- **Damage Mechanic**: Whenever a player forms a sequence of 4 or more of their own marks in a row (horizontally, vertically, or diagonally), the opponent loses HP equal to the length of the sequence
  - A sequence of 4 symbols reduces the opponent's HP by 4
  - A sequence of 5 symbols reduces the opponent's HP by 5, and so on
- **Winning Condition**: The game continues until one player's HP is reduced to zero. The player with remaining HP is declared the winner

## Design System

This project uses the **Semrush Intergalactic Design System** for styling:
- Actual design tokens extracted from Figma
- Colors, spacing, typography, and other design tokens from the official design system
- Consistent design language throughout the application

## Project Structure

```
tactical-tic-tac-toe/
├── index.html          # Main HTML file
├── styles.css          # Styles using Semrush Intergalactic Design System
├── script.js           # Game logic
├── extract-tokens.js   # Script to extract design tokens from JSON
├── design-tokens.tokens.json  # Design tokens from Figma
├── design-tokens.css   # Generated CSS variables from tokens
├── design-tokens-summary.json # Summary of extracted tokens
└── README.md           # This file
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (optional, for token extraction)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tactical-tic-tac-toe
```

2. Open `index.html` in your web browser, or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Navigate to `http://localhost:8000` in your browser

### Extracting Design Tokens

If you need to regenerate the design tokens CSS:

```bash
node extract-tokens.js
```

This will:
- Parse `design-tokens.tokens.json`
- Extract colors, spacing, typography, and other tokens
- Generate `design-tokens.css` with CSS variables
- Create `design-tokens-summary.json` for reference

## Features

- ✅ 7x7 grid gameplay
- ✅ Turn-based X and O gameplay
- ✅ Health point system (15 HP per player)
- ✅ Sequence detection (horizontal, vertical, diagonal)
- ✅ Damage calculation based on sequence length
- ✅ Visual HP bars with color states
- ✅ Turn indicators
- ✅ Damage log showing all attacks
- ✅ Sequence highlighting animations
- ✅ Win condition detection
- ✅ Responsive design
- ✅ Semrush Intergalactic Design System integration

## Technologies Used

- **HTML5** - Structure
- **CSS3** - Styling with CSS Custom Properties (Variables)
- **JavaScript (ES6+)** - Game logic
- **Semrush Intergalactic Design System** - Design tokens and styling

## Design System Integration

This project integrates the Semrush Intergalactic Design System by:
1. Extracting design tokens from Figma exports
2. Converting tokens to CSS custom properties
3. Using design system colors, spacing, typography, and other tokens throughout the application

### Figma Files Used

- **Design Tokens**: Semrush - Design Tokens (Community)
- **Core Components**: Semrush - Core Components Library (Community)
- **Icons**: Semrush - Icons Library (Community)
- **Charts**: Semrush - Charts Library (Community)
- **Tables**: Semrush - Table Components Library (Community)

## Game Screenshots

(Add screenshots of your game here)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Semrush Intergalactic Design System team for providing the design tokens
- All contributors and testers

