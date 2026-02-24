import type { Routine, RoutineId } from "../../domain/entities/routine";
import type { RoutineRepository } from "../../domain/repositories/RoutineRepository";

export class GetRoutineByIdUseCase {
  constructor(private readonly repository: RoutineRepository) {}

  async execute(id: RoutineId): Promise<Routine | null> {
    return this.repository.getById(id);
  }
}

