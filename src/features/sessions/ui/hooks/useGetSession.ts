import { useEffect, useState } from "react";
import { GetSessionByIdUseCase } from "../../application/use-cases/GetSessionByIdUseCase";
import { SessionId, WorkoutSession } from "../../domain/entities/session";
import { LocalStorageSessionRepository } from "../../infrastructure/storage/LocalStorageSessionRepository";

export const useGetSession = (id: SessionId) => {
    const [session, setSession] = useState<WorkoutSession | null>(null)
    const [isLoadingSession, setIsLoadingSession] = useState(false);

    useEffect(() => {
        const loadSessions = async () => {
    
            setIsLoadingSession(true);
          const useCase = new GetSessionByIdUseCase(
            new LocalStorageSessionRepository(),
          );
          const currentSession = await useCase.execute(id);
          setSession(currentSession);
          setIsLoadingSession(false);
        };
        void loadSessions();
      }, [id]);

    return {session, isLoading: isLoadingSession}
}