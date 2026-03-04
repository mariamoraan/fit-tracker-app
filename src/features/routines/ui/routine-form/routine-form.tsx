import { Collapsible } from "@/components/ui/collapsible"
import { Colors } from "@/src/core/theme/colors"
import { useState } from "react"
import { Pressable, Text, View } from "react-native"
import { Routine, RoutineExercise, RoutineMetadata } from "../../domain/entities/routine"
import { RoutineExercisesForm } from "../routine-exercises-form/routine-exercises-form"
import { RoutineMetadataForm } from "../routine-metadata-form/routine-metadata-form"

interface RoutineFormProps {
    initialRoutine?: Routine;
    onSubmit: (routine: Routine) => void;
    isSubmitting?: boolean;
}

export const RoutineForm: React.FC<RoutineFormProps> = ({ initialRoutine, onSubmit, isSubmitting = false }) => {
    const [metadataOpen, setMetadataOpen] = useState(!initialRoutine);
    const [exercisesOpen, setExercisesOpen] = useState(false);

    const [routineMeta, setRoutineMeta] = useState<RoutineMetadata>(
        initialRoutine ? {
            name: initialRoutine.name,
            color: initialRoutine.color,
            daysOfWeek: initialRoutine.daysOfWeek,
            startDay: initialRoutine.startDay,
        } : {
            name: "",
            color: "#00BFFF",
            daysOfWeek: [],
            startDay: new Date(),
        }
    );
    const [exercises, setExercises] = useState<RoutineExercise[]>(initialRoutine?.exercises ?? []);

    const handleAddExercise = (exercise: RoutineExercise) => {
        setExercises((prev) => [...prev, exercise]);
    };
    const handleUpdateExercise = (exercise: RoutineExercise) => {
        setExercises((prev) => prev.map(e => e.id === exercise.id ? exercise : e));
    };
    const handleDeleteExercise = (id: string) => {
        setExercises((prev) => prev.filter(e => e.id !== id));
    };

    const handleSubmit = () => {
        onSubmit({
            ...routineMeta,
            exercises,
            id: initialRoutine?.id ?? "temp-id"
        });
    };

    const isValid = routineMeta.name.trim().length > 0;

    return (
        <View style={{ paddingVertical: 16, gap: 8, backgroundColor: '#18181b', borderRadius: 16 }}>
            {/* Metadata section */}
            <Collapsible
                title="Info de la rutina"
                isOpen={metadataOpen}
                setIsOpen={setMetadataOpen}
                badge={routineMeta.name ? routineMeta.name : undefined}
                accentColor={routineMeta.color}
            >
                <RoutineMetadataForm
                    onChange={setRoutineMeta}
                    initialRoutine={initialRoutine}
                />
            </Collapsible>

            {/* Exercises section */}
            <Collapsible
                title="Ejercicios"
                isOpen={exercisesOpen}
                setIsOpen={setExercisesOpen}
                badge={exercises.length > 0 ? `${exercises.length}` : undefined}
            >
                <RoutineExercisesForm
                    addExercise={handleAddExercise}
                    updateExercise={handleUpdateExercise}
                    handleDeleteExercise={handleDeleteExercise}
                    activeExercises={exercises}
                />
            </Collapsible>

            {/* Single save button */}
            <View style={{ paddingHorizontal: 4, marginTop: 8 }}>
                {!isValid && (
                    <Text style={{ color: '#71717a', fontSize: 12, textAlign: 'center', marginBottom: 8 }}>
                        Añade un nombre a la rutina para continuar
                    </Text>
                )}
                <Pressable
                    onPress={handleSubmit}
                    disabled={isSubmitting || !isValid}
                    style={({ pressed }) => ({
                        backgroundColor: isSubmitting || !isValid
                            ? '#3f3f46'
                            : pressed
                                ? Colors.color_accent_600
                                : Colors.color_accent_500,
                        paddingVertical: 14,
                        borderRadius: 12,
                        alignItems: 'center',
                        opacity: pressed ? 0.9 : 1,
                    })}
                >
                    <Text style={{
                        color: isSubmitting || !isValid ? '#71717a' : '#18181b',
                        fontWeight: '700',
                        fontSize: 15,
                        letterSpacing: 0.3,
                    }}>
                        {isSubmitting ? 'Guardando...' : 'Guardar rutina'}
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}