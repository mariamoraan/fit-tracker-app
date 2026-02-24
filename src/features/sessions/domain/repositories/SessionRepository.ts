import type { Routine, RoutineId } from "../../../routines/domain/entities/routine";
import type { SessionId, WorkoutSession } from "../entities/session";

export interface SessionRepository {
  getById(id: SessionId): Promise<WorkoutSession | null>;
  getByRoutineAndDate(
    routineId: RoutineId,
    date: string,
  ): Promise<WorkoutSession | null>;
  listByRoutine(routineId: RoutineId): Promise<WorkoutSession[]>;
  listByDate(date: string): Promise<WorkoutSession[]>;
  getAll(): Promise<WorkoutSession[]>;
  save(session: WorkoutSession): Promise<void>;
  getRoutine: (routineId: RoutineId) => Promise<Routine | null>
}

