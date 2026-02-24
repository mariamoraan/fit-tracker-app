import { Colors } from "@/src/core/theme/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.color_zinc_800,
    borderRadius: 16,
    padding: 16,
    gap: 14,
  },

  dateText: {
    color: Colors.color_zinc_100,
    fontSize: 14,
  },

  smallMutedText: {
    color: Colors.color_zinc_400,
    fontSize: 11,
  },

  sessionsList: {
    gap: 10,
  },

  sessionCard: {
    borderWidth: 1,
    borderColor: Colors.color_zinc_800,
    backgroundColor: Colors.color_zinc_950,
    borderRadius: 14,
    overflow: "hidden",
  },

  sessionHeader: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sessionHeaderLeft: {
    flexDirection: "row",
    gap: 8,
  },

  routineColorBar: {
    width: 4,
    borderRadius: 2,
  },

  sessionRoutineName: {
    color: Colors.color_zinc_100,
    fontSize: 12,
    fontWeight: "600",
  },

  sessionStats: {
    color: Colors.color_zinc_500,
    fontSize: 11,
  },

  expandIcon: {
    color: Colors.color_zinc_500,
  },

  sessionContent: {
    borderTopWidth: 1,
    borderTopColor: Colors.color_zinc_800,
    padding: 12,
    gap: 12,
  },

  exerciseBlock: {
    gap: 6,
  },

  exerciseName: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.color_zinc_300,
  },

  setsContainer: {
    borderWidth: 1,
    borderColor: Colors.color_zinc_800,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 8,
    padding: 8,
    gap: 6,
  },

  setRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  setNumber: {
    color: Colors.color_zinc_600,
    fontSize: 11,
  },

  setText: {
    color: Colors.color_zinc_400,
    fontSize: 11,
  },

  emptySetsText: {
    fontSize: 11,
    color: Colors.color_zinc_600,
  },

  addSessionSection: {
    borderTopWidth: 1,
    borderTopColor: Colors.color_zinc_800,
    paddingTop: 12,
    gap: 8,
  },

  addSessionSectionForm: {
    marginTop: 8,
    flexDirection: 'row',
    gap: 16,
  },

  addSessionTitle: {
    fontSize: 12,
    color: Colors.color_zinc_400,
    fontWeight: "600",
  },

  addSessionRow: {
    flexDirection: "row",
    gap: 8,
  },

  createButton: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    backgroundColor: Colors.color_zinc_50,
  },

  createButtonText: {
    fontSize: 12,
    color: "black",
  },
});