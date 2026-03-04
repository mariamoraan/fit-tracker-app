import { generateId } from "@/src/core/uuid";
import { useState } from "react";
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import { RoutineExercise, RoutineExerciseState } from "../../domain/entities/routine";
import { ExerciseForm } from "../exercise-form/exercise-form";
import { style } from "./routine-exercises-form.style";

interface Props {
    addExercise: (exercise: RoutineExercise) => void;
    updateExercise: (exercise: RoutineExercise) => void;
    handleDeleteExercise: (id: string) => void;
    activeExercises?: RoutineExercise[];
}


export const RoutineExercisesForm: React.FC<Props> = (props) => {
    const {addExercise, updateExercise, handleDeleteExercise, activeExercises = []} = props;
    const [editingExercise, setEditingExercise] = useState<RoutineExercise | undefined>();
    const [newExerciseName, setNewExerciseName] = useState<string>('');
    const [isCreatingExercise, setIsCreatingExercise] = useState<boolean>(false);
    
    const openEditExercise = (exercise: RoutineExercise) => {
        setEditingExercise(exercise)
    };
    const handleAddExercise = async() => {
        if(!newExerciseName) return;
        setIsCreatingExercise(true);
        await addExercise({
            id: generateId('ex'),
            name: newExerciseName,
            state: RoutineExerciseState.ACTIVE,
        })
        setIsCreatingExercise(false);
        setNewExerciseName('')
    }

    const handleUpdateExercise = async(exercise?: RoutineExercise) => {
        if(!exercise) return;
        await updateExercise(exercise)
        setEditingExercise(undefined)
    }

    
      
    return (
        <View style={{ gap: 16 }}>
            <Text style={{ fontSize: 15, color: '#a1a1aa', marginBottom: 8, fontWeight: '600' }}>Ejercicios de la rutina</Text>
            {activeExercises.length === 0 && (
                <Text style={{ color: '#71717a', fontSize: 14, marginBottom: 8 }}>
                    Aún no has añadido ejercicios. Empieza por el primero.
                </Text>
            )}
            {activeExercises.length > 0 && (
                <View style={{ gap: 12 }}>
                    {activeExercises.map((exercise, index) => (
                        <View
                            key={exercise.id}
                            style={{
                                padding: 14,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: '#27272a',
                                backgroundColor: '#232326',
                                marginBottom: 4,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}
                        >
                            <View>
                                <Text style={{ color: '#fafafa', fontSize: 15, fontWeight: '500' }}>
                                    {index + 1}. {exercise.name}
                                </Text>
                                <Text style={{ color: '#a1a1aa', fontSize: 13 }}>
                                    {exercise.targetSets && exercise.targetReps
                                        ? `${exercise.targetSets} x ${exercise.targetReps}${exercise.targetWeight ? ` · ${exercise.targetWeight} kg` : ""}`
                                        : "Objetivos libres"}
                                </Text>
                            </View>
                            {
                              (!editingExercise || editingExercise.id !== exercise.id) &&
                              (
                                <View style={style.exerciseActions}>
                                  <Pressable
                                    onPress={() => openEditExercise(exercise)}
                                    style={style.actionButton}
                                  >
                                    <Text style={style.actionButtonText}>Editar</Text>
                                  </Pressable>
                                  <Pressable
                                    onPress={() => void handleDeleteExercise(exercise.id)}
                                    style={[style.actionButton, style.actionButtonDelete]}
                                  >
                                    <Text style={[style.actionButtonText, style.actionButtonTextDelete]}>Eliminar</Text>
                                  </Pressable>
                                </View>
                              )
                            }
                        </View>
                    ))}
                </View>
            )}
            <View style={style.newExerciseForm}>
              <Text style={style.newExerciseFormTitle}>
                Añadir ejercicio
              </Text>
              <View style={style.newExerciseFormContent}>
                <View style={style.field}>
                  <Text style={style.label}>
                    Nombre
                  </Text>
                  <TextInput
                    value={newExerciseName}
                    onChangeText={(text) => setNewExerciseName(text)}
                    placeholder="Press banca"
                    placeholderTextColor="#71717a"
                    style={style.input}
                  />
                </View>

                <Pressable
                  onPress={handleAddExercise}
                  disabled={!newExerciseName || isCreatingExercise}
                  style={style.submit}
                >
                  {isCreatingExercise ? (
                    <ActivityIndicator color="black" />
                  ) : (
                    <Text style={style.submitText}>Guardar cambios</Text>
                  )}
                </Pressable>
              </View>
            </View>
        </View>
    )
}