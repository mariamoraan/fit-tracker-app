
import { compareDates, formatDateToISO, getDayOfWeek, getDaysInMonth } from "@/src/core/date";
import type { Routine } from "../../../routines/domain/entities/routine";
import type { SessionRepository } from "../../../sessions/domain/repositories/SessionRepository";
import type { CalendarDay } from "../../domain/entities/calendar-day";

export interface GetMonthlyCalendarInput {
  year: number;
  month: number; // 0-11
  routines: Routine[];
}

export class GetMonthlyCalendarUseCase {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(
    input: GetMonthlyCalendarInput,
  ): Promise<Map<string, CalendarDay>> {
    const days = getDaysInMonth(input.year, input.month);
    const allSessions = await this.sessionRepository.getAll();
    const completedSessions = allSessions.filter(
      (s) => s.status === "completed",
    );

    const calendarMap = new Map<string, CalendarDay>();

    for (const day of days) {
      const dateISO = formatDateToISO(day);
      const dayOfWeek = getDayOfWeek(dateISO);

      // Encontrar qué rutina está programada para este día
      const scheduledRoutine = input.routines.filter((r) =>
        r.daysOfWeek.includes(dayOfWeek),
      );

      // Encontrar sesiones completadas para este día
      const daySessions = completedSessions.filter((s) => s.date === dateISO);

      calendarMap.set(dateISO, {
        date: dateISO,  
        scheduledRoutinesIds: scheduledRoutine.filter(routine => compareDates(routine.startDay, new Date(dateISO)) !== 'BIGGER').map(routine => routine.id),
        completedSessionIds: daySessions.map((s) => s),
      });
    }

    return calendarMap;
  }
}
