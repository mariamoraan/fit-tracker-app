import { RoutineExerciseState } from "@/src/features/routines/domain/entities/routine";
import { useGetRoutine } from "@/src/features/routines/ui/hooks/use-get-routine";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { AddSetUseCase } from "../../application/use-cases/AddSetUseCase";
import { LocalStorageSessionRepository } from "../../infrastructure/storage/LocalStorageSessionRepository";
import { useGetSession } from "../hooks/useGetSession";
import { SerieForm } from "../serie-form/serie-form";
import { styles } from "./session-form.styles";

export const SessionForm = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const {session, refetch: refetchSession} = useGetSession(id)
    const {routine} = useGetRoutine(session?.routineId)
    const [currentExerciseId, setCurrentExerciseId] = useState<undefined | string>();
    const [isNewSetFormOpen, setIsNewSetFormOpen] = useState(false);

    const toggleCurrentExerciseId = (id: string) => {
        setCurrentExerciseId(prev => prev === id ? undefined : id)
        setIsNewSetFormOpen(false)
    }

    useEffect(() => {
        if(!routine) return;
        if(currentExerciseId) return;
        setCurrentExerciseId(activeExercises?.length ? activeExercises[0].id : undefined)
    }, [routine])

    const activeExercises = routine?.exercises?.filter(exercise => exercise?.state !== RoutineExerciseState.DISCARDED)
    const exerciseLog =  session?.exerciseLogs?.find(exerciseLog => exerciseLog.routineExerciseId === currentExerciseId)

    const addSerie = async(serie: {reps?: number, weight?: number}) => {
        if(!session || !currentExerciseId || !serie.reps) return;
        const useCase = new AddSetUseCase(
            new LocalStorageSessionRepository(),
        );
        await useCase.execute({
            sessionId: session.id,
            routineExerciseId: currentExerciseId,
            reps: serie.reps,
            weight: serie.weight
        });
        await refetchSession(id)
        setIsNewSetFormOpen(false)
    }

    return (
        <View style={styles.sessionForm}>
            <ScrollView 
            horizontal 
            contentContainerStyle={styles.exercisesList}
            showsHorizontalScrollIndicator={false}
            >
                {activeExercises
                ?.map(exercise => (
                    <Pressable 
                    onPress={() => toggleCurrentExerciseId(exercise.id)} 
                    style={[styles.exercisesListLi, currentExerciseId === exercise.id && styles.exercisesListLiActive]} 
                    key={exercise.id}
                    >
                        <Text style={[styles.exercisesListLiText, currentExerciseId === exercise.id && styles.exercisesListLiTextActive]}>{exercise.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>
            <View style={styles.seriesList}>
                {
                    exerciseLog && exerciseLog.sets.length > 0
                    ? (
                        <View style={styles.setTable}>
                            <View style={[styles.setTableRow, styles.setTableHeader]}>
                                <Text style={styles.setTableCell}>Serie</Text>
                                <Text style={styles.setTableCell}>Reps</Text>
                                <Text style={styles.setTableCell}>Peso</Text>
                            </View>
                            <View style={styles.setTableBody}> 
                            {
                                exerciseLog.sets?.map(s => (
                                    <View style={styles.setTableRow} key={s.id}>
                                        <Text style={styles.setTableCell}>{s.setNumber}</Text>
                                        <Text style={styles.setTableCell}>{s.reps} </Text>
                                        <Text style={styles.setTableCell}>{s.weight}</Text>
                                    </View>
                                ))
                            }
                            </View>
                        </View>
                    )
                    : <Text style={styles.seriesListText}>Este ejercicio no tiene series</Text>
                }
            </View>
            <View style={styles.newSerieWrapper} >
                {
                    isNewSetFormOpen 
                    ? (
                        <View style={styles.newSerieForm}>
                            <SerieForm handleCancel={() => setIsNewSetFormOpen(false)}  handleSerieChange={addSerie}  />
                        </View>
                    )
                    : (
                        <Pressable 
                        style={styles.newSerieFormButton}
                        onPress={() => setIsNewSetFormOpen(true)}
                        >
                            <Text style={styles.newSerieFormButtonText}>Añadir Serie</Text>
                        </Pressable>
                        )
                }
            </View>
           
        </View>
    )
}