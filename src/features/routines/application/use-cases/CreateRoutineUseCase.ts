import { generateId } from "@/src/core/uuid";
import type { Routine, RoutineExercise } from "../../domain/entities/routine";
import type { RoutineRepository } from "../../domain/repositories/RoutineRepository";

export interface CreateRoutineInput {
  name: string;
  color: string;
  daysOfWeek: number[];
  startDay: Date;
  exercises?: RoutineExercise[];
}

export class CreateRoutineUseCase {
  constructor(private readonly repository: RoutineRepository) {}

  async execute(input: CreateRoutineInput): Promise<Routine> {
    const routine: Routine = {
      id: generateId("routine"),
      name: input.name.trim(),
      color: input.color,
      daysOfWeek: input.daysOfWeek,
      startDay: input.startDay,
      exercises: input?.exercises ?? [],
    };

    await this.repository.save(routine);
    return routine;
  }
}

