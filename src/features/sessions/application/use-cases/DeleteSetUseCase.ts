import type { SessionId, WorkoutSession } from "../../domain/entities/session";
import type { SessionRepository } from "../../domain/repositories/SessionRepository";

export interface DeleteSetInput {
  sessionId: SessionId;
  routineExerciseId: string;
  setId: string;
}

export class DeleteSetUseCase {
  constructor(private readonly repository: SessionRepository) {}

  async execute(input: DeleteSetInput): Promise<WorkoutSession> {
    const session = await this.repository.getById(input.sessionId);

    if (!session) {
      throw new Error(`Not found session with id ${input.sessionId}`);
    }

    const updated: WorkoutSession = {
      ...session,
      exerciseLogs: session.exerciseLogs?.map((log) => {
        if (log.routineExerciseId !== input.routineExerciseId) return log;

        const filtered = log.sets.filter((set) => set.id !== input.setId);
        // Renumerar los sets tras el borrado
        const renumbered = filtered.map((set, index) => ({
          ...set,
          setNumber: index + 1,
        }));

        return { ...log, sets: renumbered };
      }),
    };

    await this.repository.save(updated);
    return updated;
  }
}