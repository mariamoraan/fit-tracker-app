import { generateId } from "@/src/core/uuid";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { RoutineExercise, RoutineExerciseState } from "../../domain/entities/routine";
import { style } from "./routine-exercises-form.style";

interface Props {
    addExercise: (exercise: RoutineExercise) => void;
    updateExercise: (exercise: RoutineExercise) => void;
    handleDeleteExercise: (id: string) => void;
    activeExercises?: RoutineExercise[];
}

export const RoutineExercisesForm: React.FC<Props> = (props) => {
    const { addExercise, updateExercise, handleDeleteExercise, activeExercises = [] } = props;
    const [editingExercise, setEditingExercise] = useState<RoutineExercise | undefined>();
    const [newExerciseName, setNewExerciseName] = useState('');

    const handleAddExercise = () => {
        if (!newExerciseName.trim()) return;
        addExercise({
            id: generateId('ex'),
            name: newExerciseName.trim(),
            state: RoutineExerciseState.ACTIVE,
        });
        setNewExerciseName('');
    };

    const handleConfirmEdit = () => {
        if (!editingExercise) return;
        updateExercise(editingExercise);
        setEditingExercise(undefined);
    };

    return (
        <View style={{ gap: 16, paddingBottom: 8 }}>
            {/* Exercise list */}
            {activeExercises.length === 0 ? (
                <View style={style.emptyState}>
                    <Text style={style.emptyStateText}>Aún no hay ejercicios. Añade el primero abajo.</Text>
                </View>
            ) : (
                <View style={{ gap: 8 }}>
                    {activeExercises.map((exercise, index) => {
                        const isEditing = editingExercise?.id === exercise.id;
                        return (
                            <View
                                key={exercise.id}
                                style={[style.exerciseCard, isEditing && style.exerciseCardEditing]}
                            >
                                {isEditing ? (
                                    /* Inline edit mode */
                                    <View style={{ gap: 10 }}>
                                        <TextInput
                                            value={editingExercise.name}
                                            onChangeText={text =>
                                                setEditingExercise(prev => prev ? { ...prev, name: text } : prev)
                                            }
                                            style={style.inlineInput}
                                            autoFocus
                                            placeholder="Nombre del ejercicio"
                                            placeholderTextColor="#52525b"
                                        />
                                        <View style={style.inlineActions}>
                                            <Pressable
                                                onPress={() => setEditingExercise(undefined)}
                                                style={style.inlineCancelBtn}
                                            >
                                                <Text style={style.inlineCancelText}>Cancelar</Text>
                                            </Pressable>
                                            <Pressable
                                                onPress={handleConfirmEdit}
                                                style={style.inlineConfirmBtn}
                                            >
                                                <Text style={style.inlineConfirmText}>Confirmar</Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                ) : (
                                    /* Display mode */
                                    <View style={style.exerciseRow}>
                                        <View style={style.exerciseIndex}>
                                            <Text style={style.exerciseIndexText}>{index + 1}</Text>
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={style.exerciseName}>{exercise.name}</Text>
                                            <Text style={style.exerciseMetrics}>
                                                {exercise.targetSets && exercise.targetReps
                                                    ? `${exercise.targetSets} × ${exercise.targetReps}${exercise.targetWeight ? ` · ${exercise.targetWeight} kg` : ''}`
                                                    : 'Sin objetivos'}
                                            </Text>
                                        </View>
                                        <View style={style.exerciseActions}>
                                            <Pressable
                                                onPress={() => setEditingExercise(exercise)}
                                                style={style.actionButton}
                                            >
                                                <Text style={style.actionButtonText}>Editar</Text>
                                            </Pressable>
                                            <Pressable
                                                onPress={() => handleDeleteExercise(exercise.id)}
                                                style={[style.actionButton, style.actionButtonDelete]}
                                            >
                                                <Text style={[style.actionButtonText, style.actionButtonTextDelete]}>
                                                    ✕
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                )}
                            </View>
                        );
                    })}
                </View>
            )}

            {/* Add new exercise */}
            <View style={style.addForm}>
                <Text style={style.addFormTitle}>Nuevo ejercicio</Text>
                <View style={style.addFormRow}>
                    <TextInput
                        value={newExerciseName}
                        onChangeText={setNewExerciseName}
                        onSubmitEditing={handleAddExercise}
                        returnKeyType="done"
                        placeholder="Press banca..."
                        placeholderTextColor="#52525b"
                        style={style.addInput}
                    />
                    <Pressable
                        onPress={handleAddExercise}
                        disabled={!newExerciseName.trim()}
                        style={[style.addButton, !newExerciseName.trim() && style.addButtonDisabled]}
                    >
                        <Text style={[style.addButtonText, !newExerciseName.trim() && style.addButtonTextDisabled]}>
                            +
                        </Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};