import { generateId } from "@/src/core/uuid";
import type {
  ExerciseLog,
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

export class AddSetUseCase {
  constructor(private readonly repository: SessionRepository) {}

  async execute(input: AddSetInput): Promise<WorkoutSession> {
    const session = await this.repository.getById(input.sessionId);

    if (!session) {
      throw new Error(`Not found session with id ${input.sessionId}`);
    }

    const updated: WorkoutSession = {
      ...session,
      exerciseLogs: this.addSetToLogs(session.exerciseLogs ?? [], input),
    };

    await this.repository.save(updated);
    return updated;
  }

  private addSetToLogs(logs: ExerciseLog[], input: AddSetInput): ExerciseLog[] {
    const existingLog = logs.find(
      (log) => log.routineExerciseId === input.routineExerciseId
    );

    if (!existingLog) {
      return [...logs, this.createLog(input)];
    }

    return logs.map((log) =>
      log.routineExerciseId === input.routineExerciseId
        ? { ...log, sets: [...log.sets, this.createSet(log.sets.length + 1, input)] }
        : log
    );
  }

  private createLog(input: AddSetInput): ExerciseLog {
    return {
      id: generateId("log"),
      routineExerciseId: input.routineExerciseId,
      sets: [this.createSet(1, input)],
    };
  }

  private createSet(setNumber: number, input: AddSetInput): SetEntry {
    return {
      id: generateId("set"),
      setNumber,
      reps: input.reps,
      weight: input.weight,
    };
  }
}