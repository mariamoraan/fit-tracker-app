import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    label: {
        fontSize: 12,
        color: "#71717a",
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.6,
    },
    input: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        backgroundColor: "#18181b",
        borderWidth: 1,
        borderColor: "#27272a",
        borderRadius: 8,
        color: "#fafafa",
        fontSize: 15,
    },
    colorPicker: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
    },
    colorButton: {
        height: 28,
        width: 28,
        borderRadius: 14,
    },
    colorButtonSelected: {
        borderWidth: 2.5,
        borderColor: "#fafafa",
        transform: [{ scale: 1.1 }],
    },
    daysRow: {
        flexDirection: "row",
        gap: 8,
    },
    dayButton: {
        height: 34,
        width: 34,
        borderRadius: 17,
        justifyContent: "center",
        alignItems: "center",
    },
    dayActive: {
        backgroundColor: "#fafafa",
    },
    dayInactive: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#3f3f46",
    },
    dayText: {
        fontSize: 11,
        fontWeight: '600',
        color: "#52525b",
    },
    dayTextActive: {
        color: "#18181b",
    },
});