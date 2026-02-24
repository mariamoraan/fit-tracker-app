import { formatDateToISO } from "@/src/core/date";
import { generateId } from "@/src/core/uuid";
import type { RoutineId } from "../../../routines/domain/entities/routine";
import type {
  WorkoutSession
} from "../../domain/entities/session";
import type { SessionRepository } from "../../domain/repositories/SessionRepository";

export class CreateSessionUseCase {
  constructor(private readonly repository: SessionRepository) {}

  async execute(params: {
    routineId: RoutineId;
    date?: string; // ISO date yyyy-mm-dd
  }): Promise<WorkoutSession> {
    const date = params?.date ? params.date : formatDateToISO(new Date())
    const existing = await this.repository.getByRoutineAndDate(
      params.routineId,
      date,
    );

    if (existing) {
      return existing;
    }

    const session: WorkoutSession = {
      id: generateId("session"),
      routineId: params.routineId,
      date: date,
      status: "in-progress",
      exerciseLogs: [],
    };

    await this.repository.save(session);
    return session;
  }
}
