import { Colors } from "@/src/core/theme/colors"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    sessionForm: {
        marginTop: 24,
        gap: 24,
    },
    exercisesList: {
        flexDirection: 'row',
    },
    exercisesListLi: {
        borderWidth: 1,
        borderColor: Colors.color_zinc_100,
        borderRadius: 12,
    },
    exercisesListLiText: {
        padding: 8,
        color: Colors.color_zinc_100,
    },
    seriesList: {
        gap: 8,
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
    newSerieForm: {
        gap: 8,
    },
    newSerieFormText: {
        color: Colors.color_zinc_100,
    },
})