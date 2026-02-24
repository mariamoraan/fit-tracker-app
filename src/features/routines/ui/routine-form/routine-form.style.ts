import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    form: {
      padding: 4,
      gap: 12,
    },
    field: {
      gap: 8,
    },
    label: {
      fontSize: 12,
      color: "#a1a1aa",
    },
    input: {
      paddingVertical: 8,
      paddingHorizontal: 12,
      backgroundColor: "#18181b",
      borderWidth: 1,
      borderColor: "#27272a",
      borderRadius: 6,
      color: "#fafafa",
    },
    colorPicker: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    colorButton: {
      height: 24,
      width: 24,
      borderRadius: 12,
    },
    colorButtonSelected: {
      borderWidth: 2,
      borderColor: "#fafafa",
    },
    daysRow: {
      flexDirection: "row",
      gap: 8,
    },
    dayButton: {
      height: 32,
      width: 32,
      borderRadius: 16,
      justifyContent: "center",
      alignItems: "center",
    },
    dayActive: {
      backgroundColor: "#fafafa",
    },
    dayInactive: {
      backgroundColor: "#18181b",
      borderWidth: 1,
      borderColor: "#27272a",
    },
    dayText: {
      fontSize: 12,
      color: "#71717a",
    },
    dayTextActive: {
      color: "black",
    },
    submitButton: {
      marginTop: 16,
      borderRadius: 999,
      backgroundColor: "#fafafa",
      paddingVertical: 12,
      alignItems: "center",
    },
    submitDisabled: {
      backgroundColor: "#a1a1aa",
    },
    submitText: {
      fontSize: 14,
      fontWeight: "600",
      color: "black",
    },
  });