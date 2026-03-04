import { Colors } from "@/src/core/theme/colors";
import { RoutineExerciseState } from "@/src/features/routines/domain/entities/routine";
import { useGetRoutine } from "@/src/features/routines/ui/hooks/use-get-routine";
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { AddSetUseCase } from "../../application/use-cases/AddSetUseCase";
import { LocalStorageSessionRepository } from "../../infrastructure/storage/LocalStorageSessionRepository";
import { useGetSession } from "../hooks/useGetSession";
import { SerieForm } from "../serie-form/serie-form";
import { styles } from "./session-form.styles";

export const SessionForm = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { session, refetch: refetchSession } = useGetSession(id);
    const { routine } = useGetRoutine(session?.routineId);
    const [currentExerciseId, setCurrentExerciseId] = useState<undefined | string>();
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const toggleCurrentExerciseId = (id: string) => {
        setCurrentExerciseId(prev => prev === id ? undefined : id);
    };

    useEffect(() => {
        if (!routine) return;
        if (currentExerciseId) return;
        setCurrentExerciseId(activeExercises?.length ? activeExercises[0].id : undefined);
    }, [routine]);

    const activeExercises = routine?.exercises?.filter(
        exercise => exercise?.state !== RoutineExerciseState.DISCARDED
    );
    const exerciseLog = session?.exerciseLogs?.find(
        log => log.routineExerciseId === currentExerciseId
    );

    const addSerie = async (serie: { reps?: number; weight?: number }) => {
        if (!session || !currentExerciseId || !serie.reps) return;
        const useCase = new AddSetUseCase(new LocalStorageSessionRepository());
        await useCase.execute({
            sessionId: session.id,
            routineExerciseId: currentExerciseId,
            reps: serie.reps,
            weight: serie.weight,
        });
        await refetchSession(id);
        bottomSheetModalRef.current?.dismiss();
    };

    const openSerieForm = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const closeSerieForm = useCallback(() => {
        bottomSheetModalRef.current?.dismiss();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
            >
                <ScrollView
                    style={styles.sessionForm}
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <ScrollView
                        horizontal
                        contentContainerStyle={styles.exercisesList}
                        showsHorizontalScrollIndicator={false}
                        style={{ flexGrow: 0 }}
                    >
                        {activeExercises?.map(exercise => (
                            <Pressable
                                onPress={() => toggleCurrentExerciseId(exercise.id)}
                                style={[
                                    styles.exercisesListLi,
                                    currentExerciseId === exercise.id && styles.exercisesListLiActive
                                ]}
                                key={exercise.id}
                            >
                                <Text style={[
                                    styles.exercisesListLiText,
                                    currentExerciseId === exercise.id && styles.exercisesListLiTextActive
                                ]}>
                                    {exercise.name}
                                </Text>
                            </Pressable>
                        ))}
                    </ScrollView>

                    <View style={styles.seriesList}>
                        {exerciseLog && exerciseLog.sets.length > 0 ? (
                            <View style={styles.setTable}>
                                <View style={[styles.setTableRow, styles.setTableHeader]}>
                                    <Text style={styles.setTableCell}>Serie</Text>
                                    <Text style={styles.setTableCell}>Reps</Text>
                                    <Text style={styles.setTableCell}>Peso</Text>
                                </View>
                                <View style={styles.setTableBody}>
                                    {exerciseLog.sets?.map(s => (
                                        <View style={styles.setTableRow} key={s.id}>
                                            <Text style={styles.setTableCell}>{s.setNumber}</Text>
                                            <Text style={styles.setTableCell}>{s.reps}</Text>
                                            <Text style={styles.setTableCell}>{s.weight}</Text>
                                        </View>
                                    ))}
                                </View>
                            </View>
                        ) : (
                            <Text style={styles.seriesListText}>Este ejercicio no tiene series</Text>
                        )}
                    </View>

                    <View style={styles.newSerieWrapper}>
                        <Pressable style={styles.newSerieFormButton} onPress={openSerieForm}>
                            <Text style={styles.newSerieFormButtonText}>Añadir Serie</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* BottomSheetModal en lugar de BottomSheet */}
            <BottomSheetModal
                ref={bottomSheetModalRef}
                snapPoints={[350]}
                enablePanDownToClose
                keyboardBehavior="interactive"
                keyboardBlurBehavior="restore"
                onDismiss={closeSerieForm}
                backgroundStyle={{ backgroundColor: Colors.color_zinc_800 }}
            >
                <BottomSheetView style={{ paddingHorizontal: 16 }}>
                    <SerieForm
                        handleCancel={closeSerieForm}
                        handleSerieChange={async (serie) => {
                            await addSerie(serie);
                        }}
                    />
                </BottomSheetView>
            </BottomSheetModal>
        </View>
    );
};