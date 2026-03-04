import { Colors } from '@/src/core/theme/colors'
import { Typography } from '@/src/core/theme/theme'
import { StyleSheet } from 'react-native'

export const style = StyleSheet.create({
    emptyState: {
        paddingVertical: 20,
        paddingHorizontal: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#27272a',
        borderStyle: 'dashed',
        alignItems: 'center',
    },
    emptyStateText: {
        color: '#52525b',
        fontSize: 13,
        textAlign: 'center',
    },

    /* Exercise card */
    exerciseCard: {
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#27272a',
        backgroundColor: '#232326',
    },
    exerciseCardEditing: {
        borderColor: Colors.color_accent_500,
        backgroundColor: '#1e1e21',
    },
    exerciseRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    exerciseIndex: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#3f3f46',
        justifyContent: 'center',
        alignItems: 'center',
    },
    exerciseIndexText: {
        color: '#a1a1aa',
        fontSize: 11,
        fontWeight: '700',
    },
    exerciseName: {
        color: '#fafafa',
        fontSize: 14,
        fontWeight: '500',
    },
    exerciseMetrics: {
        color: '#52525b',
        fontSize: 12,
        marginTop: 2,
    },
    exerciseActions: {
        flexDirection: 'row',
        gap: 6,
    },
    actionButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#3f3f46',
        backgroundColor: '#2a2a2d',
    },
    actionButtonText: {
        fontSize: 11,
        color: '#a1a1aa',
        fontWeight: '500',
    },
    actionButtonDelete: {
        borderColor: '#3f1515',
        backgroundColor: '#1f0f0f',
    },
    actionButtonTextDelete: {
        color: Colors.color_red_400,
    },

    /* Inline edit */
    inlineInput: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        backgroundColor: '#18181b',
        borderWidth: 1,
        borderColor: Colors.color_accent_500,
        borderRadius: 8,
        color: '#fafafa',
        fontSize: 14,
    },
    inlineActions: {
        flexDirection: 'row',
        gap: 8,
        justifyContent: 'flex-end',
    },
    inlineCancelBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#3f3f46',
    },
    inlineCancelText: {
        color: '#71717a',
        fontSize: 13,
    },
    inlineConfirmBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: '#fafafa',
    },
    inlineConfirmText: {
        color: '#18181b',
        fontSize: 13,
        fontWeight: '600',
    },

    /* Add form */
    addForm: {
        gap: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#27272a',
    },
    addFormTitle: {
        fontSize: Typography.sm.fontSize,
        color: '#71717a',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
    },
    addFormRow: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
    },
    addInput: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 12,
        backgroundColor: '#18181b',
        borderWidth: 1,
        borderColor: '#27272a',
        borderRadius: 8,
        color: '#fafafa',
        fontSize: 14,
    },
    addButton: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: '#fafafa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonDisabled: {
        backgroundColor: '#27272a',
    },
    addButtonText: {
        color: '#18181b',
        fontSize: 22,
        fontWeight: '300',
        lineHeight: 26,
    },
    addButtonTextDisabled: {
        color: '#3f3f46',
    },
})