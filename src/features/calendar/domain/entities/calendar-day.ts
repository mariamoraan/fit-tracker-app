import type { RoutineId } from "../../../routines/domain/entities/routine";
import type { WorkoutSession } from "../../../sessions/domain/entities/session";

export interface CalendarDay {
  date: string; // ISO
  scheduledRoutinesIds?: RoutineId[];
  completedSessionIds: WorkoutSession[];
}

