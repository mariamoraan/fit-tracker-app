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
    // Collapsible state: metadata open if new routine
    const [metadataOpen, setMetadataOpen] = useState(!initialRoutine);
    const [exercisesOpen, setExercisesOpen] = useState(false);

    // Routine state
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

    // Handlers
    const handleMetaSubmit = (meta: RoutineMetadata) => {
        setRoutineMeta(meta);
        setMetadataOpen(false);
    };
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

    return (
        <View style={{ paddingVertical: 16, gap: 20, backgroundColor: '#18181b', borderRadius: 16 }}>
            <Collapsible title="Editar Info de Rutina" isOpen={metadataOpen} setIsOpen={setMetadataOpen}>
                <RoutineMetadataForm
                    handleSubmit={handleMetaSubmit}
                    isSubmitting={isSubmitting}
                    initialRoutine={initialRoutine}
                />
            </Collapsible>
            <Collapsible title="Editar Ejercicios" isOpen={exercisesOpen} setIsOpen={setExercisesOpen}>
                <RoutineExercisesForm
                    addExercise={handleAddExercise}
                    updateExercise={handleUpdateExercise}
                    handleDeleteExercise={handleDeleteExercise}
                    activeExercises={exercises}
                />
            </Collapsible>
            <Pressable
                onPress={handleSubmit}
                disabled={isSubmitting}
                style={{
                    backgroundColor: isSubmitting ? '#52525b' : Colors.color_accent_500,
                    paddingVertical: 12,
                    borderRadius: 12,
                    alignItems: 'center',
                    marginTop: 12,
                    shadowColor: Colors.color_accent_800,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                }}
            >
                <Text style={{ color: '#18181b', fontWeight: 'bold', fontSize: 16 }}>
                    {isSubmitting ? 'Guardando...' : 'Guardar Rutina'}
                </Text>
            </Pressable>
        </View>
    );
}