import type { Routine } from "../../domain/entities/routine";
import type { RoutineRepository } from "../../domain/repositories/RoutineRepository";

export class ListRoutinesUseCase {
  constructor(private readonly repository: RoutineRepository) {}

  async execute(): Promise<Routine[]> {
    const routines = await this.repository.getAll();
    return routines.sort((a, b) => a.name.localeCompare(b.name));
  }
}

