import { Colors } from "@/src/core/theme/colors";
import { useGetRoutine } from "@/src/features/routines/ui/hooks/use-get-routine";
import { useRoutines } from "@/src/features/routines/ui/RoutinesProvider";
import { useLocalSearchParams } from "expo-router";
import { CheckIcon } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";
import { CompleteSessionUseCase } from "../../application/use-cases/CompleteSessionUseCase";
import { LocalStorageSessionRepository } from "../../infrastructure/storage/LocalStorageSessionRepository";
import { useGetSession } from "../hooks/useGetSession";
import { styles } from './session-header.styles';

export const SessionHeader = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const {session, refetch: refetchSession} = useGetSession(id)
    const {routine } = useGetRoutine(session?.routineId);
    const {reload: reloadRoutine} = useRoutines();
    const isCompleted = session?.status === 'completed';
    const toggleIsCompleted = async () => {
        if(!session?.id) return;
        const useCase = new CompleteSessionUseCase(
            new LocalStorageSessionRepository(),
        );
        await useCase.execute({sessionId: session?.id, isCompleted: !isCompleted});
        refetchSession(id);
        reloadRoutine();
    }
    return (
        <View style={styles.sessionHeader}>
            <View style={styles.sessionHeaderInfo}>
                <Text style={styles.sessionHeaderDate}>{session?.date}</Text>
                <Text style={styles.sessionHeaderTitle}>{routine?.name}</Text>
            </View>
            <Pressable onPress={toggleIsCompleted} style={[styles.completeButton, isCompleted ? styles.completeButtonCompleted : undefined]}>
                <CheckIcon color={isCompleted ? Colors.color_zinc_100 : 'transparent'} />
            </Pressable>
        </View>
    )
}