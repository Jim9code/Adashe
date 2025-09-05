/**
 * Adashe App - Luxury Color Palette
 * Premium financial app color system
 */

export interface Colors {
  // Primary Colors
  charcoalGray: string;
  matteWhite: string;
  
  // Accent Colors
  metallicGold: string;
  softChampagne: string;
  
  // Secondary/Support Colors
  slateGray: string;
  emeraldGreen: string;
  
  // Additional Colors
  lightGray: string;
  darkGray: string;
  errorRed: string;
  warningOrange: string;
  
  // Semantic Colors
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  text: {
    primary: string;
    secondary: string;
    light: string;
    white: string;
  };
  border: string;
  shadow: string;
  
  // Status Colors
  success: string;
  warning: string;
  error: string;
  info: string;
}

export const colors: Colors = {
  // Primary Colors
  charcoalGray: '#2C2C2C',
  matteWhite: '#F8F8F8',
  
  // Accent Colors
  metallicGold: '#D4AF37',
  softChampagne: '#E6C67C',
  
  // Secondary/Support Colors
  slateGray: '#6E6E6E',
  emeraldGreen: '#50C878',
  
  // Additional Colors
  lightGray: '#F5F5F5',
  darkGray: '#1A1A1A',
  errorRed: '#E74C3C',
  warningOrange: '#F39C12',
  
  // Semantic Colors
  primary: '#2C2C2C',        // Charcoal Gray
  secondary: '#D4AF37',      // Metallic Gold
  background: '#F8F8F8',     // Matte White
  surface: '#FFFFFF',        // Pure White for cards
  text: {
    primary: '#2C2C2C',      // Charcoal Gray
    secondary: '#6E6E6E',    // Slate Gray
    light: '#9E9E9E',        // Light Gray
    white: '#FFFFFF',         // White text
  },
  border: '#6E6E6E',         // Slate Gray
  shadow: 'rgba(44, 44, 44, 0.1)',
  
  // Status Colors
  success: '#50C878',        // Emerald Green
  warning: '#E6C67C',        // Soft Champagne
  error: '#E74C3C',          // Error Red
  info: '#6E6E6E',           // Slate Gray
};

export default colors;
