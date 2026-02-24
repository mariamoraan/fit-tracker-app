import type { WorkoutSession } from "../../domain/entities/session";
import type { SessionRepository } from "../../domain/repositories/SessionRepository";

export class GetSessionByIdUseCase {
  constructor(private readonly repository: SessionRepository) {}

  async execute(id: string): Promise<WorkoutSession | null> {
    const session =  this.repository.getById(id);
    return session;
  }
}
