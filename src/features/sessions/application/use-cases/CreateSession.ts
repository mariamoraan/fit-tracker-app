import { formatDateToISO } from "@/src/core/date";
import { generateId } from "@/src/core/uuid";
import type { RoutineId } from "../../../routines/domain/entities/routine";
import type {
  ExerciseLog,
  WorkoutSession,
} from "../../domain/entities/session";
import type { SessionRepository } from "../../domain/repositories/SessionRepository";

export class CreateSessionUseCase {
  constructor(private readonly repository: SessionRepository) {}

  async execute(params: {
    routineId: RoutineId;
    date?: string; // ISO date yyyy-mm-dd
  }): Promise<WorkoutSession> {
    const routine = await this.repository.getRoutine(params.routineId);
    const date = params?.date ? params.date : formatDateToISO(new Date())
    const existing = await this.repository.getByRoutineAndDate(
      params.routineId,
      date,
    );

    if(!routine) {
      throw Error(`Routine ${params.routineId} does not exists`)
    }

    if (existing) {
      return existing;
    }

    const exerciseLogs: ExerciseLog[] = routine?.exercises?.map(
      (exercise) => ({
        exerciseName: exercise.name,
        routineExerciseId: exercise.id,
        sets: [],
      }),
    ) ?? [];

    const session: WorkoutSession = {
      id: generateId("session"),
      routineId: params.routineId,
      routineName: routine.name,
      date: date,
      status: "in-progress",
      exerciseLogs,
    };

    await this.repository.save(session);
    return session;
  }
}
