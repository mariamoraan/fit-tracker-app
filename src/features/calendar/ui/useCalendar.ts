"use client";

import { useEffect, useMemo, useState } from "react";
import type { Routine } from "../../routines/domain/entities/routine";
import { LocalStorageSessionRepository } from "../../sessions/infrastructure/storage/LocalStorageSessionRepository";
import { GetMonthlyCalendarUseCase } from "../application/use-cases/GetMonthlyCalendarUseCase";
import type { CalendarDay } from "../domain/entities/calendar-day";

export function useCalendar(
  routines: Routine[],
  year: number,
  month: number,
) {
  const [calendarDays, setCalendarDays] = useState<Map<string, CalendarDay>>(
    new Map(),
  );
  const [loading, setLoading] = useState(true);

  const useCase = useMemo(
    () => new GetMonthlyCalendarUseCase(new LocalStorageSessionRepository()),
    [],
  );

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const days = await useCase.execute({ year, month, routines });
      setCalendarDays(days);
      setLoading(false);
    };
    void load();
  }, [useCase, year, month, routines]);

  return { calendarDays, loading };
}
