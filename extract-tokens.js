import fs from 'fs';

// Read the design tokens file
const tokensFile = fs.readFileSync('design-tokens.tokens.json', 'utf8');
const tokens = JSON.parse(tokensFile);

// Helper function to convert hex with alpha to rgba
function hexToRgba(hex) {
  if (!hex) return '';
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Handle 8-digit hex (with alpha)
  if (hex.length === 8) {
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const a = parseInt(hex.substr(6, 2), 16) / 255;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  
  // Handle 6-digit hex
  if (hex.length === 6) {
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    return `rgb(${r}, ${g}, ${b})`;
  }
  
  return `#${hex}`;
}

// Extract colors
function extractColors(obj, prefix = '') {
  const colors = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}-${key}` : key;
    
    if (value.type === 'color' && value.value) {
      // Skip if value is a reference (starts with {)
      if (typeof value.value === 'string' && !value.value.startsWith('{')) {
        colors[newKey] = hexToRgba(value.value);
      }
    } else if (typeof value === 'object' && value !== null && !value.type) {
      Object.assign(colors, extractColors(value, newKey));
    }
  }
  
  return colors;
}

// Extract spacing
function extractSpacing(obj) {
  const spacing = {};
  
  // Check root level
  if (obj.spacing) {
    for (const [key, value] of Object.entries(obj.spacing)) {
      if (value && value.type === 'dimension' && value.value !== undefined) {
        spacing[key] = `${value.value}px`;
      }
    }
  }
  
  // Check under mode
  if (obj.mode && obj.mode.spacing) {
    for (const [key, value] of Object.entries(obj.mode.spacing)) {
      if (value && value.type === 'dimension' && value.value !== undefined) {
        spacing[key] = `${value.value}px`;
      }
    }
  }
  
  return spacing;
}

// Extract typography
function extractTypography(obj) {
  const typography = {
    fontFamily: 'Inter',
    fontSizes: {},
    fontWeights: { normal: 400, medium: 500, bold: 700 },
    lineHeights: {}
  };
  
  // Extract from font styles
  function extractFontStyles(fontObj, category = '') {
    if (!fontObj) return;
    
    for (const [key, value] of Object.entries(fontObj)) {
      if (value && value.value && typeof value.value === 'object') {
        const fontSize = value.value.fontSize;
        const lineHeight = value.value.lineHeight;
        const fontWeight = value.value.fontWeight;
        const fontFamily = value.value.fontFamily;
        
        if (fontSize) {
          typography.fontSizes[fontSize] = `${fontSize}px`;
        }
        if (lineHeight) {
          typography.lineHeights[lineHeight] = `${lineHeight}px`;
        }
        if (fontFamily && fontFamily !== 'Inter') {
          typography.fontFamily = fontFamily;
        }
      } else if (value && typeof value === 'object') {
        // Check if it's a direct font style property
        if (value.fontSize) {
          typography.fontSizes[value.fontSize.value] = `${value.fontSize.value}px`;
        }
        if (value.lineHeight) {
          typography.lineHeights[value.lineHeight.value] = `${value.lineHeight.value}px`;
        }
        if (value.fontFamily && value.fontFamily.value) {
          typography.fontFamily = value.fontFamily.value;
        }
      }
    }
  }
  
  // Extract from font.category structures
  if (obj.font) {
    for (const [category, categoryValue] of Object.entries(obj.font)) {
      extractFontStyles(categoryValue, category);
    }
  }
  
  return typography;
}

// Extract border radius
function extractBorderRadius(obj) {
  const borderRadius = {};
  
  // Look for radius values in the tokens
  function findRadius(obj, prefix = '') {
    for (const [key, value] of Object.entries(obj)) {
      if (value && typeof value === 'object') {
        if (value.radius !== undefined) {
          const newKey = prefix ? `${prefix}-${key}` : key;
          borderRadius[newKey] = `${value.radius}px`;
        } else {
          findRadius(value, prefix ? `${prefix}-${key}` : key);
        }
      }
    }
  }
  
  findRadius(obj);
  
  // Add common border radius values if not found
  if (Object.keys(borderRadius).length === 0) {
    borderRadius['s'] = '4px';
    borderRadius['m'] = '8px';
    borderRadius['l'] = '12px';
  }
  
  return borderRadius;
}

// Generate CSS
function generateCSS(colors, spacing, typography, borderRadius) {
  let css = ':root {\n';
  
  // Colors
  css += '\n    /* Color Tokens */\n';
  for (const [key, value] of Object.entries(colors)) {
    const cssKey = `--color-${key.replace(/-/g, '-')}`;
    css += `    ${cssKey}: ${value};\n`;
  }
  
  // Spacing
  css += '\n    /* Spacing Tokens */\n';
  for (const [key, value] of Object.entries(spacing)) {
    const cssKey = `--spacing-${key}`;
    css += `    ${cssKey}: ${value};\n`;
  }
  
  // Typography
  css += '\n    /* Typography Tokens */\n';
  css += `    --font-family: ${typography.fontFamily}, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;\n`;
  
  // Font sizes
  const sortedSizes = Object.keys(typography.fontSizes).sort((a, b) => parseInt(a) - parseInt(b));
  sortedSizes.forEach(size => {
    css += `    --font-size-${size}: ${typography.fontSizes[size]};\n`;
  });
  
  // Font weights
  for (const [key, value] of Object.entries(typography.fontWeights)) {
    css += `    --font-weight-${key}: ${value};\n`;
  }
  
  // Border radius
  css += '\n    /* Border Radius Tokens */\n';
  for (const [key, value] of Object.entries(borderRadius)) {
    const cssKey = `--radius-${key}`;
    css += `    ${cssKey}: ${value};\n`;
  }
  
  css += '}\n';
  
  return css;
}

// Extract tokens
console.log('Extracting design tokens...');

const colors = extractColors(tokens.color || {});
const spacing = extractSpacing(tokens);
const typography = extractTypography(tokens);
const borderRadius = extractBorderRadius(tokens);

console.log(`Found ${Object.keys(colors).length} colors`);
console.log(`Found ${Object.keys(spacing).length} spacing values`);
console.log(`Found ${Object.keys(typography.fontSizes).length} font sizes`);
console.log(`Found ${Object.keys(borderRadius).length} border radius values`);

// Generate CSS
const css = generateCSS(colors, spacing, typography, borderRadius);

// Save to file
fs.writeFileSync('design-tokens.css', css);
console.log('✅ Design tokens extracted to design-tokens.css');

// Also save as JSON for reference
const tokensSummary = {
  colors,
  spacing,
  typography,
  borderRadius
};

fs.writeFileSync('design-tokens-summary.json', JSON.stringify(tokensSummary, null, 2));
console.log('✅ Design tokens summary saved to design-tokens-summary.json');

