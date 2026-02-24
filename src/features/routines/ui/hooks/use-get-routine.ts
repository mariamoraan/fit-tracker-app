import { useEffect, useState } from "react";
import { GetRoutineByIdUseCase } from "../../application/use-cases/GetRoutineByIdUseCase";
import { Routine } from "../../domain/entities/routine";
import { LocalStorageRoutineRepository } from "../../infrastructure/storage/LocalStorageRoutineRepository";

export const useGetRoutine = (id?: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [routine, setRoutine] = useState<Routine | undefined>(undefined)
    const getRoutine = async(id: string) => {
        setIsLoading(true)
        const useCase = new GetRoutineByIdUseCase(
            new LocalStorageRoutineRepository(),
          );
        const r = await useCase.execute(id);
        setRoutine(r ?? undefined)
        setIsLoading(false)
    }
    useEffect(() => {
        if(!id) return;
        getRoutine(id);
    }, [id])

    return {routine, isLoading, refetch: getRoutine}
}