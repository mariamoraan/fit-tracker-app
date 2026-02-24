import { StackScreen } from "@/src/core/components/stack-screen/stack-screen";
import { useGetSession } from "@/src/features/sessions/ui/hooks/useGetSession";
import { SessionForm } from "@/src/features/sessions/ui/session-form/session-form";
import { SessionHeader } from "@/src/features/sessions/ui/session-header/session-header";
import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function SessionScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const {session, isLoading} = useGetSession(id)
    
    if(isLoading) {
        return (
            <View>
                <Text style={{color: 'white'}}>Loding...</Text>
            </View>
        )
    }

    if(!session) {
        return (
            <View>
                <Text style={{color: 'white'}}>Session does not exist</Text>
            </View>
        )
    }

    return (
        <StackScreen title={session.routineName}>
             <SessionHeader />
             <SessionForm />
        </StackScreen>
    )
}

