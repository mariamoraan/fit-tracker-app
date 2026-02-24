import type { WorkoutSession } from "../../domain/entities/session";
import type { SessionRepository } from "../../domain/repositories/SessionRepository";
import type { SessionId } from "../../domain/entities/session";

export class CompleteSessionUseCase {
  constructor(private readonly repository: SessionRepository) {}

  async execute(sessionId: SessionId): Promise<WorkoutSession> {
    const existing = await this.repository.getById(sessionId);
    if (!existing) {
      throw new Error("Session not found");
    }

    const updated: WorkoutSession = {
      ...existing,
      status: "completed",
    };

    await this.repository.save(updated);
    return updated;
  }
}

