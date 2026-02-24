
import { Theme } from '@react-navigation/native';
import { Colors } from './colors';
import { fonts } from './fonts';

export const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: Colors.color_accent_500,
    background: Colors.color_zinc_900,
    card: Colors.color_zinc_800,
    text: Colors.color_zinc_100,
    border: Colors.color_zinc_800,
    notification: 'rgb(255, 69, 58)',
  },
  fonts,
};
