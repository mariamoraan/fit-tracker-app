import { Colors } from "@/src/core/theme/colors"
import { Typography } from "@/src/core/theme/theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    sessionForm: {
        marginTop: 24,
        gap: 24,
    },
    exercisesList: {
        gap: 8,
    },
    exercisesListLi: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderWidth: 1,
        borderColor: Colors.color_zinc_100,
        borderRadius: 12,
        transitionDuration: '200ms',
        transitionTimingFunction: 'ease-in-ease-out'
    },
    exercisesListLiActive: {
        borderColor: Colors.color_accent_600,
        color:  Colors.color_accent_600,
    },
    exercisesListLiText: {
        color: Colors.color_zinc_100,
    },
    exercisesListLiTextActive: {
        color: Colors.color_accent_600,
    },
    seriesList: {
        gap: 8,
    },
    seriesListText: {
        color: Colors.color_zinc_100,
    },
    seriesListLi: {
        gap: 4,
    },
    serieSummary: {
        flexDirection: 'row',
        gap: 8,
    },
    seriesListLiText: {
        color: Colors.color_zinc_100,
    },
    seriesListLiTextReps: {
        flex: 1,
    },
    newSerieWrapper: {
        marginTop: 24,
    },
    newSerieForm: {
        padding: 12,
        backgroundColor:  Colors.color_zinc_800,
        borderRadius: 12,
    },
    newSerieFormButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.color_accent_500,
        borderRadius: 8,

    },
    newSerieFormButtonText: {
        color: Colors.color_zinc_600,
        fontSize: Typography.md.fontSize,
    },
    setTable: {
      
    },
    setTableHeader: {
        marginBottom: 12,
    },
    setTableBody: {
        gap: 8,
    },
    setTableRow: {
        flexDirection: 'row',
        gap: 4,
    },
    setTableCell: {
        flex: 1,
        color: Colors.color_zinc_100,
    }
})