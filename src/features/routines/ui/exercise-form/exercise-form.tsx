import { Colors } from "@/src/core/theme/colors";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { RoutineExercise, RoutineExerciseState } from "../../domain/entities/routine";
import { styles } from "./exercise-form.styles";

interface Props {
    initialExercise?: RoutineExercise;
    handleUpdateExercise: (exercise?: RoutineExercise) => void;
    handleCancel: () => void;
}

export const ExerciseForm: React.FC<Props> = (props) => {
    const {handleUpdateExercise, handleCancel, initialExercise} = props;
    const [editingExercise, setEditingExercise] = useState<RoutineExercise | undefined>(initialExercise);

    const setEditingExerciseProperty = (modified: Partial<RoutineExercise>) => {
        if(!editingExercise) return;
        setEditingExercise({
            id: editingExercise.id,
            name: modified?.name ?? editingExercise?.name,
            targetReps: modified?.targetReps ?? editingExercise?.targetReps,
            targetSets: modified?.targetSets ?? editingExercise?.targetSets,
            targetWeight: modified?.targetWeight ?? editingExercise?.targetWeight,
            notes: modified?.notes ?? editingExercise?.notes,
            state: RoutineExerciseState.ACTIVE
        })
    }


    return (
        <View style={{gap: 8, borderTopWidth: 1, borderTopColor: Colors.color_zinc_800, paddingTop: 8}}>
            <View style={styles.field}>
                <Text style={styles.label}>
                    Nombre
                </Text>
                <TextInput
                    value={editingExercise?.name}
                    onChangeText={(text) => setEditingExerciseProperty({ name: text})}
                    style={styles.input}
                />
            </View>
            <View style={{flexDirection: 'row', gap: 4}}>
                <View style={[styles.field, styles.metricsField]}>
                    <Text style={styles.label}>Series</Text>
                    <TextInput
                    keyboardType="numeric"
                    value={editingExercise?.targetSets !== undefined ? editingExercise.targetSets.toString() : ''}
                    onChangeText={(value) => setEditingExerciseProperty({ targetSets: Number(value)})}
                    inputMode="numeric"
                    style={[styles.input, styles.metricsInput]}                    
                    />
                </View>
                <View style={[styles.field, styles.metricsField]}>
                    <Text style={styles.label}>Reps</Text>
                    <TextInput
                    keyboardType="numeric"
                    value={editingExercise?.targetReps !== undefined ? editingExercise?.targetReps.toString() : ''}
                    onChangeText={(value) => setEditingExerciseProperty({ targetReps: Number(value)})}
                    inputMode="numeric"
                    style={[styles.input, styles.metricsInput]} 
                    />
                </View>
                <View style={[styles.field, styles.metricsField]}>
                    <Text style={styles.label}>Peso (kg)</Text>
                    <TextInput
                    value={editingExercise?.targetWeight !== undefined ? editingExercise?.targetWeight.toString() : ''}
                    onChangeText={(value) => setEditingExerciseProperty({ targetWeight: Number(value) ? Number(value) : 0})}
                    inputMode="decimal"
                    style={[styles.input, styles.metricsInput]} 
                    />
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', gap: 12, paddingTop: 4}}>
                <Pressable
                    onPress={handleCancel}
                    style={styles.cancelButton}
                >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </Pressable>
                <Pressable
                    onPress={() => handleUpdateExercise(editingExercise)}
                    style={styles.saveButton}
                >
                    <Text style={styles.saveButtonText}>Guardar</Text>
                </Pressable>
            </View>
        </View>
    )
}