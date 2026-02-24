import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Routine, RoutineId } from "../../../routines/domain/entities/routine";
import type { SessionId, WorkoutSession } from "../../domain/entities/session";
import type { SessionRepository } from "../../domain/repositories/SessionRepository";

const ROUTINES_STORAGE_KEY = "fittracker:routines";
const STORAGE_KEY = "fittracker:sessions";

function isBrowser() {
  return typeof window !== "undefined";
}

async function readAll(): Promise<WorkoutSession[]> {
  if (!isBrowser()) return [];
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

async function writeAll(sessions: WorkoutSession[]): Promise<void> {
  if (!isBrowser()) return;
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export class LocalStorageSessionRepository implements SessionRepository {
  async getById(id: SessionId): Promise<WorkoutSession | null> {
    const all = await readAll();
    return all.find((s) => s.id === id) ?? null;
  }

  async getByRoutineAndDate(
    routineId: RoutineId,
    date: string,
  ): Promise<WorkoutSession | null> {
    const all = await readAll();
    return (
      all.find(
        (s) => s.routineId === routineId && s.date === date,
      ) ?? null
    );
  }

  async listByRoutine(routineId: RoutineId): Promise<WorkoutSession[]> {
    const all = await readAll();
    return all
      .filter((s) => s.routineId === routineId)
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  async listByDate(date: string): Promise<WorkoutSession[]> {
    const all = await readAll();

    return all.filter((s) => s.date === date);
  }

  async getAll(): Promise<WorkoutSession[]> {
    return readAll();
  }

  async save(session: WorkoutSession): Promise<void> {
    const all = await readAll();
    const index = all.findIndex((s) => s.id === session.id);
    if (index >= 0) {
      all[index] = session;
    } else {
      all.push(session);
    }
    writeAll(all);
  }

  private routinesToDomain(raw: string | null): Routine[] {
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];
      return parsed.map(routine => ({
        ...routine, 
        startDay: routine.startDay ? new Date(routine.startDay) : new Date()
      }));
    } catch {
      return [];
    }
  }

  private async getAllRoutines(): Promise<Routine[]> {
    try {
      const raw = await AsyncStorage.getItem(ROUTINES_STORAGE_KEY);
      return this.routinesToDomain(raw);
    } catch {
      return [];
    }
  }

  async getRoutine(id: RoutineId): Promise<Routine | null> {
    const routines = await this.getAllRoutines();
    const routine = routines.find(r => r.id === id) ?? null;
    return routine ?? null;
  }

}

