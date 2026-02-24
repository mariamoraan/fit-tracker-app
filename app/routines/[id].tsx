import { StackScreen } from "@/src/core/components/stack-screen/stack-screen";
import { PATHS } from "@/src/core/router/paths";
import { Colors } from "@/src/core/theme/colors";
import { Typography } from "@/src/core/theme/theme";
import { Routine, RoutineExercise, RoutineExerciseState, RoutineMetadata } from "@/src/features/routines/domain/entities/routine";
import { RoutineExercisesForm } from "@/src/features/routines/ui/routine-exercises-form/routine-exercises-form";
import { RoutineForm } from "@/src/features/routines/ui/routine-form/routine-form";
import { useRoutines } from "@/src/features/routines/ui/RoutinesProvider";
import { CreateSessionUseCase } from "@/src/features/sessions/application/use-cases/CreateSession";
import { LocalStorageSessionRepository } from "@/src/features/sessions/infrastructure/storage/LocalStorageSessionRepository";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    main: {
        gap: 12,
    },
    text: {
        color: Colors.color_zinc_100
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        color: Colors.color_zinc_100,
    },
    startSession: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: Colors.color_zinc_50,
    },
    startSessionText: {
        fontSize: Typography.sm.fontSize,
        color: Colors.color_zinc_900
    },
    routineInfo: {
        paddingLeft: 12,
        gap: 4,
    },
    routineCard: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    routineInfoTitle: {
        fontSize: Typography.md.fontSize,
        color: Colors.color_zinc_400,
    },
    routineInfoName: {
        fontSize: Typography.md.fontSize,
        color: Colors.color_zinc_100,
    },
    indicator: {
        height: 32,
        width: 4, 
        borderRadius: 12,
    }
})

export default function RoutineScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const {getRoutineById, updateRoutineMeta, updateExercises} = useRoutines();
    const [isLoadingMeta, setIsLoadingMeta] = useState<boolean>(false);
    const [routine, setRoutine] = useState<Routine | undefined>()

    useEffect(() => {
        if(!id) return;
        const routine =  getRoutineById(id)
        setRoutine(routine)
    }, [id])

    const handleSaveMeta = async (metadata: RoutineMetadata) => {
        if(!routine) return;
        if (!metadata.name.trim()) return;
        setIsLoadingMeta(true);
        const updatedRoutine = await updateRoutineMeta({...metadata, id: routine.id});
        setRoutine(updatedRoutine)
        setIsLoadingMeta(false);
    };

    const handleUpdateExercises = async(exercise: RoutineExercise) => {
        if(!routine) return;
        const updatedRoutine =  await updateExercises(routine.id, routine.exercises.map(ex => ex.id === exercise.id ? exercise : ex))

        setRoutine(updatedRoutine)
    }

    const handleAddExercise = async(exercise: RoutineExercise) => {
        if(!routine) return;
        const updatedRoutine = await updateExercises(routine.id, [...routine.exercises, exercise])
        setRoutine(updatedRoutine)
    }


    const handleDeleteExercise = async (exerciseId: string) => {
        if(!routine) return;
        const next = routine.exercises.map((ex) => ex.id !== exerciseId ? ex : ({...ex, state: RoutineExerciseState.DISCARDED}));
        const updatedRoutine = await updateExercises(routine.id, next);
        setRoutine(updatedRoutine)
    };

    const handleStartSession = async() => {
        const useCase = new CreateSessionUseCase(
            new LocalStorageSessionRepository(),
          );
        const newSession = await useCase.execute({
            routineId: id,
          });
          router.push({
            pathname: PATHS.START_SESSION({sessionId: newSession.id}).pathname,
            params:  PATHS.START_SESSION({sessionId: newSession.id}).params
          })
    }

    if(!routine) {
        return (
            <View>
                <Text>Error</Text>
            </View>
        )
    }

    return (
        <StackScreen title={routine?.name}>
            <View style={styles.main}>
                {/** HEADER **/}
                <View style={styles.header}>
                    <View style={styles.routineCard}>
                        <View style={[styles.indicator, { backgroundColor: routine.color }]}/>
                        <View style={[styles.routineInfo]}>
                            <Text style={styles.routineInfoTitle}>Rutina</Text>
                            <Text style={styles.routineInfoName}>{routine.name}</Text>
                        </View>
                    </View>
                    <Pressable
                    style={styles.startSession}
                    onPress={handleStartSession}
                    >
                        <Text  style={styles.startSessionText}>Empezar Sesión</Text>
                    </Pressable>
                </View>
                {/** META EDIT FORM **/}
                <RoutineForm 
                    initialRoutine={routine}
                    handleSubmit={handleSaveMeta} 
                    isSubmitting={isLoadingMeta} 
                />
                {/** EXERCISES EDIT FORM **/}
                <RoutineExercisesForm 
                    activeExercises={routine.exercises.filter(exercise => exercise.state !== RoutineExerciseState.DISCARDED)}
                    updateExercise={handleUpdateExercises} 
                    addExercise={handleAddExercise}
                    handleDeleteExercise={handleDeleteExercise}
                />
            </View>
        </StackScreen>
    )
}