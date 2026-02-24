import { Colors } from '@/src/core/theme/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      padding: 8,
      flex: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "transparent",
      aspectRatio: 1,
      backgroundColor: Colors.color_zinc_800,
    },
  
    selected: {
      borderColor: Colors.color_zinc_100,
    },
  
    today: {
      borderColor: Colors.color_zinc_600,
    },
  
    text: {
      fontSize: 11,
      fontWeight: "500",
      color: Colors.color_zinc_100,
    },
  
    textSelected: {
      color: Colors.color_zinc_100,
    },
  
    textToday: {
      color: Colors.color_zinc_200,
    },
  
    indicatorsList: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 4,
    },
  
    indicator: {
      height: 8,
      width: 8,
      borderRadius: 100,
      borderWidth: 1,
    },
  });