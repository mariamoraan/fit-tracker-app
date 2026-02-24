"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { WorkoutSession } from "../domain/entities/session";
import type { RoutineId } from "../../routines/domain/entities/routine";
import { LocalStorageSessionRepository } from "../infrastructure/storage/LocalStorageSessionRepository";
import { StartOrContinueTodaySessionUseCase } from "../application/use-cases/StartOrContinueTodaySessionUseCase";
import { AddSetToExerciseUseCase } from "../application/use-cases/AddSetToExerciseUseCase";
import { CompleteSessionUseCase } from "../application/use-cases/CompleteSessionUseCase";

interface SessionsContextValue {
  currentSession?: WorkoutSession;
  loading: boolean;
  startOrContinueToday: (
    routineId: RoutineId,
    routineExerciseIds: string[],
  ) => Promise<void>;
  addSet: (params: {
    routineExerciseId: string;
    reps: number;
    weight?: number;
  }) => Promise<void>;
  complete: () => Promise<void>;
}

const SessionsContext = createContext<SessionsContextValue | undefined>(
  undefined,
);

function createUseCases() {
  const repo = new LocalStorageSessionRepository();
  return {
    startOrContinue: new StartOrContinueTodaySessionUseCase(repo),
    addSet: new AddSetToExerciseUseCase(repo),
    complete: new CompleteSessionUseCase(repo),
  };
}

export function SessionsProvider({ children }: { children: React.ReactNode }) {
  const [currentSession, setCurrentSession] = useState<WorkoutSession>();
  const [loading, setLoading] = useState(false);

  const useCases = useMemo(() => createUseCases(), []);

  const startOrContinueToday = useCallback(
    async (routineId: RoutineId, routineExerciseIds: string[]) => {
      setLoading(true);
      const session = await useCases.startOrContinue.execute({
        routineId,
        routineExerciseIds,
      });
      setCurrentSession(session);
      setLoading(false);
    },
    [useCases],
  );

  const addSet = useCallback(
    async (params: {
      routineExerciseId: string;
      reps: number;
      weight?: number;
    }) => {
      if (!currentSession) return;
      setLoading(true);
      const updated = await useCases.addSet.execute({
        sessionId: currentSession.id,
        routineExerciseId: params.routineExerciseId,
        reps: params.reps,
        weight: params.weight,
      });
      setCurrentSession(updated);
      setLoading(false);
    },
    [currentSession, useCases],
  );

  const complete = useCallback(async () => {
    if (!currentSession) return;
    setLoading(true);
    const updated = await useCases.complete.execute(currentSession.id);
    setCurrentSession(updated);
    setLoading(false);
  }, [currentSession, useCases]);

  return (
    <SessionsContext.Provider
      value={{ currentSession, loading, startOrContinueToday, addSet, complete }}
    >
      {children}
    </SessionsContext.Provider>
  );
}

export function useSessions() {
  const ctx = useContext(SessionsContext);
  if (!ctx) {
    throw new Error("useSessions must be used within SessionsProvider");
  }
  return ctx;
}

