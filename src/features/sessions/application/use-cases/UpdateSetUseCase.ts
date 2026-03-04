import type { SessionId, WorkoutSession } from "../../domain/entities/session";
import type { SessionRepository } from "../../domain/repositories/SessionRepository";

export interface UpdateSetInput {
  sessionId: SessionId;
  routineExerciseId: string;
  setId: string;
  reps: number;
  weight?: number;
}

export class UpdateSetUseCase {
  constructor(private readonly repository: SessionRepository) {}

  async execute(input: UpdateSetInput): Promise<WorkoutSession> {
    const session = await this.repository.getById(input.sessionId);

    if (!session) {
      throw new Error(`Not found session with id ${input.sessionId}`);
    }

    const updated: WorkoutSession = {
      ...session,
      exerciseLogs: session.exerciseLogs?.map((log) => {
        if (log.routineExerciseId !== input.routineExerciseId) return log;
        return {
          ...log,
          sets: log.sets.map((set) =>
            set.id === input.setId
              ? { ...set, reps: input.reps, weight: input.weight }
              : set
          ),
        };
      }),
    };

    await this.repository.save(updated);
    return updated;
  }
}