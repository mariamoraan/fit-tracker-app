import type {
  Routine,
  RoutineExercise,
  RoutineId,
} from "../../domain/entities/routine";
import type { RoutineRepository } from "../../domain/repositories/RoutineRepository";

export interface UpdateRoutineExercisesInput {
  routineId: RoutineId;
  exercises: RoutineExercise[];
}

export class UpdateRoutineExercisesUseCase {
  constructor(private readonly repository: RoutineRepository) {}

  async execute(input: UpdateRoutineExercisesInput): Promise<Routine> {
    const existing = await this.repository.getById(input.routineId);
    if (!existing) {
      throw new Error("Routine not found");
    }

    const updated: Routine = {
      ...existing,
      exercises: input.exercises,
    };

    await this.repository.save(updated);
    return updated;
  }
}

