import { Colors } from '@/src/core/theme/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flexDirection: "column",
      gap: 12,
    },
  
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: Colors.color_zinc_100,
    },
  
    actions: {
      flexDirection: "row",
      gap: 8,
    },
  
    button: {
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: Colors.color_zinc_800,
    },
  
    buttonText: {
      fontSize: 14,
      color: Colors.color_zinc_100,
    },
  
    weekRow: {
      flexDirection: "row",
    },
  
    weekDay: {
      flex: 1,
      aspectRatio: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  
    weekDayText: {
      fontSize: 14,
      fontWeight: "500",
      color: Colors.color_zinc_100,
    },
  
    daysGrid: {
      gap: 4,
    },

    daysGridChunk: {
      flexDirection: "row",
      gap: 4,
    },
  
    dayCell: {
      flex: 1,
    },
  
    emptyCell: {
      flex: 1,
      aspectRatio: 1,
    },
  });