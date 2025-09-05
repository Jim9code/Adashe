/**
 * Adashe App - Theme Configuration
 * Typography, spacing, and component styling
 */

import { colors, Colors } from './colors';
import { ViewStyle, TextStyle } from 'react-native';

export interface Typography {
  fontFamily: {
    regular: string;
    medium: string;
    bold: string;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
  };
  lineHeight: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
    xxxl: number;
  };
}

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

export interface BorderRadius {
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface ShadowStyle {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface Shadows {
  sm: ShadowStyle;
  md: ShadowStyle;
  lg: ShadowStyle;
}

export interface ButtonStyle extends ViewStyle {
  backgroundColor: string;
  borderRadius: number;
  paddingVertical: number;
  paddingHorizontal: number;
  minHeight: number;
}

export interface InputStyle extends ViewStyle {
  backgroundColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  paddingVertical: number;
  paddingHorizontal: number;
  minHeight: number;
}

export interface CardStyle extends ViewStyle {
  backgroundColor: string;
  borderRadius: number;
  padding: number;
  marginVertical: number;
}

export interface ComponentStyles {
  button: {
    primary: ButtonStyle;
    secondary: ButtonStyle;
    success: ButtonStyle;
  };
  input: InputStyle;
  card: CardStyle;
}

export interface Theme {
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  components: ComponentStyles;
}

export { colors };
export const theme: Theme = {
  colors,
  
  // Typography
  typography: {
    fontFamily: {
      regular: 'System',
      medium: 'System',
      bold: 'System',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    lineHeight: {
      xs: 16,
      sm: 20,
      md: 24,
      lg: 28,
      xl: 32,
      xxl: 36,
      xxxl: 44,
    },
  },
  
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  
  // Border Radius
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  
  // Shadows
  shadows: {
    sm: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  
  // Component Styles
  components: {
    button: {
      primary: {
        backgroundColor: colors.metallicGold,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        minHeight: 48,
      },
      secondary: {
        backgroundColor: colors.charcoalGray,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        minHeight: 48,
      },
      success: {
        backgroundColor: colors.emeraldGreen,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        minHeight: 48,
      },
    },
    input: {
      backgroundColor: colors.matteWhite,
      borderColor: colors.slateGray,
      borderWidth: 1,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      minHeight: 48,
    },
    card: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
    },
  },
};

export default theme;
