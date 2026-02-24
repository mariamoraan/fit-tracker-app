import { Colors } from "@/src/core/theme/colors";
import { Typography } from "@/src/core/theme/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    field: {
        paddingVertical: 8,
    },
    metricsField: {
        flex: 1,
        minWidth: 0,
        gap: 8,
    },
    label: {
        marginBottom: 8,
        fontSize: Typography.sm.fontSize,
        color: Colors.color_zinc_400
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
    submit: {
        marginTop: 16,
        borderRadius: 999,
        backgroundColor: "#fafafa",
        paddingVertical: 12,
        alignItems: "center",
    },
    submitText: {
        fontSize: 14,
        fontWeight: "600",
        color: "black",
    },
    metricsInput: {
        flex: 1,
        minWidth: 0,
        marginRight: 4,
        paddingVertical: 2,
        paddingHorizontal: 4,
    },
    cancelButton: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        color: Colors.color_zinc_400,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: Colors.color_red_400,
    },
    cancelButtonText: {
        color: Colors.color_red_400,
    },
    saveButton: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        fontSize: 11,
        borderWidth: 1,
        borderRadius: 12,
        borderColor: Colors.color_zinc_400,
    },
    saveButtonText: {
        color: Colors.color_zinc_400,
    }
})