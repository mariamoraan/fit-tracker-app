import type { Routine, RoutineId } from "../../domain/entities/routine";
import type { RoutineRepository } from "../../domain/repositories/RoutineRepository";

export interface UpdateRoutineMetaInput {
  id: RoutineId;
  name: string;
  color: string;
  daysOfWeek: number[];
  startDay: Date;
}

export class UpdateRoutineMetaUseCase {
  constructor(private readonly repository: RoutineRepository) {}

  async execute(input: UpdateRoutineMetaInput): Promise<Routine> {
    const existing = await this.repository.getById(input.id);
    if (!existing) {
      throw new Error("Routine not found");
    }

    const updated: Routine = {
      ...existing,
      name: input.name.trim(),
      color: input.color,
      daysOfWeek: input.daysOfWeek.sort(),
      startDay: input.startDay,
    };

    await this.repository.save(updated);
    return updated;
  }
}

