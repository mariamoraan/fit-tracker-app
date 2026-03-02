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
    let logs: ExerciseLog[];

    if(!session) {
      throw Error (`Not found session with id ${input.sessionId}`)
    }

    if (!session.exerciseLogs?.length) {
      logs = [{
        id: generateId("log"),
        routineExerciseId: input.routineExerciseId,
        sets: [{
          id: generateId("set"),
          setNumber: 1,
          reps: input.reps,
          weight: input.weight, 
        }]

      }]
    } else {
      logs = session.exerciseLogs.map((log) => {
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
    }

    

    const updated: WorkoutSession = {
      ...session,
      exerciseLogs: logs,
    };

    await this.repository.save(updated);
    return updated;
  }
}

