import { Colors } from "@/src/core/theme/colors";
import { RoutineExerciseState } from "@/src/features/routines/domain/entities/routine";
import { useGetRoutine } from "@/src/features/routines/ui/hooks/use-get-routine";
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { AddSetUseCase } from "../../application/use-cases/AddSetUseCase";
import { DeleteSetUseCase } from "../../application/use-cases/DeleteSetUseCase";
import { UpdateSetUseCase } from "../../application/use-cases/UpdateSetUseCase";
import type { SetEntry } from "../../domain/entities/session";
import { LocalStorageSessionRepository } from "../../infrastructure/storage/LocalStorageSessionRepository";
import { useGetSession } from "../hooks/useGetSession";
import { SerieForm } from "../serie-form/serie-form";
import { styles } from "./session-form.styles";

type BottomSheetMode = "add" | "edit";

// ── SwipeableRow ─────────────────────────────────────────────────────────────
interface SwipeableRowProps {
    set: SetEntry;
    onEdit: (set: SetEntry) => void;
    onDelete: (set: SetEntry) => void;
}

const SwipeableRow: React.FC<SwipeableRowProps> = ({ set, onEdit, onDelete }) => {
    const ref = useRef<React.ComponentRef<typeof ReanimatedSwipeable>>(null);

    const renderRightActions = () => (
        <View style={{ flexDirection: "row" }}>
            <Pressable
                onPress={() => { ref.current?.close(); onEdit(set); }}
                style={{ backgroundColor: "#3B82F6", justifyContent: "center", alignItems: "center", width: 72, borderRadius: 4 }}
            >
                <Text style={{ color: "#fff", fontWeight: "600", fontSize: 13 }}>Editar</Text>
            </Pressable>
            <Pressable
                onPress={() => { ref.current?.close(); onDelete(set); }}
                style={{ backgroundColor: "#EF4444", justifyContent: "center", alignItems: "center", width: 72, borderRadius: 4 }}
            >
                <Text style={{ color: "#fff", fontWeight: "600", fontSize: 13 }}>Borrar</Text>
            </Pressable>
        </View>
    );

    return (
        <ReanimatedSwipeable
            ref={ref}
            renderRightActions={renderRightActions}
            rightThreshold={40}
            overshootRight={false}
        >
            <View style={[styles.setTableRow, styles.setTableRowBody]}>
                <Text style={styles.setTableCell}>{set.setNumber}</Text>
                <Text style={styles.setTableCell}>{set.reps}</Text>
                <Text style={styles.setTableCell}>{set.weight ?? "—"}</Text>
            </View>
        </ReanimatedSwipeable>
    );
};

// ── SessionForm ──────────────────────────────────────────────────────────────
export const SessionForm = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { session, refetch: refetchSession } = useGetSession(id);
    const { routine } = useGetRoutine(session?.routineId);
    const [currentExerciseId, setCurrentExerciseId] = useState<undefined | string>();
    const [bottomSheetMode, setBottomSheetMode] = useState<BottomSheetMode>("add");
    const [editingSet, setEditingSet] = useState<SetEntry | undefined>();
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

    // ── ADD ──────────────────────────────────────────────────────────────────
    const addSerie = async (serie: { reps?: number; weight?: number }) => {
        if (!session || !currentExerciseId || !serie.reps) return;
        await new AddSetUseCase(new LocalStorageSessionRepository()).execute({
            sessionId: session.id,
            routineExerciseId: currentExerciseId,
            reps: serie.reps,
            weight: serie.weight,
        });
        await refetchSession(id);
    };

    // ── UPDATE ───────────────────────────────────────────────────────────────
    const updateSerie = async (serie: { reps?: number; weight?: number }) => {
        if (!session || !currentExerciseId || !serie.reps || !editingSet) return;
        await new UpdateSetUseCase(new LocalStorageSessionRepository()).execute({
            sessionId: session.id,
            routineExerciseId: currentExerciseId,
            setId: editingSet.id,
            reps: serie.reps,
            weight: serie.weight,
        });
        await refetchSession(id);
    };

    // ── DELETE ───────────────────────────────────────────────────────────────
    const deleteSerie = (set: SetEntry) => {
        Alert.alert(
            "Borrar serie",
            `¿Seguro que quieres borrar la serie ${set.setNumber}?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Borrar",
                    style: "destructive",
                    onPress: async () => {
                        if (!session || !currentExerciseId) return;
                        await new DeleteSetUseCase(new LocalStorageSessionRepository()).execute({
                            sessionId: session.id,
                            routineExerciseId: currentExerciseId,
                            setId: set.id,
                        });
                        await refetchSession(id);
                    },
                },
            ]
        );
    };

    // ── BOTTOM SHEET ─────────────────────────────────────────────────────────
    const openAddForm = useCallback(() => {
        setEditingSet(undefined);
        setBottomSheetMode("add");
        bottomSheetModalRef.current?.present();
    }, []);

    const openEditForm = useCallback((set: SetEntry) => {
        setEditingSet(set);
        setBottomSheetMode("edit");
        bottomSheetModalRef.current?.present();
    }, []);

    const closeForm = useCallback(() => {
        bottomSheetModalRef.current?.dismiss();
        setEditingSet(undefined);
    }, []);

    const handleSubmit = async (serie: { reps?: number; weight?: number }) => {
        if (bottomSheetMode === "edit") {
            await updateSerie(serie);
        } else {
            await addSerie(serie);
        }
        closeForm();
    };

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
                    {/* Exercise tabs */}
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
                                    currentExerciseId === exercise.id && styles.exercisesListLiActive,
                                ]}
                                key={exercise.id}
                            >
                                <Text style={[
                                    styles.exercisesListLiText,
                                    currentExerciseId === exercise.id && styles.exercisesListLiTextActive,
                                ]}>
                                    {exercise.name}
                                </Text>
                            </Pressable>
                            
                        ))}
                    </ScrollView>

                    {/* Sets table */}
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
                                        <SwipeableRow
                                            key={s.id}
                                            set={s}
                                            onEdit={openEditForm}
                                            onDelete={deleteSerie}
                                        />
                                    ))}
                                </View>
                            </View>
                        ) : (
                            <Text style={styles.seriesListText}>Este ejercicio no tiene series</Text>
                        )}
                    </View>

                    {/* Add button */}
                    <View style={styles.newSerieWrapper}>
                        <Pressable style={styles.newSerieFormButton} onPress={openAddForm}>
                            <Text style={styles.newSerieFormButtonText}>Añadir Serie</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Bottom Sheet */}
            <BottomSheetModal
                ref={bottomSheetModalRef}
                snapPoints={[350]}
                enablePanDownToClose
                keyboardBehavior="interactive"
                keyboardBlurBehavior="restore"
                onDismiss={closeForm}
                backgroundStyle={{ backgroundColor: Colors.color_zinc_800 }}
            >
                <BottomSheetView style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
                    <SerieForm
                        key={editingSet?.id ?? "new"}
                        initialSerie={editingSet ? { reps: editingSet.reps, weight: editingSet.weight } : undefined}
                        handleCancel={closeForm}
                        handleSerieChange={handleSubmit}
                    />
                </BottomSheetView>
            </BottomSheetModal>
        </View>
    );
};