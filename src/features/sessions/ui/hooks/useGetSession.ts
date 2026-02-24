import { useEffect, useState } from "react";
import { GetSessionByIdUseCase } from "../../application/use-cases/GetSessionByIdUseCase";
import { SessionId, WorkoutSession } from "../../domain/entities/session";
import { LocalStorageSessionRepository } from "../../infrastructure/storage/LocalStorageSessionRepository";

export const useGetSession = (id?: SessionId) => {
    const [session, setSession] = useState<WorkoutSession | null>(null)
    const [isLoadingSession, setIsLoadingSession] = useState(false);

    const loadSession = async (id: string) => {
      setIsLoadingSession(true);
      const useCase = new GetSessionByIdUseCase(
        new LocalStorageSessionRepository(),
      );
      const currentSession = await useCase.execute(id);
      setSession(currentSession);
      setIsLoadingSession(false);
    };

    useEffect(() => {
        if(!id) return;
        void loadSession(id);
      }, [id]);

    return {session, isLoading: isLoadingSession, refetch: loadSession}
}