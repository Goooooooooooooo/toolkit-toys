const lightAmber = {
  dark: false,
  colors: {
    background: '#FFDE03',
    surface: '#FFC107',
    primary: '#0336FF',
    secondary: '#FF0266',
    accent: '#00bcd4',
    error: '#f44336',
    warning: '#ff9800',
    info: '#03a9f4',
    success: '#4caf50'
  },
};

const darkOrange = {
  dark: true,
  colors: {
    background: '#363636',
    surface: '#363636',
    primary: '#FC8416',
    secondary: '#FF0266',
    accent: '#00bcd4',
    error: '#f44336',
    warning: '#ff9800',
    info: '#03a9f4',
    success: '#4caf50'
  },
};

const greenColors = {
  primary: '#4caf50',
  secondary: '#ffc107',
  accent: '#e91e63',
  error: '#f44336',
  warning: '#ff9800',
  info: '#03a9f4',
  success: '#8bc34a'
};

const darkGreen = {
  dark: true,
  colors: greenColors
};

const lightGreen = {
  dark: false,
  colors: greenColors
};

const lightGray = {
  dark: false,
  colors: {
    background: '#fcf7f8',
    surface: '#ced3dc',
    primary: '#275dad',
    secondary: '#5b616a',
    accent: '#aba9c3',
    error: '#f44336',
    warning: '#ff9800',
    info: '#03a9f4',
    success: '#4caf50'
  },
};

const lightPink = {
  dark: false,
  colors: {
    background: '#babfd1',
    surface: '#e8e9ed',
    primary: '#ff7b9c',
    secondary: '#607196',
    accent: '#ffc759',
    error: '#f44336',
    warning: '#ff9800',
    info: '#03a9f4',
    success: '#4caf50'
  },
};

const lightThemeYellow = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#EEEEEE',
    'surface-bright': '#564F8A',
    'surface-light': '#FFFFFF',
    'on-surface-bright': '#6200EE',
    'surface-variant': '#6458B4',
    'on-surface-variant': '#FAFAFA',
    primary: '#E7811F',
    secondary: '#8A2BE2',
    accent: '#FF4081',
    error: '#FF5555',
    info: '#9C27B0',
    success: '#84B38A',
    warning: '#FFA726',
  },
  variables: {
    'border-color': '#000000',
    'border-opacity': 0.12,
    'high-emphasis-opacity': 0.87,
    'medium-emphasis-opacity': 0.60,
    'disabled-opacity': 0.38,
    'idle-opacity': 0.04,
    'hover-opacity': 0.04,
    'focus-opacity': 0.12,
    'selected-opacity': 0.08,
    'activated-opacity': 0.12,
    'pressed-opacity': 0.12,
    'dragged-opacity': 0.08,
    'theme-kbd': '#212529',
    'theme-on-kbd': '#FFFFFF',
    'theme-code': '#F5F5F5',
    'theme-on-code': '#000000',
  }
}

// .v-theme--blackguard {
//   color-scheme: dark;
//   background: 15, 12, 36;                #0F0C24
//   background-overlay-multiplier: 1;
//   primary: 231, 129, 13;                 #E7811F
//   primary-overlay-multiplier: 2;
//   surface: 30, 24, 74;                   #1E184A
//   surface-overlay-multiplier: 1;
//   info: 156, 39, 176;                    #9C27B0
//   info-overlay-multiplier: 1;
//   accent: 255, 64, 129;                  #FF4081
//   accent-overlay-multiplier: 2;
//   success: 132, 179, 138;                #84B38A
//   success-overlay-multiplier: 2;
//   surface-light: 54, 43, 137;            #362B89
//   surface-light-overlay-multiplier: 1;
//   surface-bright: 86, 79, 138;           #564F8A
//   surface-bright-overlay-multiplier: 1;
//   surface-variant: 100, 88, 180;         #6458B4
//   surface-variant-overlay-multiplier: 1;
//   on-surface-variant: 255, 255, 255;
//   primary-darken-1: 197, 110, 11;        #C56E0B
//   primary-darken-1-overlay-multiplier: 2;
//   secondary: 138, 43, 226;               #8A2BE2
//   secondary-overlay-multiplier: 1;
//   secondary-darken-1: 121, 25, 203;      #7919CB
//   secondary-darken-1-overlay-multiplier: 1;
//   error: 255, 85, 85;                    #FF5555
//   error-overlay-multiplier: 2;
//   warning: 255, 167, 38;                 #FFA726
//   warning-overlay-multiplier: 2;
//   on-background: 255, 255, 255;          #FFFFFF
//   on-primary: 255, 255, 255;
//   on-surface: 255, 255, 255;
//   on-info: 255, 255, 255;
//   on-accent: 255, 255, 255;
//   on-success: 255, 255, 255;
//   --v-theme-on-surface-light: 255, 255, 255;
//   --v-theme-on-surface-bright: 255, 255, 255;
//   --v-theme-on-primary-darken-1: 255, 255, 255;
//   --v-theme-on-secondary: 255, 255, 255;
//   --v-theme-on-secondary-darken-1: 255, 255, 255;
//   --v-theme-on-error: 255, 255, 255;
//   --v-theme-on-warning: 0, 0, 0;
//   --v-border-color: 255, 255, 255;
//   --v-border-opacity: 0.12;
//   --v-high-emphasis-opacity: 0.87;
//   --v-medium-emphasis-opacity: 0.6;
//   --v-disabled-opacity: 0.38;
//   --v-idle-opacity: 0.1;
//   --v-hover-opacity: 0.08;
//   --v-focus-opacity: 0.12;
//   --v-selected-opacity: 0.12;
//   --v-activated-opacity: 0.12;
//   --v-pressed-opacity: 0.16;
//   --v-dragged-opacity: 0.08;
//   --v-theme-kbd: 33, 37, 41;                 #212529
//   --v-theme-on-kbd: 255, 255, 255;
//   --v-theme-code: 52, 52, 52;                #343434
//   --v-theme-on-code: 204, 204, 204;          #CCCCCC
// }
export const themes = {
  lightAmber,
  darkGreen,
  lightGreen,
  lightGray,
  darkOrange
}