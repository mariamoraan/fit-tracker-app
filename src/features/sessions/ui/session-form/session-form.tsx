import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { useGetSession } from "../hooks/useGetSession";
import { SerieForm } from "../serie-form/serie-form";
import { styles } from "./session-form.styles";

export const SessionForm = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const {session} = useGetSession(id)
    const [series, setSeries] = useState<{order: number, reps?: number, weight?: number}[]>([])
    const [editingSerieId, setEditingSerieId] = useState<number | undefined>()
    const modifySerie = (serieId: number, newValues: {reps?: number, weight?: number}) => {
        setSeries(prev => prev.map(serie => 
            serie.order === serieId 
            ? {order: serieId, reps: newValues.reps, weight: newValues.weight} 
            : serie
        ))
    }
    const cancelSerieEdit = () => console.log('cancel')
    const addSerie = (serie: {reps?: number, weight?: number}) => {
        const newSerie = {
            order: series?.length + 1,
            reps: serie?.reps,
            weight: serie?.weight
        }
        setSeries(prev => [...prev, newSerie])
    }
    return (
        <View style={styles.sessionForm}>
            <View style={styles.exercisesList}>
                {session?.exerciseLogs?.map(log => (
                    <View style={styles.exercisesListLi} key={log.routineExerciseId}>
                        <Text style={styles.exercisesListLiText}>{log.exerciseName}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.seriesList}>
                {series?.sort((a,b) => a.order - b.order)?.map(serie => (
                    <View key={serie.order} style={styles.seriesListLi}>
                        {
                            editingSerieId === serie.order
                            ? (
                                <SerieForm 
                            initialSerie={{weight: serie.weight, reps: serie.reps}} 
                            handleCancel={cancelSerieEdit} 
                            handleSerieChange={(newValues) => modifySerie(serie.order, newValues)}  
                            />
                            )
                            : (
                                <View style={styles.serieSummary}>
                                    <Text style={styles.seriesListLiText}>Serie {serie.order}</Text>
                                    <Text style={[styles.seriesListLiText, styles.seriesListLiTextReps]}>{serie.reps} reps • {serie.weight}kg</Text>
                                </View>
                            )
                        }
                    </View>
                ))}
            </View>
            <View style={styles.newSerieForm}>
                <Text style={styles.newSerieFormText}>Añadir Serie</Text>
                <SerieForm handleCancel={cancelSerieEdit} handleSerieChange={addSerie}  />
            </View>
           
        </View>
    )
}