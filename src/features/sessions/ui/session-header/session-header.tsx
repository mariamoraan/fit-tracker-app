import { Colors } from "@/src/core/theme/colors";
import { useGetRoutine } from "@/src/features/routines/ui/hooks/use-get-routine";
import { useLocalSearchParams } from "expo-router";
import { CheckIcon } from "lucide-react-native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useGetSession } from "../hooks/useGetSession";
import { styles } from './session-header.styles';

export const SessionHeader = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const {session} = useGetSession(id)
    const {routine} = useGetRoutine(session?.routineId);
    const [isCompleted, setIsCompleted] = useState(session?.status === 'completed')
    const toggleIsCompleted = () => {
        setIsCompleted(prev => !prev)
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