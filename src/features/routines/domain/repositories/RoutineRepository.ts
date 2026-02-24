import type { Routine, RoutineId } from "../entities/routine";

export interface RoutineRepository {
  getAll(): Promise<Routine[]>;
  getById(id: RoutineId): Promise<Routine | null>;
  save(routine: Routine): Promise<void>;
  delete(id: RoutineId): Promise<void>;
}

