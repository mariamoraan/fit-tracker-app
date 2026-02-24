import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Routine, RoutineId } from "../../domain/entities/routine";
import type { RoutineRepository } from "../../domain/repositories/RoutineRepository";

const STORAGE_KEY = "fittracker:routines";

export class LocalStorageRoutineRepository implements RoutineRepository {

  private toDomain(raw: string | null): Routine[] {
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

  private toDTO(routines: Routine[]): string {
    return JSON.stringify(
      routines.map(routine => ({...routine, startDay: routine.startDay.toISOString()}))
    );
  }

  async getAll(): Promise<Routine[]> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEY);
      return this.toDomain(raw);
    } catch {
      return [];
    }
  }

  async getById(id: RoutineId): Promise<Routine | null> {
    const routines = await this.getAll();
    return routines.find(r => r.id === id) ?? null;
  }

  async save(routine: Routine): Promise<void> {
    const routines = await this.getAll();
    const existingIndex = routines.findIndex(r => r.id === routine.id);
    if (existingIndex >= 0) {
      routines[existingIndex] = { ...routine, startDay: routine.startDay };
    } else {
      routines.push({ ...routine, startDay: routine.startDay });
    }
    await AsyncStorage.setItem(STORAGE_KEY, this.toDTO(routines));
  }

  async delete(id: RoutineId): Promise<void> {
    const routines = await this.getAll();
    const filtered = routines.filter(r => r.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, this.toDTO(filtered));
  }
}