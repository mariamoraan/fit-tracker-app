import { Colors } from '@/src/core/theme/colors'
import { Typography } from '@/src/core/theme/theme'
import { StyleSheet } from 'react-native'

export const style = StyleSheet.create({
    title: {
        marginBottom: 12,
        fontSize: Typography.md.fontSize,
        color: Colors.color_zinc_100
    },
    exercisesList: {
        marginBottom: 24,
        gap: 8,
    },
    exercise: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.color_zinc_800,
        backgroundColor: Colors.color_zinc_900,
    },
    exerciseInfo: {
        paddingBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    exerciseName: {
        marginBottom: 5,
        color: Colors.color_zinc_100,
        fontSize: Typography.md.fontSize,
    },
    exerciseMetrics: {
        fontSize: Typography.sm.fontSize,
        color: Colors.color_zinc_500,
    },
    exerciseActions: {
        flexDirection: 'row',
        gap: 8,
    },
    newExerciseForm: {
        gap: 12,
    },
    newExerciseFormTitle: {
        fontSize: Typography.md.fontSize,
        color: Colors.color_zinc_100
    },
    newExerciseFormContent: {
        gap: 8,
    },
    field: {
        gap: 8,
    },
    label: {
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
    actionButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: Colors.color_zinc_700,
    },
    actionButtonText: {
        fontSize: 11,
        color: Colors.color_zinc_200,
    },
    actionButtonDelete: {
        borderColor: Colors.color_red_500,
    },
    actionButtonTextDelete: {
        color: Colors.color_red_400
    }
})