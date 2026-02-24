import { generateId } from "@/src/core/uuid";
import type {
  SessionId,
  SetEntry,
  WorkoutSession,
} from "../../domain/entities/session";
import type { SessionRepository } from "../../domain/repositories/SessionRepository";

export interface AddSetInput {
  sessionId: SessionId;
  routineExerciseId: string;
  reps: number;
  weight?: number;
}

export class AddSetToExerciseUseCase {
  constructor(private readonly repository: SessionRepository) {}

  async execute(input: AddSetInput): Promise<WorkoutSession> {
    const existing = await this.repository.getById(input.sessionId);
    if (!existing) {
      throw new Error("Session not found");
    }

    const logs = existing.exerciseLogs.map((log) => {
      if (log.routineExerciseId !== input.routineExerciseId) return log;

      const nextSetNumber = log.sets.length + 1;
      const newSet: SetEntry = {
        id: generateId("set"),
        setNumber: nextSetNumber,
        reps: input.reps,
        weight: input.weight,
      };

      return {
        ...log,
        sets: [...log.sets, newSet],
      };
    });

    const updated: WorkoutSession = {
      ...existing,
      exerciseLogs: logs,
    };

    await this.repository.save(updated);
    return updated;
  }
}

