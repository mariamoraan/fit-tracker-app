import type { SessionId, WorkoutSession } from "../../domain/entities/session";
import type { SessionRepository } from "../../domain/repositories/SessionRepository";

export class CompleteSessionUseCase {
  constructor(private readonly repository: SessionRepository) {}

  async execute({sessionId, isCompleted = true}: {sessionId: SessionId, isCompleted: boolean}): Promise<WorkoutSession> {
    const existing = await this.repository.getById(sessionId);
    if (!existing) {
      throw new Error("Session not found");
    }

    const updated: WorkoutSession = {
      ...existing,
      status: isCompleted ? "completed" : "in-progress",
    };

    await this.repository.save(updated);
    return updated;
  }
}

