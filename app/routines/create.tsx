import { StackScreen } from "@/src/core/components/stack-screen/stack-screen";
import { PATHS } from "@/src/core/router/paths";
import { RoutineMetadata } from "@/src/features/routines/domain/entities/routine";
import { RoutineForm } from "@/src/features/routines/ui/routine-form/routine-form";
import { useRoutines } from "@/src/features/routines/ui/RoutinesProvider";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function RoutinesNewScreen() {
    const router = useRouter();
    const { createRoutine } = useRoutines();
    const [isLoading, setIsLoading] = useState(false);
    const handleCreateRoutine = async(routine: RoutineMetadata) => {
        setIsLoading(true)
        await createRoutine(routine)
        setIsLoading(false)
        router.push({
            pathname: PATHS.ROUTINES.pathname,
        })
    }

    return (
        <StackScreen title="New Routine">
            <RoutineForm 
            handleSubmit={handleCreateRoutine} 
            isSubmitting={isLoading} 
            />
        </StackScreen>
    )
}