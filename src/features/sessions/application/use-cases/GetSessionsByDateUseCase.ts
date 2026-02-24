import type { WorkoutSession } from "../../domain/entities/session";
import type { SessionRepository } from "../../domain/repositories/SessionRepository";

export class GetSessionsByDateUseCase {
  constructor(private readonly repository: SessionRepository) {}

  async execute(date: string): Promise<WorkoutSession[]> {
    return this.repository.listByDate(date);
  }
}
