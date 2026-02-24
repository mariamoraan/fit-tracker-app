import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { CreateRoutineUseCase } from "../application/use-cases/CreateRoutineUseCase";
import { ListRoutinesUseCase } from "../application/use-cases/ListRoutinesUseCase";
import { UpdateRoutineExercisesUseCase } from "../application/use-cases/UpdateRoutineExercisesUseCase";
import { UpdateRoutineMetaUseCase } from "../application/use-cases/UpdateRoutineMetaUseCase";
import type { Routine, RoutineExercise, RoutineId } from "../domain/entities/routine";
import { LocalStorageRoutineRepository } from "../infrastructure/storage/LocalStorageRoutineRepository";

interface RoutinesContextValue {
  routines: Routine[];
  loading: boolean;
  createRoutine: (input: {
    name: string;
    color: string;
    daysOfWeek: number[];
    startDay: Date;
    exercises?: RoutineExercise[];
  }) => Promise<void>;
  updateRoutineMeta: (input: {
    id: RoutineId;
    name: string;
    color: string;
    daysOfWeek: number[];
    startDay: Date;
  }) => Promise<Routine>;
  updateExercises: (
    routineId: RoutineId,
    exercises: Routine["exercises"],
  ) => Promise<Routine>;
  getRoutineById: (id: RoutineId) => Routine | undefined;
  reload: () => Promise<void>;
}

const RoutinesContext = createContext<RoutinesContextValue | undefined>(
  undefined,
);

function createUseCases() {
  const repo = new LocalStorageRoutineRepository();
  return {
    listRoutines: new ListRoutinesUseCase(repo),
    createRoutine: new CreateRoutineUseCase(repo),
    updateExercises: new UpdateRoutineExercisesUseCase(repo),
    updateRoutineMeta: new UpdateRoutineMetaUseCase(repo),
  };
}

export function RoutinesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [loading, setLoading] = useState(true);

  const useCases = useMemo(() => createUseCases(), []);

  const load = async () => {
    setLoading(true);
    const all = await useCases.listRoutines.execute();
    setRoutines(all);
    setLoading(false);
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCreate = async (input: {
    name: string;
    color: string;
    daysOfWeek: number[];
    startDay: Date;
    exercises?: RoutineExercise[];
  }) => {
    await useCases.createRoutine.execute(input);
    await load();
  };

  const handleUpdateRoutineMeta = async (input: {
    id: RoutineId;
    name: string;
    color: string;
    daysOfWeek: number[];
    startDay: Date;
  }) => {
    const routine = await useCases.updateRoutineMeta.execute(input);
    await load();
    return routine
  };

  const handleUpdateExercises = async (
    routineId: RoutineId,
    exercises: Routine["exercises"],
  ) => {
    const routine = await useCases.updateExercises.execute({ routineId, exercises });
    await load();
    return routine
  };

  return (
    <RoutinesContext.Provider
      value={{
        routines,
        loading,
        createRoutine: handleCreate,
        updateRoutineMeta: handleUpdateRoutineMeta,
        updateExercises: handleUpdateExercises,
        getRoutineById: (id: RoutineId) =>
          routines.find((routine) => routine.id === id),
        reload: load,
      }}
    >
      {children}
    </RoutinesContext.Provider>
  );
}

export function useRoutines() {
  const ctx = useContext(RoutinesContext);
  if (!ctx) {
    throw new Error("useRoutines must be used within RoutinesProvider");
  }
  return ctx;
}

