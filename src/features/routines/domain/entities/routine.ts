export type RoutineId = string;

export enum RoutineExerciseState {
  ACTIVE = 'active',
  DISCARDED = 'discarded'
}

export interface RoutineExercise {
  id: string;
  name: string;
  targetReps?: number;
  targetSets?: number;
  targetWeight?: number;
  notes?: string;
  state: RoutineExerciseState
}

export interface RoutineMetadata {
  name: string;
  color: string; // hex o token tailwind
  daysOfWeek: number[]; // 0-6 (domingo-sábado)
  startDay: Date;
}

export type Routine = {
  id: RoutineId;
  exercises: RoutineExercise[]; // ordenados
} & RoutineMetadata

