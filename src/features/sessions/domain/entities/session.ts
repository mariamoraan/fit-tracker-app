import type { RoutineId } from "../../../routines/domain/entities/routine";

export type SessionId = string;

export interface SetEntry {
  id: string;
  setNumber: number;
  reps: number;
  weight?: number;
  notes?: string;
}

export interface ExerciseLog {
  id: string;
  routineExerciseId: string;
  sets: SetEntry[];
}

export interface WorkoutSession {
  id: SessionId;
  routineId: RoutineId;
  date: string; // ISO yyyy-mm-dd
  status: "in-progress" | "completed";
  exerciseLogs: ExerciseLog[];
  notes?: string;
}

